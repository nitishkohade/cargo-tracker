interface createTruckProps {
    model: string
    year: number
    licensePlate: string
    currentDistance_KM: number
    maxLoad_KG: number
    fuelType: 'GAS' | 'DIESEL' | 'ELECTRIC'
}

interface TruckLocationsProps {
    latitude: number
    longitude: number
    createdAt?: Date
}

interface createTruckLocationProps extends TruckLocationsProps{
    truckId: number | undefined
}

interface mapProps {
    latitude: number
    longitude: number
    createdAt?: Date
}

interface mapMetaDataProps extends mapProps {
    createdAt: Date
}
