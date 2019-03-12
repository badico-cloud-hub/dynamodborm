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

	module.exports = __webpack_require__(15);


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

	var _DynamoDBORMError = __webpack_require__(11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Connection = function () {
	  function Connection(_ref3, options) {
	    var region = _ref3.region;
	    (0, _classCallCheck3.default)(this, Connection);

	    this.options = options || { onMissing: 'skip'

	      /**
	       * DBLOCALregion: 'localhost',
	       * endpoint: 'http://localhost:8000'
	      */
	    };if (process.env['DBLOCAL']) {
	      this.client = new _dynamodb2.default({
	        region: 'localhost',
	        endpoint: process.env['DBLOCAL']
	      });
	    } else {
	      this.client = new _dynamodb2.default({ region: region || 'us-east-1' });
	    }
	    this.mapper = new _dynamodbDataMapper.DataMapper({ client: this.client });
	  }

	  (0, _createClass3.default)(Connection, [{
	    key: 'query',
	    value: function () {
	      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(DomainClass, keys, _ref5) {
	        var index = _ref5.index,
	            filter = _ref5.filter,
	            options = (0, _objectWithoutProperties3.default)(_ref5, ['index', 'filter']);
	        var params;
	        return _regenerator2.default.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                _context2.prev = 0;
	                params = (0, _extends3.default)({}, options);

	                if (filter) {
	                  Object.assign(params, { filter: filter });
	                }

	                if (index) {
	                  Object.assign(params, { indexName: index });
	                }

	                return _context2.abrupt('return', getMappedItems(this.mapper.query(DomainClass, keys, params)));

	              case 7:
	                _context2.prev = 7;
	                _context2.t0 = _context2['catch'](0);
	                throw new _DynamoDBORMError.DynamoDBORMError({
	                  error: _context2.t0,
	                  method: 'query',
	                  className: 'Connection',
	                  args: [DomainClass, keys, (0, _extends3.default)({ index: index, filter: filter }, options)]
	                }, 'ConnectionError');

	              case 10:
	              case 'end':
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this, [[0, 7]]);
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
	                _context3.prev = 0;
	                return _context3.abrupt('return', this.mapper.delete({ item: item }));

	              case 4:
	                _context3.prev = 4;
	                _context3.t0 = _context3['catch'](0);
	                throw new _DynamoDBORMError.DynamoDBORMError({
	                  error: _context3.t0,
	                  method: 'delete',
	                  className: 'Connection',
	                  args: [item]
	                }, 'ConnectionError');

	              case 7:
	              case 'end':
	                return _context3.stop();
	            }
	          }
	        }, _callee3, this, [[0, 4]]);
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
	                _context4.prev = 0;

	                if (!index) {
	                  _context4.next = 8;
	                  break;
	                }

	                _context4.next = 4;
	                return getMappedItems(this.mapper.query(DomainClass, keys, { indexName: index }));

	              case 4:
	                list = _context4.sent;

	                if (!(list.length > 1)) {
	                  _context4.next = 7;
	                  break;
	                }

	                throw new Error('Not unique item');

	              case 7:
	                return _context4.abrupt('return', list[0]);

	              case 8:
	                _context4.next = 10;
	                return getMappedItems(this.mapper.query(DomainClass, keys));

	              case 10:
	                return _context4.abrupt('return', _context4.sent[0]);

	              case 13:
	                _context4.prev = 13;
	                _context4.t0 = _context4['catch'](0);
	                throw new _DynamoDBORMError.DynamoDBORMError({
	                  error: _context4.t0,
	                  method: 'get',
	                  className: 'Connection',
	                  args: [DomainClass, (0, _extends3.default)({ index: index }, keys)]
	                }, 'ConnectionError');

	              case 16:
	              case 'end':
	                return _context4.stop();
	            }
	          }
	        }, _callee4, this, [[0, 13]]);
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
	                _context5.prev = 0;
	                return _context5.abrupt('return', this.mapper.update({ item: item }, (0, _extends3.default)({}, this.options, options)));

	              case 4:
	                _context5.prev = 4;
	                _context5.t0 = _context5['catch'](0);
	                throw new _DynamoDBORMError.DynamoDBORMError({
	                  error: _context5.t0,
	                  method: 'update',
	                  className: 'Connection',
	                  args: [DomainClass, options]
	                }, 'ConnectionError');

	              case 7:
	              case 'end':
	                return _context5.stop();
	            }
	          }
	        }, _callee5, this, [[0, 4]]);
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
	                _context6.prev = 0;
	                return _context6.abrupt('return', getMappedItems(this.mapper.scan(DomainClass, options)));

	              case 4:
	                _context6.prev = 4;
	                _context6.t0 = _context6['catch'](0);
	                throw new _DynamoDBORMError.DynamoDBORMError({
	                  error: _context6.t0,
	                  method: 'scan',
	                  className: 'Connection',
	                  args: [DomainClass, options]
	                }, 'ConnectionError');

	              case 7:
	              case 'end':
	                return _context6.stop();
	            }
	          }
	        }, _callee6, this, [[0, 4]]);
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

