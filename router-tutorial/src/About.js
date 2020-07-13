import React from "react";
import qs from "qs";

const About = ({ location }) => {
  console.log(location);
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true // 문자열 맨 앞의 ?를 생략한다.
  });
  console.log(query);
  const showDetail = query.detail === "true"; // 파싱 결과값은 문자열이다.
  console.log(showDetail);
  return (
    <div>
      <h1>소개</h1>
      <p>리엑트 라우터 기초를 실습하는 예제입니다.</p>
      {showDetail && <p>detail 값을 true로 설정하셨군요!</p>}
    </div>
  );
};

export default About;
