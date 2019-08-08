var chai = require("chai"),
    expect = chai.expect,
    should = chai.should(),
    supertest = require("supertest");
    server = require('../server')

var request = supertest.agent(server.listen());

describe("Employee API Test Suite", function() {
    // calling home page api
    it("should return home page", function(done) {
        request.get("/")
            .expect(200)
            //.expect("content-type", /json/)
            .end(function(err, res) {
                console.log(res.body)
                //res.status.should.be.equal(200);
                //res.info.should.be.false;
                //res.charset.should.be.equal("utf-8")
                //res.body.should.have.property("message").to.be.equal("Hello World")
                //JSON.parse(res.text).should.have.property("message").to.be.equal("Hello World")
                done()
            })
    })

    it("should get the employee list ", function(done) {
        request.get("/employee")
            .expect(200)
            .expect("content-type", /json/)
            .end(function(err, res) {
                console.log(res.body)
                Array.isArray(res.body).should.be.true;
                res.body.length.should.be.a("number");
                res.body.forEach(function(item) {
                    item.should.have.property("_id");
                    item.should.have.property("name");
                    item.should.have.property("email");
                    item.should.have.property("email").to.contain("@")
                    item.should.have.property("email").to.contain(".com")
                })
                done()
            })
    })

    it.skip("should add employee to the database", function(done) {
        var obj = {
            name: "koijam",
            email: "test@gmail.com"
        }

        request.post("/employee")
            .send(obj)
            .expect(200)
            .expect("content-type", /json/)
            .end(function(err, res) {
                res.status.should.be.equal(200);
                console.log(res.body)
                done()
            })
    })

    it.skip("should edit the employee", function(done) {
        var obj = {
            _id: "584bd99a4374cf9921ef2d8c",
            name: "John Doe",
            email: "john@gmail.com"
        }

        server.put("/employee/" + obj._id)
            .send(obj)
            .expect(200)
            .expect("content-type", /json/)
            .end(function(err, res) {
                console.log(res.body)
                done()
            })
    })

    it.skip("should delete the employee", function(done) {
        var employeeId = "584be808fab83eac683bd30c";

        server.delete("/employee/" + employeeId)
            .expect(200)
            .expect("content-type", /json/)
            .end(function(err, res) {
                console.log(res)
                done()
            })
    })
    
})

// after(function (done) {
//     done();
//     process.exit(1);
// });