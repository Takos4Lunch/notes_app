const authRouter = require('./auth.route')
const userRouter = require('./user.route');

function routerApi(app){
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
}

module.exports = routerApi;