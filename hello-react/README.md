## 스터디를 위한 책 '리액트를 다루는 기술' 정리

### 제 1장 - 리액트 시작

1.1 - 왜 리액트인가?<br>
1.2 - 리액트의 특징<br>
1.3 - 작업 환경 설정<br>

### 제 2장 - JSX

2.1 - 코드 이해하기<br>
2.2 - JSX란?<br>
2.3 - JSX의 장점<br>
2.4 - JSX의 문법<br>
2.5 - ESLint와 Prettier 적용하기<br>
2.6 - 정리<br>

JSX<br>

> (1). 보기 쉽고 익숙하다.<br>
> (2). 하나의 컴포넌트를 html의 태그와 비슷하게 사용할 수 있다.<br>
> (3). 부모 요소(태그)가 감싸야한다. 왜냐하면 Virtual DOM에서 기존의 DOM과 컴포넌트 변화를 효율적으로 감지하기 위해 컴포넌트 내부는 하나의 DOM 트리 구조로 이루어져야 한다는 규칙때문.<br>
> (4). react 모듈에 들어 있는 <Fragment>는 부모 요소로 사용할 수 있으며 부모 요소로서 '<> </>'도 사용가능<br>
> (5). {}내부에 자바스크립트 표현식을 사용할 수 있음.<br>
> (6). if문을 사용하고 싶으면 JSX 밖에서 사전에 값을 설정 또는 JSX내에서는 조건부 연산자를 사용<br>
> (7). AND 연산자(&&)을 사용한 조건부 렌더링(조건부 연산자 사용 X) - 리액트는 false값은 rendering하지 않는다. 거꾸로 말하면 true값은 rendering을 한다.<br>
> 주의) '0'은 falsy한 값으로서 false가 아니다. 그래서 redering이 된다.<br>
> (8) 함수에서 어떤 값이 undefined일 수도 있다면 OR(||)연산자를 사용해라. 리엑트는 undefined만 반환하여 rendering할 수 없다. 하지만 JSX 내에서는 가능하다.<br>
> (9) return의 ()는 필수사항은 아니다. 한 줄로 표현할 수 있는 JSX는 감싸지 않는다.<br>
> (10) 리엑트에서 DOM 요소에 스타일을 적용할 때에는 문자열 형태가 아닌 객체형태로 넣어야 한다. 카멜표기법을 따라야 한다. 바로 style값을 적용할 때에는 (11)<br>
> (12) js 문법에서는 css를 통해 dom의 element에 접근하기 위해서는 class를 사용했지만 react에서는 className을 사용해야 함.<br>
> (13) input과 같은 태그는 html에서 독립적인 태그로서 닫아주지 않아도 됬지만 JSX에서는 닫아주어야 한다. 코드를 깔끔하게 하고싶다면 self-closing태그로서 사용해도 된다.<br>

### 제 3장 - 컴포넌트

3.1 - 클래스형 컴포넌트<br>

3.2 - 첫 컴포넌트 생성<br>

> 3.2.1 - 객체 비구조화할당(구조분해문법)  
> 3.2.2 - 일반 함수와 화살표 함수의 this
> 3.2.3 - ES6의 Class

3.3 - props<br>

> 3.3.1 - propTypes를 통한 props 데이터 타입 검증과 defaultProps 설정 for 협업

3.4 - state<br>

> 3.4.1 - 클래스형 컴포넌트의 setState와 함수형 컴포넌트의 useState
> 3.4.2 - 배열 비구조화할당

3.5 - state를 사용할 때 주의사항<br>

> 3.5.1 - 배열과 객체의 업데이트 방법(spread, 배열 내장 함수)

3.6 - 정리

### 제 4장 - 이벤트 핸들링

4.1 - 리엑트의 이벤트 시스템<br>

4.2 - 예제로 이벤트 핸들링 익히기<br>

> 4.2.1 - SyntheticEvent(웹 브라우저의 네이티브 이벤트를 감싸는 객체)
> 4.2.1 - 객체 안에서 []안의 key값의 레퍼런스가 가리키는 값

4.3 - 함수형 컴포넌트로 구현해 보기<br>
4.4 - 정리<br>

### 제 5장 - ref: DOM에 이름 달기

5.1 - ref는 어떤 상황에서 사용해야 할까?<br>

5.2 - ref 사용<br>

> 5.2.1 - 콜백함수를 통한 ref 사용과 createRef() 호출을 통한 ref사용

5.3 - 컴포넌트에 ref 달기<br>

> 5.3.1 - scrollHeight, clientHeight, scrollTop
> 5.3.2 - ref으로 하위 컴포넌트 내의 메서드를 부모 컴포넌트에서 사용하기

5.4 - 정리<br>

- 컴포넌트 내부에서 DOM에 직접 접근이 필요한 기능을 구현할 땐, ref을 사용하지 않고도 가능한지 고려
- DOM에 접근이 아닌 데이터를 교류할 때 ref사용은 리액트 사상에 어긋난 것
- 함수형 컴포넌트에서는 useRef라는 Hooks 함수를 사용

### 제 6장 - 컴포넌트 반복

6.1 - 자바스크립트 배열의 map()함수<br>

> 6.1.1 - arr.map(callback, thisArg);

6.2 - 데이터 배열을 컴포넌트 배열로 변환하기<br>

6.3 - key<br>

> 6.3.1 - 배열의 변경사항을 효율적으로 감지하기위한 리액트

6.4 - 응용<br>

> 6.4.1 - useState의 상태설정을 통해 고유값 생성
> 6.4.2 - array.push()를 사용하지 않고 array.concat()을 사용하는 이유
> 6.4.3 - 상태 업데이트에서 불변성 유지와 컴포넌트의 성능 최적화
> 6.4.3 - 데이터 제거에서의 filter

6.5 - 정리<br>

### 제 7장 - 컴포넌트의 라이프사이클 메서드

7.1 - 라이프 사이클 메서드의 이해<br>

> 7.1.1 - 접두사 Will과 Did
> 7.1.2 - 마운트, 업데이트, 언마운트

7.2 - 라이프 사이클 메서드 살펴보기<br>

> 7.2.1 - constructor -> getDerivedStateFromProps -> render -> componentDidMount -> "DATA UPDATED" -> getDerivedStateFormProps -> shouldComponentUpdate -> render -> getSnapshotBeforeUpdate -> componentDidUpdate(snapShot)

7.3 - 라이프 사이클 메서드 사용하기<br>

> 7.3.1 - Error 처리

7.4 - 정리<br>
