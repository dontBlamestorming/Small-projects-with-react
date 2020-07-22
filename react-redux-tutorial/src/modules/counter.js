import { createAction, handleActions } from 'redux-actions';

// 액션 타입
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// 액션 생성
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 초기상태

const initalState = {
  number: 0,
};

// redux-action의 handleActions()를 적용한 리듀서 함수
const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initalState,
);

export default counter;

/*
    export 와 export default의 차이점은 불러올 때를 보면 된다.
    import counter, {increase, decrease} from './counter'

    [기존 리듀서 함수]
    function counter(state = initalState, action) {
    switch (action.type) {
      case INCREASE:
        return {
          number: state.number + 1,
        };
      case DECREASE:
        return {
          number: state.number - 1,
        };
      default:
        return state;
    }
  }
*/
