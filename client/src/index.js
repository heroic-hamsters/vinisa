import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import $ from 'jquery';

import App from './Components/App.jsx';
import AppStore from './Components/AppStore.jsx';
import About from './Components/About.jsx';
import Signup from './Components/Signup.jsx';
import Login from './Components/Login.jsx';
import Home from './Components/Home.jsx';
import Library from './Components/Library.jsx';
import SearchResults from './Components/SearchResults.jsx';
import WordDetails from './Components/WordDetails.jsx';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={ App } store={ AppStore } >
      <IndexRoute component={ About } />
      <Route path="/library" component={ Library } data={window.data}/>
      <Route path="/signup" store = { AppStore } component={ Signup } />
      <Route path="/login" store = { AppStore } component={ Login } />
      <Route path="/home" store={ AppStore } component={ Home } />
      <Route path="/searchresults" component={ SearchResults } />
      <Route path="/worddetails" component={ WordDetails } />
    </Route>
  </Router>
), document.getElementById('app'));
