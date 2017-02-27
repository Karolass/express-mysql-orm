module.exports = {
    offSetAndLimit: function(req, res, next) {
        if (req.query.offset) {
            req.query.skip = parseInt(req.query.offset || 0)
        } else {
            req.query.skip = parseInt(req.query.skip || 0)
        }
        req.query.limit = parseInt(req.query.limit || 30)
        next()
    },
    removeInput: function(req, res, next) {
        delete req.body.updatedAt
        delete req.body.createdAt
        delete req.body.id
        next()
    },
    appAuthHeader: function(req, res, next) {
        if (!req.headers['clientkey'] || !req.headers['apikey']) {
            return res.status(403).send({
                message: 'App auth headers is required'
            })
        }
        next()
    }
}
