const beforeAction = require('../beforeAction/beforeAction.js')

const user = require('../controller/user.js')

const route = {
    user: [
        ['get', '/', user.find],
        ['get', '/:userId', user.findOne],
        ['post', '/', user.create],
        ['put', '/:userId', user.update],
        ['delete', '/:userId', user.delete],
    ],
}


module.exports = function(app) {
    //beforeAction
    app.all('*', beforeAction.offSetAndLimit)
    app.all('*', beforeAction.removeInput)

    const express = require('express')
    for (const key in route) {
        const router = express.Router()
        const array = route[key]
        array.forEach(function(value) {
            if (value.length > 3) {
                for (let i = 3; i < value.length; i++) {
                    if (typeof value[i] === 'function') {
                        router[value[0]](value[1], value[i])
                    }
                }
            }
            if (typeof value[2] === 'function') {
                router[value[0]](value[1], value[2])
            }
        })
        app.use('/' + key, router)
    }

    // //index.html
    // app.get('/', function(req, res) {
    //     res.render('index', { title: 'express' })
    // })
}