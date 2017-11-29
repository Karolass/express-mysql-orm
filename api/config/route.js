const express = require('express')

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

function mainRoute(app, route, prefix) {
    for (const key in route) {
        const path = prefix ? `${prefix}/${key}` : `${key}`

        if (route[key].length === undefined) {
            mainRoute(app, route[key], path)
        } else {
            const array = route[key]
            const router = routeProcess(array)
            app.use(`/${path}`, router)
        }
    }
}

function routeProcess(array, prefix) {
    const router = express.Router()
    array.forEach(function(value) {
        const path = prefix ? `/${prefix}${value[1]}` : value[1]
        if (value.length > 3) {
            for (let i = 3; i < value.length; i++) {
                if (typeof value[i] === 'function') {
                    router[value[0]](path, value[i])
                }
            }
        }
        if (typeof value[2] === 'function') {
            router[value[0]](path, value[2])
        }
    })

    return router
}

module.exports = function(app) {
    //beforeAction
    app.all('*', beforeAction.offSetAndLimit)
    app.all('*', beforeAction.removeInput)

    mainRoute(app, route)

    // //index.html
    // app.get('/', function(req, res) {
    //     res.render('index', { title: 'express' })
    // })
}