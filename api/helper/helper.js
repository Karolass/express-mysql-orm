const env = require('../config/env.js')

module.exports = {
    err: function(err, res) {
        if (err) {
            if (err.errors) {
                const message = []
                for (const key in err.errors) {
                    message.push(err.errors[key].message)
                }
                return res.status(400).send({
                    message: message.join(', ')
                })
            }

            return res.status(400).send({
                message: err
            })
        }
    },
    errHandler: function(result, res, callback) {
        if (!result) {
            res.status(404).send({
                message: 'not found'
            })
            return callback(new Error(), undefined)
        } else if (result.result) {
            result = result.result
        }

        if (result.ok === 1 && result.n === 0) {
            res.status(400).send({
                message: 'not found'
            })
            return callback(new Error(), undefined)
        }

        if (result.ok === 1 && result.nModified === 0) {
            res.status(200).send({
                message: 'nothing changed'
            })
            return callback(new Error(), undefined)
        }

        callback(undefined, undefined)
    },
    allow: function(req, res, allowed) {
        if (env.isDevelopment) {
            return
        }

        if (!req.session.admin || allowed.indexOf(req.session.admin.role) === -1) {
            return res.status(403).send({
                message: 'permission denied'
            })
        }
    },
}
