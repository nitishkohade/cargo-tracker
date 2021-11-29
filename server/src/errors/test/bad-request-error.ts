import { expect } from "chai";
import { BadRequestError } from "../bad-request-error";

describe("bad-request-error test", () => {
    it("should throw with status code 400 and error response in the format [{message}]", () => {
        const badRequest = new BadRequestError("this is a bad request")
        const errorResponse = badRequest.serializeErrors()
        expect(badRequest.statusCode).to.equal(400)
        expect(errorResponse[0].message).to.equal("this is a bad request")
    })
})