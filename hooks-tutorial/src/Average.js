import React, { useState, useMemo, useCallback } from "react";

const getAverage = numbers => {
  console.log("평균 값 계산 중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  const onChange = useCallback(e => {
    console.log("this is onchange in useCallback");
    setNumber(e.target.value);
  }, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성

  const onInsert = useCallback(() => {
    console.log("this is onInsert in useCallback");
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  }, [number, list]);

  /*
  함수 내부에서 상태 값에 의존해야 할 때는 그 값을 반드시 두 번째 파라미터 안에 포함시켜야 한다. 
  onChange의 경우 기존값 조회가 없이 설정만 하기 때문에 배열이 비어있어도 된다. 하지만 onInsert의 경우 number와 list값에 의존하고 있다. 
*/

  //   const onChange = e => {
  //     console.log("this is onchange");
  //     setNumber(e.target.value);
  //   };

  //   const onInsert = () => {
  //     console.log("this is onInsert");
  //     const nextList = list.concat(parseInt(number));
  //     setList(nextList);
  //     setNumber("");
  //   };

  const avg = useMemo(() => getAverage(list), [list]);
  // [list]를 검사하여 변동이 있을 때만 getAverage(list)를 호출한다. return은 avg에 담고 그것을 JSX에 넣어준다.

  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값 : </b> {avg}
      </div>
    </div>
  );
};

export default Average;

/*
    현재 이 코드에서는 input이 수정될 때마다 getAverage라는 함수도 같이 호출되고 있다. input이 수정될 때는 평균값을 다시 계산할 필요가 없다. onInsert가 일어날 때만 호출되면 된다. 따라서 rendering 낭비가 일어난다. 최적화를 시켜보자. 
    const avg = useMemo(() => getAverage(list), [list]);
*/
