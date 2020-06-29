import React from "react";
import styled, { css } from "styled-components";

const sizes = {
  // 여기 값에 따라 자동으로 media 쿼리 함수 생성
  desktop: 1024,
  tablet: 768
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

const Box = styled.div`
  background: ${props => props.color || "blue"};
  /* props로 넣어 준 값을 직접 전달해 줄 수 있다. 위의 코드는 Box 컴포넌트의 props의 값을 참조하여, 값이 없으면 color가 blue로 지정된다. <Box color="black">(...)</Box> */
  padding: 1rem;
  display: flex;
  /* 가로 크기 1024px에 가운데 정렬, 크기 줄일수록 같이 줄어듬, 크기가 768px 미만인 경우 꽉채움 */

  width: 1024px;
  margin: 0 auto;
  ${media.desktop`width: 768px;`}
  ${media.tablet`width: 100%;`}
`;

/* 
    styled.div`(style)`와 같이 작성하고 tagged 템플릿 리터럴 문법을 통해 style을 넣어주면 해당 style이 적용된 div로 이루어진 리액트 컴포넌트가 생성된다. 


*/

const Button = styled.button`
  background: white;
  color: black;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: 1rem;
  font-size: 1rem;
  font-weight: 600;

  /* &문자를 사용하여 Sass처럼 자기 자신 선택 가능 */
  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }

  /* 다음 코드는 inverted 값이 true일 때 특정 스타일을 부여해 줍니다. */
  ${props =>
    props.inverted &&
    css`
      /*
        style 코드 여러 줄을 해당 컴포넌트의 props를 참조하여 넣을 때는 styled-components의 css를 불러와야 한다. 없어도 동작하지만 syntax highligting이 작동하지 않으며 백틱이 일반 템플릿 리터럴로 취급되기 때문에 props의 값을 참조하지 못한다는 단점이 있다. 
     */
      background: none;
      border: 2px solid white;
      color: white;
      &:hover {
        background: white;
        color: black;
      }
    `};
  & + button {
    margin-left: 1rem;
  }
`;

const StyledComponent = () => (
  <Box color="black">
    <Button>안녕하세요</Button>
    <Button inverted={true}>테두리만</Button>
  </Box>
);

export default StyledComponent;
