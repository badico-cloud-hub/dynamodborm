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

	module.exports = __webpack_require__(29);


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/createClass");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/regenerator");

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/defineProperty");

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(12);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _regenerator = __webpack_require__(4);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(6);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

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
	      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(id) {
	        return _regenerator2.default.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                return _context.abrupt('return', this.connection.get(this.Model, id));

	              case 1:
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
	      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(params) {
	        var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	            pageSize = _ref3.pageSize,
	            limit = _ref3.limit;

	        var options;
	        return _regenerator2.default.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                options = {
	                  pageSize: pageSize || limit || 10,
	                  limit: limit || pageSize || 100
	                };
	                _context2.next = 3;
	                return this.connection.query(this.Model, params, options);

	              case 3:
	                this.bucket = _context2.sent;
	                return _context2.abrupt('return', this.bucket);

	              case 5:
	              case 'end':
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));

	      function query(_x2) {
	        return _ref2.apply(this, arguments);
	      }

	      return query;
	    }()
	  }, {
	    key: 'find',
	    value: function () {
	      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
	        var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	            pageSize = _ref5.pageSize,
	            lastIndex = _ref5.lastIndex,
	            query = _ref5.query,
	            indexKey = _ref5.indexKey,
	            limit = _ref5.limit;

	        var options;
	        return _regenerator2.default.wrap(function _callee3$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
	              case 0:
	                options = {
	                  pageSize: pageSize || limit || 25,
	                  startKey: lastIndex && new this.Model((0, _defineProperty3.default)({}, indexKey || 'id', lastIndex)),
	                  limit: limit || pageSize || 25
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
	                return _context3.abrupt('return', this.query(query, options));

	              case 7:
	              case 'end':
	                return _context3.stop();
	            }
	          }
	        }, _callee3, this);
	      }));

	      function find() {
	        return _ref4.apply(this, arguments);
	      }

	      return find;
	    }()
	  }]);
	  return Repository;
	}();

	exports.default = Repository;

/***/ })

/******/ });