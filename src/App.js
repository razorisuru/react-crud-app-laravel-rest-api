import React from "react"
import { Link } from "react-router-dom"
import MyRouter from "./router/index.js"
import NavBar from "./components/NavBar.js";


function App() {
  return (
    <div>
      <NavBar />

      <MyRouter />
    </div>
  );
}

export default App;
