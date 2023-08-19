const express = require('express');
const app = express(); //App init

const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome');
})

app.listen(port, () => {
    console.log('listening on port ' + port);
})

/**
 * TODO:
 * auth layer
 * DB abstraction layer
 * Routes
 * Documentation
 * testing
 */