import { useState } from "react"
import { useHistory } from "react-router";
import { getTruckByID } from "../../services/getTruck.service"
import { setTruckInstance } from "../store/Truck";
import { setTruckLocationsInstance } from "../store/TruckLocation";
import "./GetTruckForm.style.css"

const GetTruckForm = () => {

    const history = useHistory();
    const [input, setInput] = useState("")
    const [error, setError] = useState<null | string>(null);

    const onChange = ({target: {value}}: {target: {value: string}}) => {
        setInput(value)
    }

    const setErrorMessage = (data: null | {field: string, message: string}[]) => {
        if(data) {
            setError("Only number is allowed.")
        } else {
            setError("Truck ID is incorrect.")
        }
    }

    const onSubmit = async (event: any) => {
        event.preventDefault()
        try{
            const {data, status} = await getTruckByID(+input)
            if(status === 200 && data[0].data) {
                const {licensePlate, id, model, year, maxLoad_KG, currentDistance_KM, fuelType} = data[0].data
                setTruckInstance({licensePlate, id, model, year, maxLoad_KG, currentDistance_KM, fuelType})
                setTruckLocationsInstance()
                history.push("/truck/location")
            } else if(status === 200 && !data[0].data) {
                setErrorMessage(null)
            } else {
                setErrorMessage(data.errors)
            }
         } catch(err) {}
    }

    return (
        <form onSubmit={onSubmit} className="get-truck-form">
            <label>Please input your Truck ID If you know.</label>
            <input 
                type="number" 
                min={1} 
                onChange={onChange} 
                value={input} 
                required
                placeholder="Truck ID"
            />
            {error ? <div className="error-label">
                    {error}
            </div> : '' }
            <button type="submit">Submit</button>
        </form>
    )
}

export default GetTruckForm
