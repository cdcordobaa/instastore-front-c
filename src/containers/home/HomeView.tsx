import React, { useState, useEffect } from "react";
import { InputAdornment } from "@material-ui/core";
import {
  DynamicFeed,
  AddAlert,
  Apartment,
  Public,
  LineStyle,
  LocationCity,
  Dialpad,
  Send,
} from "@material-ui/icons";
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

export interface IHomeViewProps {
  destination: IDestination;
  storesList: Array<IStore>;
  mapServices: gMapsServices;
  onApiLoad: (gServices: gMapsServices) => void;
  onDestinationSubmit: (destination: IDestination) => void;
  locationLoaded: boolean;
}

enum AutoFieldType {
  CENTER = "Center",
  ADDRESS = "Address",
}

const HomeView = ({
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
      latitude: 0,
      longitude: 0,
    },
    name: "You",
    type: MarkerType.User,
  });
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
    console.log("eeeev", event);
    setDestinationObj({
      ...destinationObj,
      [field]: event.target.value,
    });
  };

  const textFieldsForm = () => {
    return (
      <React.Fragment>
        <TextField
          autoComplete="off"
          value={destinationObj.name}
          onChange={onTextFieldValueChange("name")}
          label={"Name This Destination"}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DynamicFeed />
              </InputAdornment>
            ),
          }}
          required
          error={addressValue !== "" && destinationObj.city === ""}
          helperText="This can't be empty"
        />

        <TextField
          label={"Add DesCription"}
          value={destinationObj.description}
          onChange={onTextFieldValueChange("description")}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AddAlert />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label={"Address Two"}
          value={destinationObj.address_two}
          onChange={onTextFieldValueChange("address_two")}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Apartment />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          autoComplete="off"
          label={"Country"}
          onChange={onTextFieldValueChange("country")}
          value={destinationObj.country}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Public />
              </InputAdornment>
            ),
          }}
          required
          error={addressValue !== "" && destinationObj.city === ""}
          helperText="This can't be empty"
        />

        <TextField
          autoComplete="off"
          value={destinationObj.state}
          onChange={onTextFieldValueChange("state")}
          label={"State"}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LineStyle />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          autoComplete="off"
          value={destinationObj.city}
          onChange={onTextFieldValueChange("city")}
          label={"City"}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationCity />
              </InputAdornment>
            ),
          }}
          required
          error={addressValue !== "" && destinationObj.city === ""}
          helperText="This can't be empty"
        />

        <TextField
          autoComplete="off"
          value={destinationObj.zip_code}
          onChange={onTextFieldValueChange("zip_code")}
          label={"Zip Code"}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Dialpad />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<Send />}
          onClick={submitForm}
        >
          Show Me!
        </Button>
      </React.Fragment>
    );
  };

  const localizationFinders = () => {
    return (
      <React.Fragment>
        <styles.AutoCompleteFieldWraper>
          <AutoCompleteField
            id={AutoFieldType.CENTER}
            label={"NearBy Place or City"}
            value={mapCenter.name}
            onTyping={onAutoCompleFieldOnTyping}
            onSelection={onCenterFieldSelection}
          ></AutoCompleteField>
        </styles.AutoCompleteFieldWraper>
        <styles.AutoCompleteFieldWraper>
          <AutoCompleteField
            id={AutoFieldType.ADDRESS}
            label={"Address"}
            value={addressValue}
            onTyping={onAutoCompleFieldOnTyping}
            onSelection={onCenterFieldSelection}
          ></AutoCompleteField>
        </styles.AutoCompleteFieldWraper>
      </React.Fragment>
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
              storeMarkers={[]}
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
