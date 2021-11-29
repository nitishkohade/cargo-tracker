import { CustomError } from "./custom-error";

export class TruckFoundError extends CustomError {
    statusCode = 403

    constructor() {
        super("The truck is already registered with the same license plate number.")
    }

    serializeErrors() {
        return [
            {
                message: this.message
            }
        ]
    }
}

export class TruckUpdateError extends CustomError {
    statusCode = 403
    
    constructor() {
        super("Error while updating the truck")
    }

    serializeErrors() {
        return [
            {
                message: this.message
            }
        ]
    }
}
