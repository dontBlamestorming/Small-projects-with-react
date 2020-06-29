## Component Styling

### 가장 흔한 방식, 일반 CSS

CSS 종류

> 1.  일반 CSS : 컴포넌트를 스타일링하는 가장 기본적인 방식
> 2.  Sass : CSS 전처리기(pre-processor)중 하나로 확장된 CSS 문법을 사용
> 3.  CSS Module : 클래스 이름끼리 절대 충돌하지 않도록 파일마다 고유한 이름을 자동으로 생성해주는 옵션
> 4.  Style-components : 스타일을 작성함과 동시에 해당스타일이 적용된 컴포넌트를 만들 수 있게 해주는 것

CSS 클래스를 중복되지 않게 만드는 것이 매우 중요하다. 이를 위한 여러가지 방법이 있는데 첫번 째는 이름을 지을 때 특별한 규칙을 사용하는 것이고 두번 째는 CSS Selector를 활용하는 것이다.

> 1.  이름 짓는 규칙 - 클래스 이름에 컴포넌트 이름을 포함시킴으로써 다른 컴포넌트에서 중복사용을 방지(예 : App-header). 비슷한 방식으로 BEM 네이밍이라는 방식도 있다(예 : .card_title-primary).
> 2.  CSS Selector - CSS 클래스가 특정 클래스 내부에 있는 경우에만 가능하다. 예를 들어 App 컴포넌트 내의 .logo에 스타일을 주고 싶으면

    .App .logo {
      animation : App-logo-spin infinite 20s linear;
      height : 40vmin
    }

이러한 방식으로 작성한다.

### Sass 사용하기

Sass(Syntactically Awesome Style Sheets) 사용하기

> 1. CSS 전처리기로 복잡한 작업을 쉽게 할 수 있도록 해주고 코드의 재활용성, 가독성을 높여 유지보수를 더욱 쉽게 해준다.
> 2. Sass는 .sass와 .scss 2가지 확장자를 지원한다. 이 두개의 문법은 꽤 다르다. .sass는 중괄호와 세미콜론을 사용하지 않는다. 보통 .scss 문법이 더 자주 사용된다.
> 3. 우선 node-sass라는 라이브러리가 필요하다. 이것은 Sass를 css로 변환해 준다.
> 4. 여러 파일에서 사용될 수 있는 Sass 변수 및 Mix-in은 다른 파일로 분리하여 작성한 뒤 필요한 곳에서 쉽게 불러와 사용할 수 있다.
> 5. 만약 프로젝트에 디렉터리가 깊어졌다면 상위 폴더로 한참 거슬러 올라가야 한다는 단점이 있다. @import '../../../styles/utils';. 이는 Webpack에서 Sass를 처리하는 sass-loader의 설정을 통해 해결할 수 있다.
>    5-1. create-react-app의 프로젝트는 복잡도를 낮추기 위해 세부설정이 모두 숨겨져 있다. 이를 yarn eject 명령어를 통해 밖으로 꺼내주어야 한다. (현재 디렉토리 특성상 skip)
> 6. Sass는 라이브러리를 쉽게 불러와서 사용할 수 있다. node_module에 상대경로 말고 물결을 써주자. @import '../../../node_module/library/styles'; => @import '~library/styles';.

<연습>
반응형 디자인 라이브러리 : include-media
색상 팔레트 : open-color

### CSS Module

CSS를 불러와서 사용할 때 클래스 이름을 고유값 '[파일이름]\_[클래스 이름]\_\_[해시값]' 형태로 자동생성하여 컴포넌트 스타일 클래스 이름이 중첩되는 현상을 방지해주는 기술이다. 최신버전에서는 따로 설정할 필요 없이 확장자를 .module.css로 저장하면 CSS Module이 적용된다.

> 클래스 이름의 고유성을 고민하지 않아도 된다. 해당 클래스는 방금 만든 스타일을 직접 불러온 컴포넌트 내부에서'만' 작동하기 때문이다.
> 만약 특정 클래스를 웹 페이지에서 전역적으로 사용할 경우라면 ':global'로 글로벌 CSS임을 명시한다.
> CSS의 클래스를 조건부로 설정할 때 매우 유용한 라이브러리 - classNames // Scss로도 사용가능(CSSModule.module.scss)

CSS Module이 적용된 파일을 불러오면 객체를 하나 전달받는다. 이 객체의 값은 클래스이름(key):값(고유값)이다. 글로벌 CSS인 경우는 그대로 className을 문자열로 넣으면 된다. 두 개의 클래스 이름을 적용할 때에는 template literal을 사용하면 된다.<br />

### styled-components

CSS-in-JS : 자바스크립트 안에 스타일을 선언하는 방식으로 유명한 라이브러리는 styled-components가 있다. 대체할 수 있는 라이브러리는 emotion이다. js파일 안에 CSS까지 작성할 수 있기 때문에 .css 또는 .scss를 만들 필요가 없다.

> 1. Tagged 템플릿 리터럴 - 일반 템플릿 리터럴과 다른점은 JS 객체나 함수를 전달할 때 온전히 추출 가능 - styled-components는 이러한 속성을 사용하여 컴포넌트의 props 스타일쪽에서 쉽게 조회하도록 한다.
>    > https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals 참고할 것
> 2. style-components의 property에 tagged 템플릿 리터럴을 이용하여 component에 선제적으로 스타일을 적용시킬 수 있다. (예 : styled.div`(style)`)
> 3. media를 모듈화하여 사용하면 여기 저기서 불러와 이용하기가 편리하다(코드참고)
