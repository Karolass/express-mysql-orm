const Sequelize = require('sequelize')
const orm = require('./env').orm

const db = process.env.NODE_ENV != 'test' ? orm.db : orm.db + '-Test'
const conn = new Sequelize(db, orm.user, orm.pass, {
    host: orm.host,
    port: orm.port,
    dialect: orm.type,

    pool: {
        max: 20,
        min: 0,
        idle: 20000
    }
})

const Model = {
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW() ON UPDATE NOW()')
    },
    isValid: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
}

module.exports = {
    conn: conn,
    Model: Model,
    Sequelize: Sequelize
}
