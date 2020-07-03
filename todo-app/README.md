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
