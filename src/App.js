import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Login from './components/Login/Login';
import './App.css';


class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route path='/' component={Login} exact />
            {/* <Route path='/about' component={} /> */}
          </Switch>
        </HashRouter>
        
      </div>
    );
  }
}

export default App;
