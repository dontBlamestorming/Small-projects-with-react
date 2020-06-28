import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

/*
  CSS 종류
  1. 일반 CSS : 컴포넌트를 스타일링하는 가장 기본적인 방식
  2. Sass : CSS 전처리기(pre-processor)중 하나로 확장된 CSS 문법을 사용
  3. CSS Module : 클래스 이름끼리 절대 충돌하지 않도록 파일마다 고유한 이름을 자동으로 생성해주는 옵션
  4. Style-components : 스타일을 작성함과 동시에 해당스타일이 적용된 컴포넌트를 만들 수 있게 해주는 것

  CSS 클래스를 중복되지 않게 만드는 것이 매우 중요하다. 이를 위한 여러가지 방법이 있는데 첫번 째는 이름을 지을 때 특별한 규칙을 사용하는 것이고 두번 째는 CSS Selector를 활용하는 것이다.
  1) 이름 짓는 규칙 - 클래스 이름에 컴포넌트 이름을 포함시킴으로써 다른 컴포넌트에서 중복사용을 방지(예 : App-header). 비슷한 방식으로 BEM 네이밍이라는 방식도 있다(예 : .card_title-primary).
  2) CSS Selector - CSS 클래스가 특정 클래스 내부에 있는 경우에만 가능하다. 예를 들어 App 컴포넌트 내의 .logo에 스타일을 주고 싶으면 
    .App .logo {
      animation : App-logo-spin infinite 20s linear;
      height : 40vmin
    }
  이러한 방식으로 작성한다. 
*/
