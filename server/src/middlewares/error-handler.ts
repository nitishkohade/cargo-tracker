import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";
import logger from "../logger";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next?: NextFunction
) => {
    if(err instanceof CustomError) {
        logger.log('info', err.message);
        return res.status(err.statusCode).send(
            {
                errors: err.serializeErrors()
            }
        )
    }

    const message = err.message ?? "Something went wrong"
    logger.log('info', message);
    
    return res.status(400).send({
        errors: [
            {
                message
            }
        ]
    })
}