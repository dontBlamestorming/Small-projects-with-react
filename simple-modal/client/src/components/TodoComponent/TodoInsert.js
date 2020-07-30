import React, { useState, useCallback } from "react";
import { MdAdd } from "react-icons/md";

const TodoInsert = ({ onInsert }) => {
  /*
   *
   */
  const [typedValue, setTypedValue] = useState("");
  const onChange = useCallback(e => {
    setTypedValue(e.target.value);
  }, []);

  /**
   * submit 이벤트 발생 시 부모 컴포넌트로 값을 전달하고 현재 컴포넌트 state 값을 초기화
   *
   * @onInsert() Todo로부터 받은 props
   */
  const submitHandler = useCallback(
    e => {
      e.preventDefault();
      onInsert(typedValue);
      setTypedValue("");
    },
    [onInsert, typedValue]
  );

  return (
    <form className="TodoInsert" onSubmit={submitHandler}>
      <input
        value={typedValue}
        onChange={onChange}
        placeholder="할 일을 입력하세요"
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
