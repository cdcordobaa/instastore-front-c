import styled from "styled-components";

const MarkerPos = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
  border-radius: 50%;
  left: -10px;
  top: -10px;
  border: 1px solid blue;
  background: red;
  color: yellow;
`;
const K_SIZE = 220;

const MarkerPosCentered = styled.div`
  position: absolute;
  width: ${200};
  height: ${200};
  left: ${-200 / 2};
  top: ${-200 / 2};

  border: "5px solid #f44336";
  border-radius: 50%;
  background-color: white;
  text-align: center;
  color: "#3f51b5";
  font-size: 16;
  font-weight: bold;
  padding: 4;
  cursor: pointer;
`;

const styles = {
  MarkerPos,
  MarkerPosCentered,
};

export default styles;
