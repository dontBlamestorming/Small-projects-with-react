import React, { Component, Fragment } from "react";
import "./css/reset.css";
import "./css/style.css";

// Routing
import { Switch, Route, BrowserRouter } from "react-router-dom";

// 실제 사용자 서비스를 위한 Component
import Clock from "./components/Clock";
import Bg_photo from "./components/BgPhoto";
import Greeting from "./components/Greeting";
import Todo from "./components/Todo";
// import Todolist from "./components/Todolist";
import Weather from "./components/Weather";

// authentication(인증) Components
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      password: "",
      nickname: ""
    };
  }

  handleValueChange = Value => {
    this.setState(Value);
    console.log(this.state);
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <LoginForm
                  {...props}
                  onValueChange={this.handleValueChange}
                  userId={this.state.userId}
                  password={this.state.password}
                />
              )}
            />

            <Route
              path="/signUp"
              render={props => (
                <SignUpForm {...props} onValueChange={this.handleValueChange} />
              )}
            />

            <Route
              path="/confirmedUser"
              render={props => (
                <Fragment>
                  <Greeting {...props} nickname={this.state.nickname} />
                  <Clock />
                  <Todo />
                  <Weather />
                  <Bg_photo />
                </Fragment>
              )}
            />

            <Route
              path="*"
              render={() => {
                return <div>찾을 수 없는 페이지 입니다.</div>;
              }}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
