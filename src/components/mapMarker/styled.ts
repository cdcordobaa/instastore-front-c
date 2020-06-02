import styled from "styled-components";

interface MarkerProps {
  size: number;
  hoover: boolean;
}

const MarkerPosCentered = styled.div<MarkerProps>`
  position: absolute;
  width: ${(props) => props.size || 1}rem;
  height: ${(props) => props.size || 1}rem;
  left: ${(props) => -props.size / 2 || 1}rem;
  top: ${(props) => -props.size / 2 || 1}rem;

  border: 1px solid black;
  border-radius: 50%;
  background-color: white;
  text-align: center;
  background: palevioletred;
  font-size: 16;
  font-weight: bold;
  padding: 4;
  cursor: pointer;
  svg {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
`;

const styles = {
  MarkerPosCentered,
};

export default styles;
