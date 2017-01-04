import $ from 'jquery';

var loginAjax = (username, password, cb) => {
  $.ajax({
    url: 'api/signin',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({username: username, password: password}),
    success: (data) => {
      cb({authenticated: true});
    },
    error: (data) => {
      cb({authenticated: false});
    }
  });
};

var login = (username, password, authCB) => {
  loginAjax(username, password, (res) => {
    if (res.authenticated) {
      localStorage.setItem({authenticated: true});
      authCB(true);
    } else {
      localStorage.setItem({authenticated: false});
      authCB(false);
    }
  });
};

var isLoggedIn = () => {
  return !!localStorage.authenticated;
};

module.exports = {
  login: login,
  isLoggedIn: isLoggedIn
};