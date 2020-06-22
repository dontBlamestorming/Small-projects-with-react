import React, { Component, Fragment } from 'react';
import MyComponent from './MyComponent';
import EventPractice from './EventPractice';
import ValidationSample from './ValidationSample';
import Counter from './Counter';
import Say from './Say';
import ScrollBox from './ScrollBox';
import IterationSample from './IterationSample';

import './App.css';

// node_modules 디렉토리에 react 모듈이 설치되는데 그것을 가져오는 것

class App extends Component {
  render() {
    return (
      <div>
        {/* <MyComponent name="React" favoriteNumber={5}>
          리액트
        </MyComponent>
        <EventPractice />
        <ValidationSample />
        <Counter />
        <Say /> */}
        <ScrollBox
          ref={ref => {
            this.ScrollBox = ref;
          }}
        />
        <button
          onClick={() => {
            this.ScrollBox.scrollToBotton();
          }}
          // 이렇게 만들면 이미 한 번 렌더링을해서 this.ScrollBox의 값을 읽었다고 한다.
          // 만약 그렇다면 console.log(this.ScrollBox)를 눌르면 2번째 눌렀을 때 undefined이 뜨면 안되는거 아닌가?
        >
          맨 밑으로
        </button>
        <IterationSample />
      </div>
    );
  }
}

/*
  컴포넌트 태그 사이의 문자열은 props.children 값이다. 
  MyComponent에서 props값을 조회할 때마다 props.name or props.children과 같이 props.라는 키워드를 붙여주고 있는데 이것을 좀 더 간결하게 처리해보자. ES6의 비구조화 할당 문법을 통해 내부 값을 바로 추출하는 방법이 있다. 
*/

/*
class App extends Component {
  // state, 라이프사이클, 임의 메서드 정의 가능
  render() {
    const name = '리액트';
    return (
      <Fragment>
        <div className="react">{name}</div>
        <MyComponent />
      </Fragment>
    );
  }
}
*/

export default App;

/*
  함수형 컴포넌트의 장점(공식 메뉴얼에서 함수형 컴포넌트와 Hooks를 사용하길 권장)
  (1) 선언하기가 편하다.
  (2) 메모리 자원도 덜 사용한다. 
  (3) 프로젝트를 완성하여 빌드 후 배포할 클래스형 컴포넌트보다 용량이 작다(성능은 별 차이가 없다)

  단점
  (1) state와 라이프 사이클 사용이 불가능하다 -> 하지만 Hooks라는 기능이 도입되면서 해결(조금 다른 방식으로 비슷한 작업을 할 수 있게 됨)

*/

/*
// Before ES6
class가 없었기 때문에 생성자 함수를 통해 prototype으로 상속
function Dog(name) {
  this.name = name;
}

Dog.prototype.say = function() {
  console.log(this.name + ': 멍멍');
}

var dog = new Dog('검둥이');
dog.say(); // 검둥이: 멍멍

// After ES6
class Dog{
  constructor(name) {
    this.name = name;
  }
  say() {
    console.log(this.name + ': 멍멍');
  }
}

const dog = new Dog('흰둥이');
dog.say();
*/
