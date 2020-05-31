import styled from "styled-components";
import {
  TextField as MTextField,
  InputAdornment,
  Button as MButton,
  Icon,
} from "@material-ui/core";

export const TextField = styled(MTextField)``;
export const Button = styled(MButton)``;

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
  ${TextField} {
    margin: 1rem 2.5rem;
  }
  ${Button} {
    margin: 1rem 2.5rem;
    max-width: 12rem;
  }
`;

const Board = styled.div`
  min-width: 250px;
  flex-grow: 1;
  width: auto;
`;
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
const CustomButton = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  /* Color the border and text with theme.main */
  color: ${(props) => props.theme.main};
  border: 2px solid ${(props) => props.theme.main};
`;

const styles = {
  Title,
  CustomButton,
  OptionsPanel,
  PanelContainer,
  Board,
  TextField,
};

export default styles;
