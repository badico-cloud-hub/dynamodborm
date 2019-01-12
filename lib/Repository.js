module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(41);


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/extends");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/createClass");

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/regenerator");

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DynamoDBORMError = undefined;

	var _extends2 = __webpack_require__(2);

	var _extends3 = _interopRequireDefault(_extends2);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(12);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(13);

	var _inherits3 = _interopRequireDefault(_inherits2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DynamoDBORMError = exports.DynamoDBORMError = function (_Error) {
	    (0, _inherits3.default)(DynamoDBORMError, _Error);

	    function DynamoDBORMError(_ref, code, message) {
	        var error = _ref.error,
	            errors = _ref.errors,
	            args = _ref.args,
	            className = _ref.className,
	            method = _ref.method;
	        (0, _classCallCheck3.default)(this, DynamoDBORMError);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (DynamoDBORMError.__proto__ || Object.getPrototypeOf(DynamoDBORMError)).call(this, message || code + ' has being catch in ' + className + ' on method ' + method));

	        _this.name = 'DynamoDBORMError';
	        _this.code = code;
	        if (error) {
	            _this.error = error;
	        }
	        if (errors) {
	            _this.errors = errors;
	        }
	        _this.fnData = {
	            args: args,
	            method: method,
	            className: className
	        };

	        Error.captureStackTrace(_this, _this.constructor);
	        return _this;
	    }

	    return DynamoDBORMError;
	}(Error);

	function mapErrors(errors) {
	    return errors.map(function (error) {
	        return (0, _extends3.default)({
	            identifier: error.code,
	            message: error.message
	        }, error);
	    });
	}

	DynamoDBORMError.fromArray = function (errors, kind, message) {
	    return new DynamoDBORMError((0, _extends3.default)({}, errors[0], {
	        error: undefined,
	        errors: mapErrors(errors)
	    }), kind, message);
	};

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ }),

/***/ 13:
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/inherits");

/***/ }),

/***/ 17:
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/defineProperty");

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(2);

	var _extends3 = _interopRequireDefault(_extends2);

	var _objectWithoutProperties2 = __webpack_require__(3);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

	var _defineProperty2 = __webpack_require__(17);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _regenerator = __webpack_require__(6);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(8);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _DynamoDBORMError = __webpack_require__(11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Repository = function () {
	  function Repository(Model, connection) {
	    (0, _classCallCheck3.default)(this, Repository);

	    this.Model = Model;
	    this.connection = connection;
	    this.bucket = [];
	  }

	  (0, _createClass3.default)(Repository, [{
	    key: 'get',
	    value: function () {
	      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(filter) {
	        var bucket;
	        return _regenerator2.default.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                _context.next = 2;
	                return this.connection.get(this.Model, filter);

	              case 2:
	                bucket = _context.sent;

	                console.log(bucket);

	                if (bucket) {
	                  _context.next = 6;
	                  break;
	                }

	                throw new _DynamoDBORMError.DynamoDBORMError({
	                  error: new Error('The item searched was not found'),
	                  args: [filter],
	                  className: 'Repository',
	                  method: 'get'
	                }, 'NotFoundItem');

	              case 6:
	                return _context.abrupt('return', bucket);

	              case 7:
	              case 'end':
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function get(_x) {
	        return _ref.apply(this, arguments);
	      }

	      return get;
	    }()
	  }, {
	    key: 'query',
	    value: function () {
	      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(key, params) {
	        return _regenerator2.default.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                _context2.next = 2;
	                return this.connection.query(this.Model, key, params);

	              case 2:
	                this.bucket = _context2.sent;
	                return _context2.abrupt('return', this.bucket);

	              case 4:
	              case 'end':
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));

	      function query(_x2, _x3) {
	        return _ref2.apply(this, arguments);
	      }

	      return query;
	    }()
	  }, {
	    key: 'find',
	    value: function () {
	      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
	        var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	            scanIndexForward = _ref4.scanIndexForward,
	            pageSize = _ref4.pageSize,
	            lastIndex = _ref4.lastIndex,
	            filter = _ref4.filter,
	            query = _ref4.query,
	            indexKey = _ref4.indexKey,
	            limit = _ref4.limit;

	        var options, index, queryKeys;
	        return _regenerator2.default.wrap(function _callee3$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
	              case 0:
	                options = {
	                  pageSize: pageSize || limit || 25,
	                  startKey: lastIndex && new this.Model((0, _defineProperty3.default)({}, indexKey || 'id', lastIndex)),
	                  limit: limit || pageSize || 25,
	                  filter: filter,
	                  scanIndexForward: scanIndexForward
	                };

	                if (query) {
	                  _context3.next = 6;
	                  break;
	                }

	                _context3.next = 4;
	                return this.connection.scan(this.Model, options);

	              case 4:
	                this.bucket = _context3.sent;
	                return _context3.abrupt('return', this.bucket);

	              case 6:
	                index = query.index, queryKeys = (0, _objectWithoutProperties3.default)(query, ['index']);
	                return _context3.abrupt('return', this.query(queryKeys, (0, _extends3.default)({}, options, { index: index })));

	              case 8:
	              case 'end':
	                return _context3.stop();
	            }
	          }
	        }, _callee3, this);
	      }));

	      function find() {
	        return _ref3.apply(this, arguments);
	      }

	      return find;
	    }()
	  }]);
	  return Repository;
	}();

	exports.default = Repository;

/***/ })

/******/ });