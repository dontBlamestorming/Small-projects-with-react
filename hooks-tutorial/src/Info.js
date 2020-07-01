import React, { useState, useEffect, useReducer } from "react";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value
  };
}

const Info = () => {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    nickname: ""
  });
  const { name, nickname } = state;
  const onChange = e => {
    dispatch(e.target);
  };

  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange} />
        <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <div>
        <div>
          <b>이름 : </b>
          {name}
        </div>
        <div>
          <b>닉네임 : </b>
          {nickname}
        </div>
      </div>
    </div>
  );
};
/*
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  const onChangeName = e => {
    setName(e.target.value);
  };

  const onChangeNickname = e => {
    setNickname(e.target.value);
  };

  useEffect(() => {
    console.log("mount");
    console.log(name);

    return () => {
      console.log("unmount or update");
      console.log(name);
    };
  });

    // useEffect(() => { 
    //     1. console.log("This is mounted"); - 두번 째 파라미터로 []이 들어왔을 때
    //     2. console.log("rendering is completed!!!"); -
    //     console.log({
    //       name,
    //       nickname
    //     });
      
    //   console.log("name의 값이 변동될 때" + name);
    // }, [name]); // [] -> mount될 때만 실행하게 한다.
  
  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickname} />
      </div>
      <div>
        <div>
          <b>이름 : </b> {name}
        </div>
        <div>
          <b>닉네임 : </b> {nickname}
        </div>
      </div>
    </div>
  );
};
*/
export default Info;
