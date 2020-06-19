import React, { Fragment } from "react";
import "./App.css";
// node_modules 디렉토리에 react 모듈이 설치되는데 그것을 가져오는 것

function App() {
  // 함수형 컴포넌트
  const name = "리액트";
  const notDefined = undefined;
  const style = {
    // (10)
    backgroundColor: "black", // background-color
    color: "aqua",
    fontSize: "48px",
    fontWeight: "bold",
    padding: 16 // 단위를 생략하면 px로 지정됨
  };

  return (
    //(9) JSX -> 번들링 과정에서 바벨에 의해 JS 코드로 변환
    // notDefined - Nothing was returned from render.
    <Fragment>
      {name === "리액트" ? ( // (5), (6)
        <h1>조건부 연산자 사용(name = 리액트 -> TRUE)</h1>
      ) : (
        <h2>조건부 연산자 사용(name = 리엑트 -> FALSE)</h2>
      )}

      {name === "리액트" && <h1>AND 연산자가 TURE일 때</h1> // (7)
      }

      {notDefined || "값이 undefined인 경우(JSX 내에만 가능)" //{8}
      }

      <div style={style}>미리 선언한 스타일 객체 적용</div>

      <div
        style={
          // 시작 태그를 여러줄로 작성한다면 여기에 주석 가능.
          {
            backgroundColor: "gray",
            color: "black",
            fontSize: "48px",
            fontWeight: "bold",
            padding: 16
          }
        }
      >
        스타일 직접 적용
      </div>

      <div className="react">className을 이용하여 App.css의 스타일 적용</div>
    </Fragment>
  );
}

export default App;

/*
<JSX 코드>
  (1). 보기 쉽고 익숙하다.
  (2). 하나의 컴포넌트를 html의 태그와 비슷하게 사용할 수 있다. 
  (3). 부모 요소(태그)가 감싸야한다. 왜냐하면 Virtual DOM에서 기존의 DOM과 컴포넌트 변화를 효율적으로 감지하기 위해 컴포넌트 내부는 하나의 DOM 트리 구조로 이루어져야 한다는 규칙때문.
  (4). react 모듈에 들어 있는 <Fragment>는 부모 요소로 사용할 수 있으며 부모 요소로서 '<> </>'도 사용가능
  (5). {}내부에 자바스크립트 표현식을 사용할 수 있음.
  (6). if문을 사용하고 싶으면 JSX 밖에서 사전에 값을 설정 또는 JSX내에서는 조건부 연산자를 사용
  (7). AND 연산자(&&)을 사용한 조건부 렌더링(조건부 연산자 사용 X) - 리액트는 false값은 rendering하지 않는다. 거꾸로 말하면 true값은 rendering을 한다. 
    주의) '0'은 falsy한 값으로서 false가 아니다. 그래서 redering이 된다.
  (8) 함수에서 어떤 값이 undefined일 수도 있다면 OR(||)연산자를 사용해라. 리엑트는 undefined만 반환하여 rendering할 수 없다. 하지만 JSX 내에서는 가능하다.
  (9) return의 ()는 필수사항은 아니다. 한 줄로 표현할 수 있는 JSX는 감싸지 않는다.
  (10) 리엑트에서 DOM 요소에 스타일을 적용할 때에는 문자열 형태가 아닌 객체형태로 넣어야 한다. 카멜표기법을 따라야 한다. 바로 style값을 적용할 때에는 (11)
  (12) js 문법에서는 css를 통해 dom의 element에 접근하기 위해서는 class를 사용했지만 react에서는 className을 사용해야 함.
  (13) <input>과 같은 태그는 html에서 독립적인 태그로서 닫아주지 않아도 됬지만 JSX에서는 닫아주어야 한다. 코드를 깔끔하게 하고싶다면 self-closing태그로서 사용해도 된다. <input />
  
fucntion App() {
  return(
    <div>
      Hello <b>react</b>
    </div>
  );
}

<by babel 변환 후 코드>
function App() {
  return React.createElement("div",null,"Hello",React.createElement("b",null,"react"));
}
*/
