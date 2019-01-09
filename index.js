const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const passport = require('passport');
const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');

// Configures pasport to use the Strategies
passport.use(localStrategy);
passport.use(jwtStrategy);

// Parsing request body
app.use(express.json());

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

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

// Custom 404 Not Found route handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Custom Error Handler
app.use((err, req, res, next) => {
    if (err.status) {
        const errBody = Object.assign({}, err, { message: err.message });
        res.status(err.status).json(errBody);
    } else {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
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

if (require.main === module) {
    dbConnect();
    runServer();
}

module.exports = { app };
