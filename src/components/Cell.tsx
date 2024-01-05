type CellProps = {
  content: string;
  onClick: () => void;
  puttable: boolean;
};

const Cell: React.FC<CellProps> = (props) => {
  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: props.puttable ? "green" : "white",
      }}
      onClick={props.onClick}
    >
      {props.content}
    </div>
  );
};

export default Cell;
