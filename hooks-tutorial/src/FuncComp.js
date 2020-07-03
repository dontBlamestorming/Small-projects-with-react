import React, { useState, useEffect } from "react";

const funcStyle = {
  componentWillMount: "color : red",
  render: "color : blue",
  componentDidMount: "color : yellow",
  shouldComponentUpdate: "color : green",
  componentWillUpdate: "color : black",
  componentDidUpdate: "color : gray",
  componentWillUnmount: "color : aqua",
  cleanUp: "color : navy"
};
let funcId = 0;

function FuncComp(props) {
  // 이 함수를 react가 호출할 때에 파라미터에 첫번째 인자 값으로 전달된 props 값을 전달하도록 약속되어 있다. (this.props로 아니다)
  const [number, setNumber] = useState(props.initNumber);
  const [date, setDate] = useState(new Date().toString());

  // Side Effect - 복수개 설치 가능
  useEffect(() => {
    console.log(
      "%cfunc => useEffect(componentDidMount)" + ++funcId,
      funcStyle.componentDidMount
    );
    return () => {
      console.log(
        "%cfunc => useEffect(componentWillUnmount)" + ++funcId,
        funcStyle.componentWillUnmount
      );
    };
  }, []);

  useEffect(() => {
    console.log(
      "%cfunc => useEffect(componentDidMount & componentDidUpdate)" + ++funcId,
      funcStyle.componentDidMount
    );
    document.title = number;
    return () => {
      console.log(
        "%cfunc => useEffect return => CleanUp" + ++funcId,
        funcStyle.componentWillUpdate
      );
    };
  }, [number]); // Skipping Effect

  console.log("%cfunc => render" + ++funcId, funcStyle.render);
  // Main Effect
  return (
    <div className="container">
      <h2>Function style Component</h2>
      <p>init Number : {number}</p>
      <input
        type="button"
        value="random"
        onClick={function() {
          setNumber(Math.random());
        }}
      />

      <p>date : {date}</p>
      <input
        type="button"
        value="date"
        onClick={function() {
          setDate(new Date().toString());
        }}
      />
    </div>
  );
}

export default FuncComp;
