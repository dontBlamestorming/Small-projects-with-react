## 리덕스 라이브러리 이해하기

- 리덕스를 사용하면 상태 업데이트 관련 로직을 다른 파일로 분리시켜서 더욱 효율적으로 관리할 수 있다. 또한 컴포넌트끼리 똑같은 상태를 공유해야 할 때도 여러 컴포넌트를 거치지 않고 손쉽게 상태 값을 전달하거나 업데이트 할 수 있다.
- 단순히 전역 상태 관리만 한다면 Context API를 사용하는 것만으로도 충분하지만 리덕스를 사용하면 더욱 체계적으로 관리할 수 있다.
- 코드의 유지보수성, 작업효율, 개발자 도구, 그리고 미들웨어를 사용하여 비동기 작업을 매우 효율적으로 관리할 수 있게 한다.

### 개념 미리 정리하기

- 리덕스를 사용하며 자주 접하게 될 키워드를 알아보자.

1. 액션

   > 상태에 어떤 변화가 필요하면 액션(action)이 발생한다. 이는 하나의 객체이며 반드시 필드값을 가지고 있어야 한다. 이 필드 값이 액션 객체의 이름이라고 생각하면 된다. 예시를 보자

   <pre>
       <code>
       {
           type : 'ADD_TODO',
           data : {
               id: 1,
               text: 리덕스 배우기
           }
       }
   
       {
           type : 'CHANGE_INPUT'
           text : '안녕하세요'
       }
       </code>
   </pre>

2. 액션 생성 함수(action creator) - 액션 객체를 만들어주는 함수

   > 어떤 변화를 일으켜야 할 때마다 액션객체를 작성하기 번거로울 수 있고, 실수로 정보를 놓칠 경우를 방지하기 위해 이를 함수로 만들어 관리한다.

      <pre>
           <code>
               function addTodo(data) {
                   return {
                       type : 'ADD_TODO'
                       data
                   }
               }
      
               //화살표 함수로도 만들 수 있다.
               const changeInput = (text) => ({
                   type : 'CHANGE_INPUT'
                   text 
               });
           </code>
       </pre>

3. 리듀서

- 리듀서(reducer)는 변화를 일으키는 함수다. 액션을 만들어 발생시키면 리듀서가 현재 상태와 전달받은 액션 객체를 파라미터로 받아온다. 그리고 두 값을 참고하여 새로운 상태를 만들어 리턴한다.

   <pre>
        <code>
            const initialState = {
                counter : 1
            };
  
            function reducer(state = initialState, action) {
                switch(action.type) {
                    case INCREMENT :
                    return {
                        couter : state.counter + 1
                    }
                    default:
                        return state;
                }
            }
        </code>
    </pre>

4. 스토어

- 프로젝트에 리듀서를 적용시키기 위해 스토어(store)를 만든다. 한 개의 프로젝트는 하나의 스토어만 가질 수 있다. 내부에는 현재 애플리케이션의 상태와 리듀서가 들어있다. 그 이외에 중요한 내장함수를 지닌다.

5. 디스패치

- 스토어의 중요한 내장 함수중 하나가 디스패치(dispatch)이다. '액션을 발생시키는 것'이라고 이해하면 된다. 이 함수는 dispatch(action)과 같은 형태로 액션객체를 파라미터로 넣어서 호출한다.
- 이 함수가 호출되면 스토어는 리듀서 함수를 실행시켜서 새로운 상태를 만들어낸다.

6. 구독
   구독(subcribe) 또한 스토어의 내장 함수다. 이 함수 안에 리스너 함수를 파라미터로 넣어서 호출하면 이 리스너 함수가 액션이 디스패치되어(리스터 함수가 상태를 업데이트시켜) 업데이트될 때마다 호출된다.
      <pre>
           <code>
               const listener = () => {
                   console.log('상태가 업데이트 됨');
               }
               const unsubscribe = store.subscribe(listener);
               unsubscribe(); // 추후 구독을 비활성화 할 때 함수를 호출
           </code>
       </pre>

### 리액트 없이 쓰는 리덕스

- 리덕스는 리액트에 종속되는 라이브러리가 아니다. 리액트에서 사용하려고 만들어졌지만 실제로 다른 UI 라이브러리/프레임워크(angular-redux, ember redux, Vue) 등과 같이 사용할 수 있다.

### 리덕스의 세 가지 규칙

1. 단일 스토어

- 하나의 애플리케이션에는 하나의 스토어가 있다. 여러 개의 스토어를 사용하는 것이 완전히 불가능 하지는 않지만 상태 관리가 복잡해질 수 있으므로 권장하지 않는다.

2. 읽기 전용 상태

- 리덕스의 상태는 읽기 전용이다. react에서 state를 업데이트할 때 spread, immer와 같은 방법을 사용하면서 불변성을 유지한 것처럼 리덕스도 마찬가지.
- 왜냐하면 내부적으로 데이터 변경을 감지하기 위해 shallow equality 검사를 하기 때문이다. 객체의 변화를 겉핥기 식으로 비교하여 좋은 성능을 유지하는 것이다.

3. 리듀서는 순수한 함수

- 변화를 일으키는 리듀서 함수는 다음의 조건을 만족하는 순수한 함수여야 한다.
  > reducer함수는 이전 상태(state)와 액션 객체(action)를 파라미터로 받는다. 이 외에는 의존하면 안된다.
  > 이전 상태는 절대 건드리지 않고, 변화를 준 새로운 상태 객체를 만들어서 반환한다.
  > 똑같은 파라미터로 호출된 리듀서 함수는 언제나 똑같은 결과 값을 반환해야 한다.
- 예를들어 함수 내부에서 랜덤 값을 만들거나, Date 함수를 이용하여 시간을 갖고오거나, 네트워크 요청을 한다면 파라미터가 같아도 다른 결과를 만들어낼 수 있기 때문에 이 함수 바깥에서 처리해주어야 한다.
- 액션을 만드는 과정에서 처리해도 되고, 리덕스 미들웨어에서 처리해도 된다. 주로 네트워크 요청과 같은 비동기 작업은 미들웨어를 통해 관리한다.
