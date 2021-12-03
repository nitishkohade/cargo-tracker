import { useRef, useState } from "react"
import { createTruckLocation } from "../../services/createTruckLocation"
import { getTruckInstance } from "../store/Truck"
import CustomMap from "../customMap/CustomMap.component"
import "./UpdateTruckLocationMap.style.css"
import { getTruckLocationsInstance } from "../store/TruckLocation"
import { getLastNLocations } from "../../services/getLastNLocations"


const UpdateTruckLocationOnMap = () => {

    const truckInstance = getTruckInstance()
    const truckLocationsInstance = getTruckLocationsInstance()

    const {id} = truckInstance?.getTruckData() || {}
    const [truckLocations, setTruckLocations] = useState<TruckLocationsProps[]>([])

    const nTruckLocations = useRef(5)

    // This is a dummy function that sets dummy locations but actually it should update the location
    // as the user will move
    const getLatestLocation = () => {
        let locationObj = {latitude: 28.6139, longitude: 77.2090}
        const len = truckLocations.length
        if(len) {
            let lastValue = truckLocations[len - 1]
            locationObj.longitude = lastValue.longitude + 0.001
        }
        return locationObj
    }

    const onUpdateLocation = async () => {
        try{
            const locationObj = getLatestLocation()
            const {data, status} = await createTruckLocation({
                truckId: id, 
                latitude: locationObj.latitude,
                longitude: locationObj.longitude
            })
            
            if(status === 201) {
                const {createdAt} = data[0].data
                truckLocationsInstance?.setTruckLocationData({...locationObj, createdAt})
                const getLocations = truckLocationsInstance?.getTruckLocationData().slice(-nTruckLocations.current)
                setTruckLocations(getLocations)
            } else {
            }
         } catch(err) {}
    }

    const onSelect = async ({target: {value}}: {target: {value: string}}) => {
        try{
            nTruckLocations.current = +value
            const {data, status} = await getLastNLocations({truckId: +id!, lastNLocation: +value})
            if(status === 200) {
                const truckLocs = data[0].data
                const len = truckLocs.length
                const arr = []
                for(let i=len-1; i>=0;i--) {
                    const {latitude, longitude, createdAt} = truckLocs[i]
                    arr.push({latitude, longitude, createdAt})
                }
                truckLocationsInstance?.setNTruckLocations(arr)
                setTruckLocations(arr)
            }
        } catch(err){}
    }

    return (
        <div className="truck-location-map">
            <div className="map-input-fields">
                <button onClick={onUpdateLocation}>Update Location</button>
                <div className="last-n-location">
                    <label>Your Last Locations</label>
                    <select onChange={onSelect}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                    </select>
                </div>
            </div>
            <div className="map-area">
            {
                truckLocations.length ? 
                <CustomMap
                    truckLocations={truckLocations}
                /> :
                'Please Click Update Location'
            }
            </div>
        </div>
    )
}

export default UpdateTruckLocationOnMap
