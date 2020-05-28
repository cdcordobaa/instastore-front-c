import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styled";
import MapContainer from "components/mapWrapper/map";

interface IHomeViewProps {
  data: string;
}

const HomeView = ({ data }: IHomeViewProps) => {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <styles.Title>holi!@</styles.Title>
      <MapContainer></MapContainer>
    </React.Fragment>
  );
};

export default HomeView;
