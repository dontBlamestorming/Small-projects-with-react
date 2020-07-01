import React, { useRef } from "react";

/*
    클래스형 컴포넌트에서의 로컬변수 사용
    class RefSample extends React.Component {
    id = 1;
    setId = n => {
        this.id = n;
    };

    printId = () => {
        console.log(this.id);
    };

    render() {
        return <div>RefSample</div>;
    }
    }
*/
const RefSample = () => {
  const id = useRef(1);
  console.log(id);
  const setId = n => {
    id.current = n;
  };

  const printId = () => {
    console.log(id.current);
  };

  return <div>RefSample</div>;
};

export default RefSample;
