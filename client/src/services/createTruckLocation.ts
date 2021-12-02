import axios, { AxiosRequestConfig } from "axios"
import { config } from "../config/config";

const options: AxiosRequestConfig = {
    url: `${config.SERVICE_URL}/truckLocation/create`,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    }
  };

export const createTruckLocation = (data: createTruckLocationProps) => {
    return axios({...options, data}).then(res => res).catch(err => err.response)
}
