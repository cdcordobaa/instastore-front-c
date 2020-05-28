import React, { useState, useEffect } from "react";
import styles from "./styled";
import MapContainer from "components/mapWrapper/mapWrapper";

interface IHomeViewProps {
  storesList: Array<any>;
}

const HomeView = ({ storesList }: IHomeViewProps) => {
  return (
    <React.Fragment>
      <styles.Title>holi!@</styles.Title>
      <MapContainer></MapContainer>
    </React.Fragment>
  );
};

export default HomeView;
