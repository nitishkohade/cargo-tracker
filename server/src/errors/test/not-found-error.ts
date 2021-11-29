import { expect } from "chai";
import { NotFoundError } from "../not-found-error";

describe("NotFounderror test", () => {
    it("should throw with status code 404 and error response in the format [{message}]", () => {
        const notFoundError = new NotFoundError()
        const errorResponse = notFoundError.serializeErrors()
        expect(notFoundError.statusCode).to.equal(404)
        expect(errorResponse[0].message).to.equal("Route not found")
    })
})