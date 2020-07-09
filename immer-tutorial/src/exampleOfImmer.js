/*
  immer 사용법(예시코드) - 불변성을 유지하는 작업을 매우 간단하게 처리할 수 있다.
  import produce from 'immer';
  const nextState = produce(originalState, draft => {
    // state 변경
    draft.somewhere.deep.insdie = 5;
  })

  produce()는 2가지 파라미터를 받는다. 첫번 째 파라미터는 수정하고 싶은 상태, 두 번째 파라미터는 어떻게 업데이트 할지 정의하는 함수이다.
  두 번째 파라미터로 전달되는 함수 내부에서 원하는 값을 변경하면 produce() 함수가 '불변성 유지를 대신'해 주면서 새로운 상태를 생성한다. 
  이 라이브러리의 핵심은 불변성에 신경 쓰지 않는 것처럼 코드를 작성하되 불변성 관리는 제대로 해 주는 것.
  단순히 깊은 곳에 위치하는 값을 바꾸는 것 외에 배열을 처리할 때도 매우 쉽고 편리하다.
*/
import produce from "immer";

const originalState = [
  {
    id: 1,
    todo: "전개 연산자와 배열 내장 함수로 불변성 유지하기",
    checked: true
  },
  {
    id: 2,
    todo: "immer로 불변성 유지하기",
    checked: false
  }
];

const nextState = produce(originalState, draft => {
  // id가 2인 항목의 checked 값을 true로 설정
  const todo = draft.find(t => t.id === 2); // id로 항목 찾기
  todo.checked = true;
  // 또는 draft[1].checked = true;

  // 배열에 새로운 데이터 추가
  draft.push({
    id: 3,
    todo: "일정 관리 앱에 immer 적용하기",
    checked: false
  });

  // id = 1인 항목을 제거하기
  draft.splice(
    draft.findIndex(t => t.id === 1),
    1 // 1이 뭘 의미하는거지?
  );
});

/*
    예시 코드를 보면 원본데이터에 수정, 업데이트, 제거까지 produce라는 함수 내부에서 다 처리할 수 있음을 볼 수 있다. 
*/
