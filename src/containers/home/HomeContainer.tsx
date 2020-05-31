import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeView from "./HomeView";
import { IDestination } from "types/destinationTypes";

interface IHomeProps {}

const HomeContainer = ({}: IHomeProps) => {
  const defaultCenter = { lat: 1.3521, lng: 103.8198 };
  const dispatch = useDispatch();

  const [mapServices, setMapServices] = useState<any>({});
  const [locationLoaded, setLocationLoaded] = useState(false);

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
          setLocationLoaded(true);
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

  const onDestinationSubmit = (destination: IDestination) => {
    console.log("the submit is, ", destination);
  };

  return (
    <HomeView
      onApiLoad={setGMapsServices}
      mapServices={mapServices}
      storesList={fakeResponse}
      onDestinationSubmit={onDestinationSubmit}
      locationLoaded={locationLoaded}
    ></HomeView>
  );
};

export default HomeContainer;
