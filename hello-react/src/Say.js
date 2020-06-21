/*
    배열 비구조화 할당은 객체 비구조화 할당과 비슷하다
    const array = [1, 2];
    const one = array[0];
    const two = array[1];
    ->
    const arrya = [1, 2];
    const [one, two] = array;
*/

import React, { useState } from 'react';

const Say = () => {
  const [message, setMessage] = useState('');
  // message는 현재 상태, setMessage는 원소의 상태를 바꾸어주는 함수이다. 이것을 Setter함수라고 부른다.
  const onClickEnter = () => setMessage('안녕하세요!');
  const onClickLeave = () => setMessage('안녕히 가세요!');

  const [color, setColor] = useState('black');

  return (
    <div>
      <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      <h1 style={{ color }}>{message}</h1>
      <button
        style={{ color: 'red' }}
        onClick={() => {
          setColor('red');
        }}
      >
        빨간색
      </button>
      <button
        style={{ color: 'green' }}
        onClick={() => {
          setColor('green');
        }}
      >
        초록색
      </button>
      <button
        style={{ color: 'blue' }}
        onClick={() => {
          setColor('blue');
        }}
      >
        파란색
      </button>
    </div>
  );
};

export default Say;

/*
    (1) useState 사용하기
        -useState 함수의 인자에는 상태의 초기값을 넣는다. 이 초기값은 숫자, 문자열, 객체, 배열 모두 가능하다. 
    (2) state를 사용 할 때의 주의사항
        클래스형 컴포넌트든 함수형 컴포넌트든 state 값을 수정해야 할 때에는 setState 혹은 useState를 통해 전달받은 Setter 함수를 사용해야 한다.
        클래스형 컴포넌트 - setState
        함수형 컴포넌트 - useState
        다음은 잘못된 코드이다.
        this.state.number = this.state.number +1;
        this.state.array = this.array.push(2);
        this.state.object.value = 5;

        const [object, setObject] = useState({ a : 1, b : 1});
        object.b = 2;

        배열이나 객체를 업데이트 해야 할 때는 어떻게 해야할까? 배열이나 객체 사본을 만들고 그 사본에 값을 업데이트한 후 그 사본의 상태를 업데이트 시켜준다. 간단한 예시를 보자

        //객체
        const object = { a : 1, b : 2, c : 3};
        const nextObject = { ...object, b : 2}; -> 사본의 값을 만들어서 b값만 '덮어쓰기'
        
        //배열 
        const array = [
            { id : 1, value : true},
            { id : 2, value : true},
            { id : 3, value : false}
        ];

        let nextArray = array.concat({ id : 4});
        nextArray.filter(item => item.id != = 2);
        nextArray.map(item => (item.id === 1 ? { ...item, value : false } : item));

        객체의 사본을 만들때는 spread 연산자라 불리는 ...을 사용하고 배열은 내장 함수들을 이용한다.
*/
