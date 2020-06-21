import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({ name, favoriteNumber, children }) => {
  // 비구조화 할당
  return (
    <div>
      안녕하세요, 제 이름은 {name}입니다.
      <br />
      children 값은 {children}입니다. 제가 좋아하는 숫자는 {favoriteNumber}
      입니다.
    </div>
  );
};

MyComponent.defaultProps = {
  // porps의 기본값
  name: '기본 이름'
};

MyComponent.propTypes = {
  // 더 많은 PropTypes 종류 https://github.com/facebook/prop-types
  name: PropTypes.string, // 무조건 문자열 형태로 전달해야 한다는 것을 의미 - 사용자의 입력 데이터 타입을 강제할 수 있을까?
  favoriteNumber: PropTypes.number.isRequired
};

export default MyComponent;

/*
    비구조화 할당 
    비구조화 할당(destructuring assignment) = 구조 분해 문법
    함수의 인자로서도 사용할 수 있다. 인자가 객체라면 그 값을 바로 비구조화해서 사용하는 것 

    propTypes를 통한 props 검증
    컴포넌트의 필수 props를 지정하거나 props의 타입(type을 지정할 때에는 propTypes를 사용한다.
    defaultProps를 설정하는 것과 비슷하다.
    - 필수 사항은 아니지만 꼭 사용할 필요가 있다. 왜냐하면 다른 개발자들과 협업 시에 해당 컴포넌트에 어떤 props가 필요한지 쉽게 알 수 있기 때문
*/

/*  ES6의 화살표 함수
    - 기존 function을 아예 대체하지 않는다.
    - 함수를 인자로 전달할 때 유용

    setTimeout(function() {
        console.log('hello world!');
    }, 1000);

    setTimeout(() => {
        console.log('hello world!')
    }, 1000);

    - 서로 가리키고 있는 this의 값이 다르다.
    function BlackDog() {
        this.name = '흰둥이';
        return {
            name : '검둥이',
            bark : function () {
                console.log(this.name + ': 멍멍!');
            }
        }
    }

    const blackDog = new BlackDog();
    blackDog.bark(); // 검둥이: 멍멍!

    function WhiteDog() {
        this.name = '흰둥이'
        return {
            name : '검둥이',
            bark : () => {
                console.log(this.name + ': 멍멍!')
            }
        }
    }

    const whiteDog = new WhiteDog();
    whiteDog.bark(); // 흰둥이: 멍멍! 

    - 일반 함수는 자신이 종속된 객체를 this로 가리킨다. 하지만 화살표 함수는 자신이 종속된 '인스턴스'를 가리킨다. (중요)
    - 따라서 값을 연산하여 바로 반환해야 할 때 사용하면 가독성을 높일 수 있다.

    function twice(value) {
        return value * 2;
    }

    const triple = (value) => value * 3;
*/
