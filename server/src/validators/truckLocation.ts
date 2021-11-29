import { body } from "express-validator"
import { query } from 'express-validator/check'

const MESSAGES = {
    "FOR_EMPTY": "Should not be empty",
    "FOR_NUMBER": "only number is allowed"
}

export const TruckLocationValidators = (() => [
        body('truckId')
            .isNumeric().withMessage(MESSAGES.FOR_NUMBER)
            .notEmpty().withMessage(MESSAGES.FOR_EMPTY),
        
        body('latitude')
            .isNumeric().withMessage(MESSAGES.FOR_NUMBER)
            .notEmpty().withMessage(MESSAGES.FOR_EMPTY),
        
        body('longitude')
            .isNumeric().withMessage(MESSAGES.FOR_NUMBER)
            .notEmpty().withMessage(MESSAGES.FOR_EMPTY)
        
    ]
)()

export const GetTruckLocationsValidators = (() => [
    query('truckId')
        .isNumeric().withMessage(MESSAGES.FOR_NUMBER)
        .notEmpty().withMessage(MESSAGES.FOR_EMPTY),
    
    query('lastNLocation')
        .isNumeric().withMessage(MESSAGES.FOR_NUMBER)
        .notEmpty().withMessage(MESSAGES.FOR_EMPTY)
    
]
)()