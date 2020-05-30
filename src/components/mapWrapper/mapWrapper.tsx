import React, { useState, useEffect } from "react";
import MapMarker from "components/mapMarker/mapMarker";
import GoogleMap from "components/googleMap/googleMap";
import { IMapCenter, IMarker, IGMapCoordinates } from "types/mapTypes";

interface IMapWrapperProps {
  userMarker: IMarker;
  storeMarkers: Array<IMarker>;
  onApiLoad: (gServices) => void;
  mapCenter: IMapCenter;
  onMarkerMove: (location: IGMapCoordinates) => void;
  zoom?: number;
}

const MapWrapper: React.FC<IMapWrapperProps> = ({
  userMarker,
  storeMarkers,
  onApiLoad,
  mapCenter,
  onMarkerMove,
  zoom,
}: IMapWrapperProps) => {
  const [mapOptions, setmapOptions] = useState({
    draggable: true,
  });
  const defaultZoom = 11;
  const defaultHooverDistance = 50;
  const [draggableMarker, setDraggableMarker] = useState<IMarker>(userMarker);

  useEffect(() => {
    setDraggableMarker(userMarker);
  }, [userMarker]);

  const onMarkerMoveStart = (childKey: any, childProps: any, mouse: any) => {
    if (draggableMarker.id != childKey) {
      return;
    }
    setmapOptions({
      ...mapOptions,
      draggable: false,
    });
    setDraggableMarker({
      ...draggableMarker,
      coordinates: {
        latitude: mouse.lat,
        longitude: mouse.lng,
      },
    });
  };
  const onMarkerRelease = (childKey: any, childProps: any, mouse: any) => {
    setmapOptions({ ...mapOptions, draggable: true });
    onMarkerMove({
      lat: mouse.lat,
      lng: mouse.lng,
    });
  };

  const onChange = ({ center, zoom }) => {};

  const onChildMouseEnter = (key, childProps) => {};

  const onChildMouseLeave = (key, childProps) => {};

  const onClick = (value) => {};

  const distanceToMouse = (markerPos, mousePos, markerProps) => {
    const x = markerPos.x;
    const y = markerPos.y;

    // it's just a simple example, you can tweak distance function as you wish
    return Math.sqrt(
      (x - mousePos.x) * (x - mousePos.x) + (y - mousePos.y) * (y - mousePos.y)
    );
  };

  const apiHasLoaded = ({ map, maps, ref }) => {
    onApiLoad({
      maps,
      autoCompleteService: new maps.places.AutocompleteService(),
      placesService: new maps.places.PlacesService(map),
      directionService: new maps.DirectionsService(),
      geoCoderService: new maps.Geocoder(),
    });

    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;

        // maps.setCenter(pos);
        let mymap = new maps.Map();
        let center = new maps.LatLng(coords.latitude, coords.longitude);
        map.panTo(center);
        // mymap;
      });

      let center = new maps.LatLng(4.918054735318825, -73.97925573532127);
      map.panTo(center);
    }
  };

  const Markers =
    draggableMarker &&
    storeMarkers &&
    [draggableMarker, ...storeMarkers].map((marker: any, index: any) => (
      <MapMarker
        key={marker.id}
        lat={marker.coordinates.latitude}
        lng={marker.coordinates.longitude}
        onClick={onClick}
      />
    ));

  return (
    <GoogleMap
      center={mapCenter.center}
      defaultZoom={zoom ? zoom : defaultZoom}
      //defaultCenter={{ lat: 1.3521, lng: 103.8198 }}
      yesIWantToUseGoogleMapApiInternals={true}
      onGoogleApiLoaded={apiHasLoaded}
      onChildMouseEnter={onChildMouseEnter}
      onChildMouseLeave={onChildMouseLeave}
      onClick={onClick}
      draggable={mapOptions.draggable}
      onChange={onChange}
      onChildMouseDown={onMarkerMoveStart}
      onChildMouseUp={onMarkerRelease}
      onChildMouseMove={onMarkerMoveStart}
      hoverDistance={defaultHooverDistance}
      distanceToMouse={distanceToMouse}
    >
      {Markers}
    </GoogleMap>
  );
};

export default MapWrapper;
