import React, { Component } from "react";

/*
일반 JS로 구현했을 때
function GreetingInit() {
  const greetingId = document.querySelector("#root .App #greeting");
  const greeting_form = greetingId.querySelector(".greeting");
  const greeting_input = greeting_form.querySelector("input");
  const greeting = greetingId.querySelector("h2");

  const Key = "GREETING"; //  key storage
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
    greeting.innerHTML = `안녕하세요 ${text}님.`;
  }

  function loadName() {
    const currentUser = localStorage.getItem(Key);
    if (currentUser === null) {
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
*/
class Greeting extends Component {
  render() {
    return (
      <div id="greeting">
        <form className="greeting">
          <input type="text" placeholder="이름을 써주세요." />
        </form>
        <h2>안녕하세요. {this.props.nickname}님. 반갑습니다.</h2>
      </div>
    );
  }
}

export default Greeting;