/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/inherits");

/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Migration = undefined;

	var _toConsumableArray2 = __webpack_require__(7);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _objectWithoutProperties2 = __webpack_require__(3);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

	var _typeof2 = __webpack_require__(16);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _defineProperty2 = __webpack_require__(17);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _extends4 = __webpack_require__(2);

	var _extends5 = _interopRequireDefault(_extends4);

	var _regenerator = __webpack_require__(6);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(8);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(12);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(13);

	var _inherits3 = _interopRequireDefault(_inherits2);

	exports.findDomainDeps = findDomainDeps;
	exports.getMigrationsFiles = getMigrationsFiles;

	var _fs = __webpack_require__(18);

	var _fs2 = _interopRequireDefault(_fs);

	var _path = __webpack_require__(19);

	var _path2 = _interopRequireDefault(_path);

	var _util = __webpack_require__(20);

	var _util2 = _interopRequireDefault(_util);

	var _Connection2 = __webpack_require__(1);

	var _Connection3 = _interopRequireDefault(_Connection2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MigrationError = function (_Error) {
	    (0, _inherits3.default)(MigrationError, _Error);

	    function MigrationError(genericMessage, errorsList) {
	        var _ref;

	        (0, _classCallCheck3.default)(this, MigrationError);

	        for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	            args[_key - 2] = arguments[_key];
	        }

	        var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = MigrationError.__proto__ || Object.getPrototypeOf(MigrationError)).call.apply(_ref, [this, genericMessage, errorsList].concat(args)));

	        _this.errors = errorsList;
	        return _this;
	    }

	    return MigrationError;
	}(Error);

	var Migration = exports.Migration = function (_Connection) {
	    (0, _inherits3.default)(Migration, _Connection);

	    function Migration(ChangeLogAggregator) {
	        var _ref2;

	        (0, _classCallCheck3.default)(this, Migration);

	        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	            args[_key2 - 1] = arguments[_key2];
	        }

	        var _this2 = (0, _possibleConstructorReturn3.default)(this, (_ref2 = Migration.__proto__ || Object.getPrototypeOf(Migration)).call.apply(_ref2, [this].concat(args)));

	        _this2.ChangeLogAggregator = ChangeLogAggregator;
	        return _this2;
	    }

	    (0, _createClass3.default)(Migration, [{
	        key: 'log',
	        value: function () {
	            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref4) {
	                var operation = _ref4.operation,
	                    completedAt = _ref4.completedAt,
	                    domain = _ref4.domain,
	                    migrationName = _ref4.migrationName,
	                    kind = _ref4.kind,
	                    status = _ref4.status,
	                    errorMessage = _ref4.errorMessage,
	                    label = _ref4.label,
	                    duration = _ref4.duration;
	                var ChangeLog, log;
	                return _regenerator2.default.wrap(function _callee$(_context) {
	                    while (1) {
	                        switch (_context.prev = _context.next) {
	                            case 0:
	                                ChangeLog = this.ChangeLogAggregator.ChangeLog;
	                                log = new ChangeLog({
	                                    status: status,
	                                    errorMessage: errorMessage,
	                                    label: label,
	                                    operation: operation,
	                                    completedAt: completedAt,
	                                    duration: duration,
	                                    domain: domain,
	                                    migrationName: migrationName,
	                                    kind: kind
	                                });
	                                _context.next = 4;
	                                return log.save();

	                            case 4:
	                                return _context.abrupt('return', this);

	                            case 5:
	                            case 'end':
	                                return _context.stop();
	                        }
	                    }
	                }, _callee, this);
	            }));

	            function log(_x) {
	                return _ref3.apply(this, arguments);
	            }

	            return log;
	        }()
	    }, {
	        key: 'createTable',
	        value: function () {
	            var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(Model) {
	                var _this3 = this;

	                return _regenerator2.default.wrap(function _callee2$(_context2) {
	                    while (1) {
	                        switch (_context2.prev = _context2.next) {
	                            case 0:
	                                return _context2.abrupt('return', this.mapper.ensureTableExists(Model, (0, _extends5.default)({
	                                    readCapacityUnits: Model.readCapacity,
	                                    writeCapacityUnits: Model.writeCapacity
	                                }, Model.indexes && Model.indexes.length ? { indexOptions: Model.indexes.reduce(function (options, index) {
	                                        return (0, _extends5.default)({}, options, (0, _defineProperty3.default)({}, index.name, {
	                                            readCapacityUnits: index.readCapacity,
	                                            writeCapacityUnits: index.writeCapacity,
	                                            projection: index.projection,
	                                            type: index.type

	                                        }));
	                                    }, {})
	                                } : {})).then(function () {
	                                    return _this3;
	                                }));

	                            case 1:
	                            case 'end':
	                                return _context2.stop();
	                        }
	                    }
	                }, _callee2, this);
	            }));

	            function createTable(_x2) {
	                return _ref5.apply(this, arguments);
	            }

	            return createTable;
	        }()
	    }, {
	        key: 'dropTable',
	        value: function () {
	            var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(Model) {
	                var _this4 = this;

	                return _regenerator2.default.wrap(function _callee3$(_context3) {
	                    while (1) {
	                        switch (_context3.prev = _context3.next) {
	                            case 0:
	                                return _context3.abrupt('return', this.mapper.ensureTableNotExists(Model).then(function () {
	                                    return _this4;
	                                }));

	                            case 1:
	                            case 'end':
	                                return _context3.stop();
	                        }
	                    }
	                }, _callee3, this);
	            }));

	            function dropTable(_x3) {
	                return _ref6.apply(this, arguments);
	            }

	            return dropTable;
	        }()

	        // TODO: CHANGE
	        // https://github.com/awslabs/dynamodb-data-mapper-js/issues/58

	    }, {
	        key: 'updateItems',
	        value: function () {
	            var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(fn) {
	                return _regenerator2.default.wrap(function _callee4$(_context4) {
	                    while (1) {
	                        switch (_context4.prev = _context4.next) {
	                            case 0:
	                            case 'end':
	                                return _context4.stop();
	                        }
	                    }
	                }, _callee4, this);
	            }));

	            function updateItems(_x4) {
	                return _ref7.apply(this, arguments);
	            }

	            return updateItems;
	        }()
	    }, {
	        key: 'changeIndexes',

	        // https://github.com/awslabs/dynamodb-data-mapper-js/issues/113
	        value: function () {
	            var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(index) {
	                return _regenerator2.default.wrap(function _callee5$(_context5) {
	                    while (1) {
	                        switch (_context5.prev = _context5.next) {
	                            case 0:
	                            case 'end':
	                                return _context5.stop();
	                        }
	                    }
	                }, _callee5, this);
	            }));

	            function changeIndexes(_x5) {
	                return _ref8.apply(this, arguments);
	            }

	            return changeIndexes;
	        }()
	    }]);
	    return Migration;
	}(_Connection3.default);

	Migration.do = function (operation, fnList, migration, label) {
	    function isPromise(obj) {
	        return !!obj && ((typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
	    }
	    var validationErrors = [];
	    if (operation !== 'deploy' && operation !== 'rollback') {
	        validationErrors.push({
	            message: 'Not received a valid operation to perform',
	            identifier: '1st argument, operation'
	        });
	    }
	    if (!(fnList instanceof Array) && !(fnList.fn instanceof Function)) {
	        validationErrors.push({
	            message: 'Not received a valid task to perform',
	            identifier: '2nd argument, fnList'
	        });
	    }

	    if (!(migration instanceof Migration)) {
	        validationErrors.push({
	            message: 'Not received a valid migration instance',
	            identifier: '3rd argument, migration'
	        });
	    }

	    if (fnList instanceof Array) {
	        fnList.forEach(function (i, index) {
	            // console.log(util.inspect(i), typeof fn)
	            if (typeof i.fn !== 'function') {
	                validationErrors.push({
	                    message: 'A Task inside the list was not a valid function',
	                    identifier: '2nd argument, fnList item in position ' + index + ' [zeroBasedIndex]'
	                });
	            }
	        });
	    } else {
	        var fn = fnList.fn;

	        if (typeof fn !== 'function') {
	            validationErrors.push({
	                message: 'The Task sended is not a valid function',
	                identifier: '2nd argument, fnList as a unique item'
	            });
	        }
	    }

	    fnList instanceof Object;

	    if (validationErrors.length) {
	        return Promise.reject(new MigrationError('A validation error has being catch... operation not performed', validationErrors));
	    }

	    var labelToBeloged = label || operation + '.' + Date.now();

	    var lineupMigrations = function lineupMigrations(funcs) {
	        return funcs.reduce(function (promise, _ref9, index) {
	            var fn = _ref9.fn,
	                migrationName = _ref9.migrationName,
	                DomainAggregator = _ref9.DomainAggregator,
	                kind = _ref9.kind,
	                domain = _ref9.domain;

	            // log begin here
	            var start = Date.now();
	            return promise.then(function (lastFnCompleted) {
	                console.log(migrationName + ', ' + domain + ' is about to start');
	                if (isPromise(fn)) {
	                    return fn;
	                }

	                return function () {
	                    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	                        args[_key3] = arguments[_key3];
	                    }

	                    return new Promise(function (resolve, reject) {
	                        try {
	                            return resolve(fn.apply(undefined, args));
	                        } catch (err) {
	                            return reject(err);
	                        }
	                    });
	                };
	            }).then(function (fnPromissed) {
	                return fnPromissed(DomainAggregator).then(function (migrationHasCompleted) {
	                    var duration = Date.now() - start;
	                    console.log(migrationName + ', ' + domain + ' has completed: ' + duration + ' seconds');

	                    return migration.log({
	                        operation: operation,
	                        kind: kind,
	                        completedAt: new Date().toISOString(),
	                        duration: duration,
	                        domain: domain,
	                        label: labelToBeloged,
	                        migrationName: migrationName,
	                        status: 1 // 'success'
	                    });
	                }).catch(function (err) {
	                    var duration = Date.now() - start;
	                    console.log(migrationName + ', ' + domain + ' has throw: ' + duration + ' seconds');
	                    console.log('ERROR::::', err);
	                    return migration.log({
	                        operation: operation,
	                        completedAt: new Date().toISOString(),
	                        duration: duration,
	                        kind: kind,
	                        domain: domain,
	                        label: labelToBeloged,
	                        migrationName: migrationName,
	                        status: 0, // error 
	                        errorMessage: err
	                    }).then(function () {
	                        throw new Error('A error has being occured, check migration logs for more information');
	                    });
	                });
	            });
	        }, Promise.resolve([]));
	    };
	    var bindedFns = (fnList instanceof Array ? fnList : [fnList]).map(function (_ref10) {
	        var fn = _ref10.fn,
	            args = (0, _objectWithoutProperties3.default)(_ref10, ['fn']);
	        return (0, _extends5.default)({ fn: fn.bind(migration) }, args);
	    });

	    try {
	        console.log(operation + ' about to start');
	        var _start = Date.now();
	        return lineupMigrations(bindedFns).then(function (lastFnCompleted) {
	            return console.log(operation + ' has being completed, duration: ' + (Date.now() - _start) + ' seconds');
	        });
	    } catch (err) {
	        console.log('Error has being catch and has interrupted ' + operation + ', duration: ' + (Date.now() - start) + ' seconds');
	    }
	};

	function validateDomainName(name) {
	    var isDomain = !!name.match(/domain-/g);
	    return isDomain;
	}
	function checkValidDynamodbORMDomain(_package) {
	    var isDomain = validateDomainName(_package.name);
	    var hasDynamodbORM = !!_package.dependencies['@spark/dynamodborm'] || !!_package.dependencies['dynamodborm'];
	    return isDomain && hasDynamodbORM;
	}

	function findDomainDeps(_package) {
	    var deps = _package.dependencies;
	    var depsNames = Object.keys(deps);
	    var depsVersions = Object.values(deps);
	    var getDomains = function getDomains() {
	        var domains = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	        var this_iteration_domain = void 0;
	        if (depsNames[index].match(/domain-/g)) {
	            var atualized_domains = [].concat((0, _toConsumableArray3.default)(domains), [{
	                domain: depsNames[index],
	                reference: depsVersions[index]
	            }]);
	            this_iteration_domain = atualized_domains;
	        }
	        var atualized_index = index + 1;
	        if (atualized_index < depsNames.length) {
	            return getDomains(this_iteration_domain || domains, atualized_index);
	        }

	        return this_iteration_domain || domains;
	    };
	    return getDomains();
	}
	function getMigrationsFiles(domain) {
	    var comandDirPath = this.comandDirPath,
	        _package = this._package;


	    function getCustomOrDefaultList(domainName) {
	        if (domainName) {
	            if (!validateDomainName(domainName)) {
	                throw new Error('Not a valid domain name');
	            }
	        }
	        var fullpath = _path2.default.join.apply(_path2.default, [comandDirPath].concat((0, _toConsumableArray3.default)(domainName && domainName !== _package.name ? ['node_modules'].concat((0, _toConsumableArray3.default)(domainName.split('/')), ['src']) : ['src']), ['migrations']));

	        console.log(fullpath);

	        if (_fs2.default.existsSync(fullpath)) {
	            var migrationsfile = _fs2.default.readdirSync(fullpath);
	            if (migrationsfile.length) {
	                return migrationsfile.map(function (filepath) {
	                    return '' + _path2.default.join(fullpath, filepath);
	                });
	            }
	        }

	        var defaultPath = _path2.default.join(
	        // __dirname,
	        comandDirPath,
	        // ...(domainName ? domainName.split('/') : []),
	        'node_modules', '@spark', 'dynamodborm', 'migrate', 'default-migrations');
	        // default create-table
	        return _fs2.default.readdirSync(defaultPath).map(function (filepath) {
	            return '' + _path2.default.join(defaultPath, filepath);
	        });
	    }

	    if (!domain) {
	        if (checkValidDynamodbORMDomain(_package)) {
	            // procceed with reading on the actual package
	            return (0, _defineProperty3.default)({}, _package.name, getCustomOrDefaultList());
	        }

	        // look for domain packages in dependencies
	        var domains = findDomainDeps(_package);
	        if (domains.length) {
	            // go to domain packages
	            return domains.map(function (_ref12) {
	                var domain = _ref12.domain;
	                return getCustomOrDefaultList(domain);
	            }).reduce(function (finalList, list, i) {
	                return (0, _extends5.default)({}, finalList, (0, _defineProperty3.default)({}, domains[i].domain, list));
	            }, {});
	        }
	        throw new Error('Not found a valid dynamodborm domain');
	    }
	    return (0, _defineProperty3.default)({}, domain, getCustomOrDefaultList(domain));
	}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/typeof");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/defineProperty");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports = require("fs");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	module.exports = require("path");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	module.exports = require("util");

/***/ })
/******/ ]);