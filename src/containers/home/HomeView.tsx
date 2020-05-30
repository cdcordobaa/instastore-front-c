import React, { useState, useEffect } from "react";
import Map from "components/mapWrapper/mapWrapper";
import styles from "./styled";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NavigationIcon from "@material-ui/icons/Navigation";
import AutoCompleteField from "components/autoComplete/autoComplete";

interface IHomeViewProps {
  storesList: Array<any>;
  mapServices: any;
  onApiLoad: (gServices) => any;
  onTyping: (
    key: string,
    value: string,
    callback: (options: Array<string>) => void
  ) => Promise<Array<string> | undefined>;
  onSelection: (key: string, option: string) => void;
  destination: any;
}

const HomeView = ({
  storesList,
  mapServices,
  onApiLoad,
  onTyping,
  onSelection,
  destination,
}: IHomeViewProps) => {
  return (
    <React.Fragment>
      <styles.Title>holi!@</styles.Title>
      <styles.PanelContainer>
        <styles.OptionsPanel>
          <AutoCompleteField
            key={"city"}
            label={"city"}
            value={destination.city}
            onTyping={onTyping}
            onSelection={onSelection}
          ></AutoCompleteField>
        </styles.OptionsPanel>
        <styles.Board>
          <Map markersList={storesList} onApiLoad={onApiLoad}></Map>
        </styles.Board>
      </styles.PanelContainer>
    </React.Fragment>
  );
};

export default HomeView;
