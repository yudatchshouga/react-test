import styled from "styled-components";
import CellState from "./CellState";

interface PieceProps {
  state: CellState;
}

const SPiece = styled.div<{ color: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const Piece: React.FC<PieceProps> = ({ state }) => {
  const color = state === CellState.Black ? "black" : "white";
  return <SPiece color={color} />;
};

export default Piece;
