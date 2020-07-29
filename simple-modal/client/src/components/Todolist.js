import React, { Component } from "react";

function TodolistInit() {
  const manageTask = document.querySelector("#manageTask");

  const todo_list = manageTask.querySelector(".todo_list"); // get todo
  const typedText = todo_list.querySelector("input");
  const todo_content = manageTask.querySelector(".todo_content");

  const doing_list = manageTask.querySelector(".doing_list"); // get doing
  const doing_content = manageTask.querySelector(".doing_content");

  const done_list = manageTask.querySelector(".done_list"); // get done
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

  function attachList(content, text = null) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    const span = document.createElement("span");

    if (text) {
      content.appendChild(li);
      li.appendChild(button);
      li.appendChild(span);

      if (content === todo_content) {
        button.innerText = "START";
      } else if (content === doing_content) {
        button.innerText = "DONE";
      } else if (content === done_content) {
        button.innerText = "DELETE";
      } else {
        return false;
      }
    }

    span.innerText = text;

    button.addEventListener("click", function(event) {
      manageBtn(content, span.innerText, event);
    });
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

class Todolist extends Component {
  componentDidMount() {
    TodolistInit();
  }

  render() {
    return (
      <div id="manageTask">
        <div id="todo">
          <div className="todo_title">
            <h2>TO DO LIST</h2>
          </div>
          <form className="todo_list">
            <input type="text" placeholder="type what you have to do" />
          </form>
          <ul className="todo_content"></ul>
        </div>

        <div id="doing">
          <div className="doing_title">
            <h2>DOING</h2>
          </div>
          <form className="doing_list"></form>
          <ul className="doing_content"></ul>
        </div>

        <div id="done">
          <div className="done_title">
            <h2>DONE</h2>
          </div>
          <form className="done_list"></form>
          <ul className="done_content"></ul>
        </div>
      </div>
    );
  }
}

export default Todolist;
