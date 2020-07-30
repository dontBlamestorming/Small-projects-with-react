import React from "react";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
  MdCheck,
  MdDirectionsRun
} from "react-icons/md";
import classname from "classnames";
import "./TodoListItem.scss";

const TodoListItem = ({ todo, onRemove, onToggle, onChangeStatus }) => {
  const { id, text, checked, status } = todo;

  const showTodo = () => {
    if (status === "toDo") {
      return (
        <div className="toDo">
          <div className="start" onClick={() => onChangeStatus(id)}>
            <MdDirectionsRun />
            START!
          </div>
          <div className="text">{text}</div>
          <div className="remove" onClick={() => onRemove(id)}>
            <MdRemoveCircleOutline />
          </div>
        </div>
      );
    }
  };

  const showDoing = () => {
    if (status === "doing") {
      return (
        <div className="doing">
          <div
            className={classname("checkbox", { checked })}
            onClick={() => onToggle(id)}
          >
            {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          </div>
          <div className="text">{text}</div>
        </div>
      );
    }
  };

  const showDone = () => {
    if (status === "done") {
      return (
        <div className="done">
          <div>
            <MdCheck />
          </div>
          <div className="text">{text}</div>
          <div className="remove" onClick={() => onRemove(id)}>
            <MdRemoveCircleOutline />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="TodoListItem">
      {showTodo()}

      {showDoing()}

      {showDone()}
    </div>
  );
};

export default TodoListItem;
