import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import './TodoListItem.scss';

// MdCheckBox - 할 일이 완료되었을 때 체크된 상태를 표기할 것

const TodoListItem = () => {
  return (
    <div className="TodoListItem">
      <div className="checkBox">
        <MdCheckBoxOutlineBlank />
        <div className="text">할 일</div>
      </div>
      <div className="remove">
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default TodoListItem;
