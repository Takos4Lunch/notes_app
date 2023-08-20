const authRouter = require('./auth.route')
const userRouter = require('./user.route');
const notesRouter = require('./notes.route');

function routerApi(app){
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/notes', notesRouter);
}

module.exports = routerApi;