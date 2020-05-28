import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

class MapContainer extends React.Component {
  render() {
    return (
      <div style={{ width: "100%", height: "1000px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyDTVjqr36KTmbnCthKJrScY7xM6qIe37G4",
            // libraries: ["places", "directions"],
          }}
          defaultZoom={11} // Supports DP, e.g 11.5
          defaultCenter={{ lat: 1.3521, lng: 103.8198 }}
          yesIWantToUseGoogleMapApiInternals={true}
        ></GoogleMapReact>
      </div>
    );
  }
}

export default MapContainer;
