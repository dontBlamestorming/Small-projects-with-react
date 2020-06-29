## Hooks

리액트 v16.8에 새로 도입된 기능으로 함수형 컴포넌트에서도 상태관리를 할 수 있는 useState, 렌더링 직후 작업을 설정하는 useEffect 등의 기능을 제공하여 기존의 함수형 컴포넌트에서는 할 수 없었던 다양한 작업을 가능하게 한다.

### useState

> 1. 파라미터에는 상태의 '기본값'을 넣는다.
> 2. 이 함수가 호출되면 배열을 반환한다. 이 배열의 첫 번째 원소는 상태값(value), 두 번째 원소로는 그 상태를 설정하는 '함수(setValue)'이다. 이 함수에 파라미터를 넣어서 호출(setValue(value + 1))하면 전달받은 파라미터로 상태값이 업데이트되고 컴포넌트가 정상적으로 re-rendering된다.
> 3. 하나의 useState 함수는 하나의 상태 값만 관리할 수 있다. 컴포넌트에서 관리해야 할 상태가 여러개라면 useState를 여러번 사용해라

### useEffect

### useReducer

### useMemo

### useCallback

### useRef

### 커스텀 Hooks 만들기

### 다른 Hooks

### 정리
