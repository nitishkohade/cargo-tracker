import axios, { AxiosRequestConfig } from "axios"
import { config } from "../config/config";

const options: AxiosRequestConfig = {
    url: `${config.SERVICE_URL}/truckLocation/getLastNLocations`,
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  };

export const getLastNLocations = ({truckId, lastNLocation}: {truckId: number, lastNLocation: number}) => {
    const url = `${options.url}?truckId=${truckId}&lastNLocation=${lastNLocation}`
    return axios({...options, url}).then(res => res).catch(err => err.response)
}
