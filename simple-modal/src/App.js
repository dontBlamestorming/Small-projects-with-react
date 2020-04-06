import React, { Component } from 'react';
import './App.css';     // reading css file

// Components
import Clock from './components/Clock'
// import Bg_photo from './components/Bg_photo'
// import Greeting from './components/Greeting'
// import Todolist from './components/Todolist'
// import Weather from './components/Weather'

function runClock () {
  const clock = document.querySelector('#root .App #clock');
  const clockTitle = clock.querySelector('.container .clock');
  
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours} : ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  runClock();
  setInterval(runClock, 1000);
}

class App extends Component {
  componentDidMount(){
    init();
  }
  
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
