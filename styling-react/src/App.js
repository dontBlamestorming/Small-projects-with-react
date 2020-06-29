import React from "react";
import SassComponent from "./SassComponent";
import CSSModule from "./CSSModule";
import StyledComponent from "./StyledComponent";

class App extends React.Component {
  render() {
    return (
      <div>
        <SassComponent />
        <CSSModule />
        <StyledComponent />
      </div>
    );
  }
}

export default App;
