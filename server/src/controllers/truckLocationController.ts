import * as express from 'express'
import logger from '../logger'
import models from '../models'

const {TruckLocation} = models

interface TruckLocation {
    truckId: number
    latitude: number
    longitude: number
}

interface CustomRequest<T> extends express.Request {
    body: T
}

// This is to create latest location of the truck based on the truckId
export const createTruckLocation = async (req: CustomRequest<TruckLocation>) => {

    const {truckId, latitude, longitude} = req.body

    logger.log("info", `truck location is received for truckId ${truckId}`)
    logger.log("info", {truckId, latitude, longitude})

    const truckResponse = await TruckLocation.create({
        truckId, latitude, longitude
    })

    logger.log("info", `latest location of truckId ${truckId} has been added`)

    return {
        status: 201,
        data: truckResponse
    }
}

interface TruckLocationProps {
    truckId: number
    lastNLocation: number
}

// This is to get the last n locations
export const getLastTruckNLocations = async (req: CustomRequest<TruckLocationProps>) => {

    const {truckId, lastNLocation} = req.query

    logger.log("info", `last ${lastNLocation} locations for truckId ${truckId}`)
    logger.log("info", {truckId, lastNLocation})

    const truckResponse = await TruckLocation.findAll({
        where: {
            truckId
        },
        limit: +lastNLocation,
        order: [ [ 'createdAt', 'DESC' ]]
      })

    logger.log("info", `last ${lastNLocation} locations of truckId ${truckId} has been retrieved`)

    return {
        status: 200,
        data: truckResponse
    }
}
