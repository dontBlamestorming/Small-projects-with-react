import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

// MdCheckBox - 할 일이 완료되었을 때 체크된 상태를 표기할 것

const TodoListItem = ({ todo, onRemove, onToggle, style }) => {
  const { id, text, checked } = todo; // 객체 비구조화 할당
  //   위와 같은 코드
  //   const text = todo.text;
  //   const checked = todo.checked;
  //   const id = todo.id;
  return (
    <div className="TodoListItem-virtualized" style={style}>
      <div className="TodoListItem">
        <div
          className={cn('checkBox', { checked })}
          onClick={() => {
            onToggle(id);
          }}
        >
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          <div className="text">{text}</div>
        </div>
        <div className="remove" onClick={() => onRemove(id)}>
          <MdRemoveCircleOutline />
        </div>
      </div>
    </div>
  );
};

export default React.memo(
  TodoListItem,
  (prevProps, nextProps) => prevProps.todo === nextProps.todo,
);

/*
    결과적으로 만들어지는 JSX의 전체를 생각해보자. 
    <TodoTemplate>
        <TodoInsert /> - <중략>
        <div className="TodoList">
            <TodoList todo={todo} key={1} onRemove={onRemove} onToggle={onToggle} /> = 
            <div className="TodoListItem">
                <TodoListItem />
            <div>
            <TodoList todo={todo} key={2} onRemove={onRemove} onToggle={onToggle} /> = 
            <div className="TodoListItem">
                <TodoListItem />
            <div>
            <TodoList todo={todo} key={3} onRemove={onRemove} onToggle={onToggle} /> = 
            <div className="TodoListItem">
                <TodoListItem />
            <div>
                        ~ 2500개
        <div>
    </TodoTemplate>

    최종적으로는 이런식으로 그려져 있을 것이다. 각각의 <TodoList />의 props로 각각의 onRemove, onToggle을 호출할 수 있는 props가 있는 것이다. 그 밑에 <TodoListItem />의 export default에 React.memo(TodoListItem)은 그 각각의 컴포넌트의 props로 받는 todos, onRemove, onToggle의 변화가 없으면 다시 해당 컴포넌트를 rendering하지 않게 막아준다. 

    더 자세하게는 key = 1 <TodoList /> 안의 <TodoListItem />의 onToggle함수가 호출되면 App.js의 state가 바뀌고, 최상위 컴포넌트가 바뀜에 따라 하위의 모든 컴포넌트는 리렌더링 되어야 하지만 key = 1인 컴포넌트에 변동이 생겼기 때문에 이 컴포넌트만 리렌더링 되고 key = 2, key = 3 ... key = 2500인 컴포넌트는 그대로 유지된다. 

    Q - 각각의 onToggle props는 onToggle함수를 갖고있는 건가? 아니면 좌표(?)만 갖고있다가 클릭했을 때 호출하는건가? 어쨋든 호출될 때 key = 1인 컴포넌트에서 호출됬다는 것을 어떻게 알고?
*/
