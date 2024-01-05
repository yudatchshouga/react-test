import Cell from "./Cell";

type GameProps = {};

const Game: React.FC<GameProps> = () => {
  return (
    <div>
      {[...Array(4)].map((_, i) => (
        <div style={{ display: "flex" }} key={i}>
          {[...Array(4)].map((_, j) => (
            <Cell key={j} content="⚫︎" />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Game;
