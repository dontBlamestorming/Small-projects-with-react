import React from "react";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline
} from "react-icons/md";
import classname from "classnames";

const TodoListItem = ({ todo }) => {
  console.log("this is TodoListItem");
  console.log(todo);
  const text = todo.text;
  console.log("text is " + text);

  return (
    <div className="TodoListItem">
      {/* <div className={classname("checkbox", { checked })}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </div>
      <div className="remove">
        <MdRemoveCircleOutline />
      </div> */}
    </div>
  );
};

export default TodoListItem;
