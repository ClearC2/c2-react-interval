'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function isPromise(subject) {
  return (typeof subject === 'undefined' ? 'undefined' : _typeof(subject)) === 'object' && typeof subject.then === 'function';
}

var FunctionInterval = function () {
  function FunctionInterval(func, args, ms) {
    var _this = this;

    var invoke = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    _classCallCheck(this, FunctionInterval);

    this.setArgs = function (newArgs) {
      var oldArgs = _this.args;
      _this.args = newArgs;
      if (!_this._argsAreSame(oldArgs, newArgs)) {
        _this.invoke();
      }
    };

    this.invoke = function () {
      _this._clearTimeout();
      var result = _this.func(_this.args) || [];
      // coalesce the result to an array
      var resultArray = Array.isArray(result) ? result : [result];
      // coalesce the result array to array of promises
      var promises = resultArray.map(function (item) {
        return isPromise(item) ? item : Promise.resolve(item);
      });
      return Promise.all(promises).finally(_this._schedule);
    };

    this._schedule = function () {
      _this._clearTimeout();
      _this.timeoutId = setTimeout(_this.invoke, _this.ms);
    };

    this._clearTimeout = function () {
      clearTimeout(_this.timeoutId);
    };

    this._argsAreSame = function (args1, args2) {
      return JSON.stringify(args1) === JSON.stringify(args2);
    };

    this.func = func;
    this.args = args;
    this.ms = ms;
    this.timeoutId = null;
    if (invoke) {
      this.invoke();
    }
  }

  _createClass(FunctionInterval, [{
    key: 'tearDown',
    value: function tearDown() {
      this._clearTimeout();
    }
  }]);

  return FunctionInterval;
}();

exports.default = FunctionInterval;