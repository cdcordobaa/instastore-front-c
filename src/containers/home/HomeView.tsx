import React, { useState, useEffect } from "react";
import Map from "components/mapWrapper/mapWrapper";
import styles from "./styled";
import AutoCompleteField from "components/autoComplete/autoComplete";
import {
  IMapCenter,
  IMarker,
  MarkerType,
  IGMapCoordinates,
  gMapsServices,
} from "types/mapTypes";
import { TextField } from "@material-ui/core";
import { IDestination } from "types/destinationTypes";

export interface IHomeViewProps {
  storesList: Array<any>;
  mapServices: gMapsServices;
  onApiLoad: (gServices: gMapsServices) => void;
  onDestinationSubmit: (destination: IDestination) => void;
}

enum AutoFieldType {
  CENTER = "Center",
  ADDRESS = "Address",
}

const HomeView = ({ storesList, mapServices, onApiLoad }: IHomeViewProps) => {
  const [mapCenter, setMapCenter] = useState<IMapCenter>({
    center: { lat: 0, lng: 0 },
    name: "",
  });
  const [destMarkPost, setDestMarkPost] = useState<IMarker>({
    isDraggable: true,
    id: 0,
    coordinates: {
      latitude: 0,
      longitude: 0,
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

  useEffect(() => {
    if (mapServices && mapServices.mapInitialLatLng) {
      setMapCenter({
        center: {
          lat: mapServices.mapInitialLatLng.lat(),
          lng: mapServices.mapInitialLatLng.lng(),
        },
        name: "",
      });
    }
  }, [mapServices]);

  const fillDestinationFields = (geoCodeRespose) => {
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
      console.log("is getting here?", key, option);
      if (key === AutoFieldType.CENTER) {
        setMapCenter({
          ...mapCenter,
          center,
          name: option,
        });
      }

      if (key === AutoFieldType.ADDRESS) {
        fillDestinationFields(response[0]);
      }

      setDestinationMarker(center);
    });
  };

  const onAutoCompleFieldTyping = async (
    key: string,
    value: string,
    callback: (options: Array<string>) => void
  ): Promise<Array<string> | undefined> => {
    if (!mapServices.maps || !mapServices.autoCompleteService) {
      return undefined;
    }

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
        const dataSource: Array<string> = response.map(
          (resp) => resp.description
        );
        callback(dataSource);
        return dataSource;
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
      fillDestinationFields(response[0]);
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
            onTyping={onAutoCompleFieldTyping}
            onSelection={onCenterFieldSelection}
          ></AutoCompleteField>
          <AutoCompleteField
            id={AutoFieldType.ADDRESS}
            label={"Address"}
            value={addressValue}
            onTyping={onAutoCompleFieldTyping}
            onSelection={onCenterFieldSelection}
          ></AutoCompleteField>

          <TextField
            autoComplete="off"
            value={destinationObj.name}
            label={"Name This Destination"}
            variant="outlined"
          />
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
