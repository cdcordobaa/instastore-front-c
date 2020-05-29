import React, { useState, useEffect } from "react";
import GoogleMapReact, {
  Maps,
  MapOptions,
  Props as MapProps,
} from "google-map-react";
import MapMarker from "components/mapMarker/mapMarker";
import GoogleMap from "components/googleMap/googleMap";

interface IMapWrapperProps {
  markersList: any;
}

const MapWrapper: React.FC<IMapWrapperProps> = ({
  markersList,
}: IMapWrapperProps) => {
  const [gServicesObject, setGServicesObject] = useState({});
  const [mapOptions, setmapOptions] = useState({
    center: [1.3521, 103.8198],
    zoom: 9,
    draggable: true,

    lat: 1.3521,
    lng: 103.8198,
  });

  const onCircleInteraction = (childKey, childProps, mouse) => {
    // function is just a stub to test callbacks
    setmapOptions({
      ...mapOptions,
      draggable: false,
      lat: mouse.lat,
      lng: mouse.lng,
    });

    console.log("onCircleInteraction called with", childKey, childProps, mouse);
  };
  const onCircleInteraction3 = (childKey, childProps, mouse) => {
    setmapOptions({ ...mapOptions, draggable: true });
    // function is just a stub to test callbacks
    console.log("onCircleInteraction called with", childKey, childProps, mouse);
  };

  const _onChange = ({ center, zoom }) => {
    setmapOptions({
      ...mapOptions,
      center: center,
      zoom: zoom,
    });
  };

  const _onChildMouseEnter = (key, childProps) => {
    console.log("enter", key, childProps);
  };

  const _onChildMouseLeave = (key, childProps) => {
    console.log("exited", key, childProps);
  };

  const _onClick = (value) => {
    console.log("click", value);
  };

  const _distanceToMouse = (markerPos, mousePos, markerProps) => {
    const x = markerPos.x;
    const y = markerPos.y;

    // it's just a simple example, you can tweak distance function as you wish
    return Math.sqrt(
      (x - mousePos.x) * (x - mousePos.x) + (y - mousePos.y) * (y - mousePos.y)
    );
  };

  const apiHasLoaded = (map: MapOptions, maps: any) => {
    console.log("api loaded", map, maps);
    // setGServicesObject({
    //   maps,
    //   autoCompleteService: new maps.places.AutocompleteService(),
    //   // placesService: new maps.places.PlacesService(map),
    //   directionService: new maps.DirectionsService(),
    //   geoCoderService: new maps.Geocoder(),
    //   singaporeLatLng: new maps.LatLng(1.3521, 103.8198),
    // });
  };

  const Markers =
    markersList &&
    markersList.map((marker, index) => (
      <MapMarker
        // required props
        key={marker.id}
        lat={marker.coordinates.latitude}
        lng={marker.coordinates.longitude}
        onChildClick={_onClick}
      />
    ));

  return (
    <GoogleMap
      defaultZoom={11}
      defaultCenter={{ lat: 1.3521, lng: 103.8198 }}
      yesIWantToUseGoogleMapApiInternals={true}
      onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
      onChildMouseEnter={_onChildMouseEnter}
      onChildMouseLeave={_onChildMouseLeave}
      onClick={_onClick}
      draggable={mapOptions.draggable}
      onChange={_onChange}
      onChildMouseDown={onCircleInteraction}
      onChildMouseUp={onCircleInteraction3}
      onChildMouseMove={onCircleInteraction}
      hoverDistance={50}
      distanceToMouse={_distanceToMouse}
    >
      {/* {Markers} */}
      <MapMarker
        // required props
        key={1}
        lat={mapOptions.lat}
        lng={mapOptions.lng}
        onChildClick={_onClick}
      />
    </GoogleMap>
  );
};

export default MapWrapper;
