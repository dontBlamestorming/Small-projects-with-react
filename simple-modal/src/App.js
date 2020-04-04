import React, { Component } from 'react';
import './App.css';     // reading css file

// Components
import Clock from './components/Clock'
// import Bg_photo from './components/Bg_photo'
// import Greeting from './components/Greeting'
// import Todolist from './components/Todolist'
// import Weather from './components/Weather'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Clock></Clock>
        {/* <Bg_photo></Bg_photo>
        <Greeting></Greeting>
        <Todolist></Todolist>
        <Weather></Weather> */}
      </div>
    )
  }
}

export default App;
