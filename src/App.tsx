import { useState } from "react";
import "./App.css";
import styled from "styled-components";
import Board from "./Board";

const App = () => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>オセロ</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Board />
      </div>
    </>
  );
};

export default App;
