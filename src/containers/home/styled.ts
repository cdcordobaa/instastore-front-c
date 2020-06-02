import styled from "styled-components";
import {
  TextField as MTextField,
  InputAdornment,
  Button as MButton,
  Icon,
} from "@material-ui/core";
import MAutoCompleteField from "components/autoComplete/autoComplete";

export const TextField = styled(MTextField)``;
export const Button = styled(MButton)``;

const AutoCompleteFieldWraper = styled.div``;
const PanelContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  width: 100%;
`;

const OptionsPanel = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 450px;
  overflow-y: scroll;
  ${TextField} {
    margin: 1rem 2.5rem;
  }
  ${Button} {
    margin: 1rem 2.5rem;
    max-width: 12rem;
  }
`;

const Board = styled.div`
  flex-direction: column;
  min-width: 250px;
  flex-grow: 1;
  width: auto;
  overflow-y: scroll;
  justify-content: center;
  align-items: center;
  padding: 4rem 4rem;
  ${AutoCompleteFieldWraper} {
    margin: 1rem 2.5rem;
  }
`;
const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  color: palevioletred;
`;

const MapContainer = styled.div`
  flex-direction: column;
  flex-grow: 1;
  align-items: stretch;
  height: 26rem;
  margin: 4rem 2rem;
  /* decorations */
  border-radius: 41px 41px 41px 41px;
  -moz-border-radius: 41px 41px 41px 41px;
  -webkit-border-radius: 41px 41px 41px 41px;
  border: 3px solid palevioletred;
  -webkit-box-shadow: 0px 40px 30px 15px rgba(0, 0, 0, 0.52);
  -moz-box-shadow: 0px 40px 30px 15px rgba(0, 0, 0, 0.52);
  box-shadow: 0px 40px 30px 15px rgba(0, 0, 0, 0.52);
  overflow: hidden;
`;

const styles = {
  Title,
  OptionsPanel,
  PanelContainer,
  Board,
  TextField,
  MapContainer,
  AutoCompleteFieldWraper,
};

export default styles;
