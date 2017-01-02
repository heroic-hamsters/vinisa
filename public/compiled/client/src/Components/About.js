'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var About = function (_React$Component) {
  _inherits(About, _React$Component);

  function About(props) {
    _classCallCheck(this, About);

    return _possibleConstructorReturn(this, (About.__proto__ || Object.getPrototypeOf(About)).call(this, props));
  }

  _createClass(About, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'information' },
          _react2.default.createElement(
            'h2',
            null,
            'Language Learning with Photos'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Take a photo, and it will identify what objects are in that photo and translate it for you into your language of choice.'
          ),
          _react2.default.createElement(
            'p',
            null,
            'More details here'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'signup-button' },
          _react2.default.createElement(
            'button',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/signup' },
              'Signup'
            )
          )
        )
      );
    }
  }]);

  return About;
}(_react2.default.Component);

exports.default = About;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9zcmMvQ29tcG9uZW50cy9BYm91dC5qc3giXSwibmFtZXMiOlsiQWJvdXQiLCJwcm9wcyIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxLOzs7QUFDbkIsaUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSx5R0FDWEEsS0FEVztBQUVsQjs7Ozs2QkFFUTtBQUNQLGFBQ0U7QUFBQTtBQUFBO0FBRUU7QUFBQTtBQUFBLFlBQUssV0FBVSxhQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQURGO0FBRUU7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUZGO0FBR0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUhGLFNBRkY7QUFRRTtBQUFBO0FBQUEsWUFBSyxXQUFVLGVBQWY7QUFDRTtBQUFBO0FBQUE7QUFBUTtBQUFBO0FBQUEsZ0JBQU0sSUFBRyxTQUFUO0FBQUE7QUFBQTtBQUFSO0FBREY7QUFSRixPQURGO0FBZUQ7Ozs7RUFyQmdDLGdCQUFNQyxTOztrQkFBcEJGLEsiLCJmaWxlIjoiQWJvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFib3V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmZvcm1hdGlvblwiPlxuICAgICAgICAgIDxoMj5MYW5ndWFnZSBMZWFybmluZyB3aXRoIFBob3RvczwvaDI+XG4gICAgICAgICAgPHA+VGFrZSBhIHBob3RvLCBhbmQgaXQgd2lsbCBpZGVudGlmeSB3aGF0IG9iamVjdHMgYXJlIGluIHRoYXQgcGhvdG8gYW5kIHRyYW5zbGF0ZSBpdCBmb3IgeW91IGludG8geW91ciBsYW5ndWFnZSBvZiBjaG9pY2UuPC9wPlxuICAgICAgICAgIDxwPk1vcmUgZGV0YWlscyBoZXJlPC9wPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNpZ251cC1idXR0b25cIj5cbiAgICAgICAgICA8YnV0dG9uPjxMaW5rIHRvPVwiL3NpZ251cFwiPlNpZ251cDwvTGluaz48L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0iXX0=