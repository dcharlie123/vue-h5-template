let pageNameArr = process.argv[2].split(',')
pageNameArr=pageNameArr.map(name=>{
    return {name}
})

let fs = require('fs')

fs.writeFileSync('./config/project.js', `exports.pageNameArr = ${JSON.stringify(pageNameArr)}`)

let exec = require('child_process').execSync;
exec('npm run build', {stdio: 'inherit'});