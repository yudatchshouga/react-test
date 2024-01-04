import Game from "./components/Game";

const App = () => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>オセロ</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Game />
      </div>
    </>
  );
};

export default App;
