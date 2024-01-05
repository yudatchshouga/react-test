type CellProps = {
  content: string;
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
      }}
    >
      {props.content}
    </div>
  );
};

export default Cell;
