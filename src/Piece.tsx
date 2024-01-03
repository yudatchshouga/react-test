import styled from "styled-components";
import CellState from "./CellState";
import PieceModel from "./models/PieceModel";

interface PieceProps {
  piece: PieceModel;
}

const SPiece = styled.div<{ color: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const Piece: React.FC<PieceProps> = ({ piece }) => {
  const color = piece === PieceModel.Black ? "black" : "white";
  return <SPiece color={color} />;
};

export default Piece;
