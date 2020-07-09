import React, { useRef, useCallback, useState } from "react";

const App = () => {
  const nextId = useRef(1);
  const [form, setForm] = useState({ name: "", username: "" });
  const [data, setData] = useState({
    array: [],
    uselessValue: null
  });

  // input을 위한 함수
  const onChange = useCallback(
    e => {
      const { name, value } = e.target;
      // name = e.target.name;
      // value = e.target.value;
      setForm({
        ...form,
        [name]: [value] // ???????? e.target.name = e.target.value ????
      });
    },
    [form]
  );

  // form 등록을 위한 함수
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username
      };

      // array에 새 항목 등록
      setData({
        ...data,
        array: data.array.concat(info)
      });

      // form 초기화
      setForm({
        name: "",
        username: ""
      });

      // data.array에 값 1개 추가할 때마다 id props, 1씩 증가
      nextId.current += 1;
    },
    [data, form.name, form.username]
  ); // 해당 함수 안에서 state를 사용할 때(해당 값에 의존할때)는 반드시 두번째 인자인 배열 안에 추가시켜 주어야 한다.

  const onRemove = useCallback(
    id => {
      setData({
        ...data,
        array: data.array.filter(info => info.id !== id)
        // 헷갈리지 말자. 특정 id를 기존 배열에서 삭제하는건 여기서 '-'개념이 아니다. 함수가 실행하는 그 시점에서의 id값과 동일하지 않은 id의 data만 추려서 배열을 재생성하는 것이다.
      });
    },
    [data]
  );

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={onChange}
        />
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <div>
        <ul>
          {data.array.map(info => (
            <li key={info.id} onClick={() => onRemove(info.id)}>
              {info.username} ({info.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
