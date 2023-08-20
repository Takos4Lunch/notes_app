const authRouter = require('./auth.route')

function routerApi(app){
    app.use('/auth', authRouter);
}

module.exports = routerApi;