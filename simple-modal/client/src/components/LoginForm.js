import React, { Component } from 'react';
import { post } from 'axios';
import axios from 'axios';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId:'',
            password : ''
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.addUsers()
            // .then((response) => {
            //     console.log(response.data);
            // })
    }

    addUsers = () => {
        axios.post('/auth/users', {
            userId: this.state.userId,
            password: this.state.password
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

    // formData Object way
    //     let formData = new FormData();
    //     formData.append('userId', this.state.userId);
    //     formData.append('password', this.state.password);

    //     axios.post('/auth/users', formData)
    //         .then(res => {
    //             console.log('response :', JSON.stringify(res, null , 2))
    //         .catch(err => {
    //             console.log('faild', err);
    //     });
    // });

        // const url = '/auth/users'

        // const formData = new FormData();
        // formData.append('userId', this.state.userId);
        // formData.append('password', this.state.password);

        // //test
        // for (var value of formData.values()) {
        //     console.log(value); 
        // }
        // const config = {
        //     headers: { 
        //         'Content-type': 'application/x-www-form-urlencoded' 
        //     }
        // }

        // return post(url, formData, config);
    }




    
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    // handleEmailChange(e){
    //     this.setState({email:e.target.value})
    // }

    // handlePasswordChange(e){
    //     this.setState({password:e.target.value})
    // }

    // signIn = () => {
    //     axios.post('/auth/users', {
    //         userId: this.state.userId,
    //         password: this.state.password
    //       })
    //       .then(function (response) {
    //         console.log(response);
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    // }
    // handleEmailChange(e){
    //     this.setState({ userId : e.target.value });
    //     console.log(e.target.userId);
    // }

    render() {
        return (
            <div id="login">
                <div className="login">
                    <form className="loginForm" onSubmit = {this.handleFormSubmit}>
                        <h1>아이디와 비밀번호를 입력해주세요.</h1>
                        ID : <input className="id" type="email" name="userId" value={this.state.userId} placeholder="email" onChange={this.handleValueChange}/><br/>
                        PASSWORD : <input className="password" type="password" name="password" value={this.state.password} placeholder="password" onChange={this.handleValueChange}/><br/>
                        <button type="submit">로그인</button>
                    </form>

                    {/* <form className="loginForm" name="loginForm" action="/auth/users" method="get">
                        <p><input className="id" name="userId" type="text" placeholder="email"/></p>
                        <p><input className="password" name="userPassword" type="password" placeholder="password"/></p>
                        <p><input className="loginBtn" name="loginBtn" type="submit"/></p>
                    </form>
                    <p className="errMent"></p>
                    <a href="/signUp">Sign-Up</a> */}
                </div>
            </div>
        )
    }
}

export default LoginForm;