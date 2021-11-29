import { NextFunction, Request, Response } from "express"

// Symbols are used for private variables
const funcSymbol = Symbol('func')

// This is the client response class whose main responsibility is to execute(exec) the controllers and get the 
// response or error and pass it to the client
// It can be reused by almost any controllers because they share the same functionality
// Here we can add more features without touching the controllers frequently
// we can look at the properties in req like format of the response, be it json, csv, xls
export class ClientResponse{

    constructor(func) {
        this[funcSymbol] = func
    }

    async exec(req: Request, res: Response, next: NextFunction) {

        try{
            const {status, data} = await this[funcSymbol](req)

            return res.status(status).send([
                {
                    status,
                    data
                }
            ])
               
        } catch(err) {
            next(err)
        }
    }
} 