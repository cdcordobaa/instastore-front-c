export interface IGMapCoordinates {
  lat: number;
  lng: number;
}
export interface IMapCenter {
  center: IGMapCoordinates;
  name: string;
}

export interface ICoordinates {
  latitude: number;
  longitude: number;
}
export interface IMarker {
  isDraggable: boolean;
  id: number;
  coordinates: ICoordinates;
  name: string;
  type: MarkerType;
}

export enum MarkerType {
  Store,
  User,
}
