/*
    ColorContext안의 색상을 참조할 것
    색상을 props로 받아오는 것이 아닌 ColorContext의 Consumer라는 컴포넌트를 통해 색상을 참조
*/

import React, { useContext } from "react";
import ColorConsumer from "../contexts/color";

const ColorBox = () => {
  const { state } = useContext(ColorConsumer);
  return (
    <>
      <div
        style={{
          width: "64px",
          height: "64px",
          background: state.color
        }}
      />
      <div
        style={{
          width: "32px",
          height: "32px",
          background: state.subcolor
        }}
      />
    </>
  );
};

export default ColorBox;
/*
    객체 비구조화 할당 문법을 사용하면 value로 값을 조회하는 과정을 생략할 수 있다.
    [value를 받아오는 경우]
    <ColorConsumer>
      {value => (
        <>
          <div
            style={{
              width: "64px",
              height: "64px",
              background: value.state.color
            }}
          />
          <div
            style={{
              width: "32px",
              height: "32px",
              background: value.state.subcolor
            }}
          />
        </>
      )}
    </ColorConsumer>

    [객체를 그대로 사용하는 경우] - 위의 코드
*/

/*
    <ColorContext.Consumer> 사이에 중괄호를 열어 그 안에 함수를 넣었다. 이러한 패턴을 fucntion as a child, render props라고 한다. 컴포넌트의 children이 있어야 할 자리에 일반 JSX 혹은 문자열이 아닌 함수를 전달하는 것

    // RenderPropsSample.js
    const RenderPropsSample = ({ children }) => {
        return <div> 결과 : {children(5)}</div>
    }

    export default RenderPropsSample;
    // someOtherComponent.js
    <RenderPropsSample>{value => value * 2}</RenderPropsSample>

*/
