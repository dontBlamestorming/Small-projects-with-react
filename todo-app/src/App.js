import React, { useState, useRef, useCallback, useReducer } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

function toReducer(todos, action) {
  console.log(todos);
  console.log(action.type);
  switch (action.type) {
    case 'INSERT': // 새로추가
      // { type : 'INSERT', todo: { id : 1, text : 'todo', checked : false }}
      return todos.concat(action.todo);
    case 'REMOVE': // 제거
      // { type: 'REMOVE', id : 1 }
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE': // 토글
      // { type: 'REMOVE', id : 1}
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

const App = () => {
  // useState의 기본값으로 함수 자체를 넣어주면 컴포넌트가 처음 렌더링 될 때만 해당 함수가 실행
  // 만약 해당함수() 식으로 넣으면 리렌더링 될 때마다 해당 함수가 호출됨
  const [todos, dispatch] = useReducer(toReducer, undefined, createBulkTodos); //???? 작동원리 이해안감]
  // undefined 때문에 이 컴포넌트가 처음 렌더링 될 때만 createBulkTodos 함수가 호출됨 - 이유는 모름

  // 고유 값으로 사용될 id - ref를 사용하여 변수 담기
  const nextId = useRef(2501);

  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };

    dispatch({ type: 'INSERT', todo });
    nextId.current += 1; // nextId 1씩 더하기
  }, []);

  const onRemove = useCallback(id => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  // 렌더링 되어 있는 데이터의 id는 1,2,3 ... , n 이 있을 것이다. 예를들면 onClick 이벤트가 발생한 데이터의 id가 3이라고 가정해보자. 위의 onRemove의 filter함수조건이 todo.id !== id이다. 여기서 todo.id는 렌더링되어있는 전체 id이며 조건식 뒤의 id는 3이다. 즉, 전체 id값 중 3이 아닌 데이터를 필터하여 새로운 배열을 만드는 것이라고 생각하면 이해하기 쉽다.

  const onToggle = useCallback(id => {
    dispatch({ type: 'TOGGLE', id });
  }, []);

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

    전개구문은 얕은 복사(Shallow copy)를 한다. 만약 객체 내부의 객체를 불변성을 유지하며 새 값을 할당하려면 복잡하다.
    const complexObject = {SOMETHING};
    const nextComplexObject = {
      ...complexObject,
      objectInside: {
        ...complexObject.objectInside,
        enabled : false
      }
    };

    console.log(complexObject === nextComplexObject) // false
    console.log(complexObject.objectInside === nextComplexObject.objectInside) // false

    까다롭다. Immer라는 라이브러리를 사용하자.

*/
