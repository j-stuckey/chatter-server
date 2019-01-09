'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const { TEST_DATABASE_URL } = require('../config');
const { dbConnect, dbDisconnect } = require('../db-mongoose');
// const {dbConnect, dbDisconnect} = require('../db-knex');

// Set NODE_ENV to `test` to disable http layer logs
// You can do this in the command line, but this is cross-platform
process.env.NODE_ENV = 'test';

// Clear the console before each run
process.stdout.write('\x1Bc\n');

const expect = chai.expect;
chai.use(chaiHttp);

before(function() {
    return dbConnect(TEST_DATABASE_URL);
});

after(function() {
    return dbDisconnect();
});

describe('Mocha and Chai', function() {
    it('should be properly setup', function() {
        expect(true).to.be.true;
    });
});

describe('Reality Check', function() {
    it('2 + 2 should be 4', () => {
        expect(2 + 2).to.equal(4);
    });

    it('true should be true', () => {
        expect(true).to.equal(true);
    });
});

describe('Environment', () => {
    it('NODE_ENV should be test', () => {
        expect(process.env.NODE_ENV).to.equal('test');
    });
});