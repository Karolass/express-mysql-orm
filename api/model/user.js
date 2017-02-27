const { Model, conn, Sequelize } = require('../config/model.js')

const User = Object.assign({
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING
    }
}, Model)

const options = {
    indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ]
}

module.exports = conn.define('User', User, options)
