import React, { Component } from 'react';
import './css/reset.css';     // reading css file
import './css/style.css';     // reading css file

// Routing
import { Link, Route, BrowserRouter as Router } from "react-router-dom"; 

// Components
import Clock from './components/Clock';
import Bg_photo from './components/BgPhoto';
import Greeting from './components/Greeting';
import Todolist from './components/Todolist';
import Weather from './components/Weather';

// authentication
import signUpForm from './components/signUpForm';
import LoginForm from './components/LoginForm';

class App extends Component {

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

  render() {
    return (
      <Router>
        <div className="App">
          <main>
            <Route exact path="/" component={LoginForm} />
            <Route path="/signUp" component={signUpForm} />
            <Route path="/confirmedUser" component={Clock} />
            <Route path="/confirmedUser" component={Greeting} />
            <Route path="/confirmedUser" component={Todolist} />
            <Route path="/confirmedUser" component={Weather} />
            <Route path="/confirmedUser" component={Bg_photo} />
          </main>
        </div>
      </Router>
    )
  }
}

export default App;
