import * as express from 'express'
import truckRouter from './truck'
import truckLocationRouter from './truckLocation'

const router = express.Router()

router.use('/truck', truckRouter)
router.use('/truckLocation', truckLocationRouter)


export default router
