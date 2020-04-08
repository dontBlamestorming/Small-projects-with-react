import React, { Component } from 'react';

class Weather extends Component {
    componentDidMount() {
        
    }

    render() {
        return (
            <div id="login">
                <div className="login">
                    <form className="loginForm" name="loginForm" action=${obj_authForm.login_action} method="post">
                        <p><input className="id" name="userId" type="text" placeholder="email"/></p>
                        <p><input className="password" name="userPassword" type="password" placeholder="password"/></p>
                        <p><input className="loginBtn" name="loginBtn" type="submit" value=${obj_authForm.login_value}/></p>
                    </form>
                    <p className="errMent"></p>
                    <a href="/signUp">Sign-Up</a>
                </div>
            </div>
        )
    }
}

export default Weather;