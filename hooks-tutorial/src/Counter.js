import React, { useState, useReducer } from "react";

function reducer(state, action) {
  console.log(action);
  //action.type에 따라 다른 작업 수행
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 };
    case "DECREMENT":
      return { value: state.value - 1 };
    default:
      //아무것도 해당되지 않을 때 기존 상태 반환
      return state;
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });
  // state는 현재를 가리키고 있는 상태, dispatch(action)형태로
  console.log(state); // { value : }
  console.log(dispatch); // f dispatchAction(fiber, queue, action) {}
  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b>
      </p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
    </div>
  );
};

/*


*/

/*
    const Counter = () => {
    const [value, setValue] = useState(0);
    return (
        <div>
        <p>
            현재 Counter의 값은 <b>{value}</b>입니다.
        </p>
        <button onClick={() => setValue(value + 1)}>+1</button>
        <button onClick={() => setValue(value - 1)}>+1</button>
        </div>
    );
    };
*/

export default Counter;
