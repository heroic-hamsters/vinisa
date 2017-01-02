"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Signup = function (_React$Component) {
  _inherits(Signup, _React$Component);

  function Signup(props) {
    _classCallCheck(this, Signup);

    return _possibleConstructorReturn(this, (Signup.__proto__ || Object.getPrototypeOf(Signup)).call(this, props));
  }

  _createClass(Signup, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "h1",
          null,
          "Signup"
        ),
        _react2.default.createElement(
          "form",
          { className: "signupForm" },
          _react2.default.createElement(
            "div",
            null,
            "Username: ",
            _react2.default.createElement("input", { type: "text" })
          ),
          _react2.default.createElement(
            "div",
            null,
            "Password: ",
            _react2.default.createElement("input", { type: "password" })
          ),
          _react2.default.createElement(
            "div",
            null,
            "Your language:",
            _react2.default.createElement(
              "select",
              null,
              _react2.default.createElement(
                "option",
                null,
                "English"
              ),
              _react2.default.createElement(
                "option",
                null,
                "Chinese"
              )
            )
          ),
          _react2.default.createElement(
            "div",
            null,
            "Language you want to learn:",
            _react2.default.createElement(
              "select",
              null,
              _react2.default.createElement(
                "option",
                null,
                "English"
              ),
              _react2.default.createElement(
                "option",
                null,
                "Chinese"
              )
            )
          ),
          _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement("input", { type: "submit" })
          )
        )
      );
    }
  }]);

  return Signup;
}(_react2.default.Component);

exports.default = Signup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9zcmMvQ29tcG9uZW50cy9TaWdudXAuanN4Il0sIm5hbWVzIjpbIlNpZ251cCIsInByb3BzIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07OztBQUNuQixrQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLDJHQUNYQSxLQURXO0FBRWxCOzs7OzZCQUVRO0FBQ1AsYUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBREY7QUFHRTtBQUFBO0FBQUEsWUFBTSxXQUFVLFlBQWhCO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBZSxxREFBTyxNQUFLLE1BQVo7QUFBZixXQURGO0FBRUU7QUFBQTtBQUFBO0FBQUE7QUFBZSxxREFBTyxNQUFLLFVBQVo7QUFBZixXQUZGO0FBSUU7QUFBQTtBQUFBO0FBQUE7QUFFRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBREY7QUFFRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkY7QUFGRixXQUpGO0FBWUU7QUFBQTtBQUFBO0FBQUE7QUFFRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBREY7QUFFRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkY7QUFGRixXQVpGO0FBb0JFO0FBQUE7QUFBQTtBQUFLLHFEQUFPLE1BQUssUUFBWjtBQUFMO0FBcEJGO0FBSEYsT0FERjtBQThCRDs7OztFQXBDaUMsZ0JBQU1DLFM7O2tCQUFyQkYsTSIsImZpbGUiOiJTaWdudXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaWdudXAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgxPlNpZ251cDwvaDE+XG5cbiAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwic2lnbnVwRm9ybVwiPlxuICAgICAgICAgIDxkaXY+VXNlcm5hbWU6IDxpbnB1dCB0eXBlPVwidGV4dFwiIC8+PC9kaXY+XG4gICAgICAgICAgPGRpdj5QYXNzd29yZDogPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIC8+PC9kaXY+XG5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgWW91ciBsYW5ndWFnZTogXG4gICAgICAgICAgICA8c2VsZWN0PlxuICAgICAgICAgICAgICA8b3B0aW9uPkVuZ2xpc2g8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbj5DaGluZXNlPC9vcHRpb24+XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICBMYW5ndWFnZSB5b3Ugd2FudCB0byBsZWFybjpcbiAgICAgICAgICAgIDxzZWxlY3Q+XG4gICAgICAgICAgICAgIDxvcHRpb24+RW5nbGlzaDwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uPkNoaW5lc2U8L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdj48aW5wdXQgdHlwZT1cInN1Ym1pdFwiIC8+PC9kaXY+XG5cbiAgICAgICAgPC9mb3JtPlxuXG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59Il19