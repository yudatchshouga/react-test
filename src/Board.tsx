import styled from "styled-components";

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

const renderPiece = (cell: string) => {
  if (cell === "BLACK") {
    return <SBlackPiece />;
  } else if (cell === "WHITE") {
    return <SWhitePiece />;
  }
  return null;
};

const Board = () => {
  const board = Array(8)
    .fill(null)
    .map(() => Array(8).fill("EMPTY"));

  board[3][3] = "BLACK";
  board[3][4] = "WHITE";
  board[4][3] = "WHITE";
  board[4][4] = "BLACK";

  console.log(board);

  return (
    <div>
      {[...Array(8)].map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {[...Array(8)].map((_, cellIndex) => (
            <SCell key={cellIndex}>
              {renderPiece(board[rowIndex][cellIndex])}
            </SCell>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
