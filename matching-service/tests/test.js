import { createServer } from "http";
// import { io as Client } from "socket.io-client";
import db from "../db.js";
import { app } from '../app.js';
import chai from "chai";
import chaiHttp from 'chai-http';

const should = chai.should();
const have = chai.have;
chai.use(chaiHttp);
const server = createServer(app);

describe("API test", function() {
  this.timeout(10000);
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

// describe("Matching test", () => {
//   let io, clientSocket;
//   before((done) => {
//     const httpServer = createServer(app);
//     io = setupIO(httpServer);
//     httpServer.listen(() => {
//       const port = httpServer.address().port;
//       clientSocket = new Client(`http://localhost:${port}`);
//       clientSocket.on("connect", done);
//     });
//   });

//   after(() => {
//     io.close();
//     clientSocket.close();
//   })

//   it("Match success when user found match", function(done) {
//     // this.timeout(30000);
//     clientSocket.on("match:success", (data) => {
//       data.should.have.property("roomId");
//       data.should.have.property("questionId");
//       done();
//     });
//     db.PendingMatch.create({ userId: "user1", socketId: "randomid", diffInt: 1 }).then(() => {
//       clientSocket.emit("match:find", {userId: "user2", difficulty: "easy"});
//     });
//   });
// });
