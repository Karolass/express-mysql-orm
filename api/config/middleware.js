const middleware = {
    'body-parser': [
        ['json'],
        ['urlencoded', { extended: false }],
    ],
    'cookie-parser': [],
    'cors': [[require('./cors')]],
}

module.exports = function(app) {

    for (const key in middleware) {
        const array = middleware[key]
        if (array.length == 0) {
            const module = require(key)
            app.use(module())
        } else {
            array.forEach(function(value) {
                let module = require(key)
                if (value.length == 1) {
                    if (typeof value[0] === 'object') {
                        module = module.apply(this, [value[0]])
                    } else {
                        module = module[value[0]]()
                    }
                } else {
                    const param = []
                    for (let i = 1; i < value.length; i++) {
                        param.push(value[i])
                    }
                    module = module[value[0]].apply(this, param)
                }
                app.use(module)
            })
        }
    }
}
