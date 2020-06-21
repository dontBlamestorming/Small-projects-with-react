import React, { Component } from 'react';

class Counter extends Component {
  state = {
    // (3)constructor 메서드를 선언하지 않고 state 초기값 설정
    number: 0,
    fixedNumber: 0
  };
  //   constructor(props) {
  //     super(props); // Component 클래스의 생성자 함수를 호출한다.
  //     this.state = {
  //       number: 0,
  //       fixedNumber: 0
  //     };
  //   }

  render() {
    const { number, fixedNumber } = this.state;
    return (
      <div>
        <h1>{number}</h1>
        <h2>바뀌지 않는 값 : {fixedNumber}</h2>
        <button
          onClick={() => {
            this.setState(
              {
                number: number + 1
              },
              () => {
                console.log('방금 setState가 호출되었습니다.');
                console.log(this.state);
              }
            );
            // 이벤트 설정
            /*
            this.setState(prevState => {
              return {
                number: prevState.number + 1
              };
            });
            

            
            this.setState(prevState => {
              number: prevState.number + 1;
            });
            

            /*
            this.setState({ number: number + 1 });
            this.setState({ number: this.state.number + 1 }); // 값이 2번 업데이트 되지는 않는다.
            */
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default Counter;

/*
    (1) state를 조회할 때에는 this.state로 조회한다.
    (2) constructor를 작성 할 때에는 반드시 super(props)를 호출해야 한다. 이 함수는 현재 클래스형 컴포넌트가 상속하고 있는 React의 Component 클래스가 지닌 생성자 함수를 호출해 준다.
    (3) 생성자를 사용하지 않고도 state 초기값을 만들 수 있다. 
    (4) this.setState에 객체 대신 함수 인자 전달하기
        - this.setState를 사용하여 state 값을 업데이트 할 때는 상태가 비동기적으로 업데이트 된다.
        - this.setState를 사용한다고 해서 state 값이 바로 바뀌지는 않는다. ???????
            this.setState((prevState, props) => {
                return {
                    // 업데이트하고 싶은 내용
                }
            })
            prevState = 기존 상태
            props = 현재 지니고 있는 props이다.
    (5) this.setState가 끝난 후 특정 작업 실행하기
        - this.setState(객체, Callback)

*/
