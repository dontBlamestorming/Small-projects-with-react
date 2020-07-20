import React from 'react';

const TodoItem = ({ todo, onToggle, onRemove }) => {
  return (
    <div>
      <input type="checkbox" />
      <span>예제 테스트</span>
      <button>삭제</button>
    </div>
  );
};

// input -> 인풋에 입력되는 텍스트 / todos -> 할 일 목록이 들어 있는 객체
const Todos = ({ input, todos, onChangeInput, onInsert }) => {
  const onSubmit = e => e.preventDefault();
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input />
        <button type="submit">등록</button>
      </form>
      <div>
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
      </div>
    </div>
  );
};

export default Todos;

/*
    파일 하나에 두 컴포넌트를 선언했다. 취향에 따라 Todos와 TodoItem 파일을 구분해도 되고 위와 같이 파일 하나에 작성해도 무방하다.
*/
