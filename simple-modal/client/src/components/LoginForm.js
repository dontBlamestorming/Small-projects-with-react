import React, { Component } from "react";
import axios from "axios";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Greeting from "./Greeting";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/confirmedUser" />;
    }
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.loginUser();
  };

  loginUser = () => {
    axios
      .post("/signIn/users", {
        userId: this.props.userId,
        password: this.props.password
      })
      .then(
        function(res) {
          if (res) {
            this.props.onValueChange(res.data);
            this.setRedirect();
          }
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });
  };

  handleValueChange = e => {
    let nextState = new Object();
    const inputValue = e.target.value;
    nextState[e.target.name] = inputValue;
    this.props.onValueChange(nextState);
  };

  render() {
    return (
      <div id="login">
        {this.renderRedirect()}
        <div className="login">
          <form className="loginForm" onSubmit={this.handleFormSubmit}>
            <h1>아이디와 비밀번호를 입력해주세요.</h1>
            ID :
            <input
              className="id"
              type="email"
              name="userId"
              // value={this.state.userId} - type이 연속적으로 되지않는 이유
              placeholder="email"
              onChange={this.handleValueChange}
            />
            <br />
            PASSWORD :
            <input
              className="password"
              type="password"
              name="password"
              // value={this.state.password}
              placeholder="password"
              onChange={this.handleValueChange}
            />
            <br />
            <button type="submit">로그인</button>
          </form>
          <Link to="/signUp">
            <button>회원가입</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default LoginForm;
