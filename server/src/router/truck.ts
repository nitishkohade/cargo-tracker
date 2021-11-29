import * as express from 'express'
import {createTruck, updateTruck, getTruckInfo} from '../controllers/truckController';
import { validateRequest } from '../middlewares/validate-request';
import { ClientResponse } from '../response/clientResponse';
import { truckValidators, truckUpdateValidators, truckGetValidators } from '../validators/truck';

const router = express.Router()

const truckCreateQuery = new ClientResponse(createTruck)
const truckUpdateQuery = new ClientResponse(updateTruck)
const truckgetQuery = new ClientResponse(getTruckInfo)


router.post('/create', [ ...truckValidators, validateRequest ],  
    (req, res, next) => truckCreateQuery.exec(req, res, next)
)

router.patch('/update', [ ...truckUpdateValidators, validateRequest ],  
    (req, res, next) => truckUpdateQuery.exec(req, res, next)
)

router.get('/getById', [ ...truckGetValidators, validateRequest ],  
    (req, res, next) => truckgetQuery.exec(req, res, next)
)

export default router
