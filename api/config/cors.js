module.exports = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: false,
    allowedHeaders: null,
    exposedHeaders: ['x-access-token'],
}
