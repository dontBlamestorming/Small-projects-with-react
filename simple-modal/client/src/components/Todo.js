import React, { useState, useRef, useCallback } from "react";
import TodoTemplate from "./TodoComponent/TodoTemplate";
import TodoInsert from "./TodoComponent/TodoInsert";
import TodoList from "./TodoComponent/TodoList";

const Todo = () => {
  const [todos, setTodos] = useState([]);

  const nextId = useRef(1);
  /**
   * 사용자로부터 typed된 값을 객체화 시킨 후 state로 업데이트
   *
   * @text TodoInsert의 state중 하나인 typedValue
   * @nextId 객체의 id값이 될 값
   */
  const addInsertedValue = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
        status: "toDo"
      };
      setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    [todos]
  );

  /**
   * 사용자가 '제거'버튼을 클릭한 이벤트 발생 시 해당 객체의 id값을 제외한 나머지 객체로 state 업데이트
   *
   * @id TodoListItem -> TodoList -> Todo로 넘겨진 todos state의 id
   */
  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id));
    },
    [todos]
  );

  const onToggle = useCallback(
    id => {
      setTodos(
        todos.map(todo =>
          todo.id === id
            ? { ...todo, checked: !todo.checked, status: "done" }
            : todo
        )
      );
    },
    [todos]
  );

  const onChangeStatus = useCallback(
    id => {
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, status: "doing" } : todo
        )
      );
    },
    [todos]
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={addInsertedValue} />
      <TodoList
        todos={todos}
        onRemove={onRemove}
        onToggle={onToggle}
        onChangeStatus={onChangeStatus}
      />
    </TodoTemplate>
  );
};

export default Todo;
