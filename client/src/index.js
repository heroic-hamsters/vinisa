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
import SavedWords from './Components/SavedWords.jsx';
import SavedSentences from './Components/SavedSens.jsx';
import ContributedSentences from './Components/ContributedSens.jsx';
import NotFound from './Components/NotFound.jsx';
import data from '../../data/sentences.js';
import auth from './auth.js';

var requireAuth = function(nextState, replace) {
  if (!auth.isLoggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={ App } store={ AppStore } >
      <IndexRoute component={ About } />
      <Route path="/library" component={ Library } data={window.data} store={ AppStore } >
        <IndexRoute component={SavedWords} />
        <Route path="savedwords" component={ SavedWords } />
        <Route path="savedsentences" component={ SavedSentences} />
        <Route path="contributedsentences" component={ ContributedSentences } />
      </Route>
      <Route path="/word" store = { AppStore } component={ WordDetails }/>
      <Route path="/signup" store = { AppStore } component={ Signup } />
      <Route path="/login" store = { AppStore  } component={ Login } />
      <Route path="/home" store={ AppStore } component={ Home } />
      <Route path="/searchresults" component={ SearchResults } />
      <Route path="*" component={ NotFound } />
    </Route>
  </Router>
), document.getElementById('app'));
