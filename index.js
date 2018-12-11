const express = require('express');
const morgan = require('morgan');
const app = express();

const { PORT } = require('./config');

var visits = 0;

app.use(morgan('dev'));

app.get('/', (req, res, next) => {
    console.log('blah');
    res.send('Hello world!').status(200);
});

function runServer(port = PORT) {
    const server = app
        .listen(port, () => {
            console.info(`App listening on port ${server.address().port}`);
            console.info(`App listening on port ${server.address().port}`);
        })
        .on('error', err => {
            console.error('Express failed to start');
            console.error(err);
        });
}

runServer();
