import React, { useState } from "react";
import TodoTemplate from "./TodoComponent/TodoTemplate";
import TodoInsert from "./TodoComponent/TodoListItem";
import TodoList from "./TodoComponent/TodoList";

const Todo = () => {
  const [todos, setTodo] = useState([
    {
      id: 1,
      text: "테스트용 문장",
      checked: false
    },
    {
      id: 2,
      text: "테스트용 문장2",
      checked: true
    },
    {
      id: 3,
      text: "테스트용 문장3",
      checked: false
    }
  ]);

  return (
    <TodoTemplate>
      <TodoInsert />
      <TodoList todos={todos} />
    </TodoTemplate>
  );
};

export default Todo;
