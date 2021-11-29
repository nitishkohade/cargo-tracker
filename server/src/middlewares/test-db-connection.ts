import { NextFunction, Request, Response } from "express";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import logger from "../logger";
import db from '../models'

const sequelize = db.sequelize

export const testDBConnection = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    sequelize
        .authenticate()
        .then(() => {
            logger.log("info", "Database is up and running")
            return next()
        })
        .catch(err => {
            logger.log("info", "Database is down")
            return next(new DatabaseConnectionError())
        });
    
}