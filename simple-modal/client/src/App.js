import React, { Component } from 'react';
import './css/reset.css';     // reading css file
import './css/style.css';     // reading css file

// Components
import Clock from './components/Clock'
import Bg_photo from './components/BgPhoto'
import Greeting from './components/Greeting'
import Todolist from './components/Todolist'
import Weather from './components/Weather'

// authentication
import LoginForm from './components/LoginForm'

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
      <div className="App">
        <LoginForm/>
        <Clock/>
        <Greeting/>
        <Todolist/>
        <Weather/>
        <Bg_photo/>
      </div>
    )
  }
}

export default App;
