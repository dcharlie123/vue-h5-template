<template>
    <div class="nv-upload" :class="{disabled:disabled}">
        <file-upload
            :input-id="inputId"
            accept="image/*"
            @input-file="initPolicy"
            :disabled="disabled"
        >
            <slot></slot>
        </file-upload>
        <div class="dialog" v-show="isShowCropper">
            <div class="cropDialog-body">
                <vue-cropper
                    ref="cropper"
                    class="cropper"
                    drag-mode="move"
                    :src="option.src"
                    :aspectRatio="option.aspectRatio"
                    :center="true"
                    :viewMode="1"
                    :movable="true"
                    :zoomable="true"
                    :autoCropArea="1"
                    :scalable="true"
                    :doubleClickToggle="true"
                    :cropBoxResizable="true"
                    :checkCrossOrigin="true"
                    :rotatable="true"
                    v-show="option.src"
                ></vue-cropper>
            </div>
            <div class="dialog-footer">
                <nv-button class="l-btn" type="info" size="mini" @click="doReset">还 原</nv-button>
                <nv-button class="l-btn" type="info" size="mini" @click="doRotate">旋 转</nv-button>
                <nv-button class="r-btn" type="default" size="mini" @click="cancelCrop">取 消</nv-button>
                <nv-button
                    class="r-btn"
                    type="primary"
                    size="mini"
                    :disabled="cropBtnDisabled"
                    @click="getCropImage"
                >确 定</nv-button>
            </div>
        </div>
    </div>
</template>

<script>
import { Indicator, Toast } from "mint-ui";
import VueUploadComponent from "vue-upload-component";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import NvButton from "@/components/Button";
import X2JS from "x2js";

import { postPolicy, postUploadImage, uploadImageToOe } from "@/api/upload";

import Vue from "vue";
import VueResource from "vue-resource";
Vue.use(VueResource);

