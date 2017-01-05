import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './Components/App.jsx';

import AppStore from './Components/AppStore.jsx';
import About from './Components/About.jsx';
import Signup from './Components/Signup.jsx';
import Login from './Components/Login.jsx';
import Home from './Components/Home.jsx';
import Library from './Components/Library.jsx';
import SearchResults from './Components/SearchResults.jsx';
import WordDetails from './Components/WordDetails.jsx';
import data from '../../data.js';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={ App } store={ AppStore } >
      <IndexRoute component={ About } />
      <Route path="/library" component={ Library } data={window.data} store={ AppStore } />
      <Route path="/library/:word" store = { AppStore } component={ WordDetails }/>
      <Route path="/signup" store = { AppStore } component={ Signup } />
      <Route path="/login" store = { AppStore } component={ Login } />
      <Route path="/home" store={ AppStore } component={ Home } />
      <Route path="/searchresults" component={ SearchResults } />
    </Route>
  </Router>
), document.getElementById('app'));
