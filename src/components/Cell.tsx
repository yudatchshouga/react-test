import styled from "styled-components";
import Piece from "./Piece";
import CellModel from "../models/CellModel";
import PieceModel from "../models/PieceModel";

interface CellProps {
  cell: CellModel;
  onClick: () => void;
}

const cellSize: number = 70;
const defaultColor: string = "#29a83f";
const canPutColor: string = "lightgreen";

const SCell = styled.div<{ color: string }>`
  width: ${cellSize}px;
  height: ${cellSize}px;
  background-color: ${(props) => props.color};
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Cell: React.FC<CellProps> = ({ cell, onClick }) => {
  const color = cell.getCanPut() ? canPutColor : defaultColor;
  return (
    <SCell onClick={onClick} color={color}>
      {cell.piece !== PieceModel.None && <Piece piece={cell.piece} />}
    </SCell>
  );
};

export default Cell;
