import {ValidationError} from 'express-validator'
import { CustomError } from './custom-error';


export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(private errors: ValidationError[]) {
        super('validation error.');
    }

    serializeErrors() {
        return this.errors.map(err => {
            return {message: err.msg, field: err.param}
        })
    }

}
