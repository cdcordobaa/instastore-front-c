import React, { useState, useEffect } from "react";
import {} from "@material-ui/core";
import {
  Send,
  DynamicFeed,
  AddAlert,
  Apartment,
  Public,
  LineStyle,
  LocationCity,
  Dialpad,
} from "@material-ui/icons";
import styles, { TextField, Button, InputAdornment } from "./styled";
import AutoCompleteField from "components/autoComplete/autoComplete";
import { AutoFieldType } from "./HomeView";

export const TextFieldsFormHelper = (props) => {
  return (
    <React.Fragment>
      <styles.HelperLabel>
        Complete this inofrmation so we can find the Store you need!
      </styles.HelperLabel>
      <TextField
        autoComplete="off"
        value={props.destinationObj.name}
        onChange={props.onTextFieldValueChange("name")}
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
        error={props.addressValue !== "" && props.destinationObj.city === ""}
        helperText="This can't be empty"
      />

      <TextField
        label={"Add DesCription"}
        value={props.destinationObj.description}
        onChange={props.onTextFieldValueChange("description")}
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
        value={props.destinationObj.address_two}
        onChange={props.onTextFieldValueChange("address_two")}
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
        onChange={props.onTextFieldValueChange("country")}
        value={props.destinationObj.country}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Public />
            </InputAdornment>
          ),
        }}
        required
        error={props.addressValue !== "" && props.destinationObj.city === ""}
        helperText="This can't be empty"
      />

      <TextField
        autoComplete="off"
        value={props.destinationObj.state}
        onChange={props.onTextFieldValueChange("state")}
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
        value={props.destinationObj.city}
        onChange={props.onTextFieldValueChange("city")}
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
        error={props.addressValue !== "" && props.destinationObj.city === ""}
        helperText="This can't be empty"
      />

      <TextField
        autoComplete="off"
        value={props.destinationObj.zip_code}
        onChange={props.onTextFieldValueChange("zip_code")}
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
        onClick={props.submitForm}
      >
        Show Me!
      </Button>
    </React.Fragment>
  );
};

export const LocalizationFindersHelper = (props: any) => {
  let {
    addressValue,
    locationLoaded,
    mapCenter,
    onAutoCompleFieldOnTyping,
    onCenterFieldSelection,
  } = props;
  return (
    <React.Fragment>
      <styles.AutoCompleteFieldWraper>
        {!locationLoaded && (
          <styles.HelperLabel>
            Since we were unable to activate your Geolocation, let's find the
            city or town where you are located.
          </styles.HelperLabel>
        )}
        {locationLoaded && (
          <styles.HelperLabel>
            Alright! looks like you're somewhere near {mapCenter.name}, move the
            marker in the map to find your address, or you can type it here.
          </styles.HelperLabel>
        )}

        <AutoCompleteField
          id={AutoFieldType.CENTER}
          label={"NearBy Place or City"}
          value={mapCenter ? mapCenter.name : ""}
          onTyping={onAutoCompleFieldOnTyping}
          onSelection={onCenterFieldSelection}
        ></AutoCompleteField>
      </styles.AutoCompleteFieldWraper>
      <styles.AutoCompleteFieldWraper>
        <styles.HelperLabel>
          You can type your address to locate you, look for the hints if you're
          really lost!
        </styles.HelperLabel>
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
