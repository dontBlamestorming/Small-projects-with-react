## Context API

### Context API를 사용한 전역 상태 흐름 이해하기

1. 리액트에서 전역적으로 사용할 데이터가 있을 때 유용한 기능이다. 환경 설정, 사용자 정보와 같은 상태를 관리할 때 리액트 애플리케이션은 컴포넌트간의 데이터를 props로 전달하기 때문에 컴포넌트 여기저기서 필요한 데이터가 있을 때는 주로 최상위 컴포넌트인 App의 state에 보관한다.
   > const[value, setValue] = useState('Hello');
   > const onSetValue = useCallback(value => setValue(value), []);
2. App 컴포넌트와 상태를 업데이트 시키는 컴포넌트간의 다수의 컴포넌트가 있다고 가정하면, 상태를 업데이트 시키기위한 onSetValue()함수를 해당 컴포넌트까지 끌고 와야한다. 실제 프로젝트에서는 더 많은 컴포넌트를 거쳐야 할 때도, 그리고 다루는 데이터도 훨씬 방대할 수 있으므로 이와 같은 방식은 유지보수성이 매우 낮아진다.
3. 따라서 MobX나 리덕스와 같은 상태 관리 라이브러리를 사용하여 전역 상태 관리 작업을 처리하기도 했는데 리액트 v16.3 이후에는 context API가 많이 개선되어 별도의 라이브러리를 사용하지 않아도 전역상태를 쉽게 관리할 수 있다.
4. 기존에는 최상위 컴포넌트에서 여러 컴포넌트의 props를 거쳐 상태와 함수를 전달했지만, Context API를 사용하면 Context를 만들어 단 한번에 원하는 값을 받아와서 사용할 수 있다.

### Context API 사용법 익히기

- createContext() and Consumer method and Render Props pattern and Provider

1. react의 createContext()를 이용하여 하나의 Context를 생성한다. 이 때 해당 함수의 파라미터에는 생성될 Context의 기본상태를 지정한다(초기화).
2. 사용할 컴포넌트에서 만들어진 Context를 불러온다. 불러온 Context는 하나의 컴포넌트로서 활용되는데 그 형식은 Context.Consumer이다. 즉, 하나의 컨텍스트 내부의 Consumer property를 사용한다. 이 값은 Render Props 패턴을 통해 컨텍스트 값을 JSX 내부에서 파라미터로 갖고 올 수 있다.
3. Provider는 위의 createContext()함수의 파라미터에서 초기화된 value를 수정할 수 있게 하는 method이다. 만약 Provider를 사용했는데 초기화된 Context의 값을 바꾸거나 수정하지 않으면 오류가 난다.

### 동적 Context 사용하기

- Context의 값을 업데이트해야 하는 경우 어떻게 해야하는지 알아보자.

1. color.js내부 코드를 잘 살펴보자. 동적 context를 사용하기 위해서 ColorProvider 컴포넌트를 만들고 해당 컨텍스트의 Provider를 return한다. 이 Provider의 value의 상태는 state로, 업데이트 함수는 actions로 묶어서 전달하고 있다. 이렇게 state와 actions를 분리해주면 나중에 다른 컴포넌트에서 Context의 값을 사용할 때 편리하다.
2. createContext의 기본값으로 사용할 객체도 실제 Provider의 value에 넣는 객체의 형태와 일치시켜주는 것이 좋다. 이러헥 하면 Context 코드를 볼 때 내부 값이 어떠헥 구성되어 있는지 파악하기도 쉽고, 실수로 Provider를 사용하지 않았을 때에도 에러가 발생하지 않는다.
3. '색상 선택 컴포넌트 만들기'에서 Context API의 방식에 집중하자. SelectColor에서 마우스 클릭 이벤트가 발생했을 떄 그 값을 App에 전달하여 상태가 바뀐 것을 다시 props를 통해 ColorBox에 넣은 것이 아니다.
4. 현재 state는 color context가 관리하고 있고 ColorBox는 color의 consumer로서 state의 property를 참조하고 있다. SelectColors는 state와 actions라는 method를 참조하고 있으며 이를 통해 color의 state를 업데이트하고 있고, [이 부분이 잘 이해가 안간다!!!!!!!]
