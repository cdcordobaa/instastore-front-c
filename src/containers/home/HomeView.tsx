import React, { useState, useEffect } from "react";
import Map from "components/mapWrapper/mapWrapper";
import styles from "./styled";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NavigationIcon from "@material-ui/icons/Navigation";

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
}

const HomeView = ({ storesList }: IHomeViewProps) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <styles.Title>holi!@</styles.Title>
      <styles.PanelContainer>
        <styles.OptionsPanel>
          <div className={classes.root}>
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
            <Fab color="secondary" aria-label="edit">
              <EditIcon />
            </Fab>
            <Fab variant="extended">
              <NavigationIcon className={classes.extendedIcon} />
              Navigate
            </Fab>
            <Fab disabled aria-label="like">
              <FavoriteIcon />
            </Fab>
          </div>
        </styles.OptionsPanel>
        <styles.Board>
          <Map markersList={storesList}></Map>
        </styles.Board>
      </styles.PanelContainer>
    </React.Fragment>
  );
};

export default HomeView;
