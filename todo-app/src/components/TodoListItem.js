import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

// MdCheckBox - 할 일이 완료되었을 때 체크된 상태를 표기할 것

const TodoListItem = ({ todo, onRemove, onToggle }) => {
  const { id, text, checked } = todo; // 객체 비구조화 할당
  //   위와 같은 코드
  //   const text = todo.text;
  //   const checked = todo.checked;
  //   const id = todo.id;
  return (
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
  );
};

export default TodoListItem;
