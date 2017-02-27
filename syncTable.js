if (process.argv.length > 2 && process.argv[2] == 'test') {
    process.env.NODE_ENV = 'test'
}

const fs = require('fs')
const path = require('path')
const { conn } = require('./api/config/model.js')

fs.readdir(path.resolve('./api/model/'), (err, files) => {
    files.forEach(file => {
        require('./api/model/' + file)
    })
})

console.log('***** Force Creating Table *****')
conn.sync()
    .then(() => {
        console.log('***** Create Table Success *****')
    })
    .catch((error) => {
        console.log('***** Create Table With Error *****')
        console.log(error)
    })