'use strict';
require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/chatter',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'mongodb://localhost/chatter',
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY || '3d'
};