export default {
    name: "Upload",
    props: {
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false,
        },
        // 是否直接上传到京东云
        isToJdcloud: {
            type: Boolean,
            default: true,
        },
        // 上传到奥一服务器的接口地址
        uploadUrl: {
            type: String,
            default: "", //todo
        },
        // 京东云policy地址
        policyUrl: {
            type: String,
            default: "m=UploadOss&a=getImgPostPolicy", //通用的接口
        },
        // 上传图片时需要附带的内容
        postdata: {
            type: Object,
            default: function () {
                return {};
            },
        },
        // 默认图片
        imgUrl: {
            type: String,
            default: "",
        },
        // 是否需要裁切
        isCrop: {
            type: Boolean,
            default: false,
        },
        // 是否允许清空
        isCanDel: {
            type: Boolean,
            default: false,
        },
        // 图片比例
        ratio: {
            type: Number,
            default: 320 / 180,
        },
        // 被裁切的图片地址，设置这个参数后会直接弹出裁切框
        cropImg: String,

        // 多个图片选择器的键值，在上传成功回调函数中获取到 （比如由数组渲染出多个图片选择器，由该键值识别）
        imgKey: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            file: null,
            action: "", // 上传地址
            data: {
                success_action_status: "201", // 设置京东云接口返回格式(xml)
            },
            // 图片上传后的地址
            imgSrc: "",

            // 是否显示裁切框
            isShowCropper: false,
            // 裁切框配置
            option: {
                src: "",
                aspectRatio: this.ratio, // 裁切比例
            },
            // 上传框大小
            // 最大上传限制(从服务器获取)
            uploadMax: 10485760,
            // 上传文件名
            uploadName: "",
            inputId: "",
            cropBtnDisabled: false,
        };
    },
    components: {
        "file-upload": VueUploadComponent,
        "nv-button": NvButton,
        "vue-cropper": VueCropper,
    },
    watch: {
        isShowCropper(val) {
            // 处理出现遮罩层时底部滚动问题
            if (val) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "visible";
            }
        },
        cropImg() {
            this.cropImage();
        },
        ratio() {
            this.option.aspectRatio = this.ratio;
        },
    },
    mounted() {
        this.inputId = this.getInputId();
    },
    methods: {
        getInputId: function () {
            // 获取唯一值
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                /[xy]/g,
                function (c) {
                    var r = (Math.random() * 16) | 0,
                        v = c == "x" ? r : (r & 0x3) | 0x8;
                    return v.toString(16);
                }
            );
        },
        // 重置
        doReset() {
            this.$refs.cropper.reset();
        },
        // 旋转
        doRotate() {
            this.$refs.cropper.rotate(90);
        },
        // 初始化图片上传
        initPolicy(newFile, oldFile) {
            if ((newFile && !oldFile) || (newFile && oldFile)) {
                // console.log("添加文件或更新文件");
                let file = newFile.file;
                if (!file) return;
                if (!/(jpg|jpeg|JPG|png)$/.test(file.type)) {
                    Toast({
                        message: "请上传jpg或png图片",
                        iconClass: "iconfont-common icon-error",
                        duration: 3000,
                    });
                    return false;
                }
                if (this.isToJdcloud) {
                    postPolicy({
                        url: this.policyUrl,
                    }).then((res) => {
                        this.action = `//${
                            res.data.formAttributes.action.split("://")[1]
                        }`; //解决在ios中https域名下请求https tatus为0问题
                        this.uploadMax =
                            res.data.formPolicy["content-length-range"][1];
                        this.uploadName = res.data.formPolicy["filename"];
                        this.uploadDomain = res.data.formPolicy["domain"];
                        this.data = Object.assign(
                            this.data,
                            res.data.formInputs
                        );

                        this.chooseImage(file);
                    });
                } else {
                    this.chooseImage(file);
                }
            }
        },
        //创建 `blob` 字段 用于缩略图预览
        getPreviewImg(file) {
            let blob = "";
            let URL = window.URL || window.webkitURL;
            if (URL && URL.createObjectURL) {
                blob = URL.createObjectURL(file);
                return blob;
            }
            return "";
        },
        // 选择图片
        chooseImage(file) {
            if (file.size >= this.uploadMax) {
                Toast({
                    message:
                        "请上传" +
                        parseInt(this.uploadMax / 1024 / 1024) +
                        "M以内的图片",
                    iconClass: "iconfont-common icon-error",
                    duration: 3000,
                });
                return false;
            }
            this.uploadName = file.name;

            if (this.isCrop) {
                this.isShowCropper = true;
                this.$nextTick(function () {
                    Indicator.open();
                });
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.option.src = event.target.result;
                    // rebuild cropperjs with the updated source
                    this.$refs.cropper.replace(event.target.result);

                    setTimeout(() => {
                        Indicator.close();
                    }, 500);
                };
                reader.readAsDataURL(file);
                return false;
            } else {
                this.uploadImage(file);
            }
        },
        // 裁剪图片
        cropImage() {
            if (this.cropImg) {
                this.isShowCropper = true;
                Indicator.open();
                // 将图片下载到服务器上 防止跨域
                Http.get({
                    url: "", //todo
                    data: {
                        url: this.cropImg,
                    },
                }).then((res) => {
                    this.option.src = res.data.url;
                    this.$refs.cropper.replace(res.data.url);
                    setTimeout(() => {
                        Indicator.close();
                    }, 500);
                });
                return;
            }
        },
        // bese64转blob
        dataURLtoBlob(dataurl) {
            var arr = dataurl.split(","),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        },
        // 获取裁切后的图片
        getCropImage() {
            this.cropBtnDisabled = true;
            let image = this.$refs.cropper
                .getCroppedCanvas()
                .toDataURL("image/jpeg");
            let file = this.dataURLtoBlob(image);
            this.uploadImage(file);
        },
        // 上传图片
        uploadImage(image) {
            if (this.isToJdcloud) {
                this.data.file = image;
                this.data.filename = this.uploadName;
                postUploadImage({
                    postUrl: this.action,
                    data: this.data,
                }).then((res) => {
                    let x2js = new X2JS();
                    let json = x2js.xml2js(res);

                    this.imgSrc = this.uploadDomain + json.PostResponse.Key;

                    let data = {
                        imgSrc: this.imgSrc,
                        imgKey: this.imgKey,
                        imgPreview: this.getPreviewImg(image),
                    };
                    this.$emit("uploadSuccess", data);

                    if (this.isCrop) {
                        this.option.src = "";
                        this.isShowCropper = false;
                        this.cropBtnDisabled = false;
                    }
                });
            } else {
                uploadImageToOe({
                    url: this.uploadUrl,
                    data: { file: image, filename: this.uploadName },
                }).then(
                    (res) => {
                        this.imgSrc = res.data.url;

                        let data = {
                            imgSrc: this.imgSrc,
                            imgKey: this.imgKey,
                            imgPreview: res.data.preview_url,
                        };
                        this.$emit("uploadSuccess", data);

                        if (this.isCrop) {
                            this.option.src = "";
                            this.isShowCropper = false;
                            this.cropBtnDisabled = false;
                        }
                    },
                    (res) => {
                        if (this.isCrop) {
                            this.option.src = "";
                            this.isShowCropper = false;
                            this.cropBtnDisabled = false;
                        }
                    }
                );
            }
        },
        // 取消裁切
        cancelCrop() {
            this.isShowCropper = false;
            this.option.src = "";
            this.$emit("cancel");
        },
    },
};
</script>

<style type="text/less" lang="less" scoped>
@import "../assets/css/common.less";
.nv-upload {
    &.disabled {
        opacity: 0.4;
    }
    .dialog {
        background: #000;
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        /deep/.cropper-container {
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
        }
        /deep/.cropper-point.point-se {
            background-color: transparent;
            background-image: url(../assets/images/scale.png);
            background-size: cover;
            background-repeat: no-repeat;
        }
        .dialog-footer {
            position: absolute;
            width: 100%;
            bottom: 40px;
            box-sizing: border-box;
            padding: 40px;
            .l-btn {
                margin-right: 20px;
            }
            .r-btn {
                margin-left: 20px;
            }
        }
    }
}
</style>
