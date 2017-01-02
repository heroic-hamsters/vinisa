'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      var store = this.props.route.store;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          store.sitename
        ),
        this.props.children
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9zcmMvQ29tcG9uZW50cy9BcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsInByb3BzIiwic3RvcmUiLCJyb3V0ZSIsInNpdGVuYW1lIiwiY2hpbGRyZW4iLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7OztJQUdxQkEsRzs7O0FBQ25CLGVBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxxR0FDWEEsS0FEVztBQUVsQjs7Ozs2QkFFUTtBQUNQLFVBQU1DLFFBQVEsS0FBS0QsS0FBTCxDQUFXRSxLQUFYLENBQWlCRCxLQUEvQjtBQUNBLGFBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUtBLGdCQUFNRTtBQUFYLFNBREY7QUFFRyxhQUFLSCxLQUFMLENBQVdJO0FBRmQsT0FERjtBQU1EOzs7O0VBYjhCLGdCQUFNQyxTOztrQkFBbEJOLEciLCJmaWxlIjoiQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG9ic2VydmVyIH0gZnJvbSAnbW9ieC1yZWFjdCc7XG5cbkBvYnNlcnZlclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgc3RvcmUgPSB0aGlzLnByb3BzLnJvdXRlLnN0b3JlO1xuICAgIHJldHVybihcbiAgICAgIDxkaXY+XG4gICAgICAgIDxoMT57c3RvcmUuc2l0ZW5hbWV9PC9oMT5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59Il19