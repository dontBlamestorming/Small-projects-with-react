import React from "react";
import { Link, Route, NavLink } from "react-router-dom";
import Profile from "./Profile";

const Profiles = () => {
  const activeStyle = {
    background: "black",
    color: "white"
  };
  return (
    <div>
      <h3>사용자 목록:</h3>
      <ul>
        <li>
          <NavLink activeStyle={activeStyle} to="/profiles/dave" active>
            dave
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/profiles/psk">
            psk
          </NavLink>
        </li>
      </ul>

      <Route
        path="/profiles"
        exact
        render={() => <div>사용자를 선택해 주세요.</div>}
      />
      <Route path="/profiles/:username" component={Profile} />
    </div>
  );
};

export default Profiles;

/*
    JSX의 props를 설정할 때 값을 생략하면 자동으로 true값으로 설정된다. exact를 그냥 써준 것을 exact={true}와 같다. 
*/
