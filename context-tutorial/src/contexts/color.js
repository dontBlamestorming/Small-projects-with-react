import React, { createContext, useState } from "react";

const ColorContext = createContext({
  // 초기화
  state: {
    color: "black",
    subcolor: "red"
  },
  action: {
    setColor: () => {},
    setSubcolor: () => {}
  }
  // 실제 Provider의 value에 넣는 객체의 형태와 일치시켜 주는 것이 좋다. 이렇게 하면 Context 코드를 볼 때 내부 값이 어떻게 구성되어 있는지 파악하기도 쉽고, 실수로 Provider를 사용하지 않았을 때 리엑트에서 에러가 발생하지 않는다.
});

const ColorProvider = ({ children }) => {
  const [color, setColor] = useState("black");
  const [subcolor, setSubcolor] = useState("red");

  const value = {
    state: { color, subcolor },
    actions: { setColor, setSubcolor }
  };
  // state 객체와 action 객체를 분리해주면 나중에 다른 컴포넌트에서 Context 값을 사용할 때 편리

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

const { Consumer: ColorConsumer } = ColorContext;
// const ColorConsumer = ColorContext.Consumer

export { ColorProvider, ColorConsumer };
// ColorProvider와 ColorConsumer 내보내기

export default ColorContext;
