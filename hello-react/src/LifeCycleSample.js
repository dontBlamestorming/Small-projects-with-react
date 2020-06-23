import React, { Component } from 'react';

class LifeCycleSample extends Component {
  state = {
    number: 0,
    color: null
  };

  myRef = null; // ref를 설정할 부분

  constructor(props) {
    super(props);
    console.log('This is constructor');
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    //console.log(prevState)    //  {number : 0, color : null}
    console.log('This is getDerivedStateFromProps');
    if (nextProps.color != prevState.color) {
      return { color: nextProps.color };
    }
    return null;
  }

  componentDidMount() {
    console.log('This is componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState);
    // 숫자의 마지막 자리가 4명 리렌더링 하지 않음
    return nextState.number % 10 != 4;
  }

  componentWillUnmount() {
    console.log('This is componentWillUnmount');
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1
    });
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('This is getSnapshotBeforeUpdate');
    if (prevProps.color != this.props.color) {
      return this.myRef.style.color;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    console.log('This is componentDidUpdate', prevProps, prevState);
    if (snapShot) {
      console.log('업데이트되기 직전 색상 : ', snapShot);
    }
  }

  render() {
    console.log('This is render');

    const style = {
      color: this.props.color
    };

    return (
      <div>
        {/* {this.props.missing.value} */}
        <h1 style={style} ref={ref => (this.myRef = ref)}>
          {this.state.number}
        </h1>
        <p>color : {this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    );
  }
}

export default LifeCycleSample;

/*
    constructor -> getDerivedStateFromProps -> render -> componentDidMount -> "DATA UPDATED" -> getDerivedStateFormProps -> shouldComponentUpdate -> render -> getSnapshotBeforeUpdate -> componentDidUpdate(snapShot)
*/

/*
    컴포넌트의 라이프사이클 메서드(클래스형 컴포넌트에서만 사용 가능)

    접두사 Will - 어떤 작업을 작동하기 전에 실행
    접두사 Did - 어떤 작업은 작동한 후 실행

    총 3개의 카테고리로 나눌 수 있다. 마운트, 업데이트, 언마운트

    마운트(Mount) - DOM이 생성되고 웹 브라우저상에 나타나는 것. 이 과정에서 호출하는 메서드는 순서대로 다음과 같다.
        1.Constructor : 컴포넌트를 새로 만들 때마다 호출되는 클래스 생성자 메서드
        2.getDerivedStateFromProps :  props에 있는 값을 state에 넣을 때 사용하는 메서드
        3.render : UI를 렌더링하는 메서드
        4.componentDidmount : 컴포넌트가 웹 브라우저상에 나타난 후 호출하는 메서드
    
    업데이트 - 총 4가지 경우 업데이트를 한다
        1. 업데이트를 발생시키는 요인
            1). props가 바뀔 떄 - 부모 -> 자식에게 주는 props가 바뀔 떄
            2). state가 바뀔 떄 - setState를 통해 state가 업데이트 될 때 
            3). 부모컴포넌트가 re-rendering 될 떄
            4). this.forceUpdate로 강제 rendering을 트리거할 때
        2. getDerivedStateFromProps : Mount뿐만 아니라 Update 전에도 호출(같은 맥락)
        3. shouldComponentUpdate(1-4 forceUpdate) : 해당 컴포넌트가 re-rendering을 할지 말지 결정. 이 메서드는 ture or false를 반환해야 하며 true 반환 시 다음 라이프사이클을 실행, false는 작업을 중지. 만약 특정 함수에서 this.forceUpdate()를 호출한다면 이 과정을 생략하고 바로 render함수를 호출
        4. render : 컴포넌트 리렌더링
        5. getSnapshotBeforeUpdate : 감지된 변동사항을 DOM에 반영하기 바로 직전에 호출
        6. componentDidUpdate : 업데이트가 끝난 후 호출
    
    언마운트 - 마운트의 반대과정, 즉 컴포넌트를 DOM에서 제거하는 것
        componentWillUnmount : 컴포넌트가 브라우저에서 사라지기 전에 호출

    render() {...}
    - 라이프 사이클 메서드 중 유일한 필수 메서드, this.prop과 this.state에 접근 가능, JSX 반환
    - 주의사항 : 이벤트 설정이 아닌 곳에서 setState 사용하면 안되며, DOM에 접근하지마라. DOM 정보를 갖고오거나 state에 변화를 줄때는 componentDidMount에서 처리.
    
    constructor(props) {...}
    - 컴포넌트를 만들 때 처음으로 실행, 초기 state를 정할 수 있음

    getDerivedStateFromProps
    - react v16.3 이후에 만들어진 메서드. props로 받아온 값을 state에 동기화시키는 용도. 컴포넌트가 마운트 될 때와 업데이트될 떄 호출
    예시)static getDerivedStateFromProps(nextProps, prevState) {
            if(nextProps.value != prevState.value) { // 조건에 따라 특정 값 동기화
                return { value : nextProps.value };
            }
            return null;    // state를 변경할 필요가 없다면 null 반환
        }

    componentDidMount() {...}
    컴포넌트 생성 후 첫 렌더링 후 실행, 다른 js 라이브러리 또는 프레임워크의 함수를 호출하거나 이벤트 등록, setTimeout, setInterval, 네트워크 요청 같은 비동기 작업을 처리

    shouldComponentUpdate(nextProps, nextState) {...}
    이 메서드 안에서 현재 props와 state는 this.props와 this.state로 접근하고 새로 생성될 props 또는 state는 nextProps와 nextState로 접근, 성능을 최적화 할 때, 상황에 맞는 알고리즘을 작성하여 re-rendering을 방지하기 위해선 false를 반환하게 함.

    getSnapshotBeforeUpdate
    react v16.3 이후에 만들어진 메서드. render에서 만들어진 결과물이 브라우저에 반영되기 직전 호출. 여기서 반환하는 값은 componentDidMount에서 세 번째 파라미터인 snapshot으로 전달받을 수 있음. 주로 업데이트를 하기 직전의 값을 참고할 일이 있을 때 활용 (스크롤바 위치 유지 등)
    
    예시)getSnapshotBeforeUpdate(prevProps, prevState) {
            if(prevState.array != this.state.array) {
                const { scrollTop, scrollHeight } = this.list
                return { scrollTop, scrollHeight};
            }
        }

    componentDidUpdate(prevProps, prevState, snapShot) {...}
    업데이트가 끝난 직후이므로 DOM관련 처리를 해도 무방하다. 여기서는 prevProps, prevState를 사용하여 컴포넌트가 이전에 가졌던 데이터에 접근할 수 있음. getSnapshotBeforeUpdate에서 반환한 값을 snapShot 파라미터로 전달받을 수 있음.

    componentWillUnmount() {...}
    DOM을 제거할 때 실행. componentDidMount에서 등록함 이벤트, 타이머, 직접 생성한 DOM은 여기서 제거

    componentDidCatch(error, info) {
        this.setState({
            error : true
        });
        console.log({ error, info });
    }
    컴포넌트에서 오류가 발생했을 시 어플리케이션이 죽지 않고 오류 UI를 보여준다. error는 어떤 에러가 발생했는지, info는 어디서 발생했는지 알려준다. 
    console.log뿐만 아니라 서버 API를 호출하여 따로 수집가능. 하지만 이 메서드를 사용하는 해당 컴포넌트의 에러는 잡아낼 수 없고 자신의 this.props.children으로 전달되는 컴포넌트에서 발생하는 에러만 잡아낼 수 있음.

    render 함수에서 에러는 주로 존재하지 않는 함수를 사용하려고 하거나, 존재하지 않는 객체의 값을 조회하려고 할 때 발생한다. render 함수에 {this.props.missing.value}라는 존재하지 않는 값을 읽으라고 해보자. 이렇게 에러가 났을 때 잡아주는 방법에 대해서 알아보자.
     

    
*/
