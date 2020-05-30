import React, { useState, useEffect } from "react";
import Map from "components/mapWrapper/mapWrapper";
import styles from "./styled";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NavigationIcon from "@material-ui/icons/Navigation";
import AutoComplete from "components/autoComplete/autoComplete";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

interface IHomeViewProps {
  storesList: Array<any>;
  mapServices: any;
  onApiLoad: (gServices) => any;
}

const HomeView = ({ storesList, mapServices, onApiLoad }: IHomeViewProps) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <styles.Title>holi!@</styles.Title>
      <styles.PanelContainer>
        <styles.OptionsPanel>
          <AutoComplete mapServices={mapServices}></AutoComplete>
        </styles.OptionsPanel>
        <styles.Board>
          <Map markersList={storesList} onApiLoad={onApiLoad}></Map>
        </styles.Board>
      </styles.PanelContainer>
    </React.Fragment>
  );
};

export default HomeView;
