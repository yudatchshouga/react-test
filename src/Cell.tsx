import styled from "styled-components";
import CellState from "./CellState";

const cellColor = "#29a83f";
const cellSize = 70;

const SCell = styled.div`
  width: ${cellSize}px;
  height: ${cellSize}px;
  background-color: ${cellColor};
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SPiece = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const SBlackPiece = styled(SPiece)`
  background-color: black;
`;
const SWhitePiece = styled(SPiece)`
  background-color: white;
`;

const Cell = ({ state }: { state: CellState }) => {
  const renderPiece = () => {
    if (state === CellState.Black) {
      return <SBlackPiece />;
    } else if (state === CellState.White) {
      return <SWhitePiece />;
    }
    return null;
  };

  return <SCell>{renderPiece()}</SCell>;
};

export default Cell;
