import React, { useRef, useCallback, useState } from "react";
import produce from "immer";

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
      setForm(
        produce(form, draft => {
          draft[name] = value;
        })
      );
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
      setData(
        produce(data, draft => {
          draft.array.push(info); // 굳이 concat()을 쓸 필요가 없는 것이다.
        })
      );
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

      setData(
        produce(data, draft => {
          draft.array.splice(
            draft.array.findIndex(info => info.id === id),
            1
          );
        })
      );
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

/*
  immer 라이브러리를 사용하면 불변성 유지를 위해 filter나 concat등의 함수말고 push나 splice와 같이 객체의 값 또는 배열에 직접적인 변화를 일으키는 함수를 사용해도 무방하다. 요는 불변성 유지에 익숙하지 않아도 자바스크립트에 익숙하다면 라이브러리를 이용해 컴포넌트 상태에 원하는 변화를 쉽게 반영시킬 수 있다. 하지만 immer를 사용한다고 해서 무조건 코드가 간결해지는 것은 아니다. immer는 불변성을 유지하는 코드가 복잡할 때만 사용해도 충분하다.
*/
