## 리덕스를 사용하여 리액트 애플리케이션 상태 관리하기

### UI 준비하기

- 리액트 프로젝트에서 리덕스를 사용할 때 가장 많이 사용하는 패턴은 프레젠테이셔널 컴포넌트와 컨테이너 컴포넌트를 분리하는 것이다.
- 이와 같은 것은 필수사항은 아니지만 코드의 재사용성도 높이고 관심사의 분리가 이루어져 UI를 작성할 때 더 집중할 수 있다.
- UI에 관련된 프레젠테이셔널 컴포넌트는 src/components 경로에 저장, 컨테이너 컴포넌트는 src/containers에 저장한다.

1. 프레젠테이셔널 컴포넌트(presentational component)
   > 상태관리가 이루어지지 않고 props를 받아와서 화면에 UI를 보여주기만 하는 컴포넌트를 의미한다.
2. 컨테이너 컴포넌트(container component)
   > 리덕스와 연동되어 있는 컴포넌트로 리덕스로부터 상태를 받아오기도 하고 리덕스 스토어에 액션을 디스패치하기도 한다.

### 리덕스 관련 코드 작성하기(Ducks pattern)

- 리덕스를 사용할 때는 액션 타입, 액션 생성 함수, 리듀서 코드를 작성해야 한다. 이 코드들을 각각 다른 파일에 작성하는 방법이 있고 기능별로 묶어서 파일 하나에 작성하는 방법도 있다.
- 가장 일반적인 구조(공식)로 actions, constants, reducers라는 세 개의 디렉터리를 만들고 그 안에 기능별로 파일을 하나씩 만드는 구조가 있다. 로직에 따라 분리의 편의성이 있긴 하지만 새로운 액션을 만들 때마다 세 종류의 파일을 모두 수정해야 하기 때문에 불편하기도 하다.
- 액션 타입, 액션 생성 함수, 리듀서 함수를 파일 하나에 몰아서 작성하는 방식을 Ducks 패턴이라고 부르며 위의 불편함을 느낀 개발자들이 사용한다.

1. 가장 먼저 액션 타입을 정의해야 한다. '모듈 이름 / 액션 이름' 형태로 작성한다. 모듈 이름은 나중에 프로젝트가 커졌을 때 액션의 이름이 충돌하지 않게 해준다.
   > const INCREASE = 'counter/INCREASE';
2. 액션 생성 함수에서 파라미터로 들어가는 값은 액션 객체 안에 추가 필드로 들어가게 됨. 이 중 insert 함수는 파라미터 이외에도 선언되어 있는 id값에 의존한다.
3. 리듀서 함수는 불변성을 유지해야하며, 배열에 변화를 줄 때는 기존처럼 배열 내장 함수를 사용하여 구현
4. 현 프로젝트에는 리듀서 함수를 2개 만들었다. 나중에 createStore()를 이용하여 스토어를 만들 때는 리듀서를 하나만 사용해야 하기 때문에 만들었던 리듀서를 합쳐야 한다. 이 작업은 conbinReducers()를 통해 쉽게 처리할 수 있다.
5. 이 rootReducer가 들어 있는 파일 이름을 index.js로 해놓으면 import 때, import rootReducer from './modules'로 간단하게 불러올 수 있다.

### 리액트 애플리케이션 리덕스 적용하기(/src/index.js)

- 왜 src/index.js에서 store를 적용하는지?
- 'react-redux'에서 가져온 Provider는 뭐지?
- 컨테이너 컴포넌트 만들기
  > 컴포넌트에서 리덕스 스토어에 접근하여 원하는 상태를 받고, 액션 또한 디스패치 해줄 것이다. 리덕스 스토어와 연동된 컴포넌트를 컨테이터 컴포넌트라고 한다.
- 컨테이너 컴포넌트를 스토어와 연결할 때에는 connect()를 사용해야 한다.
  > connect(mapStateToProps, mapDispatchToProps)(연동할 컴포넌트)
  > mapStateToProps는 리덕스 스토어 안의 상태를 컴포넌트의 props로 넘겨주는 역할
  > mapDispatchToProps는 액션 생성 함수를 컴포넌트의 props로 넘겨준다.
  > 위의 형식으로 connect()를 호출하고 반환된 함수의 파라미터에 컴포넌트를 파라미터로 넣으면 스토어와 연동이 된다.
  > 즉, const makeContainer = connect(mapStateToProps, mapDispatchToProps)(target component)로 작성하면 된다.
  > connect 함수를 사용할 때는 일반적으로 mapStateToProps, mapDispatchToProps를 미리 선언해 놓고 사용한다. 하지만 connect 함수 내부에 익명함수 형태로 선언해도 문제가 되지는 않는다.
  > 컴포넌트에서 액션을 디스패치하기 위해 각 액션 생성 함수를 호출하고 dispatch로 감싸는 작업이 번거로울 수 있다. 특히 액션 생성 함수의 개수가 많아진다면 더더욱. 이 때 여러가지 방법이 있다(CounterContainer.js 주석 참고)

