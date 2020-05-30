import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeView from "./HomeView";

interface IHomeProps {}

const HomeContainer = ({}: IHomeProps) => {
  const dispatch = useDispatch();

  const [mapServices, setMapServices] = useState<any>({});

  const [destinationObj, setDestinationObj] = useState({
    name: "",
    address: "",
    address_two: "",
    description: "",
    country: "",
    city: "",
  });

  const onTyping = async (
    key: string,
    value: string,
    callback: (options: Array<string>) => void
  ): Promise<Array<string> | undefined> => {
    if (!mapServices.autoCompleteService) {
      return undefined;
    }
    const searchQuery = {
      input: value,
      fields: ["name"],
    };
    mapServices.autoCompleteService.getQueryPredictions(
      searchQuery,
      (response) => {
        if (response) {
          const dataSource: Array<string> = response.map(
            (resp) => resp.description as string
          );
          console.log("keeee", dataSource);
          callback(dataSource);
          return dataSource;
        } else {
          return undefined;
        }
      },
      (error) => {
        return undefined;
      }
    );
  };

  const onSelection = (key: string, option: string) => {
    if (!mapServices.geoCoderService) {
      return undefined;
    }
    const searchQuery = {
      address: option,
    };
    mapServices.geoCoderService.geocode(searchQuery, (response) => {
      const { location } = response[0].geometry;
      console.log("response coors", response);
      mapServices.map.center = { location };
    });
  };

  const setServices = (gServices: any) => {
    console.log("what", gServices);
    setMapServices(gServices);
  };

  useEffect(() => {
    console.log("the new thing is", mapServices);
  }, [mapServices]);

  const fakeDataOject = {
    destination: {
      name: "city", // Name of the address given by user (required)
      address: "cra 7 no 100", // Address captured (required)
      address_two: "apto", //Additional details for the address (line apt, house number, etc)
      description: "hey knock the door", //Instructions for the delivery
      country: "Colombia", // Country code according to ISO-3166-1 (required)
      city: "Bogota", // City name
      state: "Bogota", // State name
      zip_code: "11002",
      latitude: 0, //number indicating the latitude of the address provided
      longitude: 0, //number indicating the longitude of the address provided
    },
  };

  const fakeResponse = [
    {
      storeId: "25",
      storeName: "the house",
      isOpen: true,
      coordinates: {
        latitude: 1.3521,
        longitude: 103.8198,
      },
      nextDeliveryTime: 60,
    },
    {
      storeId: "26",
      storeName: "the house",
      isOpen: true,
      coordinates: {
        latitude: 1.3521,
        longitude: 103.81,
      },
      nextDeliveryTime: 60,
    },
  ];

  return (
    <HomeView
      onApiLoad={setServices}
      mapServices={mapServices}
      storesList={fakeResponse}
      onTyping={onTyping}
      onSelection={onSelection}
      destination={destinationObj}
    ></HomeView>
  );
};

export default HomeContainer;
