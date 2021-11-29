const chai = require('chai')
const chaiHttp = require('chai-http')
import server from '../index'

chai.should()
chai.use(chaiHttp)

describe('server index file', () => {

    describe("GET /random", () => {
        it("it should throw 404 status code for undefined routes", (done) => {
            chai.request(server)
                .get("/random-url")
                .end((err, response) => {
                    response.should.have.status(404)
                    response.body.should.be.a('object')
                    chai.expect(response.body.errors[0].message).to.equal("Route not found")
                    done()
                })
        })
    })
})
