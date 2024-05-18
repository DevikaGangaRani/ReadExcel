import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ExcelUpload from "./readExcel";
import ReadExcel from "./readExcel1";

function App() {
  return (
    <div className="App">
      <h1>Excel to Antd </h1>
      <ExcelUpload />
      <ReadExcel />
    </div>
  );
}

export default App;
