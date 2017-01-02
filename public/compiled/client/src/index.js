'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

var _App = require('./Components/App.jsx');

var _App2 = _interopRequireDefault(_App);

var _AppStore = require('./Components/AppStore.jsx');

var _AppStore2 = _interopRequireDefault(_AppStore);

var _About = require('./Components/About.jsx');

var _About2 = _interopRequireDefault(_About);

var _Signup = require('./Components/Signup.jsx');

var _Signup2 = _interopRequireDefault(_Signup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
  _reactRouter.Router,
  { history: _reactRouter.browserHistory },
  _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: _App2.default, store: _AppStore2.default },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: _About2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/signup', component: _Signup2.default })
  )
), document.getElementById('app'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NsaWVudC9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsicmVuZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVBLG1CQUFTQSxNQUFULENBQ0U7QUFBQTtBQUFBLElBQVEsb0NBQVI7QUFDRTtBQUFBO0FBQUEsTUFBTyxNQUFLLEdBQVosRUFBZ0Isd0JBQWhCLEVBQWtDLHlCQUFsQztBQUNFLDZEQUFZLDBCQUFaLEdBREY7QUFFRSx3REFBTyxNQUFLLFNBQVosRUFBc0IsMkJBQXRCO0FBRkY7QUFERixDQURGLEVBT0dDLFNBQVNDLGNBQVQsQ0FBd0IsS0FBeEIsQ0FQSCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IFJvdXRlciwgUm91dGUsIGJyb3dzZXJIaXN0b3J5LCBJbmRleFJvdXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcblxuaW1wb3J0IEFwcCBmcm9tICcuL0NvbXBvbmVudHMvQXBwLmpzeCc7XG5pbXBvcnQgQXBwU3RvcmUgZnJvbSAnLi9Db21wb25lbnRzL0FwcFN0b3JlLmpzeCc7XG5cbmltcG9ydCBBYm91dCBmcm9tICcuL0NvbXBvbmVudHMvQWJvdXQuanN4JztcbmltcG9ydCBTaWdudXAgZnJvbSAnLi9Db21wb25lbnRzL1NpZ251cC5qc3gnO1xuXG5SZWFjdERPTS5yZW5kZXIoKFxuICA8Um91dGVyIGhpc3Rvcnk9e2Jyb3dzZXJIaXN0b3J5fT5cbiAgICA8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9eyBBcHAgfSBzdG9yZT17IEFwcFN0b3JlIH0gPlxuICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXsgQWJvdXQgfSAvPlxuICAgICAgPFJvdXRlIHBhdGg9XCIvc2lnbnVwXCIgY29tcG9uZW50PXsgU2lnbnVwIH0gLz5cbiAgICA8L1JvdXRlPlxuICA8L1JvdXRlcj5cbiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7Il19