const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const passport = require('passport');
const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');

const app = express();

const { PORT, CLIENT_ORIGIN } = require('./config');

var visits = 0;
app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

app.use(morgan('dev'));

app.get('/', (req, res, next) => {
    res.send({ hello: 'world' });
});

app.get('/get', (req, res, next) => {
    res.send({
        testKey: 'test value'
    });
});

function runServer(port = PORT) {
    const server = app
        .listen(port, () => {
            console.info(`App listening on port ${server.address().port}`);
        })
        .on('error', err => {
            console.error('Express failed to start');
            console.error(err);
        });
}

runServer();
