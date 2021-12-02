import { body } from "express-validator"
import { query } from 'express-validator/check'

const FUEL_TYPES = ['GAS', 'DIESEL', 'ELECTRIC']

const RULES = {
    "MODEL": {min: 1, max: 10},
    "YEAR": {min: 4, max: 4},
    "LICENSE": {min: 1, max: 10},
    "CUR_DIST_KM": {min: 0, max: 4},
    "MAX_LOAD_KG": {min: 1, max: 4}
}

const MESSAGES = {
    "FOR_STRING": "only string is allowed",
    "FOR_EMPTY": "Should not be empty",
    "FOR_NUMBER": "only number is allowed"
}

export const truckValidators = (() => [
        body('model')
            .isString().withMessage(MESSAGES.FOR_STRING)
            .notEmpty().withMessage(MESSAGES.FOR_EMPTY)
            .isLength(RULES.MODEL).withMessage("Max 10 char is allowed"),
        
        body('year')
            .isNumeric().withMessage(MESSAGES.FOR_NUMBER)
            .notEmpty().withMessage(MESSAGES.FOR_EMPTY)
            .isLength(RULES.YEAR).withMessage("Must have 4 characters"),
        
        body('licensePlate')
            .isString().withMessage(MESSAGES.FOR_STRING)
            .notEmpty().withMessage(MESSAGES.FOR_EMPTY)
            .isLength(RULES.LICENSE).withMessage("Max 10 char is allowed"),
        
        body('currentDistance_KM')
            .isNumeric().withMessage(MESSAGES.FOR_NUMBER)
            .notEmpty().withMessage(MESSAGES.FOR_EMPTY)
            .isLength(RULES.CUR_DIST_KM).withMessage("Max 4 char is allowed"),
        
        body('maxLoad_KG')
            .isNumeric().withMessage(MESSAGES.FOR_NUMBER)
            .notEmpty().withMessage(MESSAGES.FOR_EMPTY)
            .isLength(RULES.MAX_LOAD_KG).withMessage("Max 4 char is allowed"),
        
        body('fuelType')
            .isString().withMessage(MESSAGES.FOR_STRING)
            .notEmpty().withMessage(MESSAGES.FOR_EMPTY)
            .custom((val) => FUEL_TYPES.includes(val))
            .withMessage("Should be a GAS, DIESEL, ELECTRIC"),
    ]
)()

export const truckUpdateValidators = (() => [
    body('id')
        .isNumeric().withMessage(MESSAGES.FOR_NUMBER)
        .notEmpty().withMessage(MESSAGES.FOR_EMPTY),

    body('updatedItems')
        .isObject().withMessage("only object is allowed")
        .notEmpty().withMessage(MESSAGES.FOR_EMPTY)
        .custom((val) => !!Object.entries(val).length)
        .withMessage("Please add at least one {key, value} to update"),

    body('updatedItems.model')
        .optional()
        .isString().withMessage(MESSAGES.FOR_STRING)
        .notEmpty().withMessage(MESSAGES.FOR_EMPTY)
        .isLength(RULES.MODEL).withMessage("Max 10 char is allowed"),
    
    body('updatedItems.year')
        .optional()
        .isNumeric().withMessage(MESSAGES.FOR_NUMBER)
        .notEmpty().withMessage(MESSAGES.FOR_EMPTY)
        .isLength(RULES.YEAR).withMessage("Must have 4 characters"),

    body('updatedItems.licensePlate')
        .optional()
        .isString().withMessage(MESSAGES.FOR_STRING)
        .notEmpty().withMessage(MESSAGES.FOR_EMPTY)
        .isLength(RULES.LICENSE).withMessage("Max 10 char is allowed"),
    
    body('updatedItems.currentDistance_KM')
        .optional()
        .isNumeric().withMessage(MESSAGES.FOR_NUMBER)
        .notEmpty().withMessage(MESSAGES.FOR_EMPTY)
        .isLength(RULES.CUR_DIST_KM).withMessage("Max 4 char is allowed"),
    
    body('updatedItems.maxLoad_KG')
        .optional()
        .isNumeric().withMessage(MESSAGES.FOR_NUMBER)
        .notEmpty().withMessage(MESSAGES.FOR_EMPTY)
        .isLength(RULES.MAX_LOAD_KG).withMessage("Max 4 char is allowed"),
    
    body('updatedItems.fuelType')
        .optional()
        .isString().withMessage(MESSAGES.FOR_STRING)
        .notEmpty().withMessage(MESSAGES.FOR_EMPTY)
        .custom((val) => FUEL_TYPES.includes(val))
        .withMessage("Should be a GAS, DIESEL, ELECTRIC"),
    
]
)()

export const truckGetValidators = (() => [
    query('id')
        .isNumeric().withMessage(MESSAGES.FOR_NUMBER)
        .notEmpty().withMessage(MESSAGES.FOR_EMPTY),
])()