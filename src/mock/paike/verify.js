import Mock from 'mockjs'

Mock.mock('/user.php?s=/Certification/isRealName', {
    "errcode": 0,
    "errmsg": "ok",
    "data": {
        "isRealName":-1
    }
})