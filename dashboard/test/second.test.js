let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

describe("Testing Routes",() => {
    it("testing Users",(done) => {
        chai.request(`http://localhost:9900`)
        .get('/users')
        .then((res) => {
            expect(res).to.have.status(200);
            done();
        })
        .catch((err) => {
            throw err
        })
    })
    it("testing Users",(done) => {
        chai.request(`http://localhost:9900`)
        .get('/user')
        .then((res) => {
            expect(res).to.have.status(404);
            done();
        })
        .catch((err) => {
            throw err
        })
    })
    it("testing Users",(done) => {
        chai.request(`http://localhost:9900`)
        .post('/addUser')
        .send({"name":"TestUser","city":"test","phone":"test","role":"test"})
        .then((res) => {
            expect(res).to.have.status(200);
            done();
        })
        .catch((err) => {
            throw err
        })
    })
})