/* eslint-disable no-use-before-define */
import React, { useState, useRef, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ComboBox(props) {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [options, setOptions] = useState([]);
  const loaded = useRef(false);

  // Runs after clicking away from the input field or pressing 'enter'.
  // GeocoderService helps us get the lng & lat given an address name.
  //   onSelect = (value) => {
  //     this.state.geoCoderService.geocode({ address: value }, (response) => {
  //       const { location } = response[0].geometry;
  //       this.props.addMarker(
  //         location.lat(),
  //         location.lng(),
  //         this.props.markerName
  //       );
  //     });
  //   };

  useEffect(() => {
    if (!(inputValue.length > 0)) {
      return undefined;
    }

    if (!props.mapServices.autoCompleteService) {
      return undefined;
    }
    const searchQuery = {
      input: inputValue,
      fields: ["name"],
    };
    props.mapServices.autoCompleteService.getQueryPredictions(
      searchQuery,
      (response) => {
        if (response) {
          const dataSource = response.map((resp) => resp.description);
          setOptions(dataSource);
        }
      }
    );
  }, [props.mapServices, inputValue]);

  useEffect(() => {
    console.log("j yu", props);
    if (!props.mapServices.geoCoderService) {
      return undefined;
    }
    const searchQuery = {
      address: selectedValue,
    };
    props.mapServices.geoCoderService.geocode(searchQuery, (response) => {
      const { location } = response[0].geometry;
      console.log("response coors", response);
      props.mapServices.map.center = { location };
    });
  }, [selectedValue]);

  return (
    <Autocomplete
      id="combo-box-demo"
      options={options}
      getOptionLabel={(option) => option}
      value={selectedValue}
      onChange={(event: any, newValue: any) => {
        setSelectedValue(newValue);
      }}
      onClose={(event: any) => {
        setOptions([]);
      }}
      onInputChange={(event: any, newInputValue: any) => {
        console.log("val of input", newInputValue);
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Combo box" variant="outlined" />
      )}
    />
  );
}
