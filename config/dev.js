let projectName = process.argv[2],
    pageNameArr = projectName.split(',');
pageNameArr = pageNameArr.map(name => {
    return { name }
})

let fs = require('fs')

fs.writeFileSync('./config/project.js', `exports.pageNameArr = ${JSON.stringify(pageNameArr)}`)
fs.writeFileSync('./config/projectname.txt', `${projectName}`)

let exec = require('child_process').execSync;

exec('npm run serve', { stdio: 'inherit' });

