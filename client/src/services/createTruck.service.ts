import axios, { AxiosRequestConfig } from "axios"
import { config } from "../config/service.config";

const options: AxiosRequestConfig = {
    url: `${config.SERVICE_URL}/truck/create`,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    }
  };

export const createTruck:any = (data: createTruckProps) => {
    return axios({...options, data}).then(res => res).catch(err => err.response)
}
