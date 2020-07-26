import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// 액션생성함수 bind
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';

const CounterContainer = () => {
  const number = useSelector(state => state.counter.number);
  // Redux Store에 접근하여 내부 state값 조회
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => {
    dispatch(increase());
  }, [dispatch]);
  const onDecrease = useCallback(() => {
    dispatch(decrease());
  }, [dispatch]);
  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};

export default CounterContainer;

/*

[connect 함수의 여러가지 사용 방법]

1 - connect 함수의 파라미터값을 미리 선언 
    const mapStateToProps = state => ({
    number: state.counter.number,
    // 왜 counter? counter.js가 state에 들어있다는 건가? 이 state는 어디서?
    // state는 현재 스토어가 갖고있는 상태란다.
    });

    const mapDispatchToProps = dispatch => ({
    // 임시 함수
    increase: () => {
        dispatch(increase());
    },
    decrease: () => {
        dispatch(decrease());
    },
    });

    mapStateToProps, mapDispatchToProps의 return은 CounterContainer의 props
    export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);

2 - 익명함수 형태의 connect
    export default connect(
    state => ({
        number: state.counter.number,
    }),
    dispatch => ({
        increase: () => dispatch(increase()),
        decrease: () => dispatch(decrease()),
    }),
    )(CounterContainer);

3 - bindActionCreators() 사용 - 리덕스 유틸함수(액션 생성 함수의 개수가 많아 질 때)
    export default connect(
    state => ({
        number: state.counter.number,
    }),
    dispatch => bindActionCreators({ increase, decrease }, dispatch),
    )(CounterContainer);

4 - mapDispatchToProps에 해당하는 파라미터를 함수 형태가 아닌 액션 생성 함수로 이루어진 객체로 넣어주는 방법
    이 객체는 connect 함수가 내부적으로 bindActionCreators 작업을 대신해준다.
    export default connect(state => ({ number: state.counter.number }), {
        increase,
        decrease,
    })(CounterContainer);
*/
