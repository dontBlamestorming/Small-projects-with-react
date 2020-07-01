import React, { useState } from "react";
import "./App.css";
import Counter from "./Counter";
import Info from "./Info";

const App = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Counter></Counter>
      <Info></Info>
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
