import styled from "styled-components";

interface CellProps {
  cell: string;
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
  const color = cell === "None" ? canPutColor : defaultColor;
  return (
    <SCell onClick={onClick} color={color}>
      {cell}
    </SCell>
  );
};

export default Cell;
