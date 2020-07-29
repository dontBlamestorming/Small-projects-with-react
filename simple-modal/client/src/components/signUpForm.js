import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      password: "",
      nickname: "",
      samePassword: "",
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      gender: "",
      redirect: false,
      isDuplicate: "",
      isDuplicateChecked: false,
      isSamePassword: false,
      signUpSubmitError: ""
    };
  }

  // 생년월일 중 '월'에 표시될 JSX 리턴 함수
  genMonth = () => {
    const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    // return month.map((array, index) => <option key={index}>{array}</option>);
    const monthList = month.map((arrValue, index) => {
      return <option key={index}>{arrValue}</option>;
    });

    return monthList;
  };

  // '중복체크' 버튼 클릭시 실행하는 함수
  handleBtnOnClick = e => {
    e.preventDefault();
    this.DuplicateEmailCheck();
  };

  DuplicateEmailCheck = () => {
    axios
      .post("/checkEmail", {
        typedEmail: this.state.userId
      })
      .then(
        function(res) {
          if (res.data.isDuplicate) {
            this.setState({
              isDuplicate: "사용가능한 이메일 입니다.",
              isDuplicateChecked: true
            });
          } else {
            this.setState({
              isDuplicate: "중복된 이메일 입니다. 다른 이메일을 입력해 주세요."
            });
          }
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });
  };

  // '회원가입' 버튼 클릭시 Submit이 실행되는 함수
  handleFormSubmit = e => {
    e.preventDefault();
    this.signUpUser();
  };

  signUpUser = () => {
    if (this.state.isDuplicateChecked) {
      axios
        .post("/signUp/users", {
          userId: this.state.userId,
          password: this.state.password,
          nickname: this.state.nickname,
          birthYear: this.state.birthYear,
          birthMonth: this.state.birthMonth,
          birthDay: this.state.birthDay,
          gender: this.state.gender
        })
        .then(
          function(res) {
            console.log(res);
            if (res.data.redirectURL) {
              const nicknameToApp = res.config.data.nickname;
              console.log(nicknameToApp);
              this.setState({
                redirect: true
              });
            } else if (res.data.signUpSubmitError) {
              this.setState({
                signUpSubmitError: res.data.signUpSubmitError
              });
            }
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    } else {
      this.setState({
        signUpSubmitError: "아이디 중복확인을 해주시기 바랍니다."
      });
    }
  };

  // 정보가 입력될 때마다 state 업데이트
  handleValueChange = e => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.props.onValueChange(nextState);
    this.setState(nextState);
  };

  // 비밀번호 동일여부 판단 함수
  handleReconfirmPassword = e => {
    let isSamePassword;
    let nextPassword = {};
    const inputValue = e.target.value;
    nextPassword[e.target.name] = inputValue;
    this.setState(nextPassword);

    if (this.state.password === inputValue) {
      isSamePassword = true;
    } else {
      isSamePassword = false;
    }

    this.setState({ isSamePassword });
  };

  render() {
    return (
      <div id="signUp">
        {this.state.redirect && <Redirect to="/confirmedUser" />}
        <div className="signUp">
          <form className="signUpForm" onSubmit={this.handleFormSubmit}>
            <h1>회원가입시 필요한 정보를 입력해 주세요.</h1>
            ID :{" "}
            <input
              className="id"
              type="email"
              name="userId"
              value={this.state.userId}
              placeholder="email"
              onChange={this.handleValueChange}
            />
            <button className="emailCheckBtn" onClick={this.handleBtnOnClick}>
              중복체크
            </button>
            <br />
            <p>{this.state.isDuplicate}</p>
            PASSWORD :{" "}
            <input
              className="password"
              type="password"
              name="password"
              value={this.state.password}
              placeholder="password"
              onChange={this.handleValueChange}
            />
            <br />
            RECONFIRM PASSWORD :{" "}
            <input
              className="samePassword"
              type="password"
              name="samePassword"
              value={this.state.samePassword}
              placeholder="reconfirm password"
              onChange={this.handleReconfirmPassword}
            />
            <br />
            <p>
              {this.state.isSamePassword
                ? "동일한 비밀번호 입니다."
                : "동일한 비밀번호를 입력해 주세요."}
            </p>
            NICKNAME :{" "}
            <input
              className="nickname"
              type="text"
              name="nickname"
              value={this.state.nickname}
              placeholder="Nick Name"
              onChange={this.handleValueChange}
            />
            <br />
            성별 :
            <label
              htmlFor="genderInput1, genderInput2" // is it working?
              onChange={this.handleValueChange}
            >
              <input
                id="genderInput1"
                className="genderMale"
                name="gender"
                type="radio"
                value="Male"
              />
              남자
              <input
                id="genderInput2"
                className="genderFemale"
                name="gender"
                type="radio"
                value="Female"
              />
              여자
            </label>
            <br />
            생년월일 :
            <input
              className="birthYear"
              type="text"
              name="birthYear"
              maxLength="4"
              placeholder="년(4자)"
              onChange={this.handleValueChange}
              value={this.state.birthYear}
            />
            년
            <label>
              <select
                className="birthMonth"
                name="birthMonth"
                value={this.state.birthMonth}
                onChange={this.handleValueChange}
              >
                {this.genMonth()}
              </select>
              월
            </label>
            <input
              className="birthDay"
              type="text"
              value={this.state.birthDay}
              name="birthDay"
              maxLength="2"
              placeholder="일"
              onChange={this.handleValueChange}
            />
            일
            <br />
            <button className="signUpBtn" type="submit">
              회원가입
            </button>
          </form>
          <p>{this.state.signUpSubmitError}</p>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
