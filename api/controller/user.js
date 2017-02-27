const User = require('../model/user.js')
const helper = require('../helper/helper.js')

module.exports = {
    find: async (req, res) => {
        try {
            const result = await User.findAll()

            return res.send(result)
        } catch (err) {
            return helper.err(err, res)
        }

    },
    findOne: async (req, res) => {
        try {
            const result = await User.findOne({ where : { id: req.params.userId }})

            return res.send(result)
        } catch (err) {
            return helper.err(err, res)
        }

    },
    create: async (req, res) => {
        try {
            let result = await User.create({
                email: req.body.email,
                name: req.body.name
            })
            result = await User.findOne({ where : { id: result.id }})

            return res.send(result)
        } catch (err) {
            return helper.err(err, res)
        }
    },
    update: async (req, res) => {
        try {
            let result = await User.update({
                email: req.body.email,
                name: req.body.name
            }, { where : { id: req.params.userId }})
            result = await User.findOne({ where : { id: req.params.userId }})

            return res.send(result)
        } catch (err) {
            return helper.err(err, res)
        }
    },
    delete: async (req, res) => {
        try {
            const result = await User.destroy({ where : { id: req.params.userId }})

            if (result) {
                return res.send({ message: `delete userId:${req.params.userId} success` })
            } else {
                return res.send({ message: `userId:${req.params.userId} is not exists` })
            }
        } catch (err) {
            return helper.err(err, res)
        }
    }
}
