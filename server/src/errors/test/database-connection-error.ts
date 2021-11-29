import { expect } from "chai";
import { DatabaseConnectionError } from "../database-connection-error";

describe("database connection error test", () => {
    it("should throw with status code 500 and error response in the format [{message}]", () => {
        const dbError = new DatabaseConnectionError()
        const errorResponse = dbError.serializeErrors()
        expect(dbError.statusCode).to.equal(500)
        expect(errorResponse[0].message).to.equal("Error connecting to the database")
    })
})