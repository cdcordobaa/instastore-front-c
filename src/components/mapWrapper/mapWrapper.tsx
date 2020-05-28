import React, { useState, useEffect } from "react";
import GoogleMapReact, {
  Maps,
  MapOptions,
  Props as MapProps,
} from "google-map-react";
import MapMarker from "components/mapMarker/mapMarker";
import GoogleMap from "components/googleMap/googleMap";

const MapContainer: React.FC = () => {
  const apiHasLoaded = (map: MapOptions, maps: Maps) => {
    console.log("api loaded", map, maps);
  };

  const storePin = () => {
    return <MapMarker lat={1.3521} lng={103.8198} text={"You"} />;
  };

  return (
    <div style={{ width: "6rem", height: "10rem" }}>
      <GoogleMap
        defaultZoom={11}
        defaultCenter={{ lat: 1.3521, lng: 103.8198 }}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
      >
        {/* <MapMarker lat={1.3521} lng={103.8198} /> */}
      </GoogleMap>
    </div>
  );
};

export default MapContainer;
