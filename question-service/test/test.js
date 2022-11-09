process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import { app } from "../index.js";
import { expect } from 'chai';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe ('GET /api/question/getQues/:qid', () => {
    it('Should get a question given a qid', (done) => {
        request(app).get('/api/question/getQues/123')
            .send()
            .then((res) => {
                const body = res.body;
                res.should.have.status(200);
                expect(body).to.contain.property('qid');
                expect(body).to.contain.property('difficulty');
                expect(body).to.contain.property('question_title');
                expect(body).to.contain.property('question_text');
                expect(body).property('qid').to.equal(123);
                done();
            })
            .catch((err) => done(err));
    });
})

describe ('GET /api/question/getQuesForDifficulty/:difficulty', () => {
    it('Should get a question given a difficulty level', (done) => {
        request(app).get('/api/question/getQuesForDifficulty/1')
            .send()
            .then((res) => {
                const body = res.body[0];
                res.should.have.status(200);
                expect(body).to.contain.property('qid');
                expect(body).to.contain.property('difficulty');
                expect(body).to.contain.property('question_title');
                expect(body).to.contain.property('question_text');
                expect(body).property('difficulty').to.equal(1);
                done();
            })
            .catch((err) => {console.log(err);done(err)});
    });
})