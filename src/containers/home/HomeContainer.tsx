import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeView from "./HomeView";
import { IDestination } from "types/destinationTypes";

interface IHomeProps {}

const HomeContainer = ({}: IHomeProps) => {
  const defaultCenter = { lat: 1.3521, lng: 103.8198 };
  const dispatch = useDispatch();

  const [mapServices, setMapServices] = useState<any>({});

  const setGMapsServices = (gServices: any) => {
    let center = new gServices.maps.LatLng(
      defaultCenter.lat,
      defaultCenter.lng
    );

    //This one could be dalayed but is not a promise, so setState inside again
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = pos.coords;
          center = new gServices.maps.LatLng(coords.latitude, coords.longitude);
          setMapServices({ ...gServices, mapInitialLatLng: center });
        },
        (error) => {
          console.error("Cant Get Position", error);
        }
      );
    }

    setMapServices({ ...gServices, mapInitialLatLng: center });
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

  const onDestinationSubmit = (destination: IDestination) => {};
  return (
    <HomeView
      onApiLoad={setGMapsServices}
      mapServices={mapServices}
      storesList={fakeResponse}
      onDestinationSubmit={onDestinationSubmit}
    ></HomeView>
  );
};

export default HomeContainer;
