import { expect } from "chai";
import { TruckFoundError, TruckUpdateError } from "../truck-error";

describe("truck error test", () => {
    it("While registering a truck, truck found should throw with status code 403 and error response in the format [{message}]", () => {
        const truckFoundError = new TruckFoundError()
        const errorResponse = truckFoundError.serializeErrors()
        expect(truckFoundError.statusCode).to.equal(403)
        expect(errorResponse[0].message).to.equal("The truck is already registered with the same license plate number.")
    })

    it("While updating a truck, truck update should throw with status code 403 and error response in the format [{message}]", () => {
        const truckUpdateError = new TruckUpdateError()
        const errorResponse = truckUpdateError.serializeErrors()
        expect(truckUpdateError.statusCode).to.equal(403)
        expect(errorResponse[0].message).to.equal("Error while updating the truck")
    })
})