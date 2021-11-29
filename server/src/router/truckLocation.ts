import * as express from 'express'
import {createTruckLocation, getLastTruckNLocations} from '../controllers/truckLocationController';
import { validateRequest } from '../middlewares/validate-request';
import { ClientResponse } from '../response/clientResponse';
import { GetTruckLocationsValidators, TruckLocationValidators } from '../validators/truckLocation';

const router = express.Router()

const truckLocationQuery = new ClientResponse(createTruckLocation)

const getTruckLocationQuery = new ClientResponse(getLastTruckNLocations)

router.post('/create', [ ...TruckLocationValidators, validateRequest ],  
    (req, res, next) => truckLocationQuery.exec(req, res, next)
)

router.get('/getLastNLocations', [ ...GetTruckLocationsValidators, validateRequest ],  
    (req, res, next) => getTruckLocationQuery.exec(req, res, next)
)

export default router
