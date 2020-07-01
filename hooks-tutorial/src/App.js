import React, { useState } from "react";
import "./App.css";
import Counter from "./Counter";
import Info from "./Info";
import Average from "./Average";
import RefSample from "./RefSample";

const App = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <RefSample></RefSample>
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