### 리덕스 더 편하게 사용하기

- 리듀서 함수를 작성할 떄 redux-actions와 immer 라이브러리를 활용하여 리덕스를 더욱 편하게 작성할 수 있다.

1. redux-actions
   > createAction - 액션 생성 함수를 간결하게 만들어준다. 파라미터가 필요한 경우 payload라는 이름을 사용한다.
   > createAction으로 만든 액션 생성 함수는 파라미터로 받은 값을 객체 안에 넣을 때 원하는 이름으로 넣는 것이 아니라, action.id, action.todo와 같이 'action.payload'라는 이름을 공통적으로 넣어주게 된다.
   > 따라서 기존의 업데이트 로직에서도 모두 action.payload 값을 조회하여 업데이트 하도록 구현해야 한다.
    <pre>
        <code>
            const MY_ACTION = 'sample/MT_ACTION'
            const myAction = createAction(MY_ACTION);
            const action = myAction('hello world');
            // 결과
            { type : MY_ACTION, payload : 'hello world'}
        </code>
    </pre>
   > 리듀서 더 짧게 작성하고 switch/case문이 아닌 handleActions라는 함수를 사용하여 각 액션마다 업데이트 함수를 설정하는 형식
   > handleActions 함수의 첫 번째 파라미터에는 각 액션에 대한 업데이트 함수, 두 번째 파라미터에는 초기 상태

### Hooks를 사용하여 컨테이너 컴포넌트 만들기

- Redux Store와 연동된 컨테이너 컴포넌트를 만들 때 connect 함수를 사용하는 대신 react-redux에서 제공하는 hooks를 사용할 수 있다.

1. useSelector()로 Redux Store 상태 조회하기

   > connect()를 사용하지 않고도 리덕스의 상태 조회 가능 -> const 결과 = useSelector(상태 선택 함수);
   > 여기서 '상태 선택 함수'는 mapStateToProps와 형태가 같다.

2. useDispatch()로 Redux Store의 Dispatch 함수 사용하기

   > Container Component에서 action을 dispatch 해야 한다면 이 hook을 사용하면 된다.
   > const dispatch = useDispatch();
   > dispatch({ type : 'SAMPLE_ACTION'})
   > useDispatch()를 사용할 때는 useCallback()와 항상 함께 사용하길 권장한다.

3. useStore()로 컴포넌트에서 Redux Store 객체를 직접 사용할 수 있다.(코드 적용 X)

   > const store = useStore();
   > store.dispatch({ type: 'SAMPLE_ACTION });
   > store.getState();

4. useActions 유틸 Hook을 만들어서 사용
   > 여러개의 action을 사용해야 하는 경우 코드를 깔끔하게 정리하여 사용할 수 있다.
   > 액션 생성 함수를 액션을 디스패치하는 함수로 변환해 준다. 액션 생성 함수를 사용하여 액션 객체를 만들고 이를 Redux Store에 dispatch하는 함수를 '자동'으로 만들어 주는 것
   > 두 가지 파라미터가 필요하다. 첫 번째는 액션 생성 함수로 이루어진 배열, 두 번째는 deps 배열이다. deps 안에 들어 있는 원소가 바뀌면 액션을 dispatch하는 함수를 새로 만든다.

- connect 함수와의 주요 차이점
  > connect 함수를 써도 좋고, useSelector와 useDispatch를 사용해도 좋다. 하지만 Hooks를 사용하여 Container Component를 만들 때 잘 알아두어야 할 사항이 있다.
  > connect 함수를 사용하면 해당 container compoenet의 부모 컴포넌트가 re-rendering될 때 해당 component의 props가 바뀌지 않았다면 re-rendering이 자동으로 방지되어 성능이 최적화된다.
  > 반면에 useSelector를 사용하여 Redux Store의 상태를 조회할 경우에는 이 최적화 작업이 자동으로 이루어지지 않으므로, 성능 최적화를 위해서 React.memo를 container component에 사용해야 한다.
