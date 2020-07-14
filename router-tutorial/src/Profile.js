import React from "react";
import WithRouterSample from "./WithRouter";

const data = {
  dave: {
    name: "이동욱",
    description: "개발자"
  },
  psk: {
    name: "박상균",
    description: "영화광"
  }
};

const Profile = ({ match }) => {
  console.log(match); // {path: "/profile/:username", url: "/profile/dave", isExact: true, params: {…}}
  // match 객체 :
  const { username } = match.params;
  // username = match.params.username;
  const profile = data[username];

  if (!profile) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }

  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.description}</p>
      <WithRouterSample />
    </div>
  );
};

export default Profile;

/*
    이 컴포넌트를 사용하는 <Route>에 path경로는 /profile/:username이다. 이렇게 설정하면 match.params.username값을 통해 현재 username값을 조회할 수 있다.
*/
