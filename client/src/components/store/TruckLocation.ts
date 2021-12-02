
let truckLocationsData: TruckLocationsProps[] = []

let truckLocationsInstance: TruckLocations | null = null;

class TruckLocations {
    constructor() {}

    setTruckLocationData(data: TruckLocationsProps) {
        truckLocationsData.push(data)
    }

    setNTruckLocations(data: TruckLocationsProps[]) {
        truckLocationsData = data
    }

    getTruckLocationData() {
        return JSON.parse(JSON.stringify(truckLocationsData));
    }
}

export const setTruckLocationsInstance = () => {
    if(truckLocationsInstance) {
        return 
    }
    truckLocationsInstance = new TruckLocations();
}

export const getTruckLocationsInstance = () => {
    return truckLocationsInstance
}
