import * as express from 'express'
import {TruckFoundError, TruckUpdateError} from '../errors/truck-error'
import logger from '../logger'

import models from '../models'

const {Truck, TruckLocation} = models

interface TruckBody {
    model: string
    year: number
    licensePlate: string
    currentDistance_KM: number 
    maxLoad_KG: number
    fuelType: string
}

interface CustomRequest<T> extends express.Request {
    body: T
}

export const createTruck = async (req: CustomRequest<TruckBody>) => {

    const {model, year, licensePlate, currentDistance_KM, maxLoad_KG, fuelType} = req.body

    logger.log("info", "truck is being created")
    logger.log("info", {model, year, licensePlate, currentDistance_KM, maxLoad_KG, fuelType})

    const truckResponse = await Truck.findOne({
        where: {
            licensePlate
        }
    })

    if(!!truckResponse) {
        throw new TruckFoundError()
    }

    const {dataValues} = await Truck.create({model, year, licensePlate, currentDistance_KM, maxLoad_KG, fuelType})

    logger.log("info", "A new truck has been created")

    return {
        status: 201,
        data: dataValues
    }
        
}


interface UpdatedTruckProps {
    updatedItems: {
        model?: string
        year?: number
        licensePlate?: string
        currentDistance_KM?: number 
        maxLoad_KG?: number
        fuelType?: string
    }
    id: number
}

export const updateTruck = async (req: CustomRequest<UpdatedTruckProps>) => {
    
    const {updatedItems, id} = req.body

    logger.log("info", "truck is being updated")
    logger.log("info", {updatedItems, id})

    const truckResponse = await Truck.update(
        {...updatedItems},
        {
            where: {
                id
            },
            silent: true
        }
    )

    logger.log("info", truckResponse[0] ? "truck data has been updated" : "truck did not update")

    return {
        status: 200,
        data: truckResponse
    }
}


export const getTruckInfo = async (req: CustomRequest<{id: number}>) => {
    
    const {id} = req.query

    logger.log("info", `get truck info alongwith its locations for truckId ${id}`)
    logger.log("info", {id})

    const truckResponse = await Truck.findOne({
        where: {
            id
        },
        include: [
            {
                model: TruckLocation,
                limit: 5,
                order: [ [ 'createdAt', 'DESC' ]]
            }
        ],
        
      })

    logger.log("info", "truck info has been received")

    return {
        status: 200,
        data: truckResponse
    }
}