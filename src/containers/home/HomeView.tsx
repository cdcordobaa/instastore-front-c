import React, { useState, useEffect } from "react";
import { InputAdornment } from "@material-ui/core";
import {
  IMapCenter,
  IMarker,
  MarkerType,
  IGMapCoordinates,
  gMapsServices,
} from "types/mapTypes";
import { IDestination } from "types/destinationTypes";
import Map from "components/mapWrapper/mapWrapper";
import AutoCompleteField from "components/autoComplete/autoComplete";
import styles, { TextField, Button } from "./styled";
import { IStore } from "types/storeTypes";
import { TextFieldsFormHelper, LocalizationFindersHelper } from "./formHelper";

export interface IHomeViewProps {
  destination: IDestination;
  nearest: IStore | undefined;
  storesList: Array<IStore>;
  mapServices: gMapsServices;
  onApiLoad: (gServices: gMapsServices) => void;
  onDestinationSubmit: (destination: IDestination) => void;
  locationLoaded: boolean;
}

export enum AutoFieldType {
  CENTER = "Center",
  ADDRESS = "Address",
}

const HomeView = ({
  nearest,
  destination,
  storesList,
  mapServices,
  onApiLoad,
  locationLoaded,
  onDestinationSubmit,
}: IHomeViewProps) => {
  const [mapCenter, setMapCenter] = useState<IMapCenter>({
    center: { lat: 0, lng: 0 },
    name: "",
  });
  const [destMarkPost, setDestMarkPost] = useState<IMarker>({
    isDraggable: true,
    id: 0,
    coordinates: {
      latitude: destination.latitude,
      longitude: destination.longitude,
    },
    name: destination.name,
    type: MarkerType.User,
  });
  const [storeMarkPos, setStoreMarkPos] = useState<IMarker[]>([]);
  const [destinationObj, setDestinationObj] = useState<IDestination>(
    destination
  );
  const [addressValue, setAddressValue] = useState("");

  useEffect(() => {
    if (mapServices && mapServices.mapInitialLatLng) {
      const center = {
        lat: mapServices.mapInitialLatLng.lat(),
        lng: mapServices.mapInitialLatLng.lng(),
      };
      setMapCenter({
        center,
        name: "",
      });
      if (locationLoaded) {
        setDestinationMarker(center);
      }
    }
  }, [mapServices, locationLoaded]);

  useEffect(() => {
    const storesMarkers: IMarker[] =
      storesList &&
      storesList.map((store) => ({
        isDraggable: false,
        id: store.id,
        coordinates: {
          latitude: store.latitude,
          longitude: store.longitude,
        },
        name: store.name,
        type: MarkerType.Store,
      }));

    const nearestMarker: IMarker | undefined = nearest && {
      isDraggable: false,
      id: nearest.id,
      coordinates: {
        latitude: nearest.latitude,
        longitude: nearest.longitude,
      },
      name: nearest.name,
      type: MarkerType.Distance,
    };

    const destMarker = {
      isDraggable: true,
      id: 0,
      coordinates: {
        latitude: destination.latitude,
        longitude: destination.longitude,
      },
      name: destination.name,
      type: MarkerType.User,
    };

    if (nearestMarker) storesMarkers.push(nearestMarker);
    setStoreMarkPos(storesMarkers);
    setDestMarkPost(destMarker);
  }, [storesList, nearest, destination]);

  const fillDestinationObj = (geoCodeRespose) => {
    const filterbyType = (type_tag: string) => {
      const value = geoCodeRespose.address_components.filter((part) =>
        part.types.includes(type_tag)
      );
      return value.length > 0 ? value[0].long_name : "";
    };

    let destination = {
      zip_code: filterbyType("postal_code"),
      country: filterbyType("country"),
      city: filterbyType("locality"),
      state: filterbyType("administrative_area_level_1"),
      address: geoCodeRespose.formatted_address.split(",")[0],
      latitude: geoCodeRespose.geometry.location.lat(),
      longitude: geoCodeRespose.geometry.location.lng(),
    };

    setDestinationObj({ ...destinationObj, ...destination });
    setAddressValue(geoCodeRespose.formatted_address);
    setMapCenter({
      ...mapCenter,
      name: geoCodeRespose.formatted_address.split(",").slice(1).toString(),
    });
  };

  const onCenterFieldSelection = (key: string, option: string) => {
    if (!mapServices.geoCoderService) {
      return undefined;
    }
    const searchQuery = {
      address: option,
    };
    mapServices.geoCoderService.geocode(searchQuery, (response) => {
      const { location } = response[0].geometry;
      const center = {
        lat: location.lat(),
        lng: location.lng(),
      };
      if (key === AutoFieldType.CENTER) {
        setMapCenter({
          ...mapCenter,
          center,
          name: option,
        });
      }

      if (key === AutoFieldType.ADDRESS) {
        fillDestinationObj(response[0]);
      }

      setDestinationMarker(center);
    });
  };

  const onAutoCompleFieldOnTyping = async (
    key: string,
    value: string,
    callback: (options: Array<string>) => void
  ): Promise<Array<string> | undefined> => {
    if (!mapServices.maps || !mapServices.autoCompleteService) {
      return undefined;
    }
    console.log("uyyy");
    let searchQuery: any = {
      input: value,
    };

    if (key === AutoFieldType.CENTER) {
      searchQuery = {
        ...searchQuery,
        fields: ["name"],
      };
    }

    if (key === AutoFieldType.ADDRESS) {
      searchQuery = {
        ...searchQuery,
        location: new mapServices.maps.LatLng(
          mapCenter.center.lat,
          mapCenter.center.lng
        ),
        radius: 30000,
        types: ["establishment", "street_address", "street_number", "route"],
      };
    }

    mapServices.autoCompleteService.getQueryPredictions(
      searchQuery,
      (response) => {
        if (response) {
          const dataSource: Array<string> = response.map(
            (resp) => resp.description
          );
          callback(dataSource);
          return dataSource;
        }
      }
    );

    return undefined;
  };

  const setDestinationMarker = (location: IGMapCoordinates) => {
    if (!destMarkPost) {
      return;
    }
    setDestMarkPost({
      ...destMarkPost,
      coordinates: {
        latitude: location.lat,
        longitude: location.lng,
      },
    });
  };

  const onMarkerMove = (location: IGMapCoordinates) => {
    mapServices.geoCoderService.geocode({ location }, (response) => {
      fillDestinationObj(response[0]);
    });
  };

  const onTextFieldValueChange = (field: string) => (event) => {
    setDestinationObj({
      ...destinationObj,
      [field]: event.target.value,
    });
  };

  const textFieldsForm = () => {
    //Moved this to another file for being too long
    return (
      <TextFieldsFormHelper
        addressValue={addressValue}
        destinationObj={destinationObj}
        onTextFieldValueChange={onTextFieldValueChange}
        submitForm={submitForm}
      ></TextFieldsFormHelper>
    );
  };

  const localizationFinders = () => {
    //Moved this to another file for being too long
    return (
      <LocalizationFindersHelper
        addressValue={addressValue}
        locationLoaded={locationLoaded}
        mapCenter={mapCenter}
        onAutoCompleFieldOnTyping={onAutoCompleFieldOnTyping}
        onCenterFieldSelection={onCenterFieldSelection}
      ></LocalizationFindersHelper>
    );
  };

  const submitForm = (event) => {
    onDestinationSubmit(destinationObj);
  };
  return (
    <React.Fragment>
      <styles.Title>holi!@</styles.Title>
      <styles.PanelContainer>
        <styles.OptionsPanel>{textFieldsForm()}</styles.OptionsPanel>
        <styles.Board>
          {localizationFinders()}
          <styles.MapContainer>
            <Map
              userMarker={destMarkPost}
              storesMarkers={storeMarkPos}
              onApiLoad={onApiLoad}
              mapCenter={mapCenter}
              onMarkerMove={onMarkerMove}
            ></Map>
          </styles.MapContainer>
        </styles.Board>
      </styles.PanelContainer>
    </React.Fragment>
  );
};

export default HomeView;
