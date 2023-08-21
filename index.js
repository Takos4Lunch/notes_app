const express = require('express');
const app = express(); //App init
const sequelize = require('./libs/sequelize')
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

//Documentation
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Notes API',
    version: '1.0.0',
    description: 'This is a REST API that allows user to register and manage personal notes',
    license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
    },
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
//Documentation

const port = 3000;

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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