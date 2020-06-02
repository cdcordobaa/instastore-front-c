import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeView from "./HomeView";
import { IDestination } from "types/destinationTypes";
import { RootState } from "redux/store";
import { IStore } from "types/storeTypes";
import { nearestStore } from "redux/ducks/stores/storesSlice";

interface IHomeProps {}

const HomeContainer = ({}: IHomeProps) => {
  const defaultCenter = { lat: 1.3521, lng: 103.8198 };
  const dispatch = useDispatch();
  const destination: IDestination = useSelector(
    (state: RootState) => state.destination.destination
  );
  const stores: Array<IStore> =
    useSelector((state: RootState) => state.stores.cityStores) || [];

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

  const onDestinationSubmit = (destination: IDestination) => {
    console.log("the submit is, ", destination);
    dispatch(nearestStore(destination));
  };

  return (
    <HomeView
      onApiLoad={setGMapsServices}
      mapServices={mapServices}
      destination={destination}
      storesList={stores || []}
      onDestinationSubmit={onDestinationSubmit}
      locationLoaded={locationLoaded}
    ></HomeView>
  );
};

export default HomeContainer;
