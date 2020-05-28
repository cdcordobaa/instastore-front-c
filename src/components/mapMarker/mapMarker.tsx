import React from "react";
import { Icon } from "semantic-ui-react";
import styles from "./styled";

const pinStyle = {
  borderRadius: "10px",
  transform: "matrix(-1, 0, 0, 1, 10, 0)",
};
const MapMarker = (props) => {
  return (
    <div>
      <Icon className="building icon" size="big" style={pinStyle} />
    </div>
  );
};
export default MapMarker;
