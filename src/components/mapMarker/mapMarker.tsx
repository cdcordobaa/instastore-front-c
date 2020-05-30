import React from "react";
import { AccessAlarm, ThreeDRotation, Autorenew } from "@material-ui/icons";
import styles from "./styled";

const pinStyle = {
  borderRadius: "10px",
  transform: "matrix(-1, 0, 0, 1, 10, 0)",
};
const MapMarker = (props) => {
  const style = props.$hover
    ? { height: "100px", width: "20px" }
    : { height: "20px", width: "20px", color: "red" };
  return (
    <styles.MarkerPosCentered className="lookatme">
      {/* <AccessAlarm />
      <ThreeDRotation /> */}
      <h1 style={style}>aaaaaysh</h1>
    </styles.MarkerPosCentered>
  );
};
export default MapMarker;
