import styled from "styled-components";
import CellState from "./CellState";
import Piece from "./Piece";

const cellColor: string = "#29a83f";
const cellSize: number = 70;

const SCell = styled.div`
  width: ${cellSize}px;
  height: ${cellSize}px;
  background-color: ${cellColor};
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface CellProps {
  state: CellState;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ state, onClick }) => {
  return (
    <SCell onClick={onClick}>
      {state !== CellState.Empty && <Piece state={state} />}
    </SCell>
  );
};

export default Cell;
