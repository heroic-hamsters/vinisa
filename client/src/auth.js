import $ from 'jquery';
import ajax from './lib/ajax.js';

var login = (username, password, authCB) => {
  ajax.loginAjax(username, password, (res) => {
    if (res.authenticated) {
      localStorage.setItem('authenticated', true);
      authCB(true);
    } else {
      localStorage.setItem('authenticated', false);
      authCB(false);
    }
  });
};

var signup = (username, password, nativeLanguage, learnLanguage, authCB) => {
  ajax.signupAjax(username, password, nativeLanguage, learnLanguage, (res) => {
    if (res.authenticated) {
      localStorage.setItem('authenticated', true);
      authCB(true);
    } else {
      localStorage.setItem('authenticated', false);
      authCB(false);
    }
  });
};

var logout = () => {
  localStorage.setItem('authenticated', false);
};

var isLoggedIn = () => {
  return localStorage.authenticated === 'true';
};

module.exports = {
  login: login,
  signup: signup,
  logout: logout,
  isLoggedIn: isLoggedIn
};