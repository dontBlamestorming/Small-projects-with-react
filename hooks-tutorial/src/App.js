import React, { useState } from "react";
import "./App.css";
import Counter from "./Counter";
import Info from "./Info";
import Average from "./Average";

const App = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Average></Average>
    </div>
    // <div>
    //   <button
    //     onClick={() => {
    //       setVisible(!visible); // false -> true, true -> false
    //     }}
    //   >
    //     {visible ? "숨기기" : "보이기"}
    //   </button>
    //   <hr />
    //   {visible && <Info />}
    // </div>
  );
};

export default App;
