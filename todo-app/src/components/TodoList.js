import React, { useCallback } from 'react';
import { List } from 'react-virtualized';
import TodoListItem from './TodoListItem';
import './TodoListItem.scss';

const TodoList = ({ todos, onRemove, onToggle }) => {
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [onRemove, onToggle, todos],
  );

  return (
    <List
      className="TodoList"
      width={512} // 전체 크기
      height={513} // 전체 높이
      rowCount={todos.length} // 항목 개수
      rowHeight={57} // 항목 높이
      rowRenderer={rowRenderer} // 항목을 렌더링할 때 쓰는 함수
      list={todos} // 배열
      style={{ outline: 'none' }} // List에 기본 적용되는 outline 스타일 제거
    />
  );
};
/*
  return (
    <div className=" TodoList">
      {todos.map(todo => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
*/

export default React.memo(TodoList);

/*
    현재는 프로젝트 성능에 큰 영향을 주지는 않는다. 왜냐하면 App 컴포넌트가 re-rendring되는 유일한 이유는 todos 배열의 업데이트이기 때문이다. 하지만 App 컴포넌트에 다른 state들이 추가되어 해당 값들이 업데이트 될 때는 TodoList 컴포넌트가 불필요한 렌더링이 발생할 수 있기 때문에 지금 미리 최적화 시킨 것. 

    리스트 관련 컴포넌트는 리스트 아이템과, 리스트 이 두가지 컴포넌트를 최적화 하는 것을 잊지마라. 
*/

// 여러 종류의 값을 전달해야 하는 경우에는 객체를 통째로 전달하는 편이 성능 최적화에 편리하다.
