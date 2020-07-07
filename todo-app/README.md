# 일정 관리 웹 애플리케이션 만들기

## 프로젝트 준비하기

## Todo-app

### node-sass for Sass

### classsnames for conditional styling

### react-icons for using SVG icon like using react component(we can contral size, color chaning props or css style )

## UI 구성하기(컴포넌트 용도별 구성)

### TodoTemplate

화면 가운데 정렬, 앱 타이틀(일정 관리)를 보여줌, children으로 내부 JSX를 props로 받아와서 렌더링

### TodoInsert

새로운 항목을 입력하고 추가할 수 있는 컴포넌트, state를 통해 인풋의 상태를 관리

### TodoListItem

각 할 일 항목에 대한 정보를 보여주는 컴포넌트, todo 객체를 props로 받아와서 상태에 따라 다른 스타일의 UI를 보여줄 것

### TodoList

todos 배열을 props로 받아 온 후, 이를 배열 내장 함수 map을 이용하여 여러개의 TodoListItem 컴포넌트로 변환하여 보여줄 것

## 컴포넌트 성능 최적화

### 많은 데이터 렌더링하기

function createBulkTodos() {
const array = [];
for (let i = 1; i <= 2500; i++) {
array.push({
id: i,
text: `할 일 ${i}`,
checked: false,
});
}
return array;
}

const [todos, setTodos] = useState(createBulkTodos);

### 크롬 개발자 도구를 통한 성능 모니터링

크롬 개발자 도구 Performance 탭 이용하여 측정 - 반영을 녹화하고 timings을 보면 각 시간대에 컴포넌트의 어떤 작업이 처리되었는지 확인 가능.

### 느려지는 원인 분석

컴포넌트가 렌더링 되는 조건

1. 자신이 전달받은 props가 변경될 때
2. 자신의 state가 바뀔 때
3. 부모 컴포넌트가 re-rendering될 때
4. forceUpdate 함수가 실행될 때

현 상황 분석

- '할일 1'을 체크할 경우 App 컴포넌트의 state가 변경된다(checked : false or true). 그 결과 하위의 모든 컴포넌트들이 리렌더링 된다.
- '할 일 1'의 checked 값은 변경되었기 때문에 리렌더링되어야 하는게 맞지만 다른 값들은 굳이 다시 렌더링 되어질 필요가 없다.
- 이런 경우, 리렌더링이 불필요할 때는 리렌더링을 방지해야한다.

### React.memo를 사용하여 컴포넌트 최적화

결과적으로 만들어지는 JSX의 전체를 생각해보자.
<TodoTemplate>
<TodoInsert /> - <중략>

<div className="TodoList">
<TodoList todo={todo} key={1} onRemove={onRemove} onToggle={onToggle} /> =
<div className="TodoListItem">
<TodoListItem />
<div>
<TodoList todo={todo} key={2} onRemove={onRemove} onToggle={onToggle} /> =
<div className="TodoListItem">
<TodoListItem />
<div>
<TodoList todo={todo} key={3} onRemove={onRemove} onToggle={onToggle} /> =
<div className="TodoListItem">
<TodoListItem />
<div>
~ 2500개
<div>
</TodoTemplate>

    최종적으로는 이런식으로 그려져 있을 것이다. 각각의 <TodoList />의 props로 각각의 onRemove, onToggle을 호출할 수 있는 props가 있는 것이다. 그 밑에 <TodoListItem />의 export default에 React.memo(TodoListItem)은 그 각각의 컴포넌트의 props로 받는 todos, onRemove, onToggle의 변화가 없으면 다시 해당 컴포넌트를 rendering하지 않게 막아준다.

    더 자세하게는 key = 1 <TodoList /> 안의 <TodoListItem />의 onToggle함수가 호출되면 App.js의 state가 바뀌고, 최상위 컴포넌트가 바뀜에 따라 하위의 모든 컴포넌트는 리렌더링 되어야 하지만 key = 1인 컴포넌트에 변동이 생겼기 때문에 이 컴포넌트만 리렌더링 되고 key = 2, key = 3 ... key = 2500인 컴포넌트는 그대로 유지된다.

    Q - 각각의 onToggle props는 onToggle함수를 갖고있는 건가? 아니면 좌표(?)만 갖고있다가 클릭했을 때 호출하는건가? 어쨋든 호출될 때 key = 1인 컴포넌트에서 호출됬다는 것을 어떻게 알고?

### onToggle, onRemove 함수가 바뀌지 않게 하기

현 상황 분석

- onRemove와 onToggle함수는 항상 최신상태의 todos를 참조하기 때문에 todos 배열이 바뀔 때마다 함수가 새로 만들어진다.
- 이렇게 함수가 새로 만들어지는 상황을 방지하는 방법은 두가지이다. 첫번 째는 useState의 함수형 업데이트 기능을 사용하는 것, 그리고 두번 째는 useReducer를 사용하는 것.

1. useState()의 함수형 업데이트 - '새로운 상태'를 파라미터로 넣는 것이 아닌 '어떻게 업데이트 할지'를 정의해주는 함수를 넣는 것

   > const [number, setNumber] = useState(0);
   > // prevNumbers는 현재 number를 가리킨다.
   > const onIncrease = useCallback(() => setNumber(prevNumbers => prevNumbers + 1), [],));
   > 기존 코드에서 useCallback의 두번째 파라미터로 []가 들어가면 한번만 실행, [somthing]이 들어가면 조건부 실행이다. 여기서 이 조건부 실행을 삭제해야 한다. 왜냐하면 해당 값이 변동된다면 그 조건이 같은 2500개의 코드의 함수가 새로 생성됙 때문이다. 따라서 이것을 setValue의 인자의 파라미터로 넘겨주면 변동되는 값(최신값)을 참조하여 해당 컴포넌트의 함수만 다시그리면 된다.

2. useReducer
   > dispatch()로 action의 조건부를 설정할 수 있다. type데이터와 필요한 인자값을 파라미터로 주면 된다.
   > 함수형 컴포넌트 밖으로 로직을 빼내올 수 있다는 장점이 있다.
