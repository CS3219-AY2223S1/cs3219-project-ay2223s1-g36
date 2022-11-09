import { createServer } from "http";
import { io as Client } from "socket.io-client";
import db from "../db.js";
import { app, setupIO } from '../app.js';
import chai from "chai";
import chaiHttp from 'chai-http';

const should = chai.should();
const have = chai.have;
const assert = chai.assert;

describe("API test", function() {
  chai.use(chaiHttp);
  const server = createServer(app);
  before((done) => {
    db.Match.create({ 
        roomId: "7290b605-a967-4feb-8eaa-bfae89a48e63",
        questionId: 123,
        user1Id: "someuuid",
        user2Id: "someuuid2",
        difficulty: "easy",
        ongoing: false
    }).then(() => {
        done();
    })
  });

  after((done) => {
    db.Match.destroy({
      where: {},
      truncate: true
    }).then(() => {
      done();
    })
  })

  it("Get all matches", function(done) {
    chai.request(server)
        .get('/api/match/get/all')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("matches").that.is.a('array');
            res.body.should.have.property("matches").that.have.lengthOf(1);
            done();
        });
  });
  it("Get existing user", function(done) {
    chai.request(server)
        .post('/api/match/get/user')
        .send({userId: "someuuid"})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("matches").that.is.a('array');
            res.body.should.have.property("matches").that.have.lengthOf(1);
            done();
        });
  });
  it("Get non-exist user", function(done) {
    chai.request(server)
        .post('/api/match/get/user')
        .send({userId: "wrongid"})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("matches").that.is.a('array');
            res.body.should.have.property("matches").that.have.lengthOf(0);
            done();
        });
  });
  it("Get existing room", function(done) {
    chai.request(server)
        .post('/api/match/get/room')
        .send({roomId: "7290b605-a967-4feb-8eaa-bfae89a48e63"})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("matches").that.is.a('array');
            res.body.should.have.property("matches").that.have.lengthOf(1);
            done();
        });
  });
});

describe("Matching test", () => {
  let io, clientSocket;
  before((done) => {
    const httpServer = createServer(app);
    io = setupIO(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      clientSocket.on("connect", done);
    });
  });

  after(() => {
    io.close();
    clientSocket.close();
  })

  it("Return ongoing match if exists", function(done) {
    clientSocket.on("match:exists", (data) => {
      data.should.have.property("roomId").that.is.equal("7290b605-a967-4feb-8eaa-bfae89a48e63");
      data.should.have.property("questionId").that.is.equal(123);
      done();
    });

    db.Match.create({ 
      roomId: "7290b605-a967-4feb-8eaa-bfae89a48e63",
      questionId: 123,
      user1Id: "someuuid",
      user2Id: "someuuid2",
      difficulty: "easy",
      ongoing: true
    }).then(() => {
      clientSocket.emit("match:find", {userId: "someuuid", difficulty: "medium"});
    });
    
  });
});
