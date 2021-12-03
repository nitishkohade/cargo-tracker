import axios, { AxiosRequestConfig } from "axios"
import { config } from "../config/service.config";

const options: AxiosRequestConfig = {
    url: `${config.SERVICE_URL}/truck/getById`,
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  };

export const getTruckByID = (id: number) => {
    const url = `${options.url}?id=${id}`
    return axios({...options, url}).then(res => res).catch(err => err.response)
}
