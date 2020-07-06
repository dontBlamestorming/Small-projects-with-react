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

  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id));
    },
    [todos],
  );

  // 렌더링 되어 있는 데이터의 id는 1,2,3 ... , n 이 있을 것이다. 예를들면 onClick 이벤트가 발생한 데이터의 id가 3이라고 가정해보자. 위의 onRemove의 filter함수조건이 todo.id !== id이다. 여기서 todo.id는 렌더링되어있는 전체 id이며 조건식 뒤의 id는 3이다. 즉, 전체 id값 중 3이 아닌 데이터를 필터하여 새로운 배열을 만드는 것이라고 생각하면 이해하기 쉽다.

  const onToggle = useCallback(id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  });

  // 인자로 받을 id(아마 onToggle 이벤트가 발생한 id겠지)와

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;

/*
  todos 배열에 새 객체를 추가하는 onInsert() 
    1. map에 들어갈 key의 id는 useRef을 사용 -> 렌더링될 때 필요값 X, 단지 객체 추가에 참조할 값이기 때문
    2. props으로 잔딜헤애 할 함수는 useCallback으로 감싸는 것을 습관화 할 것
*/

/*
 const onToggle = useCallback((id) => {
        console.log(id);
        let newTodos = todos.map((todo) => {
            let result = null;
            if (todo.id === id) {
                console.log("전개구문을 이용한 {...todo}값", { ...todo });
                result = { ...todo, checked: !todo.checked };

                console.log(
                    "전개구문 이후 checked의 반대되는 boolean값을 덮어씌우는값 ",
                    { ...todo, checked: !todo.checked }
                );
            } else {
                result = todo;
            }
            return result;
        });
        setTodos(newTodos);
    });

  전개구문을 사용하는 이유
  const onToggle = useCallback((id) => {
        console.log(id);
        let newTodos = todos.map((todo) => {
            let result = null;
            if (todo.id === id) {
                result = {
                    id: todo.id,  //귀찮은부분
                    text: todo.text, //귀찮은부분
                    checked: !todo.checked,
                };
            } else {
                result = todo;
            }
            return result;
        });
        setTodos(newTodos);
    });
*/
