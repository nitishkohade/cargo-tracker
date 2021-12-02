import { useEffect } from "react"
import { useHistory } from "react-router"
import Header from "../components/header/Header.component"
import UpdateTruckLocationOnMap from "../components/updateTruckLocationOnMap/UpdateTruckLocationMap.component"
import {getTruckInstance} from "../components/store/Truck"

const TruckLocation = () => {

    const history = useHistory()

    const truckInstance = getTruckInstance()
    const {licensePlate, id} = truckInstance?.getTruckData() || {}

    useEffect(() => {
        if(!id) {
            history.push("/truck/create")
        }
    }, [])

    return (
        <div className="truck-location-screen">
            <Header licensePlate={licensePlate}/>
            <UpdateTruckLocationOnMap />
        </div>
    )
}

export default TruckLocation
