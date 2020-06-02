import { IStore, ISToreState } from "types/storeTypes";

export const initialState: ISToreState = {
  error: null,
  cityStores: [
    {
      id: 25,
      name: "the house",
      is_open: true,
      latitude: 1.3521,
      longitude: 103.8198,
      nextDeliveryTime: 60,
      address: "hello avenue",
      city: "Bogota",
      country: "Colombia",
      state: "Bogota",
    },
  ],
  nearest: {
    distance: {
      id: 25,
      name: "the house",
      is_open: true,
      latitude: 1.3521,
      longitude: 103.8198,
      nextDeliveryTime: 60,
      address: "hello avenue",
      city: "Bogota",
      country: "Colombia",
      state: "Bogota",
    },
    time: undefined,
  },
};
