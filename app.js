const express = require('express')
const path = require('path')
// const favicon = require('serve-favicon')
const logger = require('morgan')
const env = require('./api/config/env.js')
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'api/views'))
app.set('view engine', 'ejs')

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))

if (env.isDevelopment === true && process.env.NODE_ENV != 'test') {
    app.use(logger('dev'))
} else {
    app.set('env', 'production')
}

require('./api/config/middleware.js')(app)
require('./api/config/route.js')(app)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
        res.status(err.status || 500)

        return res.send({
            message: err.message,
            error: err
        })
    })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
    res.status(err.status || 500)
    res.send({
        message: err.message,
        error: {}
    })
})


module.exports = app
