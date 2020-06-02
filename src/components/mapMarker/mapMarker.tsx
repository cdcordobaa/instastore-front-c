import React from "react";
import { HomeRounded } from "@material-ui/icons";
import styles from "./styled";

const MapMarker = (props) => {
  return (
    <styles.MarkerPosCentered
      hoover={props.$hover}
      size={2}
      className="lookatme"
    >
      <HomeRounded />
    </styles.MarkerPosCentered>
  );
};
export default MapMarker;
