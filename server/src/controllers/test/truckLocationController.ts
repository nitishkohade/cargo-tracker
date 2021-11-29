import server from '../../index'

const chai = require('chai')
const chaiHttp = require('chai-http')

chai.should()
chai.use(chaiHttp)

before(() => {
    it("Should be able to create a new truck with status code 201", (done) => {

    const newTruck = {
        "model": "truck1",
        "year": "2017",
        "licensePlate": "test1",
        "currentDistance_KM": "400",
        "maxLoad_KG": "3000",
        "fuelType": "GAS"
    }

    chai.request(server)
        .post("/api/truck/create")
        .send(newTruck)
        .end((err, response) => {
            done()
        })
    })
})

describe('truckController', () => {

    describe("Create truck api POST /api/truckLocation/create", () => {

        it("Should be able to create a new truck location with status code 201 for already registered truckId=1", (done) => {

            const truckLocation = {
                "truckId": "1", 
                "latitude": "34.50", 
                "longitude": "50.56"
            }

            chai.request(server)
                .post("/api/truckLocation/create")
                .send(truckLocation)
                .end((err, response) => {
                    response.should.have.status(201)
                    chai.expect(response.body[0].data.id).to.equal(1)
                    done()
                })
        })

        it("Should be able to create second truck location with status code 201 for already registered truckId=1", function(done) {
            this.timeout(6000);
            const truckLocation = {
                "truckId": "1", 
                "latitude": "50.50", 
                "longitude": "70.56"
            }
            setTimeout(() => {
                chai.request(server)
                .post("/api/truckLocation/create")
                .send(truckLocation)
                .end((err, response) => {
                    response.should.have.status(201)
                    chai.expect(response.body[0].data.id).to.equal(2)
                    done()
                })
            }, 5000)
            
        })

        it("Should not be able to create truck location if truck id is not available", (done) => {

            const truckLocation = {
                "truckId": "4",
                "latitude": "50.50",
                "longitude": "70.56"
            }

            const errorResponse = {
                message: 'Cannot add or update a child row: a foreign key constraint fails (`test`.`TruckLocations`, CONSTRAINT `TruckLocations_ibfk_1` FOREIGN KEY (`truckId`) REFERENCES `Trucks` (`id`) ON DELETE CASCADE)'
              }

            chai.request(server)
                .post("/api/truckLocation/create")
                .send(truckLocation)
                .end((err, response) => {
                    response.should.have.status(400)
                    chai.expect(response.body.errors[0]).to.deep.equal(errorResponse)
                    done()
                })
        })

        it("Should be able to throw validation error if truck id is empty", (done) => {

            const truckLocation = {
                "truckId": "",
                "latitude": "50.50",
                "longitude": "70.56"
            }

            const errorResponse = [
                { message: 'only number is allowed', field: 'truckId' },
                { message: 'Should not be empty', field: 'truckId' }
              ]

            chai.request(server)
                .post("/api/truckLocation/create")
                .send(truckLocation)
                .end((err, response) => {
                    console.log(response.body)
                    response.should.have.status(400)
                    chai.expect(response.body.errors).to.deep.equal(errorResponse)
                    done()
                })
        })
    })

    describe("Get truck api GET /api/truckLocation/getLastNLocations", () => {

        it("Should be able to get last 2 locations in descending order by createdAt date", function(done) {
            this.timeout(7000);
            setTimeout(() => {
                chai.request(server)
                .get("/api/truckLocation/getLastNLocations?truckId=1&&lastNLocation=5")
                .end((err, response) => {
                    console.log(response.body[0].data)
                    response.should.have.status(200)
                    chai.expect(response.body[0].data.length).to.equal(2)
                    chai.expect(response.body[0].data[0].id).to.equal(2)
                    chai.expect(response.body[0].data[1].id).to.equal(1)
                    done()
                })
            }, 6000)
           
        })

    })
})