import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./layouts";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
}

export default App;
