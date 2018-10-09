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
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(2);

	var _extends3 = _interopRequireDefault(_extends2);

	var _objectWithoutProperties2 = __webpack_require__(3);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _regenerator = __webpack_require__(6);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _toConsumableArray2 = __webpack_require__(7);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _asyncToGenerator2 = __webpack_require__(8);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var getMappedItems = function () {
	  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(iterator) {
	    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	    var _ref2, done, value;

	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _context.next = 2;
	            return iterator.next();

	          case 2:
	            _ref2 = _context.sent;
	            done = _ref2.done;
	            value = _ref2.value;

	            if (done) {
	              _context.next = 7;
	              break;
	            }

	            return _context.abrupt('return', getMappedItems(iterator, [].concat((0, _toConsumableArray3.default)(data), [value])));

	          case 7:
	            return _context.abrupt('return', data);

	          case 8:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  return function getMappedItems(_x) {
	    return _ref.apply(this, arguments);
	  };
	}();

	var _dynamodbDataMapper = __webpack_require__(9);

	var _dynamodb = __webpack_require__(10);

	var _dynamodb2 = _interopRequireDefault(_dynamodb);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Connection = function () {
	  function Connection(_ref3, options) {
	    var region = _ref3.region;
	    (0, _classCallCheck3.default)(this, Connection);

	    this.options = options || { onMissing: 'skip' };
	    this.client = new _dynamodb2.default({ region: region || 'us-east-1' });
	    this.mapper = new _dynamodbDataMapper.DataMapper({ client: this.client });
	  }

	  (0, _createClass3.default)(Connection, [{
	    key: 'query',
	    value: function () {
	      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(DomainClass, keys, _ref5) {
	        var index = _ref5.index,
	            filter = _ref5.filter,
	            options = (0, _objectWithoutProperties3.default)(_ref5, ['index', 'filter']);
	        return _regenerator2.default.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                if (!filter) {
	                  _context2.next = 2;
	                  break;
	                }

	                return _context2.abrupt('return', getMappedItems(this.mapper.query(DomainClass, keys, (0, _extends3.default)({}, index ? { indexName: index } : {}, {
	                  filter: filter
	                }, options))));

	              case 2:
	                if (!index) {
	                  _context2.next = 4;
	                  break;
	                }

	                return _context2.abrupt('return', getMappedItems(this.mapper.query(DomainClass, keys, (0, _extends3.default)({ indexName: index }, options))));

	              case 4:
	                return _context2.abrupt('return', getMappedItems(this.mapper.query(DomainClass, keys)));

	              case 5:
	              case 'end':
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));

	      function query(_x3, _x4, _x5) {
	        return _ref4.apply(this, arguments);
	      }

	      return query;
	    }()
	  }, {
	    key: 'delete',
	    value: function () {
	      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(item) {
	        return _regenerator2.default.wrap(function _callee3$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
	              case 0:
	                return _context3.abrupt('return', this.mapper.delete({ item: item }));

	              case 1:
	              case 'end':
	                return _context3.stop();
	            }
	          }
	        }, _callee3, this);
	      }));

	      function _delete(_x6) {
	        return _ref6.apply(this, arguments);
	      }

	      return _delete;
	    }()
	  }, {
	    key: 'get',
	    value: function () {
	      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(DomainClass, _ref8) {
	        var index = _ref8.index,
	            keys = (0, _objectWithoutProperties3.default)(_ref8, ['index']);
	        var list;
	        return _regenerator2.default.wrap(function _callee4$(_context4) {
	          while (1) {
	            switch (_context4.prev = _context4.next) {
	              case 0:
	                if (!index) {
	                  _context4.next = 7;
	                  break;
	                }

	                _context4.next = 3;
	                return getMappedItems(this.mapper.query(DomainClass, keys, { indexName: index }));

	              case 3:
	                list = _context4.sent;

	                if (!(list.length > 1)) {
	                  _context4.next = 6;
	                  break;
	                }

	                throw new Error('Not unique item');

	              case 6:
	                return _context4.abrupt('return', list[0]);

	              case 7:
	                _context4.next = 9;
	                return getMappedItems(this.mapper.query(DomainClass, keys));

	              case 9:
	                return _context4.abrupt('return', _context4.sent[0]);

	              case 10:
	              case 'end':
	                return _context4.stop();
	            }
	          }
	        }, _callee4, this);
	      }));

	      function get(_x7, _x8) {
	        return _ref7.apply(this, arguments);
	      }

	      return get;
	    }()
	  }, {
	    key: 'update',
	    value: function () {
	      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(item) {
	        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	        return _regenerator2.default.wrap(function _callee5$(_context5) {
	          while (1) {
	            switch (_context5.prev = _context5.next) {
	              case 0:
	                console.log('item to update', item);
	                return _context5.abrupt('return', this.mapper.update({ item: item }, (0, _extends3.default)({}, this.options, options)));

	              case 2:
	              case 'end':
	                return _context5.stop();
	            }
	          }
	        }, _callee5, this);
	      }));

	      function update(_x9) {
	        return _ref9.apply(this, arguments);
	      }

	      return update;
	    }()
	  }, {
	    key: 'scan',
	    value: function () {
	      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(DomainClass, options) {
	        return _regenerator2.default.wrap(function _callee6$(_context6) {
	          while (1) {
	            switch (_context6.prev = _context6.next) {
	              case 0:
	                return _context6.abrupt('return', getMappedItems(this.mapper.scan(DomainClass, options)));

	              case 1:
	              case 'end':
	                return _context6.stop();
	            }
	          }
	        }, _callee6, this);
	      }));

	      function scan(_x11, _x12) {
	        return _ref10.apply(this, arguments);
	      }

	      return scan;
	    }()
	  }]);
	  return Connection;
	}();

	exports.default = Connection;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/extends");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/createClass");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/toConsumableArray");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = require("@aws/dynamodb-data-mapper");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = require("aws-sdk/clients/dynamodb");

/***/ })
/******/ ]);