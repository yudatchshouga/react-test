import styled from "styled-components";
import CellState from "./CellState";

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

const Piece = ({ color }: { color: CellState }) => {
  return color === CellState.Black ? <SBlackPiece /> : <SWhitePiece />;
};

export default Piece;
