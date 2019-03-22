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

	module.exports = __webpack_require__(44);


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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DomainError = undefined;

	var _extends2 = __webpack_require__(2);

	var _extends3 = _interopRequireDefault(_extends2);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(12);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(13);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _DynamoDBORMError2 = __webpack_require__(11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DomainError = exports.DomainError = function (_DynamoDBORMError) {
	    (0, _inherits3.default)(DomainError, _DynamoDBORMError);

	    function DomainError(argz, kind, message) {
	        (0, _classCallCheck3.default)(this, DomainError);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (DomainError.__proto__ || Object.getPrototypeOf(DomainError)).call(this, (0, _extends3.default)({}, argz, {
	            className: 'Model'
	        }), kind, message));

	        _this.name = 'DomainError';
	        return _this;
	    }

	    return DomainError;
	}(_DynamoDBORMError2.DynamoDBORMError);

/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/typeof");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/defineProperty");

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.parseFields = exports.Model = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _dynamodbDataMapper = __webpack_require__(9);

	var _joi = __webpack_require__(22);

	var _joi2 = _interopRequireDefault(_joi);

	var _applyValueObjectSchema = __webpack_require__(23);

	var _applyValueObjectSchema2 = _interopRequireDefault(_applyValueObjectSchema);

	var _applyAggregationRootSchema = __webpack_require__(24);

	var _applyAggregationRootSchema2 = _interopRequireDefault(_applyAggregationRootSchema);

	var _applyCommonMethods = __webpack_require__(25);

	var _applyCommonMethods2 = _interopRequireDefault(_applyCommonMethods);

	var _buildAggregationRootModels = __webpack_require__(38);

	var _buildAggregationRootModels2 = _interopRequireDefault(_buildAggregationRootModels);

	var _parseFields = __webpack_require__(39);

	var _commonSchema = __webpack_require__(40);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var applyRootSchema = (0, _applyAggregationRootSchema2.default)({ DynamoDbSchema: _dynamodbDataMapper.DynamoDbSchema, DynamoDbTable: _dynamodbDataMapper.DynamoDbTable });
	var applyValueObjectSchema = (0, _applyValueObjectSchema2.default)({ DynamoDbSchema: _dynamodbDataMapper.DynamoDbSchema });

	var buildAgregationRootModel = (0, _buildAggregationRootModels2.default)({
	  embed: _dynamodbDataMapper.embed,
	  applyRootSchema: applyRootSchema,
	  applyValueObjectSchema: applyValueObjectSchema,
	  applyCommonMethods: _applyCommonMethods2.default,
	  Joi: _joi2.default,
	  commonSchema: _commonSchema.commonSchema
	});
	var parseFields = (0, _parseFields.parseFieldsFactory)(_joi2.default);

	function AgregationRootModel(connection, root, rootModel, objectsValueMaps) {
	  return Object.assign(root, buildAgregationRootModel(connection, rootModel, objectsValueMaps));
	}

	var Model = function Model(values) {
	  (0, _classCallCheck3.default)(this, Model);

	  Object.assign(this, values);
	};

	exports.Model = Model;
	exports.parseFields = parseFields;
	exports.default = AgregationRootModel;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	module.exports = require("joi");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.applyObjectValueSchema = undefined;

	var _defineProperty2 = __webpack_require__(17);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function applyObjectValueSchema(DynamoDbSchema, classDefinition, schema, connection, validator, joischema) {
	  var _Object$definePropert;

	  Object.assign(classDefinition.prototype, {
	    connection: connection,
	    validator: validator,
	    joischema: joischema
	  });
	  return Object.defineProperties(classDefinition.prototype, (_Object$definePropert = {}, (0, _defineProperty3.default)(_Object$definePropert, DynamoDbSchema, {
	    value: schema
	  }), (0, _defineProperty3.default)(_Object$definePropert, "connection", connection), (0, _defineProperty3.default)(_Object$definePropert, "validator", validator), (0, _defineProperty3.default)(_Object$definePropert, "joischema", joischema), _Object$definePropert));
	}

	function applyObjectValueSchemaFactory(_ref) {
	  var DynamoDbSchema = _ref.DynamoDbSchema;

	  return applyObjectValueSchema.bind(null, DynamoDbSchema);
	}
	exports.applyObjectValueSchema = applyObjectValueSchema;
	exports.default = applyObjectValueSchemaFactory;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.applyAgregationRootSchema = undefined;

	var _defineProperty2 = __webpack_require__(17);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function applyAgregationRootSchema(DynamoDbTable, DynamoDbSchema, classDefinition, _ref, connection, validator, joischema) {
	  var schema = _ref.schema,
	      tableName = _ref.tableName;

	  var _Object$definePropert;

	  console.log('TABLE NAME Being applyed ', tableName);
	  Object.assign(classDefinition.prototype, {
	    connection: connection,
	    validator: validator,
	    joischema: joischema
	  });
	  return Object.defineProperties(classDefinition.prototype, (_Object$definePropert = {}, (0, _defineProperty3.default)(_Object$definePropert, DynamoDbTable, {
	    value: tableName
	  }), (0, _defineProperty3.default)(_Object$definePropert, DynamoDbSchema, {
	    value: schema
	  }), _Object$definePropert));
	}

	function applyAgregationRootSchemaFactory(_ref2) {
	  var DynamoDbTable = _ref2.DynamoDbTable,
	      DynamoDbSchema = _ref2.DynamoDbSchema;

	  return applyAgregationRootSchema.bind(null, DynamoDbTable, DynamoDbSchema);
	}
	exports.applyAgregationRootSchema = applyAgregationRootSchema;
	exports.default = applyAgregationRootSchemaFactory;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(17);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _extends4 = __webpack_require__(2);

	var _extends5 = _interopRequireDefault(_extends4);

	var _commonMethods = __webpack_require__(26);

	var commons = _interopRequireWildcard(_commonMethods);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function applyCommonMethods(classDefinition) {
	  var extractMethods = function extractMethods(methods, key) {
	    if (classDefinition.prototype[key] === undefined) {
	      return (0, _extends5.default)({}, methods, (0, _defineProperty3.default)({}, key, commons[key]));
	    }
	    return (0, _extends5.default)({}, methods, (0, _defineProperty3.default)({}, '_' + key, commons[key]));
	  };
	  return Object.assign(classDefinition.prototype, Object.keys(commons).reduce(extractMethods, {}));
	}

	exports.default = applyCommonMethods;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _get = __webpack_require__(27);

	Object.defineProperty(exports, 'get', {
	  enumerable: true,
	  get: function get() {
	    return _get.get;
	  }
	});

	var _set = __webpack_require__(28);

	Object.defineProperty(exports, 'set', {
	  enumerable: true,
	  get: function get() {
	    return _set.set;
	  }
	});

	var _save = __webpack_require__(29);

	Object.defineProperty(exports, 'save', {
	  enumerable: true,
	  get: function get() {
	    return _save.save;
	  }
	});

	var _update = __webpack_require__(30);

	Object.defineProperty(exports, 'update', {
	  enumerable: true,
	  get: function get() {
	    return _update.update;
	  }
	});

	var _delete = __webpack_require__(31);

	Object.defineProperty(exports, 'delete', {
	  enumerable: true,
	  get: function get() {
	    return _delete.del;
	  }
	});

	var _validate = __webpack_require__(32);

	Object.defineProperty(exports, 'validate', {
	  enumerable: true,
	  get: function get() {
	    return _validate.validate;
	  }
	});

	var _getItem = __webpack_require__(33);

	Object.defineProperty(exports, 'getItem', {
	  enumerable: true,
	  get: function get() {
	    return _getItem.getItem;
	  }
	});

	var _addItem = __webpack_require__(35);

	Object.defineProperty(exports, 'addItem', {
	  enumerable: true,
	  get: function get() {
	    return _addItem.addItem;
	  }
	});

	var _removeItem = __webpack_require__(36);

	Object.defineProperty(exports, 'removeItem', {
	  enumerable: true,
	  get: function get() {
	    return _removeItem.removeItem;
	  }
	});

	var _updateItem = __webpack_require__(37);

	Object.defineProperty(exports, 'updateItem', {
	  enumerable: true,
	  get: function get() {
	    return _updateItem.updateItem;
	  }
	});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(17);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _extends3 = __webpack_require__(2);

	var _extends4 = _interopRequireDefault(_extends3);

	exports.get = get;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function get() {
	  var _this = this;

	  var extractRawData = function extractRawData(raw, key) {
	    return key === 'connection' || key === 'validator' || key === 'joischema' || key === 'merchantId' || key === 'errors' ? raw : (0, _extends4.default)({}, raw, (0, _defineProperty3.default)({}, key, _this[key]));
	  };

	  for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
	    keys[_key] = arguments[_key];
	  }

	  if (keys.length > 1) {
	    return keys.reduce(extractRawData, {});
	  }
	  if (keys.length > 0) {
	    return this[keys[0]];
	  }
	  return Object.keys(this).reduce(extractRawData, {});
	}

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.set = set;
	function set(key, value) {
	    this[key] = value;
	}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.save = undefined;

	var _regenerator = __webpack_require__(6);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(8);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var save = exports.save = function () {
	  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var now, updated;
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            now = new Date().toISOString();

	            if (this.id === undefined) {
	              this.createdAt = now;
	            }
	            this.updatedAt = now;
	            _context.next = 5;
	            return this.connection.update(this, options);

	          case 5:
	            updated = _context.sent;

	            Object.assign(this, updated.get());
	            return _context.abrupt("return", this);

	          case 8:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  return function save() {
	    return _ref.apply(this, arguments);
	  };
	}();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 30 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.update = update;
	function update(data) {
	  Object.assign(this, data);
	  return this;
	}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.del = undefined;

	var _regenerator = __webpack_require__(6);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(8);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var del = exports.del = function () {
	  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            this.connection.delete(this);
	            return _context.abrupt("return", this);

	          case 2:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  return function del() {
	    return _ref.apply(this, arguments);
	  };
	}();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(2);

	var _extends3 = _interopRequireDefault(_extends2);

	exports.validate = validate;

	var _DynamoDBORMError = __webpack_require__(11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function validator(joi, values, schema, self) {
	  return new Promise(function (resolve, reject) {
	    var _joi = joi(values, schema, { abortEarly: false }),
	        error = _joi.error;

	    if (error) {
	      var validationError = new _DynamoDBORMError.DynamoDBORMError({
	        error: error,
	        method: 'validate',
	        args: [joi, values, schema, self],
	        className: 'Model'
	      }, 'ValidationError');

	      var errors = error.details.map(function (e) {
	        console.log('ERROR & PATH', e);
	        var identifier = e.path.length ? e.path.filter(function (p) {
	          return isNaN(p);
	        }).join('.') : e.path;
	        var message = e.message;

	        return new _DynamoDBORMError.DynamoDBORMError({
	          method: 'validate',
	          args: [joi, values, schema, self],
	          className: 'Model'
	        }, identifier, message);
	      });
	      return reject(_DynamoDBORMError.DynamoDBORMError.fromArray(errors, 'ValidationError'));
	    }
	    return resolve(self);
	  });
	}

	function validate() {
	  return validator(this.validator, (0, _extends3.default)({}, this.get(), this.merchantId ? { merchantId: this.merchantId } : {}), this.joischema, this);
	}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getItem = getItem;

	var _DomainError = __webpack_require__(14);

	var _listHelpers = __webpack_require__(34);

	function getItem(itemKey, itemId) {
	    (0, _listHelpers.throwIfIsInvalidList)(this[itemKey]);
	    try {
	        var founded = this[itemKey].find(function (item) {
	            return item.id === itemId;
	        });
	        if (!founded) throw new Error('The item searched was not found');
	        return founded;
	    } catch (error) {
	        throw new _DomainError.DomainError({
	            error: error,
	            args: [itemKey, itemId],
	            method: 'getItem'
	        }, 'NotFoundItem');
	    }
	}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.throwIfIsInvalidList = undefined;

	var _DomainError = __webpack_require__(14);

	// TODO: test for this function
	var throwIfIsInvalidList = exports.throwIfIsInvalidList = function throwIfIsInvalidList(item) {
	    if (item !== undefined && !(item instanceof Array)) {
	        throw new _DomainError.DomainError({
	            error: new Error('The item is not a list'),
	            args: [itemKey, Item],
	            method: 'updateItem'
	        }, 'NotValidOperation');
	    }
	};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _toConsumableArray2 = __webpack_require__(7);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	exports.addItem = addItem;

	var _listHelpers = __webpack_require__(34);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function addItem(itemKey, Item) {
	    // TODO: test for this case
	    (0, _listHelpers.throwIfIsInvalidList)(this[itemKey]);
	    // TODO: add check for uniqueness
	    var items = this[itemKey] || [];
	    this[itemKey] = [].concat((0, _toConsumableArray3.default)(items), [Item]); // dont't like this
	    return this;
	}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.removeItem = removeItem;

	var _DomainError = __webpack_require__(14);

	var _listHelpers = __webpack_require__(34);

	function removeItem(itemKey, itemId) {
	  // TODO: test for this case
	  (0, _listHelpers.throwIfIsInvalidList)(this[itemKey]);
	  var founded = false;
	  // // TODO: test for this case
	  this[itemKey] = this[itemKey].filter(function (item) {
	    if (item.id === itemId) founded = true;
	    return item.id !== itemId;
	  });

	  // TODO: test for this case
	  if (!founded) throw new _DomainError.DomainError({
	    error: new Error('The item searched was not found'),
	    args: [itemKey, itemId],
	    method: 'removeItem'
	  }, 'NotFoundItem');

	  return this;
	}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(2);

	var _extends3 = _interopRequireDefault(_extends2);

	exports.updateItem = updateItem;

	var _DomainError = __webpack_require__(14);

	var _listHelpers = __webpack_require__(34);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function updateItem(itemKey, Item) {
	  // TODO: test for this case
	  (0, _listHelpers.throwIfIsInvalidList)(this[itemKey]);
	  var found = false;
	  // TODO: test for this case
	  this[itemKey] = this[itemKey].map(function (item) {
	    return item.id === Item.id ? (found = true, (0, _extends3.default)({}, item, Item, {
	      updatedAt: new Date().toISOString()
	    })) : item;
	  });

	  // TODO: test for this case
	  if (!found) throw new _DomainError.DomainError({
	    error: new Error('The item searched was not found'),
	    args: [itemKey, Item],
	    method: 'updateItem'
	  }, 'NotFoundItem');

	  return this;
	}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.buildAggregationRootModels = undefined;

	var _defineProperty2 = __webpack_require__(17);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _extends7 = __webpack_require__(2);

	var _extends8 = _interopRequireDefault(_extends7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function buildAggregationRootModels(embed, applyRootSchema, applyValueObjectSchema, applyCommonMethods, Joi, commonSchema, connection, _ref) {
	  var ModelClass = _ref.ModelClass,
	      schema = _ref.schema,
	      tableName = _ref.tableName,
	      className = _ref.className,
	      indexes = _ref.indexes,
	      writeCapacity = _ref.writeCapacity,
	      readCapacity = _ref.readCapacity;
	  var objectValuesMaps = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : [];

	  var getJoischema = function getJoischema(mixedSchema, objValMaps) {
	    return Object.keys(mixedSchema).reduce(function (jschema, key) {
	      return (0, _extends8.default)({}, jschema, (0, _defineProperty3.default)({}, key, mixedSchema[key] instanceof Function ? mixedSchema[key](embed, function () {}, objValMaps[key]).validator : mixedSchema[key].validator));
	    }, {});
	  };
	  var filterOutValidator = function filterOutValidator(obj) {
	    return Object.keys(obj).reduce(function (props, key) {
	      return key !== 'validator' ? (0, _extends8.default)({}, props, (0, _defineProperty3.default)({}, key, obj[key])) : props;
	    }, {});
	  };
	  var getMapperSchema = function getMapperSchema(mixedSchema) {
	    return Object.keys(mixedSchema).reduce(function (jschema, key) {
	      return (0, _extends8.default)({}, jschema, (0, _defineProperty3.default)({}, key, mixedSchema[key] instanceof Function ? mixedSchema[key] : filterOutValidator(mixedSchema[key])));
	    }, {});
	  };
	  var valueObjectsClasses = objectValuesMaps.reduce(function (batch, map) {
	    var _extends5;

	    var mixedSchema = (0, _extends8.default)({}, commonSchema(Joi), map.schema(Joi));
	    var mapSchema = getMapperSchema(mixedSchema);
	    var joiSchema = getJoischema(mixedSchema, batch);

	    applyValueObjectSchema(map.ModelClass, mapSchema, connection, Joi.validate, joiSchema);
	    applyCommonMethods(map.ModelClass);
	    return (0, _extends8.default)({}, batch, (_extends5 = {}, (0, _defineProperty3.default)(_extends5, map.className, map.ModelClass), (0, _defineProperty3.default)(_extends5, map.key, joiSchema), _extends5));
	  }, {});
	  var getTableName = function getTableName(name) {
	    if (process.env['STAGE'] !== 'prod') {
	      if (!process.env['STAGE'] || process.env['STAGE'] === undefined || process.env['STAGE'] === 'undefined') {
	        return name + '-dev';
	      }

	      return name + '-' + process.env['STAGE'];
	    }
	    return name;
	  };
	  var mixedRootSchema = (0, _extends8.default)({}, commonSchema(Joi), schema(Joi));
	  var mapRootSchema = getMapperSchema(mixedRootSchema);
	  var rootJoischema = getJoischema(mixedRootSchema, valueObjectsClasses);
	  var parsedSchema = objectValuesMaps.length ? objectValuesMaps.reduce(function (intermediateSchema, objectValueMap) {
	    return (0, _extends8.default)({}, intermediateSchema, (0, _defineProperty3.default)({}, objectValueMap.key, intermediateSchema[objectValueMap.key](embed, objectValueMap.ModelClass)));
	  }, mapRootSchema) : mapRootSchema;

	  // Object.assign(ModelClass, {
	  //   tableName: getTableName(tableName),
	  //   writeCapacity,
	  //   readCapacity,
	  // })

	  // keeping the table name inside the class
	  Object.defineProperty(ModelClass, 'tableName', {
	    enumerable: false, // não enumerável
	    configurable: false, // não configurável
	    writable: false, // não gravável
	    value: getTableName(tableName)
	  });
	  Object.defineProperty(ModelClass, 'writeCapacity', {
	    enumerable: false, // não enumerável
	    configurable: false, // não configurável
	    writable: false, // não gravável
	    value: writeCapacity
	  });
	  Object.defineProperty(ModelClass, 'readCapacity', {
	    enumerable: false, // não enumerável
	    configurable: false, // não configurável
	    writable: false, // não gravável
	    value: readCapacity
	  });

	  Object.defineProperty(ModelClass, 'indexes', {
	    enumerable: false, // não enumerável
	    configurable: false, // não configurável
	    writable: false, // não gravável
	    value: indexes
	  });

	  applyRootSchema(ModelClass, { schema: parsedSchema, tableName: ModelClass.tableName }, connection, Joi.validate, rootJoischema);

	  applyCommonMethods(ModelClass);
	  return (0, _extends8.default)({
	    Model: ModelClass
	  }, className ? (0, _defineProperty3.default)({}, className, ModelClass) : {}, valueObjectsClasses);
	}

	function buildAggregationRootModelsFactory(_ref3) {
	  var embed = _ref3.embed,
	      applyRootSchema = _ref3.applyRootSchema,
	      applyValueObjectSchema = _ref3.applyValueObjectSchema,
	      applyCommonMethods = _ref3.applyCommonMethods,
	      Joi = _ref3.Joi,
	      commonSchema = _ref3.commonSchema;

	  return buildAggregationRootModels.bind(null, embed, applyRootSchema, applyValueObjectSchema, applyCommonMethods, Joi, commonSchema);
	}

	exports.buildAggregationRootModels = buildAggregationRootModels;
	exports.default = buildAggregationRootModelsFactory;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _toConsumableArray2 = __webpack_require__(7);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _typeof2 = __webpack_require__(16);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _defineProperty2 = __webpack_require__(17);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _extends4 = __webpack_require__(2);

	var _extends5 = _interopRequireDefault(_extends4);

	exports.parseFieldsFactory = parseFieldsFactory;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function path(keys, obj) {
	  var reducer = function reducer(p, o) {
	    return p.reduce(function (root, key) {
	      return root && root[key];
	    }, o);
	  };
	  if (obj) return reducer(keys, obj);
	  return function (objCurried) {
	    return reducer(keys, objCurried);
	  };
	}

	function parseFields(Joi, rootSchema) {
	  for (var _len = arguments.length, objectValuesSchemas = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    objectValuesSchemas[_key - 2] = arguments[_key];
	  }

	  var mapedObjectValuesSchemas = objectValuesSchemas.reduce(function (schemas, map) {
	    return (0, _extends5.default)({}, schemas, (0, _defineProperty3.default)({}, map.key, map.schema(Joi)));
	  }, {});
	  var schema = Object.keys(mapedObjectValuesSchemas).reduce(function (mergedSchema, key) {
	    return (0, _extends5.default)({}, mergedSchema, (0, _defineProperty3.default)({}, key, mapedObjectValuesSchemas[key]));
	  }, rootSchema(Joi));
	  return function (fields) {
	    var parseArrayItems = function parseArrayItems(values) {
	      for (var _len2 = arguments.length, keys = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        keys[_key2 - 1] = arguments[_key2];
	      }

	      var parseItems = function parseItems(parsedItems, field, index) {
	        var itemSchema = path([].concat(keys), schema);
	        if ((typeof field === 'undefined' ? 'undefined' : (0, _typeof3.default)(field)) === 'object') {
	          return [].concat((0, _toConsumableArray3.default)(parsedItems), [itemSchema && field instanceof Array ? parseArrayItems.apply(undefined, [field].concat(keys)) // TODO: Look to error on nested
	          : parseObjFields.apply(undefined, [field].concat(keys))]);
	        }
	        return [].concat((0, _toConsumableArray3.default)(parsedItems), [itemSchema && field]);
	      };
	      return values.reduce(parseItems, []);
	    };
	    var parseObjFields = function parseObjFields(obj) {
	      for (var _len3 = arguments.length, keys = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	        keys[_key3 - 1] = arguments[_key3];
	      }

	      var parseKeysField = function parseKeysField(parsedFields, key) {
	        var fieldSchema = path([].concat(keys, [key]), schema);
	        var field = path([].concat(keys, [key]), fields);
	        if ((typeof field === 'undefined' ? 'undefined' : (0, _typeof3.default)(field)) === 'object') {
	          return (0, _extends5.default)({}, parsedFields, fieldSchema && (0, _defineProperty3.default)({}, key, field instanceof Array ? parseArrayItems.apply(undefined, [field].concat(keys, [key])) : parseObjFields.apply(undefined, [field].concat(keys, [key]))));
	        }
	        return (0, _extends5.default)({}, parsedFields, fieldSchema && (0, _defineProperty3.default)({}, key, obj[key]));
	      };
	      return Object.keys(obj).reduce(parseKeysField, {});
	    };
	    return parseObjFields(fields);
	  };
	}

	function parseFieldsFactory(Joi) {
	  return parseFields.bind(null, Joi);
	}

/***/ }),
/* 40 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var commonSchema = exports.commonSchema = function commonSchema(hasToBe) {
	  return {
	    createdAt: {
	      type: 'String',
	      validator: hasToBe.string(),
	      defaultProvider: function defaultProvider() {
	        return new Date().toISOString();
	      }
	    },
	    updatedAt: {
	      type: 'String',
	      validator: hasToBe.string(),
	      defaultProvider: function defaultProvider() {
	        return new Date().toISOString();
	      }
	    }
	  };
	};

/***/ }),
/* 41 */
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

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.AggregationRoot = exports.Model = exports.appendCustomMethods = exports.DynamoDBORMError = exports.DomainError = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _DomainError = __webpack_require__(14);

	Object.defineProperty(exports, 'DomainError', {
	  enumerable: true,
	  get: function get() {
	    return _DomainError.DomainError;
	  }
	});

	var _DynamoDBORMError = __webpack_require__(11);

	Object.defineProperty(exports, 'DynamoDBORMError', {
	  enumerable: true,
	  get: function get() {
	    return _DynamoDBORMError.DynamoDBORMError;
	  }
	});

	var _appendCustomMethods = __webpack_require__(43);

	Object.defineProperty(exports, 'appendCustomMethods', {
	  enumerable: true,
	  get: function get() {
	    return _appendCustomMethods.appendCustomMethods;
	  }
	});

	var _Connection = __webpack_require__(1);

	var _Connection2 = _interopRequireDefault(_Connection);

	var _Repository = __webpack_require__(41);

	var _Repository2 = _interopRequireDefault(_Repository);

	var _Model = __webpack_require__(21);

	var _Model2 = _interopRequireDefault(_Model);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var AggregationRoot = function AggregationRoot(modelRoot) {
	  (0, _classCallCheck3.default)(this, AggregationRoot);

	  this.connection = new _Connection2.default(modelRoot);

	  for (var _len = arguments.length, objectsValuesMaps = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    objectsValuesMaps[_key - 1] = arguments[_key];
	  }

	  (0, _Model2.default)(this.connection, this, modelRoot, objectsValuesMaps);
	  this.parseFields = _Model.parseFields.apply(undefined, [modelRoot.schema].concat(objectsValuesMaps));
	  this.Repository = new _Repository2.default(this.Model, this.connection);
	};

	exports.Model = _Model.Model;
	exports.AggregationRoot = AggregationRoot;
	exports.default = AggregationRoot;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _defineProperty2 = __webpack_require__(17);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _extends4 = __webpack_require__(2);

	var _extends5 = _interopRequireDefault(_extends4);

	exports.appendCustomMethods = appendCustomMethods;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function appendCustomMethods(funcInst, custommethods) {
	    var target = funcInst.prototype || funcInst;
	    var extractCustomMethods = function extractCustomMethods(methods, key) {
	        var _extends3;

	        if (target[key] === undefined) {
	            return (0, _extends5.default)({}, methods, (0, _defineProperty3.default)({}, key, custommethods[key]));
	        }
	        return (0, _extends5.default)({}, methods, (_extends3 = {}, (0, _defineProperty3.default)(_extends3, "_" + key, target[key]), (0, _defineProperty3.default)(_extends3, key, custommethods[key]), _extends3));
	    };

	    Object.assign(target, Object.keys(custommethods).reduce(extractCustomMethods, {}));
	    return undefined;
	}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DynamoDBORMProvider = DynamoDBORMProvider;

	var _require = __webpack_require__(42),
	    AggregationRoot = _require.default,
	    Model = _require.Model,
	    DynamoDBORMError = _require.DynamoDBORMError,
	    DomainError = _require.DomainError,
	    appendCustomMethods = _require.appendCustomMethods,
	    Migration = _require.Migration;

	function DynamoDBORMProvider(c) {
	    c.service('AggregationRoot', function () {
	        return AggregationRoot;
	    });
	    c.service('Model', function () {
	        return Model;
	    });
	    c.service('DynamoDBORMError', function () {
	        return DynamoDBORMError;
	    });
	    c.service('DomainError', function () {
	        return DomainError;
	    });
	    c.service('Migration', function () {
	        return Migration;
	    });
	    c.service('appendCustomMethods', function () {
	        return appendCustomMethods;
	    });
	}

	exports.default = DynamoDBORMProvider;

/***/ })
/******/ ]);