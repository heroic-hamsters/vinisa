import $ from 'jquery';
import ajax from './lib/ajax.js';
import cookie from 'react-cookie';

var login = (username, password, authCB) => {
  ajax.loginAjax(username, password, (res) => {
    if (res.authenticated) {
      cookie.save('authenticated', true, { path: '/' });
      authCB(true);
    } else {
      cookie.save('authenticated', false, { path: '/' });
      authCB(false);
    }
  });
};

var signup = (username, password, nativeLanguage, learnLanguage, authCB) => {
  ajax.signupAjax(username, password, nativeLanguage, learnLanguage, (res) => {
    if (res.authenticated) {
      cookie.save('authenticated', true, { path: '/' });
      authCB(true);
    } else {
      cookie.save('authenticated', false, { path: '/' });
      authCB(false);
    }
  });
};

var logout = () => {
  cookie.save('authenticated', false, { path: '/' });
};

var isLoggedIn = () => {
  return cookie.load('authenticated') === 'true';
};

module.exports = {
  login: login,
  signup: signup,
  logout: logout,
  isLoggedIn: isLoggedIn
};
