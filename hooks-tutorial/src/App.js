import React, { useState } from "react";
import "./App.css";
import FuncComp from "./FuncComp";
import ClassComp from "./ClassComp";

function App() {
  const [showClassComp, setShowClassComp] = useState(true);
  const [showFuncComp, setShowFuncComp] = useState(true);
  return (
    <div className="container">
      <h1>Hello temper</h1>
      {showClassComp ? <FuncComp initNumber={2}></FuncComp> : null}
      {showFuncComp ? <ClassComp initNumber={2}></ClassComp> : null}
      <input
        type="button"
        value="removeClassComp"
        onClick={() => {
          setShowClassComp(false);
        }}
      />
      <input
        type="button"
        value="removeFuncComp"
        onClick={() => {
          setShowFuncComp(false);
        }}
      />
    </div>
  );
}
export default App;
