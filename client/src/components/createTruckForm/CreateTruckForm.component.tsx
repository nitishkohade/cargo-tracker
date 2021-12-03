import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { fuelTypes, inputFields } from "../../config/truck.config";
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
        console.log(errors)
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
                console.log(data.errors)
                setErrorMessages(data.errors)
            }
         } catch(err) {}
    }

    const errorMessage = (type: string) => {
        if(errors[type]) {
            return <div data-testid={`error-${type}`} className="error-label">
                {errors[type][0]}
            </div>
        }
        return ''
    }
  
    return (
        <div className="custom-form">
            {
                <>
                    {errors['service'] ? <div className="error-message">{errors['service']}</div> : ''}
                    <form className="create-truck-form" onSubmit={handleSubmit(onSubmit)}>
                        {
                            inputFields.map((obj) =>
                                <div key={obj.key} className="form-control"><input
                                        data-testid={obj.key}
                                        {...register(obj.key)}
                                        {...obj}
                                        required
                                    />
                                    {errorMessage(obj.key)}
                                </div>
                            )
                        }
                        <div className="form-control">
                            <select data-testid={'fuelType'} {...register("fuelType")}>
                                {
                                    fuelTypes.map((obj) => 
                                        <option key={obj.key} value={obj.key}>{obj.value}</option>
                                    )
                                }
                            </select>
                            {errorMessage('fuelType')}
                        </div>
                        <input
                            data-testid={'submit'} 
                            className="submit" 
                            type="submit" 
                            value="Create Truck" 
                        />
                    </form>
                </>
            }
      </div>
    );
}

export default CreateTruckForm
