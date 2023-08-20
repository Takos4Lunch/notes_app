const express = require('express');
const app = express(); //App init
const sequelize = require('./libs/sequelize')
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const port = 3000;

app.use(express.json());

require('./utils/auth');

routerApi(app);

app.get('/', (req, res) => {
    res.send('Welcome');
})

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log('listening on port ' + port);
})

/**
 * TODO:
 * DB abstraction layer <- THIS ONE FIRST
 * - users
 * - notes
 * auth layer //Should be implemented after populating the DB with some data
 * * which implies we should implement the routing layer before all of this
 * Routes
 * Documentation
 * testing
 */