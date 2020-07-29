import React from "react";
import TodoListItem from "./TodoListItem";

const TodoList = ({ todos }) => {
  console.log(todos);
  console.log("This is TodoList.js");
  return (
    <div className="TodoList">
      {todos.map(todo => (
        <TodoListItem todo={todo} key={todo.id} />
      ))}
    </div>
  );
};

export default TodoList;
