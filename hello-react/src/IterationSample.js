import React, { useState } from 'react';

const IterationSample = () => {
  const [names, setNames] = useState([
    { id: 1, text: '눈사람' },
    { id: 2, text: '얼음' },
    { id: 3, text: '눈' },
    { id: 4, text: '바람' }
  ]);
  const [inputText, setInputText] = useState('');
  // 새로운 항목을 추가할 때 사용할 id
  const [nextId, setNextId] = useState(5);

  //    typing 기능
  const onChange = e => setInputText(e.target.value);

  //    click했을 때 데이터 추가, 초기화
  const onClick = () => {
    const nextNames = names.concat({ id: nextId, text: inputText });
    setNextId(nextId + 1);
    setNames(nextNames);
    setInputText('');
  };

  //    list 더블 클릭시 데이터 제거
  const onRemove = id => {
    const nextNames = names.filter(name => name.id != id);
    setNames(nextNames);
  };

  //    데이터 배열을 컴포넌트 배열로 변환
  const nameList = names.map(name => (
    <li key={name.id} onDoubleClick={() => onRemove(name.id)}>
      {name.text}
    </li>
  ));
  console.log(nameList);

  //   const names = ['눈사람', '얼음', '눈', '바람'];
  //   const nameList = names.map((name, index) => <li key={index}>{name}</li>);

  return (
    <>
      <input value={inputText} onChange={onChange} />
      <button onClick={onClick}>추가</button>
      <ul>{nameList}</ul>
    </>
  );
};

export default IterationSample;

/*
    자바스크립트 배열 객체의 내장 함수인 map 함수를 사용하여 반복되는 컴포넌트를 렌더링 할 수 있다.
    arr.map(callback, [thisArg]) - 새로운 배열을 생성
    callback : 새로운 배열의 요소를 생성하는 함수로서 파라미터는 다음 3가지 이다.
        - currentValue : 현재 처리하고 있는 요소
        - index : 현재 처리하고 있는 요소의 index 값
        - array : 현재 처리하고 있는 원본 배열
    thisArg(선택 항목) : callback 함수 내부에서 사용할 this 레퍼런스 

    map 메서드만 사용하면 'index.js:1 Warning: Each child in a list should have a unique "key" prop.'라는 오류가 뜬다.

    key란 무엇일까?

    리액트에서 key는 컴포넌트의 배열을 렌더링 했을 때 어떤 원소가 변동되었는지를 알아내려고 한다. 데이터를 다룰 때 원소를 생성,제거,수정 할 수 있기 때무니다. key가 만약 없다면 Virtual DOM을 비교하는 과정에서 리스트를 순차적으로 비교하면서 변화를 감지한다. 하지만 key가 있다면 더욱 빠르게 감지해낼 수 있다.

    key 값을 설정할 때는 map 함수의 인자로 전달되는 함수 내부에서 컴포넌트 props를 설정하듯 한다. key 값은 언제나 유일해야 한다. 그러니까 정리하자면 만약 다루는 데이터에 id 값과 같은 key와 비슷한 역할을 하는 데이터가 있다면 그 값을 key값으로 지정하고 아니면 index라는 map함수의 정해진 파라미터를 통해 key값을 주입하면 된다. 하지만 이 방법은 re-rendering하는데 있어서 비효율적인 방법이다. 따라서 어떻게 고유값을 만들 수 있을까?

    배열에서 새 항목을 추가할 때 push가 아닌 concat을 사용하는 것은 데이터의 상태를 업데이트 할 때 원본의 상태를 그대로 유지시키 위함이다. 이를 불변성 유지라고 한다. 불변성을 유지하면서 배열의 특정 항목을 지울 떄는 배열의 내장함수 filter를 사용한다. 

    const numbers = [1, 2, 3, 4, 5, 6];
    const biggerThanThree = numbers.filter(number => number > 3);
    // biggerThanThree = [4, 5, 6];

    응용하여 특정 배열에서 특정 값만 제외시킬 수도 있다.
    const numbers = [1, 2, 3, 4, 5, 6];
    const withoutThree = numbers.filter(number => number != 3);
    // withoutThree = [1, 2, 4, 5, 6];
*/
