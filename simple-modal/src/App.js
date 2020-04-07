import React, { Component } from 'react';
import './App.css';     // reading css file

// Components
import Clock from './components/Clock'
import Bg_photo from './components/BgPhoto'
import Greeting from './components/Greeting'
import Todolist from './components/Todolist'
import Weather from './components/Weather'

function ClockInit() {
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

  init();
}

function GreetingInit() {

  const greetingId = document.querySelector("#root .App #greeting");
  const greeting_form = greetingId.querySelector(".greeting");
  const greeting_input = greeting_form.querySelector("input");
  const greeting = greetingId.querySelector("h2");

  const Key = "GREETING" //key storage
  const ACTIVE_CN = "active";
  
  function saveName(text) {
    localStorage.setItem(Key, text);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const currentValue = greeting_input.value;
    sayGreeting(currentValue);
    saveName(currentValue);
  }

  function askForName() {
    greeting_form.addEventListener("submit", handleSubmit);
  }

  function sayGreeting(text) {
    greeting_form.removeChild(greeting_input);
    greeting.classList.add(ACTIVE_CN);
    greeting.innerHTML = `안녕하세요 ${text}님.`
  }

  function loadName() {
    const currentUser = localStorage.getItem(Key);
        if(currentUser === null){
            askForName(); //nobody
        } else {
            sayGreeting(currentUser); //somebody
        }
  }

  function init() {
    loadName();
  }

  init();
}

function TodolistInit() {
  const manageTask = document.querySelector("#manageTask");           

  const todo_list = manageTask.querySelector(".todo_list");           // get todo
  const typedText = todo_list.querySelector("input");
  const todo_content = manageTask.querySelector(".todo_content");

  const doing_list = manageTask.querySelector(".doing_list");         // get doing
  const doing_content = manageTask.querySelector(".doing_content");   

  const done_list = manageTask.querySelector(".done_list");           // get done
  const done_content = manageTask.querySelector(".done_content");


  function manageBtn(thisCon, thisText, event) {
      const targetBtn = event.target;
      const targetList = targetBtn.parentNode;
  
      thisCon.removeChild(targetList);
      
      if (thisCon === todo_content) {
          attachList(doing_content, thisText);
      } else if (thisCon === doing_content) {
          attachList(done_content, thisText);
      }
  }

  function attachList(content, text=null) {           
      const li = document.createElement("li");
      const button = document.createElement("button");
      const span = document.createElement("span");

      if(text) {
          content.appendChild(li);
          li.appendChild(button);
          li.appendChild(span);

              if(content === todo_content) {
                  button.innerText = "START"
              } else if (content === doing_content) {
                  button.innerText = "DONE"
              } else if (content === done_content) {
                  button.innerText = "DELETE"
              } else { 
              return false;
          }
      } 

      span.innerText = text;
      
      button.addEventListener("click", function(event) {

          manageBtn(content, span.innerText, event)
      })  
  }

  function submitHandler(event) {
      event.preventDefault();
      const currentVal = typedText.value;
      attachList(todo_content, currentVal);
      typedText.value = "";
  }

  function init() {
      todo_list.addEventListener("submit", submitHandler);
  }

  init();
}

function BgPhotoInit() {
  const backGroundImg = document.querySelector("#root .App .bgPhoto");
  const unsplashUrl = "https://source.unsplash.com/category/nature/1600x900";

  function getImage() {
    let bgImg = new Image();
      bgImg.alt = "배경화면";
      bgImg.src = unsplashUrl;
      backGroundImg.appendChild(bgImg);
  }

  function init(){
    getImage();

  }

  init();
}

function WeatherInit() {
  const apiKey = "fe87d2db4c789eedcaf2f90c1fa980b8";
  const weather = document.querySelector("#root .App #weather .container .weather");
  
  //strage key name
  const coords = "coords";
  
  function getweather(broughtInfo) {
    const lat = broughtInfo.laPosition;
    const log = broughtInfo.loPosition;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${apiKey}&units=metric`; 

    fetch(url)
      .then(function(response) {
        return response.json();
      })
        .then(function(json) {
          const temperature = json.main.temp;
          const place = json.name;
          weather.innerText = `${temperature} @ ${place}`;
        });
  }
  
  function savePosition(coord) {
    localStorage.setItem(coords, JSON.stringify(coord));
  }
  
  function dropPosition(position) {
    const laPosition = position.coords.latitude;
    const loPosition = position.coords.longitude;
    const positionObj = {
      laPosition,
      loPosition
    };

    savePosition(positionObj);
    getweather(laPosition, loPosition);
  }
  
  function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(dropPosition);
        console.log('this is getLocation')
      } else {
        weather.innerHTML = "Geolocation is not supported by this browser.";
      }
  }
  
  function init() {
      const bringInfo = localStorage.getItem(coords);
      if (bringInfo === null){
        console.log('this is bringInfo')
        getLocation();
      } else {
        const broughtInfo = JSON.parse(bringInfo);
        getweather(broughtInfo);
      }
  }
  
  init();
}
class App extends Component {

  componentDidMount(){
    ClockInit();
    GreetingInit();
    TodolistInit();
    BgPhotoInit();
    WeatherInit();
  }

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
