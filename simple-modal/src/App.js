import React, { Component } from 'react';
import './css/reset.css';     // reading css file
import './css/style.css';     // reading css file

// Components
import Clock from './components/Clock'
import Bg_photo from './components/BgPhoto'
import Greeting from './components/Greeting'
import Todolist from './components/Todolist'
import Weather from './components/Weather'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Clock></Clock>
        <Greeting></Greeting>
        <Todolist></Todolist>
        <Weather></Weather>
        <Bg_photo></Bg_photo>
      </div>
    )
  }
}

export default App;
