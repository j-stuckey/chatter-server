const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const passport = require('passport');
const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');

const app = express();

const { PORT, CLIENT_ORIGIN } = require('./config');

app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

app.use(
    morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
        skip: (req, res) => process.env.NODE_ENV === 'test'
    })
);

app.get('/', (req, res, next) => {
    res.send({ hello: 'world' });
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
