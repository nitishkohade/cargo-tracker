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
            response.should.have.status(201)
            response.body.should.be.a('array')
            chai.expect(response.body[0].data.licensePlate).to.equal("test1")
            chai.expect(response.body[0].data.fuelType).to.equal("GAS")
            chai.expect(response.body[0].data.year).to.equal("2017")
            done()
        })
    })
})

describe('truckController', () => {

    describe("Create truck api POST /api/truck/create", () => {        

        it("Should not be able to create a new truck if the license plate is already registered", (done) => {
            
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
                response.should.have.status(403)
                chai.expect(response.body.errors[0].message).to.equal("The truck is already registered with the same license plate number.")
                done()
            })
        })

        it("Should not be able to create a new truck if the license plate is already registered", (done) => {
            
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
                response.should.have.status(403)
                chai.expect(response.body.errors[0].message).to.equal("The truck is already registered with the same license plate number.")
                done()
            })
        })

        it("Should throw validation error if fields are missing", (done) => {
            
            const newTruck = {
                "model": "truck1",
                "year": "2017",
                "licensePlate": "test1"
            }

            const errorResponse = [
                {
                    "field": "currentDistance_KM",
                    "message": "only number is allowed"
                },
                {
                    "field": "currentDistance_KM",
                    "message": "Should not be empty"
                },
                {
                    "field": "maxLoad_KG",
                    "message": "only number is allowed"
                },
                {
                    "field": "maxLoad_KG",
                    "message": "Should not be empty"
                },
                {
                    "field": "maxLoad_KG",
                    "message": "Max 4 char is allowed"
                },
                {
                    "field": "fuelType",
                    "message": "only string is allowed"
                },
                {
                    "field": "fuelType",
                    "message": "Should not be empty"
                },
                {
                    "field": "fuelType",
                    "message": "Should be a GAS, DIESEL, ELECTRIC"
                }
            ]

            chai.request(server)
            .post("/api/truck/create")
            .send(newTruck)
            .end((err, response) => {
                console.log(response.body)
                response.should.have.status(400)
                chai.expect(response.body.errors).to.deep.equal(errorResponse)
                done()
            })
        })

        it("Should throw validation error if fields are missing", (done) => {
            
            const newTruck = {
                "model": "truck1",
                "year": "ddd",
                "licensePlate": "test1",
                "currentDistance_KM": "400",
                "maxLoad_KG": "3000",
                "fuelType": "GAS"
            }

            const errorResponse = [
               {
                "field": "year",
                "message": "only number is allowed"
              },
              {
                "field": "year",
                "message": "Must have 4 characters"
              }
            ]

            chai.request(server)
            .post("/api/truck/create")
            .send(newTruck)
            .end((err, response) => {
                console.log(response.body)
                response.should.have.status(400)
                chai.expect(response.body.errors).to.deep.equal(errorResponse)
                done()
            })
        })
    })

    describe("Update truck api PATCH /api/truck/update", () => {

        it("it should be able to update the registered truck", (done) => {
            
            const updateTruck = {
                id: 1,
                updatedItems: {
                    "year": "2018"
                }
            }

            chai.request(server)
            .patch("/api/truck/update")
            .send(updateTruck)
            .end((err, response) => {
                response.should.have.status(200)
                chai.expect(response.body[0].data[0]).to.equal(1)
                done()
            })
        })

        it("The updated value is the same in which case it will return 0", (done) => {
            
            const updateTruck = {
                id: 1,
                updatedItems: {
                    "year": "2018"
                }
            }

            chai.request(server)
            .patch("/api/truck/update")
            .send(updateTruck)
            .end((err, response) => {
                response.should.have.status(200)
                chai.expect(response.body[0].data[0]).to.equal(0)
                done()
            })
        })

        it("Should throw validation error if year is empty", (done) => {
            
            const updateTruck = {
                id: 1,
                updatedItems: {
                    "year": ""
                }
            }

            const errorResponse = [
                { message: 'only number is allowed', field: 'updatedItems.year' },
                { message: 'Should not be empty', field: 'updatedItems.year' },
                { message: 'Must have 4 characters', field: 'updatedItems.year' }
              ]

            chai.request(server)
            .patch("/api/truck/update")
            .send(updateTruck)
            .end((err, response) => {
                console.log(response.body)
                response.should.have.status(400)
                chai.expect(response.body.errors).to.deep.equal(errorResponse)
                done()
            })
        })
    })

    describe("getById truck api GET /api/truck/getById", () => {

        it("Should be able to get the registered truck having id 1", (done) => {

            const truckData = {
                id: 1,
                model: 'truck1',
                year: 2018,
                licensePlate: 'test1',
                currentDistance_KM: 400,
                maxLoad_KG: 3000,
                fuelType: 'GAS',
                createdAt: '2021-11-29T16:20:11.000Z',
                updatedAt: '2021-11-29T16:20:11.000Z',
                TruckLocations: []
            }
            
            chai.request(server)
            .get("/api/truck/getById?id=1")
            .end((err, response) => {
                response.should.have.status(200)
                chai.expect(response.body[0].data.model).to.equal("truck1")
                chai.expect(response.body[0].data.year).to.equal(2018)
                chai.expect(response.body[0].data.fuelType).to.equal("GAS")
                chai.expect(response.body[0].data.currentDistance_KM).to.equal(400)
                done()
            })
        })

    })
})