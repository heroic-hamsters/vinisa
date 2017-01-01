import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './Components/App.jsx';
import AppStore from './Components/AppStore.jsx';

import About from './Components/About.jsx';
import Signup from './Components/Signup.jsx';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={ App } store={ AppStore } >
      <IndexRoute component={ About } />
      <Route path="/signup" component={ Signup } />
    </Route>
  </Router>
), document.getElementById('app'));