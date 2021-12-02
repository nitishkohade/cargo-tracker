type TruckDataProps = {
    id: number
    licensePlate: string
    model: string
    year: number
    maxLoad_KG: number
    currentDistance_KM: number
    fuelType: 'GAS' | 'DIESEL' | 'ELECTRIC'
}

let truckData: TruckDataProps

let truckInstance: Truck | null = null;

class Truck {
    
    constructor(data: TruckDataProps) {
        truckData = data
    }

    getTruckData() {
        return Object.freeze(truckData);
    }
}

export const setTruckInstance = (data: TruckDataProps) => {
    if(truckInstance) {
        return
    }
    truckInstance = new Truck(data);
}

export const getTruckInstance = () => {
    return truckInstance
}
