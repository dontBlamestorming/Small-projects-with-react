import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: false,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링 해보기',
      checked: false,
    },
    {
      id: 3,
      text: '일정 관리 앱 만들어 보기',
      checked: false,
    },
  ]);
  // 고유 값으로 사용될 id - ref를 사용하여 변수 담기
  const nextId = useRef(4);
  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1; // nextId 1씩 더하기
    },
    [todos], // todos값이 변경하는지 검사
  );
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} />
    </TodoTemplate>
  );
};

export default App;

/*
  todos 배열에 새 객체를 추가하는 onInsert() 
    1. map에 들어갈 key의 id는 useRef을 사용 -> 렌더링될 때 필요값 X, 단지 객체 추가에 참조할 값이기 때문
    2. props으로 잔딜헤애 할 함수는 useCallback으로 감싸는 것을 습관화 할 것
*/
