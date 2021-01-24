let chai = require('chai');
let chaiHttp = require('chai-http');
var expect  = require("chai").expect;
const assert = require("chai").assert;
var request = require("request");
const app = require('../app');

let server = 'http://localhost:5000';

chai.use(chaiHttp);
let should = chai.should();

it('Backend connection', function(done) {
    request(server , function(error, response, body) {
        expect(body).to.equal('Hello, World!');
        done();
    });
});

describe('Database Connection', function() {
    it('get workouts', (done) => {
        chai.request(server)
            .get('/workouts')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('get users', (done) => {
        chai.request(server)
            .get('/users/getUsers')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

})
