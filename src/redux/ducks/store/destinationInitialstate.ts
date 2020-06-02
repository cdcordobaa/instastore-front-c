import { IDestinationDetails, SearchNearestBy } from "types/destinationTypes";

export const initialState: IDestinationDetails = {
  error: null,
  destination: {
    name: "",
    address: "",
    address_two: "",
    description: "",
    country: "",
    city: "",
    zip_code: "",
    state: "",
    latitude: 0,
    longitude: 0,
  },
  filters: {
    searchBy: SearchNearestBy.distance,
    searchOpen: false,
  },
  items: [
    {
      name: "beer",
      quantity: 6,
    },
  ],
};
