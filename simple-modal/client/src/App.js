import React, { Component, Fragment } from "react";
import "./css/reset.css"; // reading css file
import "./css/style.css"; // reading css file

// Routing
import { Link, Route, BrowserRouter as Router } from "react-router-dom";

// Components
import Clock from "./components/Clock";
import Bg_photo from "./components/BgPhoto";
import Greeting from "./components/Greeting";
import Todolist from "./components/Todolist";
import Weather from "./components/Weather";

// authentication
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      password: "",
      nickName: ""
    };
  }

  // state = {
  //   user : ""
  // }

  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({  // returned 'body' in callApi
  //       user : res
  //     }))
  //     .catch(err => console.log(err));
  // }

  // callApi = async () => {
  //   const response = await fetch('/auth/users');
  //   const body = await response.json();
  //   return body;
  // }

  handleValueChange = Value => {
    this.setState(Value);
    console.log(this.state);
  };

  // this.handleValueChange = this.handleValueChange.bind(this); 이 필요함(차이 공부)

  // handleValueChange(Value) {
  //   console.log(Value);
  //   this.setState({
  //     userId : Value,
  //     password : Value
  //   })
  // }

  render() {
    return (
      <Router>
        <div className="App">
          <main>
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
            <Route path="/signUp" render={props => <SignUpForm {...props} />} />
            <Route
              path="/confirmedUser"
              render={props => (
                <Fragment>
                  <Greeting {...props} nickName={this.state.mem_nickname} />
                  <Clock />
                  <Todolist />
                  <Weather />
                  <Bg_photo />
                </Fragment>
              )}
            />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
