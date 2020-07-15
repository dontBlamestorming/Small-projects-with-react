### 데이터 연동하기

1. 컴포넌트가 화면에 보이는 시점에 API를 요청한다. useEffect를 사용하여 컴포넌트가 처음 렌더링 되는 시점에 API를 요청하는데, useEffect에 등록하는 함수에 async를 붙이면 안된다는 것을 주의해야 한다.
2. 왜냐하면 useEffect에서 반환해야 하는 값은 뒷정리 함수이기 때문이다. 따라서, 내부에 async/await을 사용하고 싶다면, 함수 내부에 async 키워드가 붙은 또 다른 함수를 사용해 주어야 한다.
3. loading 상태도 관리하여 API 요청이 대기중인지 판별한다. 요청이 대기 중일 때는 loading값이 true이며 요청이 끝나면 loading값이 false가 된다.
4. NewsList.js에서 map()를 사용하기 전에는 해당 값이 현재 null값인지 아닌지를 검사하고 return해야한다. 왜냐하면 setArticles()을 통해 articles값이 할당되지 않으면 배열이 아닌데 배열이 아닌 값에 map()을 쓸 수는 없다. map()은 배열객체에서 사용할수 있는 method이다.

### 카테고리 기능 구현

1. categories라는 배열 안에 name, text값이 있고 name은 실제 카테고리 값을, 그리고 text 값은 렌더링 할 떄 사용할 한글 카테고리를 가리킨다.
2. App에서 category 상태를 useState로 관리하자. 추가로 category 값을 업데이트 하는 onSelect()도 만들 것. category와 onSelect()는 Categories.js에 props로 전달할 것. category는 NewsList.js에도 넘겨야 한다.
3. category 값이 무엇인지에 따라 요청할 주소가 동적으로 바뀌고 있다. 추가로 category 값이 바뀔 때마가 뉴스를 새로 불러와야 하기 때문에 useEffect의 의존배열에 category를 넣어주어야 한다. class형 컴포넌트라면 componentDidMount or componentDidUpdate에서 요청을 해야하지만 함수형 컴포넌트에서는 useEffect 한번으로 설정할 수 있다.
