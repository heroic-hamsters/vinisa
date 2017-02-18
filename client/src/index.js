import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './Components/App.jsx';

import Navbar from './Components/Navbar.jsx';

import AppStore from './Components/AppStore.jsx';
import About from './Components/About.jsx';
import Signup from './Components/Signup.jsx';
import Login from './Components/Login.jsx';
import Home from './Components/Home.jsx';
import Library from './Components/Library.jsx';
import WordDetails from './Components/WordDetails.jsx';
import SavedWords from './Components/SavedWords.jsx';
import SavedSentences from './Components/SavedSens.jsx';
import ContributedSentences from './Components/ContributedSens.jsx';
import Help from './Components/Help.jsx';
import Settings from './Components/Settings.jsx';
import NotFound from './Components/NotFound.jsx';
import auth from './auth.js';
import axios from 'axios';
import cookie from 'react-cookie';

function requireAuth(nextState, replace) {
  axios.get('/api/authenticate').then(function(response) {
    if (!response.data.authenticated) {
        console.log('THIS IS BAD LOGIN');
        // replace({
        //   pathname: '/login',
        //   state: { nextPathname: nextState.location.pathname }
        // });
        if (cookie.load('hostname') === 'localhost') {
          window.location.replace("http://localhost:8080/login");
        } else {
          window.location.replace("https://vinisa.hr50.site/login");
        }
    } else {
      console.log('THIS IS GOOD LOGIN')
    }
  }).catch(function(error) {
    console.error('err:', error);
  });
};

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={ App }>
      <IndexRoute component={ About } />
      <Route component={ Navbar }>
        <Route onEnter={ requireAuth } path="/home" component={ Home } />
        <Route onEnter={ requireAuth } path="/library" component={ Library } >
          <IndexRoute component={ SavedWords } />
          <Route path="/savedwords" component={ SavedWords } />
          <Route path="/savedsentences" component={ SavedSentences} />
          <Route path="/contributedsentences" component={ ContributedSentences } />
        </Route>
        <Route path="/about" component={ Help } />
        <Route onEnter={ requireAuth } path="/word" component={ WordDetails }/>
        <Route onEnter={ requireAuth } path="/settings" component={ Settings } />
      </Route>
      <Route path="/signup" component={ Signup } />
      <Route path="/login" store = { AppStore } component={ Login } />
      <Route path="*" component={ NotFound } />
    </Route>
  </Router>
), document.getElementById('app'));
