import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError{
    statusCode = 500;

    constructor() {
        super('Error connecting to the database');
    }

    serializeErrors() {
        return [
            {
                message: this.message
            }
        ]
    }

}
