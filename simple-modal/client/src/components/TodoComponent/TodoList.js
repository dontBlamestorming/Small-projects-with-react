import React, { useCallback } from "react";
import TodoListItem from "./TodoListItem";
import "./TodoList.scss";

const TodoList = ({ todos, onRemove, onToggle, onChangeStatus }) => {
  const todoArr = [],
    doingArr = [],
    doneArr = [];

  const distributeTodos = useCallback(todos =>
    todos.map(
      todo => {
        if (todo.status === "toDo") {
          todoArr.push(todo);
        } else if (todo.status === "doing") {
          doingArr.push(todo);
        } else if (todo.status === "done") {
          doneArr.push(todo);
        }
      },
      [todos]
    )
  );

  distributeTodos(todos);

  const genTodoListItem = arr => {
    return arr.map(todo => (
      <TodoListItem
        todo={todo}
        key={todo.id}
        onRemove={onRemove}
        onToggle={onToggle}
        onChangeStatus={onChangeStatus}
      />
    ));
  };

  return (
    <div className="TodoList">
      <div>TODO</div>
      {genTodoListItem(todoArr)}
      <div>DOING</div>
      {genTodoListItem(doingArr)}
      <div>DONE</div>
      {genTodoListItem(doneArr)}
    </div>
  );
};

export default TodoList;
