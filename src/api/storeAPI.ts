import axios, { AxiosRequestConfig } from "axios";

import { IStore, APIStoreResponse } from "types/storeTypes";
import { IDestinationDetails } from "types/destinationTypes";

const serviceEndpoint = "http://localhost:3001";
const storesURI = "/stores";

export async function getNearestStore(destination: IDestinationDetails) {
  const endpoint = "/nearest";
  const url = `${serviceEndpoint}${storesURI}${endpoint}`;
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      searchBy: destination.filters.searchBy,
      hi: true,
    },
  };
  const data: IDestinationDetails = destination;
  let response = await axios.post<APIStoreResponse>(url, data, config);
  console.log(`Nearest post from axios: ", ${(await response).data}`);
  return (await response).data;
}

export async function getStoresInCity(city: string) {
  const url = `${serviceEndpoint}${storesURI}/city/${city}`;
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let response = await axios.get<APIStoreResponse>(url, config);
  console.log(`get from axios: ", ${(await response).data}`);
  return (await response).data;
}
