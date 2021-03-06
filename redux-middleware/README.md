## 리덕스 미들웨어를 통한 비동기 작업 관리

- react web application에서 API 서버를 연동할 때는 API 요청에 대한 상태도 잘 관리해야 한다.
- 예를들어 요청 시작은 로딩 중, 요청이 성공하거나 실패는 로딩이 끝났음을 명시해야 하는 것이다.
- 요청이 성공하면 서버에서 받아 온 응답에 대한 상태를 관리하고, 실패하면 서버에서 반환한 에러에 대한 상태를 관리해야 한다.

### 미들웨어란?

- 리덕스 미들웨어는 액션을 디스패치 했을 때 리듀서에서 이를 처리하기 전에 앞서 사전에 정의된 작업을 실행한다. 따라서 미들웨어는 액션과 리듀서 사이의 중간자라고 볼 수 있다.
- 리듀서가 액션을 처리하기 전에 미들웨어가 할 수 있는 작업은 여러가지가 있다. 전달받은 액션을 단순히 콘솔에 기록하거나 또는 액션을 아예 취소하거나 다른 종류의 액션을 추가로 디스패치 할 수 있다.

### 미들웨어 만들기

- 실제 프로젝트를 진행할 때는 미들웨어를 직접 만들어 사용할 일은 그리 많지 않다. 다른 개발자가 만들어놓은 미들웨어를 사용하기 때문이다. 하지만 미들웨어가 어떻게 동작하는지 이해하려면 직접 만들어보는 것이 가장 효과적이다.
- 액션이 디스패치 될 때마다 액션의 정보와 액션이 디스패치 되기 전후의 상태를 콘솔에 보여주는 로깅 미들웨어를 작성해보자.
  <pre>
      <code>
          const loggerMiddleware = store => next => action => {
              //미들웨어 기본 구조
          };
      </code>
  </pre>
- 결국 미들웨어는 함수를 반환하는 함수를 반환하는 함수이다. 위의 코드에서 store는 리덕스 스토어의 스토어 인스턴스를, action은 디스패치된 액션을 가리킨다. next 파라미터는 함수 형태이며, store.dispatch와 비슷한 역할을 한다.
- 하지만 가장 큰 차이점은 next(action)을 호출하면 그 다음 처리해야할 미들웨어에게 액션을 넘겨주고, 만약 그 다음 미들웨어가 없다면 리듀서에게 액션을 넘겨준다는 것이다.
- 미들웨어 내부에서 store.dispatch를 사용하면 첫 번째 미들웨어부터 다시 처리한다. 만약 미들웨어에서 next를 사용하지 않으면 액션이 리듀서에 전달되지 않는다. 즉, 액션이 무시되는 것이다.

### 비동기 작업을 처리하는 미들웨어

#### redux-thunk

- 비동기를 다룰 때 가장 많이 사용하는 미들웨어. 객체가 아닌 함수 형태의 액션을 디스패치할 수 있게 해준다.
- Thunk는 특정 작업을 나중에 할 수 있도록 미루기 위해 함수 형태로 '감싼 것'을 의미한다. 만약 주어진 파라미터에 1을 더하는 함수를 만들고 싶다면 다음과 같이 작성할 것이다.
  <pre>
      <code>
          const addOne = x => x + 1;
          addOne(1);
      </code>
  </pre>
- 하지만 addOne을 호출하면 바로 1+1 연산이 된다. 이 작업을 나중에 하도록 미루고 싶다면 어떻게 해야 할까?

  <pre>
      <code>
          const addOne = x => x + 1;
          function addOneThunk(x) {
              const thunk = () => addOne(x);
              return thunk;
          }
            // const addOneThunk = x => () => addOne(x);
  
          const fn = addOneThunk(1);
          setTimeout(() => {
              const value = fn() // fn이 실행되는 시점에 연산
              console.log(value);
          }, 1000);
      </code>
  </pre>

  - 이 라이브러리를 만들면 위의 thunk 함수처럼 한번 감싸는 함수를 만들어서 디스패치 시킬 수 있다. 그러면 리덕스 미들웨어가 그 함수를 전달받아 store의 dipatch와 getState를 파라미터로 넣어서 호출해준다.

- createRequestThunk라는 lib을 하나 만들어서 액션 타입과 API 요청을 함수 파라미터로 넣어주면 처리해주는 코드를 통해 reafactoring을 하자
- sample 리듀서에서 로딩 중에 대한 상태관리가 중복되고 있다. loading이라는 리듀서를 하나 더 생성하여 로딩 중에 대한 상태관리를 따로하자.

### redux-saga

- 특정 액션이 디스패치 되었을 때 정해진 로직에 따라 다른 액션을 디스패치 시키는 규칙을 작성하여 비동기 작업을 처리할 수 있게 해준다.
