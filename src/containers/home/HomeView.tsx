import React, { useState, useEffect } from "react";
import Map from "components/mapWrapper/mapWrapper";
import styles from "./styled";
import AutoCompleteField from "components/autoComplete/autoComplete";
import {
  IMapCenter,
  IMarker,
  MarkerType,
  IGMapCoordinates,
} from "types/mapTypes";
import { TextField } from "@material-ui/core";

export interface IHomeViewProps {
  storesList: Array<any>;
  mapServices: any;
  onApiLoad: (gServices) => any;
}

enum AutoFieldType {
  CENTER = "Center",
  ADDRESS = "Address",
}

const HomeView = ({ storesList, mapServices, onApiLoad }: IHomeViewProps) => {
  const [mapCenter, setMapCenter] = useState<IMapCenter>({
    center: { lat: 1.3521, lng: 103.8198 },
    name: "",
  });
  const [destMarkPost, setDestMarkPost] = useState<IMarker>({
    isDraggable: true,
    id: 0,
    coordinates: {
      latitude: 1.3521,
      longitude: 103.8198,
    },
    name: "You",
    type: MarkerType.User,
  });
  const [addressValue, setAddressValue] = useState("");
  const [destinationObj, setDestinationObj] = useState({
    name: "",
    address: "",
    address_two: "",
    description: "",
    country: "",
    city: "",
    zip_code: "",
    state: "",
    latitude: "",
    longitude: "",
  });

  const fillInInfoFields = (geoCodeRespose) => {
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
    console.log("dataa", destination, geoCodeRespose);
  };

  const onMapCenterTyping = async (
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

  const onCenterSelection = (key: string, option: string) => {
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
      console.log("is getting here?", key, option);
      if (key === AutoFieldType.CENTER) {
        setMapCenter({
          ...mapCenter,
          center,
          name: option,
        });
      }

      if (key === AutoFieldType.ADDRESS) {
        fillInInfoFields(response[0]);
      }

      setDestinationMarker(center);
    });
  };

  const onAddressTyping = async (
    key: string,
    value: string,
    callback: (options: Array<string>) => void
  ): Promise<Array<string> | undefined> => {
    if (!mapServices.maps) {
      return undefined;
    }
    const searchQuery = {
      input: value,
      location: new mapServices.maps.LatLng(
        mapCenter.center.lat,
        mapCenter.center.lng
      ),
      radius: 30000,
      types: ["establishment", "street_address", "street_number", "route"],
    };
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
      },
      (error) => {
        return undefined;
      }
    );
    return undefined;
  };

  const setDestinationMarker = (location: IGMapCoordinates) => {
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
      setAddressValue(response[0].formatted_address);
    });
  };

  return (
    <React.Fragment>
      <styles.Title>holi!@</styles.Title>
      <styles.PanelContainer>
        <styles.OptionsPanel>
          <AutoCompleteField
            id={AutoFieldType.CENTER}
            label={"NearBy Place or City"}
            value={mapCenter.name}
            onTyping={onMapCenterTyping}
            onSelection={onCenterSelection}
          ></AutoCompleteField>
          <AutoCompleteField
            id={AutoFieldType.ADDRESS}
            label={"Address"}
            value={addressValue}
            onTyping={onAddressTyping}
            onSelection={onCenterSelection}
          ></AutoCompleteField>
          <TextField
            label={"Address Two"}
            value={destinationObj.address_two}
            variant="outlined"
          />
          <TextField
            label={"Country"}
            value={destinationObj.country}
            variant="outlined"
          />
          <TextField
            autoComplete="off"
            value={destinationObj.state}
            label={"State"}
            variant="outlined"
          />
          <TextField
            autoComplete="off"
            value={destinationObj.city}
            label={"City"}
            variant="outlined"
          />
          <TextField
            autoComplete="off"
            value={destinationObj["zip_code"]}
            label={"Zip Code"}
            variant="outlined"
          />
        </styles.OptionsPanel>
        <styles.Board>
          <Map
            userMarker={destMarkPost}
            storeMarkers={[]}
            onApiLoad={onApiLoad}
            mapCenter={mapCenter}
            onMarkerMove={onMarkerMove}
          ></Map>
        </styles.Board>
      </styles.PanelContainer>
    </React.Fragment>
  );
};

export default HomeView;
