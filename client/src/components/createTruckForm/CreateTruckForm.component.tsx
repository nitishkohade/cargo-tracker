import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { createTruck } from "../../services/createTruck.service";
import {setTruckInstance} from "../store/Truck";
import { setTruckLocationsInstance } from "../store/TruckLocation";
import './CreateTruckForm.style.css'

type errorProps = {[key: string]:string[]}

type errorStateProps =  errorProps

const CreateTruckForm = () => {

    const history = useHistory();
    const { register, handleSubmit } = useForm();
    const [errors, setErrors] = useState<errorStateProps>({});

    const inputFields = [
        {key: "model", placeholder: "Model", type: "text", minLength: 1, maxLength: 10},
        {key: "year", placeholder: "Year", type: "number", min: 1000, max: 9999},
        {key: "licensePlate", placeholder: "License Plate", type: "text", minLength: 1, maxLength: 10},
        {key: "currentDistance_KM", placeholder: "Current Distance KM", type: "number", min: 0, max: 9999},
        {key: "maxLoad_KG", placeholder: "Max Load KG", type: "number", min: 1, max: 9999}
    ]

    const fuelTypes = [
        {key: "", value: "Select..."},
        {key: "GAS", value: "Gas"},
        {key: "DIESEL", value: "Diesel"},
        {key: "ELECTRIC", value: "Electric"}
    ]

    const setErrorMessages = (data: {field: string, message: string}[]) => {
        const errors: {[key:string]:string[]} = {}
        data.forEach(obj => {
            const field = obj.field
            const message = obj.message
            if(errors[field]) {
                errors[field].push(message)
            } else {
                errors[field] = [message]
            }
        })
        setErrors(errors)
    }

    const onSubmit = async (body: createTruckProps) => {
        try{
            const {data, status} = await createTruck(body)
            if(status === 201) {
                const {licensePlate, id, model, year, currentDistance_KM, maxLoad_KG, fuelType} = data[0].data
                setTruckInstance({licensePlate, id, model, year, currentDistance_KM, maxLoad_KG, fuelType})
                setTruckLocationsInstance()
                history.push("/truck/location")
            } else {
                setErrorMessages(data.errors)
            }
         } catch(err) {}
    }

    const errorMessage = (type: string) => {
        return Object.entries(errors).length ? <div className="error-label">
                    {errors[type] && errors[type][0]}
                </div> : ''
    }
  
    return (
        <div className="custom-form">
            {
                <form className="create-truck-form" onSubmit={handleSubmit(onSubmit)}>
                    {
                        inputFields.map((obj) =>
                            <div key={obj.key} className="form-control"><input 
                                    {...register(obj.key)}
                                    {...obj}
                                    required
                                />
                                {errorMessage(obj.key)}
                            </div>
                        )
                    }
                    <div className="form-control">
                        <select {...register("fuelType")}>
                            {
                                fuelTypes.map((obj) => 
                                    <option key={obj.key} value={obj.key}>{obj.value}</option>
                                )
                            }
                        </select>
                        {errorMessage('fuelType')}
                    </div>
                    <input className="submit" type="submit" value="Create Truck" />
                </form>
            }
      </div>
    );
}

export default CreateTruckForm
