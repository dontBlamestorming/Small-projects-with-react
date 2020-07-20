import { createStore } from "redux";

// 이번 예제는 별도의 UI 라이브러리를 사용하지 않기 때문에 DOM을 직접 수정
const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");
// DOM 노드를 가리키는 값을 미리 선언

// action name
const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
// 액션의 이름은 문자열 형태로 주로 대문자로 작성, 고유해야함

// 다음으로 위의 액션이름을 사용하여 액션 생성 함수를 작성한다. type을 반드시 갖고 있어야 한다.
// 이외의 상태 업데이트의 참고값은 마음대로 넣을 수 있다.
const toggleSwitch = () => ({
  type: TOGGLE_SWITCH
});
const increase = difference => ({
  type: INCREASE,
  difference
});
const decrease = () => ({
  type: DECREASE
});

// 초기값 설정 - 데이터 타입은 자유다
const initialState = {
  toggle: false,
  counter: 0
};

// 리듀서 함수 정의 - 파라미터로 state와 action값을 받는다.
// state가 undefined일 때는 initialState를 기본값으로 사용
function reducer(state = initialState, action) {
  // 원래 리듀서가 처음 호출될 떄는 undefined이지만, 첫번 째 파라미터에서 기본값을 initialState로 설정
  // action.type에 따라 다른 작업을 처리할 것
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        // 불변성을 유지해야하지만 최대한 깊지 않은 구조로 하는 것이 좋다.
        ...state,
        toggle: !state.toggle
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1
      };
    default:
      return state;
  }
}

// 스토어를 만들 때는 redux 라이브러리의 createStore()를 이용하고 파라미터에는 reducer를 넣는다.
const store = createStore(reducer);

// render함수는 상태가 업데이트될 때마다 호출될 것
// react의 render와는 다르게 이미 만들어진 html로 만들어진 UI의 속성을 변경
const render = () => {
  const state = store.getState(); // 현재 상태 call

  //토글 처리
  if (state.toggle) {
    divToggle.classList.add("active");
  } else {
    divToggle.classList.remove("active");
  }

  //카운터 처리
  counter.innerText = state.counter;
};

render();

// 스토어의 상태가 바뀔때마다 render가 호출되도록 해줄 것이다.
// 이 작업은 스토어의 내장함수인 subscribe를 사용하여 수행 할 것.

store.subscribe(render);
// 지금은 subscribe를 직접 사용하지만 리액트에서는 아니다.
// 컴포넌트에서 리덕스 상태를 조회하는 과정에서 react-redux가 이 작업을 대신해준다.

// 액션을 발생시키는 것을 dispatch라고 한다. 파라미터에는 액션객체가 들어간다.
divToggle.onclick = () => {
  store.dispatch(toggleSwitch());
};

btnIncrease.onclick = () => {
  store.dispatch(increase(1));
};

btnDecrease.onclick = () => {
  store.dispatch(decrease());
};

// 이벤트 함수 내부에서는 dispatch 함수를 사용하여 액션을 스토어에 전달할 것.
