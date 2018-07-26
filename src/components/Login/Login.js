import React, { Component } from 'react';

import logo from './communityBank.svg';
import './Login.css'



login() {
  
}


export default class Login extends Component {
  render() {
    return (
      <div className="App">
      <img src={logo} alt="" />
      <button onClick={this.login}>Login</button>
        <h1>HOME ROUTE</h1>
      </div>
    );
  }
};
