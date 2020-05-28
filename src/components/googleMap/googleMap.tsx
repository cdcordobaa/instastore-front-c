import React from "react";
import GoogleMapReact from "google-map-react";
import { Wrapper } from "./styled";

const API_KEY = "AIzaSyDTVjqr36KTmbnCthKJrScY7xM6qIe37G4";

const GoogleMap = ({ children, ...props }) => (
  <Wrapper>
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.REACT_APP_MAP_KEY || API_KEY,
        language: "en",
      }}
      {...props}
    >
      {children}
    </GoogleMapReact>
  </Wrapper>
);

export default GoogleMap;
