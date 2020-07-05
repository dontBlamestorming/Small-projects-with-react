import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
// http://react-icons.netlify.com/#/icons/md
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('');

  const onChange = useCallback(e => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    e => {
      onInsert(value);
      setValue(''); // value값 초기화
      e.preventDefault(); // submit 이벤트는 새로고침을 유발하기 때문에 이를 방지
    },
    [onInsert, value],
  );

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;

// form과 onSubmit을 사용하면 input에서 enter를 눌렀을 때도 발생함. 그냥 onClick으로 만들었다면 onKeyPress 이벤트를 통해 enter를 감지하는 로직을 따로 작성해야함
