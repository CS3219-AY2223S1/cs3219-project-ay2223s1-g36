process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import { app } from "../index.js";
import { expect } from 'chai';

// Configure chai
chai.use(chaiHttp);
chai.should();

let token; // To store the token which will be used for authentication later on

describe ('POST /api/user/register', () => {
    it('Should create a new user', (done) => {
        request(app).post('/api/user/register')
            .send({ username: "JOCHKWYB", password:"ILoveCS3219"})
            .then((res) => {
                const body = res.body;
                res.should.have.status(201);
                expect(body).to.contain.property('message');
                done();
            })
            .catch((err) => done(err));
    });
    it('Should fail because same username exist', (done) => {
        request(app).post('/api/user/register')
            .send({ username: "JOCHKWYB", password:"ILoveCS3219" })
            .then((res) => {
                const body = res.body;
                res.should.have.status(409);
                expect(body).to.contain.property('message');
                done();
            })
            .catch((err) => done(err));
    })
})


describe ('POST /api/user/login', () => {
    it('Should login the user', (done) => {
        request(app).post('/api/user/login')
            .send({ username: "JOCHKWYB", password:"ILoveCS3219" })
            .then((res) => {
                const body = res.body;
                res.should.have.status(200);
                expect(body).to.contain.property('message');
                expect(body).to.contain.property('username');
                expect(body).to.contain.property('token');
                token = body.token;
                done();
            })
            .catch((err) => done(err));
    });
    it('Should deny the login because user have logged in', (done) => {
        request(app).post('/api/user/login')
            .send({ username: "JOCHKWYB", password:"ILoveCS3219", token:token })
            .then((res) => {
                const body = res.body;
                res.should.have.status(400);
                expect(body).to.contain.property('message');
                expect(body).property('message').to.include('User is already logged in!');
                done();
            })
            .catch((err) => done(err));
    })
})

describe ('POST /api/user/auth', () => {
    it('Should authenticate the user', (done) => {
        request(app).post('/api/user/auth')
            .send({ token: token })
            .then((res) => {
                const body = res.body;
                res.should.have.status(200);
                done();
            })
            .catch((err) => done(err));
    });
})

describe ('POST /api/user/updatePassword', () => {
    it('Should update the user password', (done) => {
        request(app).post('/api/user/updatePassword')
            .send({ username: "JOCHKWYB", newPassword: "IRlyLoveCS3219", token: token })
            .then((res) => {
                const body = res.body;
                res.should.have.status(200);
                expect(body).to.contain.property('message');
                expect(body).property('message').to.include('Password updated successfully!');
                done();
            })
            .catch((err) => done(err));
    });
})

describe ('POST /api/user/deleteUser', () => {
    it('Should delete the user account', (done) => {
        request(app).post('/api/user/deleteAccount')
            .send({ username: "JOCHKWYB", token: token })
            .then((res) => {
                const body = res.body;
                res.should.have.status(200);
                expect(body).to.contain.property('message');
                expect(body).property('message').to.include('Account deleted successfully!');
                done();
            })
            .catch((err) => done(err));
    });
})