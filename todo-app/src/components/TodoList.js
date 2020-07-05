import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoListItem.scss';

const TodoList = ({ todos }) => {
  return (
    <div className=" TodoList">
      {todos.map(todo => (
        <TodoListItem todo={todo} key={todo.id} />
      ))}
    </div>
  );
};

export default TodoList;
// 여러 종류의 값을 전달해야 하는 경우에는 객체를 통째로 전달하는 편이 성능 최적화에 편리하다.
