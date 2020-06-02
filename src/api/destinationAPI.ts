import axios, { AxiosRequestConfig } from "axios";
import { APIDestinationResponse, IDestination } from "types/destinationTypes";

const serviceEndpoint = "https://localhost:3001";
const destinationURI = "/destination";

export async function postDestination(destination: IDestination) {
  const url = `${serviceEndpoint}${destinationURI}`;
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      hi: true,
    },
  };

  const data: IDestination = destination;

  let response = await axios.post<APIDestinationResponse>(url, data, config);
  console.log(`post from axios: ", ${(await response).data}`);
  return (await response).data;
}

export async function getDestinationByName(name: string) {
  const url = `${serviceEndpoint}${destinationURI}/${name}`;

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      hi: true,
    },
  };

  let response = await axios.get<APIDestinationResponse>(url, config);
  console.log(`get from axios: ", ${(await response).data}`);
  return (await response).data;
}
