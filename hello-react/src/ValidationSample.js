import React, { Component, useState } from 'react';
import './ValidationSample.css';

// const ValidationSample = () => {
//   const [password, setPassword] = useState('');
//   const [clicked, setClicked] = useState(false);
//   console.log(clicked);
//   const [validated, setValidated] = useState(false);

//   const handleChange = e => setPassword(e.target.value);
//   const handleButtonClick = () => {
//     setClicked(true);
//     if (clicked && password === '0000') {
//       setValidated(true);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="password"
//         value={password}
//         onChange={handleChange}
//         className={clicked ? (validated ? 'success' : 'failure') : ''}
//       />
//       <button onClick={handleButtonClick}>검증하기</button>
//     </div>
//   );
// };

class ValidationSample extends Component {
  state = {
    password: '',
    clicked: false,
    validated: false
  };

  handleChange = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleButtonClick = () => {
    this.setState({
      clicked: true,
      validated: this.state.password === '0000'
    });
    this.input.focus();
  };

  render() {
    return (
      <div>
        <input
          ref={ref => {
            this.input = ref;
          }}
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          className={
            this.state.clicked
              ? this.state.validated
                ? 'success'
                : 'failure'
              : ''
          }
        />
        <button onClick={this.handleButtonClick}>검증하기</button>
      </div>
    );
  }
}

export default ValidationSample;

/*
  ref: DOM에 이름 달기
  HTML에서 id를 사용하여 DOM에 이름을 다는 것처럼 리액트 프로젝트 내부에서 DOM에 이름을 다는 방법이 있다. 바로 ref(reference) 개념이다. 리액트 컴포넌트 안에 id를 사용할 수 있지만 리액트의 컴포넌트 특성상 여러번 사용되어질 수 있기 때문에 id의 unique함을 벗어난다. 중복 id를 가진 DOM이 여러개 생기면 안된다. 

  하지만 ref는 전역적으로 작동하지 않고 컴포넌트 내부에서만 작동한다. 다른 라이브러리나 프레임워크와 함께 id를 사용해야 하는 경우 컴포넌트를 만들 때마다 id 뒷부분에 추가 텍스트를 붙여서 중복 id가 발생하는 것을 방지해야 한다. 

  그렇다면 어떤 작업을 할 때 ref을 사용해야 할까? 정답은 'DOM을 꼭 직접적으로 건드려야 할 때'이다.
  순수 자바스크립트나 jQuery로 만든 웹사이트는 input을 검증할 때 특정 id를 가진 input에 클래스를 설정한다.
  
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <script>
        function validate() {
          var input = document.getElementById('password');
          input.className = '';
          if(input === '0000') {
            input.className = 'success';
          } else {
            input.calssName = 'failure';
          }
        }
      </script>
    </head>
    <body>
      <input tyep = 'password' id = 'password'></input>
      <button onclick = 'validate()'>Validate</button>
    </body>
    </html>
  
  하지만 이러한 일련의 작업은 굳이 DOM에 접근하지 않더라도 state로 구현할 수 있다.
  
  DOM을 꼭 직접적으로 건드려야 할 때
        1. 특정 input에 포커스 주기
        2. 스크롤 박스 조작하기
        3. Canvas요소에 그림 그리기

  ref 설정
    1. 콜백함수를 통한 설정 - <input ref = {(ref) => { this.input = ref }} />
    앞으로 this.input은 input요소의 DOM을 가리키게 된다. DOM 타입과 관계없이 this.superman = ref처럼 마음대로 지정할 수 있다. 
    2. createRef를 통한 설정 
        - 리액트에 내장되어 있는 createRef라는 함수를 사용하는 것. 더 적은 코드로 쉽게 사용 가능
        class RefSample extends Component {
          input = React.createRef();  // 컴포넌트 내부에서 멤버 변수로 React.createRef()를 담아준다.

          handleFocus = () => {
            this.input.current.focus();   // ref를 설정해준 DOM에 접근(콜백함수를 사용하는 것과 다른점 .current)
          }

          render() {
            return(
              <div>
                <input ref = { this.input } />  
              </div>
            )
          }
      }

    컴포넌트에 ref 달기
      - 주로 컴포넌트 내부에 있는 DOM을 컴포넌트 외부에서 사용할 때 사용. 방법은 DOM에 ref를 다는 방법과 같다.
      <MyComponent 
          ref = {ref => { this.MyComponent = ref }}
      >
        리액트
      </MyComponent>

      MyComponent 내부의 메서드 및 멤버 변수에도 접근이 가능하다. 
      myComponent.handleClick, myComponent.input 등등
*/
