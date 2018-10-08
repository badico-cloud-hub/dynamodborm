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

	module.exports = __webpack_require__(31);


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
	                return _context5.abrupt('return', this.mapper.update({ item: item }, (0, _extends3.default)({}, this.options, options)));

	              case 1:
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

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.parseFields = exports.Model = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _dynamodbDataMapper = __webpack_require__(9);

	var _joi = __webpack_require__(12);

	var _joi2 = _interopRequireDefault(_joi);

	var _applyValueObjectSchema = __webpack_require__(13);

	var _applyValueObjectSchema2 = _interopRequireDefault(_applyValueObjectSchema);

	var _applyAggregationRootSchema = __webpack_require__(15);

	var _applyAggregationRootSchema2 = _interopRequireDefault(_applyAggregationRootSchema);

	var _applyCommonMethods = __webpack_require__(16);

	var _applyCommonMethods2 = _interopRequireDefault(_applyCommonMethods);

	var _buildAggregationRootModels = __webpack_require__(27);

	var _buildAggregationRootModels2 = _interopRequireDefault(_buildAggregationRootModels);

	var _parseFields = __webpack_require__(28);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var applyRootSchema = (0, _applyAggregationRootSchema2.default)({ DynamoDbSchema: _dynamodbDataMapper.DynamoDbSchema, DynamoDbTable: _dynamodbDataMapper.DynamoDbTable });
	var applyValueObjectSchema = (0, _applyValueObjectSchema2.default)({ DynamoDbSchema: _dynamodbDataMapper.DynamoDbSchema });

	var buildAgregationRootModel = (0, _buildAggregationRootModels2.default)({
	  embed: _dynamodbDataMapper.embed,
	  applyRootSchema: applyRootSchema,
	  applyValueObjectSchema: applyValueObjectSchema,
	  applyCommonMethods: _applyCommonMethods2.default,
	  Joi: _joi2.default
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
/* 12 */
/***/ (function(module, exports) {

	module.exports = require("joi");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.applyObjectValueSchema = undefined;

	var _defineProperty2 = __webpack_require__(14);

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
/* 14 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/defineProperty");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.applyAgregationRootSchema = undefined;

	var _defineProperty2 = __webpack_require__(14);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function applyAgregationRootSchema(DynamoDbTable, DynamoDbSchema, classDefinition, _ref, connection, validator, joischema) {
	  var schema = _ref.schema,
	      tableName = _ref.tableName;

	  var _Object$definePropert;

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(14);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _extends3 = __webpack_require__(2);

	var _extends4 = _interopRequireDefault(_extends3);

	var _commonMethods = __webpack_require__(17);

	var commons = _interopRequireWildcard(_commonMethods);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var extractMethods = function extractMethods(methods, key) {
	  return (0, _extends4.default)({}, methods, (0, _defineProperty3.default)({}, key, commons[key]));
	};
	function applyCommonMethods(classDefinition) {
	  return Object.assign(classDefinition.prototype, Object.keys(commons).reduce(extractMethods, {}));
	}

	exports.default = applyCommonMethods;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _get = __webpack_require__(18);

	Object.defineProperty(exports, 'get', {
	  enumerable: true,
	  get: function get() {
	    return _get.get;
	  }
	});

	var _save = __webpack_require__(19);

	Object.defineProperty(exports, 'save', {
	  enumerable: true,
	  get: function get() {
	    return _save.save;
	  }
	});

	var _update = __webpack_require__(20);

	Object.defineProperty(exports, 'update', {
	  enumerable: true,
	  get: function get() {
	    return _update.update;
	  }
	});

	var _delete = __webpack_require__(21);

	Object.defineProperty(exports, 'delete', {
	  enumerable: true,
	  get: function get() {
	    return _delete.del;
	  }
	});

	var _validate = __webpack_require__(22);

	Object.defineProperty(exports, 'validate', {
	  enumerable: true,
	  get: function get() {
	    return _validate.validate;
	  }
	});

	var _getItem = __webpack_require__(23);

	Object.defineProperty(exports, 'getItem', {
	  enumerable: true,
	  get: function get() {
	    return _getItem.getItem;
	  }
	});

	var _addItem = __webpack_require__(24);

	Object.defineProperty(exports, 'addItem', {
	  enumerable: true,
	  get: function get() {
	    return _addItem.addItem;
	  }
	});

	var _removeItem = __webpack_require__(25);

	Object.defineProperty(exports, 'removeItem', {
	  enumerable: true,
	  get: function get() {
	    return _removeItem.removeItem;
	  }
	});

	var _updateItem = __webpack_require__(26);

	Object.defineProperty(exports, 'updateItem', {
	  enumerable: true,
	  get: function get() {
	    return _updateItem.updateItem;
	  }
	});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(14);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _extends3 = __webpack_require__(2);

	var _extends4 = _interopRequireDefault(_extends3);

	exports.get = get;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function get() {
	  var _this = this;

	  console.log('on get');
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
/* 19 */
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
	    var updated;
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _context.next = 2;
	            return this.connection.update(this, options);

	          case 2:
	            updated = _context.sent;
	            return _context.abrupt("return", Object.assign(this, updated.get()));

	          case 4:
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
/* 20 */
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
/* 21 */
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
/* 22 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.validate = validate;
	function validator(joi, values, schema, self) {
	  return new Promise(function (resolve, reject) {
	    var _joi = joi(values, schema, { abortEarly: false }),
	        error = _joi.error;

	    if (error) {
	      return reject(error);
	    }
	    return resolve(self);
	  });
	}

	function validate() {
	  return validator(this.validator, this.get(), this.joischema, this);
	}

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getItem = getItem;
	function getItem(itemKey, itemId) {
	    var searchById = function searchById(items) {
	        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	        return items[index].id === itemId && items[index] || searchById(items, index + 1);
	    };
	    return searchById(this[itemKey]);
	}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _toConsumableArray2 = __webpack_require__(7);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	exports.addItem = addItem;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function addItem(itemKey, Item) {
	    // TODO: add check for uniqueness
	    var items = this[itemKey] || [];
	    this[itemKey] = [].concat((0, _toConsumableArray3.default)(items), [Item]); // dont't like this
	    return this;
	}

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.removeItem = removeItem;
	function removeItem(itemKey, itemId) {
	  this[itemKey] = this[itemKey].filter(function (item) {
	    return item.id !== itemId;
	  });

	  return this;
	}

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.updateItem = updateItem;
	function updateItem(itemKey, Item) {
	  this[itemKey] = this[itemKey].map(function (item) {
	    return item.id === Item.id ? Item : item;
	  });

	  return this;
	}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.buildAggregationRootModels = undefined;

	var _defineProperty2 = __webpack_require__(14);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _extends7 = __webpack_require__(2);

	var _extends8 = _interopRequireDefault(_extends7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function buildAggregationRootModels(embed, applyRootSchema, applyValueObjectSchema, applyCommonMethods, Joi, connection, _ref) {
	  var ModelClass = _ref.ModelClass,
	      schema = _ref.schema,
	      tableName = _ref.tableName,
	      className = _ref.className;
	  var objectValuesMaps = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [];

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

	    var mixedSchema = map.schema(Joi);
	    var mapSchema = getMapperSchema(mixedSchema);
	    var joiSchema = getJoischema(mixedSchema, batch);

	    applyValueObjectSchema(map.ModelClass, mapSchema, connection, Joi.validate, joiSchema);
	    applyCommonMethods(map.ModelClass);
	    return (0, _extends8.default)({}, batch, (_extends5 = {}, (0, _defineProperty3.default)(_extends5, map.className, map.ModelClass), (0, _defineProperty3.default)(_extends5, map.key, joiSchema), _extends5));
	  }, {});

	  var mixedRootSchema = schema(Joi);
	  var mapRootSchema = getMapperSchema(mixedRootSchema);
	  var rootJoischema = getJoischema(mixedRootSchema, valueObjectsClasses);
	  var parsedSchema = objectValuesMaps.length ? objectValuesMaps.reduce(function (intermediateSchema, objectValueMap) {
	    return (0, _extends8.default)({}, intermediateSchema, (0, _defineProperty3.default)({}, objectValueMap.key, intermediateSchema[objectValueMap.key](embed, objectValueMap.ModelClass)));
	  }, mapRootSchema) : mapRootSchema;
	  applyRootSchema(ModelClass, { schema: parsedSchema, tableName: tableName }, connection, Joi.validate, rootJoischema);
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
	      Joi = _ref3.Joi;

	  return buildAggregationRootModels.bind(null, embed, applyRootSchema, applyValueObjectSchema, applyCommonMethods, Joi);
	}

	exports.buildAggregationRootModels = buildAggregationRootModels;
	exports.default = buildAggregationRootModelsFactory;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _toConsumableArray2 = __webpack_require__(7);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _typeof2 = __webpack_require__(29);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _defineProperty2 = __webpack_require__(14);

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
/* 29 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/typeof");

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(14);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _regenerator = __webpack_require__(6);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(8);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

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
	      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(filter) {
	        return _regenerator2.default.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                return _context.abrupt('return', this.connection.get(this.Model, filter));

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
	            pageSize = _ref4.pageSize,
	            lastIndex = _ref4.lastIndex,
	            filter = _ref4.filter,
	            query = _ref4.query,
	            indexKey = _ref4.indexKey,
	            limit = _ref4.limit;

	        var options;
	        return _regenerator2.default.wrap(function _callee3$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
	              case 0:
	                options = {
	                  pageSize: pageSize || limit || 25,
	                  startKey: lastIndex && new this.Model((0, _defineProperty3.default)({}, indexKey || 'id', lastIndex)),
	                  limit: limit || pageSize || 25,
	                  filter: filter
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
	        return _ref3.apply(this, arguments);
	      }

	      return find;
	    }()
	  }]);
	  return Repository;
	}();

	exports.default = Repository;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Model = exports.appendCustomMethods = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _appendCustomMethods = __webpack_require__(32);

	Object.defineProperty(exports, 'appendCustomMethods', {
	  enumerable: true,
	  get: function get() {
	    return _appendCustomMethods.appendCustomMethods;
	  }
	});

	var _Connection = __webpack_require__(1);

	var _Connection2 = _interopRequireDefault(_Connection);

	var _Repository = __webpack_require__(30);

	var _Repository2 = _interopRequireDefault(_Repository);

	var _Model = __webpack_require__(11);

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
	exports.default = AggregationRoot;

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.appendCustomMethods = appendCustomMethods;
	function appendCustomMethods(funcInst, methods) {
	    Object.assign(funcInst.prototype || funcInst, methods);
	    return undefined;
	}

/***/ })
/******/ ]);