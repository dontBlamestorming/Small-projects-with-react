import React, { Component, useState } from 'react';

// <<< useState에 문자열이 아닌 객체 >>>
const EventPractice = () => {
  const [form, setForm] = useState({
    username: '',
    message: ''
  });
  /*
    console.log(form);  // {useranem: "", message : ""}
    console.log(setForm); // dispatchAction()
  */
  const { username, message } = form;
  console.log(username);
  console.log(message);

  const onChange = e => {
    const nextForm = {
      ...form, // form 객체 복사
      [e.target.name]: e.target.value // 덮어씌우기
    };
    setForm(nextForm);
  };

  const onClick = () => {
    alert(username + ': ' + message);
    setForm({
      username: '',
      message: ''
    });
  };

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div>
      <h1>이벤트 연습</h1>
      <input
        type="text"
        name="username"
        placeholder="사용자명"
        value={username}
        onChange={onChange}
      />
      <input
        type="text"
        name="message"
        placeholder="아무거나 입력해 보세요"
        value={message}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <button onClick={onClick}>확인</button>
    </div>
  );
};

export default EventPractice;

// <<< 함수형 컴포넌트 이벤트 handle >>>
/*
const EventPractice = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const onChangeUsername = e => setUsername(e.target.value);
  const onChangeMessage = e => setMessage(e.target.value);

  const onClick = () => {
    alert(username + ': ' + message);
    setUsername('');
    setMessage('');
  };

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div>
      <h1>이벤트 연습</h1>
      <input
        type="text"
        name="username"
        placeholder="사용자명"
        value={username}
        onChange={onChangeUsername}
      />
      <input
        type="text"
        name="message"
        placeholder="아무거나 입력해 보세요"
        value={message}
        onChange={onChangeMessage}
        onKeyPress={onKeyPress}
      />
      <button onClick={onClick}>확인</button>
    </div>
  );
};

export default EventPractice;
/*

// class EventPractice extends Component {  <<<클래스형 컴포넌트 이벤트 handle >>>
//   state = {
//     username: '',
//     message: ''
//   };

//   /*
//   constructor(props) {
//     super(props);

//     this.handleChange = this.handleChange.bind(this); // 만약 bind를 하지 않으면 this는 undefined가 된다.
//     this.handleClick = this.handleClick.bind(this);
//   }
//   */
//   handleChange = e => {
//     this.setState({
//       [e.target.name]: e.target.value
//       /*
//             객체 안에서 key를 []로 감싸면 그 안에 넣은 레퍼런스가 가리키는 실제 값이 key 값으로 사용된다.
//             username : 'e.target.value'
//             message : 'e.target.value'
//         */
//     });
//   };

//   handleClick = () => {
//     alert(this.state.username + ': ' + this.state.message);
//     this.setState({
//       username: '',
//       message: ''
//     });
//   };

//   handleKeyPress = e => {
//     if (e.key === 'Enter') {
//       this.handleClick();
//     }
//   };

//   render() {
//     return (
//       <div>
//         <h1>이벤트 연습</h1>

//         <input
//           type="text"
//           name="username"
//           placeholder="사용자명"
//           value={this.state.username}
//           onChange={this.handleChange}
//         />

//         <input
//           type="text"
//           name="message"
//           placeholder="아무거나 입력해 보세요"
//           value={this.state.message}
//           onChange={this.handleChange}
//           onKeyPress={this.handleKeyPress}
//         />
//         <button onClick={this.handleClick}>확인</button>
//       </div>
//     );
//   }
// }

// export default EventPractice;

/*
    콘솔에 기록되는 e 객체는 SyntheticEvent로 웹브라우저의 네이티브 이벤트를 감싸는 객체이다. 네이티브 이벤트와는 달리 이벤트가 끝나고나면 초기화 때문에 다시 참조할 수 없다. 비동기적으로 이벤트 객체를 참조해야 한다면 e.persist() 함수를 호출해야 한다.

    이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라, 함수 형태의 값을 전달한다. 따라서 이벤트를 처리할 떄에 렌더링을 하는 동시에 함수를 만들어서 전달해 주었다. 이 방법 대신 함수를 미리 준비하여 전달하는 방법도 있다. 성능상으로는 별 차이 없지만 가독성은 높다.(상황에 따라 rendering 메서드 내부에서 함수를 만드는 것이 더 편할 때도 있다. <매핑 관련>)

    함수가 호출될 때 this는 호출부에 따라 결정된다. 클래스의 임의 메서드가 특정 HTML 요소의 이벤트로 등록되는 과정에서 메서드와 this의 관계가 끊어진다. ?????????

    [자바스크립트에서 일반 함수의 this는 선언하는 동시에 결정되는 것이 아니다. 어떻게 호출하느냐에 따라 this가 결정된다. this가 동적으로 결정되는 것이다. 이러한 맥락에 있어서 클래스의 메서드가 이벤트로 등록될 때 해당 메서드와 this와의 관계가 끊어진다(여기는 잘 이해가 안갑니다. 어쨋든 undefined) 그에비해 화살표 함수의 this결정은 정적이다. 즉 선언과 동시에 결정된다. 화살표 함수의 this는 언제나 상위 스코프의 this를 가리킨다.]

    메서드 바인딩은 생성자 메서드에서 하는 것이 정석이지만 메서드를 만들때마다 constructor도 수정해야 하기 때문에 바벨의 transform-class-properties 문법을 사용하여 화삺표 함수 형태로 메서드를 정의하는 방법

    const name = "variantKey";
    const object = {
        [name] : 'value'
    }

    이는 다음과 같다

    {
        'variantKey' : 'value'
    }
*/
