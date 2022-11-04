import { createServer } from "http";
// import { io as Client } from "socket.io-client";
import { mongoclient } from "../editor.js";
import { app, setupIO } from '../app.js';
import chai from "chai";
import chaiHttp from 'chai-http';

const should = chai.should();
const have = chai.have;
const assert = chai.assert;

describe("API test", function() {
  chai.use(chaiHttp);
  const server = createServer(app);
  before(async function() {
    // await mongoclient.connect();
    await mongoclient.db("collabdb").collection("code").insertOne({ _id: "room1", code: "var x = 3;", language: "javascript"});
  });

  after(async function() {
    await mongoclient.db("collabdb").dropCollection("code");
    await mongoclient.close();
  })

  it("Get code for existing room", function(done) {
    chai.request(server)
        .post('/api/code')
        .send({roomId: "room1"})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("code").that.is.equal("var x = 3;");
            res.body.should.have.property("language").that.is.equal("javascript");
            done();
        });
  });

  it("Empty code for non-existing room", function(done) {
    chai.request(server)
        .post('/api/code')
        .send({roomId: "room2"})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("code").that.is.empty;
            res.body.should.have.property("language");
            done();
        });
  });
});