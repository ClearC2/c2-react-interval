'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FunctionInterval = require('./FunctionInterval');

var _FunctionInterval2 = _interopRequireDefault(_FunctionInterval);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FunctionIntervalComponent = function (_Component) {
  _inherits(FunctionIntervalComponent, _Component);

  function FunctionIntervalComponent() {
    _classCallCheck(this, FunctionIntervalComponent);

    return _possibleConstructorReturn(this, (FunctionIntervalComponent.__proto__ || Object.getPrototypeOf(FunctionIntervalComponent)).apply(this, arguments));
  }

  _createClass(FunctionIntervalComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          func = _props.func,
          ms = _props.ms,
          args = _props.args;

      this.interval = new _FunctionInterval2.default(func, args, ms);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var args = this.props.args;

      this.interval.setArgs(args);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.interval.tearDown();
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children || null;
    }
  }]);

  return FunctionIntervalComponent;
}(_react.Component);

FunctionIntervalComponent.propTypes = {
  func: _propTypes2.default.func.isRequired,
  ms: _propTypes2.default.number.isRequired,
  args: _propTypes2.default.any,
  children: _propTypes2.default.node
};
exports.default = FunctionIntervalComponent;