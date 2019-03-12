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

	module.exports = __webpack_require__(334);


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _assign = __webpack_require__(3);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	module.exports = __webpack_require__(8).Object.assign;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(6);

	$export($export.S + $export.F, 'Object', { assign: __webpack_require__(22) });


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(7);
	var core = __webpack_require__(8);
	var ctx = __webpack_require__(9);
	var hide = __webpack_require__(11);
	var has = __webpack_require__(21);
	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && has(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	module.exports = $export;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	var core = module.exports = { version: '2.5.7' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(10);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(12);
	var createDesc = __webpack_require__(20);
	module.exports = __webpack_require__(16) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(13);
	var IE8_DOM_DEFINE = __webpack_require__(15);
	var toPrimitive = __webpack_require__(19);
	var dP = Object.defineProperty;

	exports.f = __webpack_require__(16) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(16) && !__webpack_require__(17)(function () {
	  return Object.defineProperty(__webpack_require__(18)('div'), 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(17)(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 17 */
/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14);
	var document = __webpack_require__(7).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(14);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys = __webpack_require__(23);
	var gOPS = __webpack_require__(38);
	var pIE = __webpack_require__(39);
	var toObject = __webpack_require__(40);
	var IObject = __webpack_require__(26);
	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(17)(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = gOPS.f;
	  var isEnum = pIE.f;
	  while (aLen > index) {
	    var S = IObject(arguments[index++]);
	    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(24);
	var enumBugKeys = __webpack_require__(37);

	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	var has = __webpack_require__(21);
	var toIObject = __webpack_require__(25);
	var arrayIndexOf = __webpack_require__(29)(false);
	var IE_PROTO = __webpack_require__(33)('IE_PROTO');

	module.exports = function (object, names) {
	  var O = toIObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(26);
	var defined = __webpack_require__(28);
	module.exports = function (it) {
	  return IObject(defined(it));
	};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(27);
	// eslint-disable-next-line no-prototype-builtins
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(25);
	var toLength = __webpack_require__(30);
	var toAbsoluteIndex = __webpack_require__(32);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(31);
	var min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(31);
	var max = Math.max;
	var min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(34)('keys');
	var uid = __webpack_require__(36);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	var core = __webpack_require__(8);
	var global = __webpack_require__(7);
	var SHARED = '__core-js_shared__';
	var store = global[SHARED] || (global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: core.version,
	  mode: __webpack_require__(35) ? 'pure' : 'global',
	  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
	});


/***/ }),
/* 35 */
/***/ (function(module, exports) {

	module.exports = true;


/***/ }),
/* 36 */
/***/ (function(module, exports) {

	var id = 0;
	var px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');


/***/ }),
/* 38 */
/***/ (function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 39 */
/***/ (function(module, exports) {

	exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(28);
	module.exports = function (it) {
	  return Object(defined(it));
	};


/***/ }),
/* 41 */,
/* 42 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ }),
/* 43 */,
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(45), __esModule: true };

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(46);
	var $Object = __webpack_require__(8).Object;
	module.exports = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(6);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(16), 'Object', { defineProperty: __webpack_require__(12).f });


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(48);


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g = (function() { return this })() || Function("return this")();

	// Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.
	var hadRuntime = g.regeneratorRuntime &&
	  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

	// Save the old regeneratorRuntime in case it needs to be restored later.
	var oldRuntime = hadRuntime && g.regeneratorRuntime;

	// Force reevalutation of runtime.js.
	g.regeneratorRuntime = undefined;

	module.exports = __webpack_require__(49);

	if (hadRuntime) {
	  // Restore the original runtime.
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  // Remove the global property added by runtime.js.
	  try {
	    delete g.regeneratorRuntime;
	  } catch(e) {
	    g.regeneratorRuntime = undefined;
	  }
	}


/***/ }),
/* 49 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	!(function(global) {
	  "use strict";

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  runtime.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  runtime.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  runtime.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        if (delegate.iterator.return) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[toStringTagSymbol] = "Generator";

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined;
	      }

	      return ContinueSentinel;
	    }
	  };
	})(
	  // In sloppy mode, unbound `this` refers to the global object, fallback to
	  // Function constructor if we're in global strict mode. That is sadly a form
	  // of indirect eval which violates Content Security Policy.
	  (function() { return this })() || Function("return this")()
	);


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _from = __webpack_require__(51);

	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(52), __esModule: true };

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(53);
	__webpack_require__(65);
	module.exports = __webpack_require__(8).Array.from;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $at = __webpack_require__(54)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(55)(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(31);
	var defined = __webpack_require__(28);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that));
	    var i = toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY = __webpack_require__(35);
	var $export = __webpack_require__(6);
	var redefine = __webpack_require__(56);
	var hide = __webpack_require__(11);
	var Iterators = __webpack_require__(57);
	var $iterCreate = __webpack_require__(58);
	var setToStringTag = __webpack_require__(62);
	var getPrototypeOf = __webpack_require__(64);
	var ITERATOR = __webpack_require__(63)('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11);


/***/ }),
/* 57 */
/***/ (function(module, exports) {

	module.exports = {};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var create = __webpack_require__(59);
	var descriptor = __webpack_require__(20);
	var setToStringTag = __webpack_require__(62);
	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(11)(IteratorPrototype, __webpack_require__(63)('iterator'), function () { return this; });

	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(13);
	var dPs = __webpack_require__(60);
	var enumBugKeys = __webpack_require__(37);
	var IE_PROTO = __webpack_require__(33)('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(18)('iframe');
	  var i = enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(61).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(12);
	var anObject = __webpack_require__(13);
	var getKeys = __webpack_require__(23);

	module.exports = __webpack_require__(16) ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	var document = __webpack_require__(7).document;
	module.exports = document && document.documentElement;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(12).f;
	var has = __webpack_require__(21);
	var TAG = __webpack_require__(63)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	var store = __webpack_require__(34)('wks');
	var uid = __webpack_require__(36);
	var Symbol = __webpack_require__(7).Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(21);
	var toObject = __webpack_require__(40);
	var IE_PROTO = __webpack_require__(33)('IE_PROTO');
	var ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var ctx = __webpack_require__(9);
	var $export = __webpack_require__(6);
	var toObject = __webpack_require__(40);
	var call = __webpack_require__(66);
	var isArrayIter = __webpack_require__(67);
	var toLength = __webpack_require__(30);
	var createProperty = __webpack_require__(68);
	var getIterFn = __webpack_require__(69);

	$export($export.S + $export.F * !__webpack_require__(71)(function (iter) { Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = toObject(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = getIterFn(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(13);
	module.exports = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) anObject(ret.call(iterator));
	    throw e;
	  }
	};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators = __webpack_require__(57);
	var ITERATOR = __webpack_require__(63)('iterator');
	var ArrayProto = Array.prototype;

	module.exports = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(12);
	var createDesc = __webpack_require__(20);

	module.exports = function (object, index, value) {
	  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	var classof = __webpack_require__(70);
	var ITERATOR = __webpack_require__(63)('iterator');
	var Iterators = __webpack_require__(57);
	module.exports = __webpack_require__(8).getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(27);
	var TAG = __webpack_require__(63)('toStringTag');
	// ES3 wrong here
	var ARG = cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	module.exports = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	var ITERATOR = __webpack_require__(63)('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	  // eslint-disable-next-line no-throw-literal
	  Array.from(riter, function () { throw 2; });
	} catch (e) { /* empty */ }

	module.exports = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _promise = __webpack_require__(73);

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (fn) {
	  return function () {
	    var gen = fn.apply(this, arguments);
	    return new _promise2.default(function (resolve, reject) {
	      function step(key, arg) {
	        try {
	          var info = gen[key](arg);
	          var value = info.value;
	        } catch (error) {
	          reject(error);
	          return;
	        }

	        if (info.done) {
	          resolve(value);
	        } else {
	          return _promise2.default.resolve(value).then(function (value) {
	            step("next", value);
	          }, function (err) {
	            step("throw", err);
	          });
	        }
	      }

	      return step("next");
	    });
	  };
	};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(75);
	__webpack_require__(53);
	__webpack_require__(76);
	__webpack_require__(80);
	__webpack_require__(93);
	__webpack_require__(94);
	module.exports = __webpack_require__(8).Promise;


/***/ }),
/* 75 */
/***/ (function(module, exports) {

	

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(77);
	var global = __webpack_require__(7);
	var hide = __webpack_require__(11);
	var Iterators = __webpack_require__(57);
	var TO_STRING_TAG = __webpack_require__(63)('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = global[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(78);
	var step = __webpack_require__(79);
	var Iterators = __webpack_require__(57);
	var toIObject = __webpack_require__(25);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(55)(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');


/***/ }),
/* 78 */
/***/ (function(module, exports) {

	module.exports = function () { /* empty */ };


/***/ }),
/* 79 */
/***/ (function(module, exports) {

	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY = __webpack_require__(35);
	var global = __webpack_require__(7);
	var ctx = __webpack_require__(9);
	var classof = __webpack_require__(70);
	var $export = __webpack_require__(6);
	var isObject = __webpack_require__(14);
	var aFunction = __webpack_require__(10);
	var anInstance = __webpack_require__(81);
	var forOf = __webpack_require__(82);
	var speciesConstructor = __webpack_require__(83);
	var task = __webpack_require__(84).set;
	var microtask = __webpack_require__(86)();
	var newPromiseCapabilityModule = __webpack_require__(87);
	var perform = __webpack_require__(88);
	var userAgent = __webpack_require__(89);
	var promiseResolve = __webpack_require__(90);
	var PROMISE = 'Promise';
	var TypeError = global.TypeError;
	var process = global.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8 || '';
	var $Promise = global[PROMISE];
	var isNode = classof(process) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

	var USE_NATIVE = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[__webpack_require__(63)('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function')
	      && promise.then(empty) instanceof FakePromise
	      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	      // we can't detect it synchronously, so just check versions
	      && v8.indexOf('6.6') !== 0
	      && userAgent.indexOf('Chrome/66') === -1;
	  } catch (e) { /* empty */ }
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;
	    var run = function (reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // may throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        if (domain && !exited) domain.exit();
	        reject(e);
	      }
	    };
	    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function (promise) {
	  task.call(global, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = perform(function () {
	        if (isNode) {
	          process.emit('unhandledRejection', value, promise);
	        } else if (handler = global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(global, function () {
	    var handler;
	    if (isNode) {
	      process.emit('rejectionHandled', promise);
	    } else if (handler = global.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function (value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function (value) {
	  var promise = this;
	  var then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(91)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject = ctx($reject, promise, 1);
	  };
	  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
	__webpack_require__(62)($Promise, PROMISE);
	__webpack_require__(92)(PROMISE);
	Wrapper = __webpack_require__(8)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(71)(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      forOf(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});


/***/ }),
/* 81 */
/***/ (function(module, exports) {

	module.exports = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	var ctx = __webpack_require__(9);
	var call = __webpack_require__(66);
	var isArrayIter = __webpack_require__(67);
	var anObject = __webpack_require__(13);
	var toLength = __webpack_require__(30);
	var getIterFn = __webpack_require__(69);
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
	  var f = ctx(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = call(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject = __webpack_require__(13);
	var aFunction = __webpack_require__(10);
	var SPECIES = __webpack_require__(63)('species');
	module.exports = function (O, D) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	var ctx = __webpack_require__(9);
	var invoke = __webpack_require__(85);
	var html = __webpack_require__(61);
	var cel = __webpack_require__(18);
	var global = __webpack_require__(7);
	var process = global.process;
	var setTask = global.setImmediate;
	var clearTask = global.clearImmediate;
	var MessageChannel = global.MessageChannel;
	var Dispatch = global.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
	  var id = +this;
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function (event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (__webpack_require__(27)(process) == 'process') {
	    defer = function (id) {
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
	    defer = function (id) {
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in cel('script')) {
	    defer = function (id) {
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set: setTask,
	  clear: clearTask
	};


/***/ }),
/* 85 */
/***/ (function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return fn.apply(that, args);
	};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(7);
	var macrotask = __webpack_require__(84).set;
	var Observer = global.MutationObserver || global.WebKitMutationObserver;
	var process = global.process;
	var Promise = global.Promise;
	var isNode = __webpack_require__(27)(process) == 'process';

	module.exports = function () {
	  var head, last, notify;

	  var flush = function () {
	    var parent, fn;
	    if (isNode && (parent = process.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode) {
	    notify = function () {
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise && Promise.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    var promise = Promise.resolve(undefined);
	    notify = function () {
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    } last = task;
	  };
	};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// 25.4.1.5 NewPromiseCapability(C)
	var aFunction = __webpack_require__(10);

	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject = aFunction(reject);
	}

	module.exports.f = function (C) {
	  return new PromiseCapability(C);
	};


/***/ }),
/* 88 */
/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(7);
	var navigator = global.navigator;

	module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(13);
	var isObject = __webpack_require__(14);
	var newPromiseCapability = __webpack_require__(87);

	module.exports = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(11);
	module.exports = function (target, src, safe) {
	  for (var key in src) {
	    if (safe && target[key]) target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var global = __webpack_require__(7);
	var core = __webpack_require__(8);
	var dP = __webpack_require__(12);
	var DESCRIPTORS = __webpack_require__(16);
	var SPECIES = __webpack_require__(63)('species');

	module.exports = function (KEY) {
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-promise-finally
	'use strict';
	var $export = __webpack_require__(6);
	var core = __webpack_require__(8);
	var global = __webpack_require__(7);
	var speciesConstructor = __webpack_require__(83);
	var promiseResolve = __webpack_require__(90);

	$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
	  var C = speciesConstructor(this, core.Promise || global.Promise);
	  var isFunction = typeof onFinally == 'function';
	  return this.then(
	    isFunction ? function (x) {
	      return promiseResolve(C, onFinally()).then(function () { return x; });
	    } : onFinally,
	    isFunction ? function (e) {
	      return promiseResolve(C, onFinally()).then(function () { throw e; });
	    } : onFinally
	  );
	} });


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-promise-try
	var $export = __webpack_require__(6);
	var newPromiseCapability = __webpack_require__(87);
	var perform = __webpack_require__(88);

	$export($export.S, 'Promise', { 'try': function (callbackfn) {
	  var promiseCapability = newPromiseCapability.f(this);
	  var result = perform(callbackfn);
	  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
	  return promiseCapability.promise;
	} });


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	tslib_1.__exportStar(__webpack_require__(97), exports);
	tslib_1.__exportStar(__webpack_require__(98), exports);
	tslib_1.__exportStar(__webpack_require__(156), exports);
	tslib_1.__exportStar(__webpack_require__(99), exports);
	tslib_1.__exportStar(__webpack_require__(135), exports);
	//# sourceMappingURL=index.js.map

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */
	/* global global, define, System, Reflect, Promise */
	var __extends;
	var __assign;
	var __rest;
	var __decorate;
	var __param;
	var __metadata;
	var __awaiter;
	var __generator;
	var __exportStar;
	var __values;
	var __read;
	var __spread;
	var __await;
	var __asyncGenerator;
	var __asyncDelegator;
	var __asyncValues;
	var __makeTemplateObject;
	var __importStar;
	var __importDefault;
	(function (factory) {
	    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (exports) { factory(createExporter(root, createExporter(exports))); }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	    else if (typeof module === "object" && typeof module.exports === "object") {
	        factory(createExporter(root, createExporter(module.exports)));
	    }
	    else {
	        factory(createExporter(root));
	    }
	    function createExporter(exports, previous) {
	        if (exports !== root) {
	            if (typeof Object.create === "function") {
	                Object.defineProperty(exports, "__esModule", { value: true });
	            }
	            else {
	                exports.__esModule = true;
	            }
	        }
	        return function (id, v) { return exports[id] = previous ? previous(id, v) : v; };
	    }
	})
	(function (exporter) {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

	    __extends = function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };

	    __assign = Object.assign || function (t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	        }
	        return t;
	    };

	    __rest = function (s, e) {
	        var t = {};
	        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
	            t[p] = s[p];
	        if (s != null && typeof Object.getOwnPropertySymbols === "function")
	            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
	                t[p[i]] = s[p[i]];
	        return t;
	    };

	    __decorate = function (decorators, target, key, desc) {
	        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	        return c > 3 && r && Object.defineProperty(target, key, r), r;
	    };

	    __param = function (paramIndex, decorator) {
	        return function (target, key) { decorator(target, key, paramIndex); }
	    };

	    __metadata = function (metadataKey, metadataValue) {
	        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
	    };

	    __awaiter = function (thisArg, _arguments, P, generator) {
	        return new (P || (P = Promise))(function (resolve, reject) {
	            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	            step((generator = generator.apply(thisArg, _arguments || [])).next());
	        });
	    };

	    __generator = function (thisArg, body) {
	        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	        function verb(n) { return function (v) { return step([n, v]); }; }
	        function step(op) {
	            if (f) throw new TypeError("Generator is already executing.");
	            while (_) try {
	                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	                if (y = 0, t) op = [op[0] & 2, t.value];
	                switch (op[0]) {
	                    case 0: case 1: t = op; break;
	                    case 4: _.label++; return { value: op[1], done: false };
	                    case 5: _.label++; y = op[1]; op = [0]; continue;
	                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                    default:
	                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                        if (t[2]) _.ops.pop();
	                        _.trys.pop(); continue;
	                }
	                op = body.call(thisArg, _);
	            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	        }
	    };

	    __exportStar = function (m, exports) {
	        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    };

	    __values = function (o) {
	        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
	        if (m) return m.call(o);
	        return {
	            next: function () {
	                if (o && i >= o.length) o = void 0;
	                return { value: o && o[i++], done: !o };
	            }
	        };
	    };

	    __read = function (o, n) {
	        var m = typeof Symbol === "function" && o[Symbol.iterator];
	        if (!m) return o;
	        var i = m.call(o), r, ar = [], e;
	        try {
	            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	        }
	        catch (error) { e = { error: error }; }
	        finally {
	            try {
	                if (r && !r.done && (m = i["return"])) m.call(i);
	            }
	            finally { if (e) throw e.error; }
	        }
	        return ar;
	    };

	    __spread = function () {
	        for (var ar = [], i = 0; i < arguments.length; i++)
	            ar = ar.concat(__read(arguments[i]));
	        return ar;
	    };

	    __await = function (v) {
	        return this instanceof __await ? (this.v = v, this) : new __await(v);
	    };

	    __asyncGenerator = function (thisArg, _arguments, generator) {
	        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	        var g = generator.apply(thisArg, _arguments || []), i, q = [];
	        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
	        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
	        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
	        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
	        function fulfill(value) { resume("next", value); }
	        function reject(value) { resume("throw", value); }
	        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
	    };

	    __asyncDelegator = function (o) {
	        var i, p;
	        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
	        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
	    };

	    __asyncValues = function (o) {
	        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	        var m = o[Symbol.asyncIterator], i;
	        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
	        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
	        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
	    };

	    __makeTemplateObject = function (cooked, raw) {
	        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
	        return cooked;
	    };

	    __importStar = function (mod) {
	        if (mod && mod.__esModule) return mod;
	        var result = {};
	        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
	        result["default"] = mod;
	        return result;
	    };

	    __importDefault = function (mod) {
	        return (mod && mod.__esModule) ? mod : { "default": mod };
	    };

	    exporter("__extends", __extends);
	    exporter("__assign", __assign);
	    exporter("__rest", __rest);
	    exporter("__decorate", __decorate);
	    exporter("__param", __param);
	    exporter("__metadata", __metadata);
	    exporter("__awaiter", __awaiter);
	    exporter("__generator", __generator);
	    exporter("__exportStar", __exportStar);
	    exporter("__values", __values);
	    exporter("__read", __read);
	    exporter("__spread", __spread);
	    exporter("__await", __await);
	    exporter("__asyncGenerator", __asyncGenerator);
	    exporter("__asyncDelegator", __asyncDelegator);
	    exporter("__asyncValues", __asyncValues);
	    exporter("__makeTemplateObject", __makeTemplateObject);
	    exporter("__importStar", __importStar);
	    exporter("__importDefault", __importDefault);
	});


/***/ }),
/* 97 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.VERSION = '0.4.0';
	exports.MAX_WRITE_BATCH_SIZE = 25;
	exports.MAX_READ_BATCH_SIZE = 100;
	//# sourceMappingURL=constants.js.map

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var constants_1 = __webpack_require__(97);
	var ItemNotFoundException_1 = __webpack_require__(99);
	var ParallelScanIterator_1 = __webpack_require__(100);
	var protocols_1 = __webpack_require__(135);
	var QueryIterator_1 = __webpack_require__(147);
	var ScanIterator_1 = __webpack_require__(149);
	var dynamodb_batch_iterator_1 = __webpack_require__(151);
	var dynamodb_data_marshaller_1 = __webpack_require__(106);
	var dynamodb_expressions_1 = __webpack_require__(113);
	__webpack_require__(102);
	/**
	 * Object mapper for domain object interaction with DynamoDB.
	 *
	 * To use, define a schema that describes how an item is represented in a
	 * DynamoDB table. This schema will be used to marshall a native JavaScript
	 * object into its desired persisted form. Attributes present on the object
	 * but not in the schema will be ignored.
	 */
	var DataMapper = /** @class */ (function () {
	    function DataMapper(_a) {
	        var client = _a.client, _b = _a.readConsistency, readConsistency = _b === void 0 ? 'eventual' : _b, _c = _a.skipVersionCheck, skipVersionCheck = _c === void 0 ? false : _c, _d = _a.tableNamePrefix, tableNamePrefix = _d === void 0 ? '' : _d;
	        client.config.customUserAgent = " dynamodb-data-mapper-js/" + constants_1.VERSION;
	        this.client = client;
	        this.readConsistency = readConsistency;
	        this.skipVersionCheck = skipVersionCheck;
	        this.tableNamePrefix = tableNamePrefix;
	    }
	    /**
	     * Deletes items from DynamoDB in batches of 25 or fewer via one or more
	     * BatchWriteItem operations. The items may be from any number of tables;
	     * tables and schemas for each item are determined using the
	     * {DynamoDbSchema} property and the {DynamoDbTable} property on defined on
	     * each item supplied.
	     *
	     * This method will automatically retry any delete requests returned by
	     * DynamoDB as unprocessed. Exponential backoff on unprocessed items is
	     * employed on a per-table basis.
	     *
	     * @param items A synchronous or asynchronous iterable of items to delete.
	     */
	    DataMapper.prototype.batchDelete = function (items) {
	        return tslib_1.__asyncGenerator(this, arguments, function batchDelete_1() {
	            var e_1, _a, iter, iter_1, iter_1_1, written, e_1_1;
	            return tslib_1.__generator(this, function (_b) {
	                switch (_b.label) {
	                    case 0:
	                        iter = this.batchWrite(function mapToDelete() {
	                            return tslib_1.__asyncGenerator(this, arguments, function mapToDelete_1() {
	                                var e_2, _a, items_1, items_1_1, item, e_2_1;
	                                return tslib_1.__generator(this, function (_b) {
	                                    switch (_b.label) {
	                                        case 0:
	                                            _b.trys.push([0, 7, 8, 13]);
	                                            items_1 = tslib_1.__asyncValues(items);
	                                            _b.label = 1;
	                                        case 1: return [4 /*yield*/, tslib_1.__await(items_1.next())];
	                                        case 2:
	                                            if (!(items_1_1 = _b.sent(), !items_1_1.done)) return [3 /*break*/, 6];
	                                            item = items_1_1.value;
	                                            return [4 /*yield*/, tslib_1.__await(['delete', item])];
	                                        case 3: return [4 /*yield*/, _b.sent()];
	                                        case 4:
	                                            _b.sent();
	                                            _b.label = 5;
	                                        case 5: return [3 /*break*/, 1];
	                                        case 6: return [3 /*break*/, 13];
	                                        case 7:
	                                            e_2_1 = _b.sent();
	                                            e_2 = { error: e_2_1 };
	                                            return [3 /*break*/, 13];
	                                        case 8:
	                                            _b.trys.push([8, , 11, 12]);
	                                            if (!(items_1_1 && !items_1_1.done && (_a = items_1.return))) return [3 /*break*/, 10];
	                                            return [4 /*yield*/, tslib_1.__await(_a.call(items_1))];
	                                        case 9:
	                                            _b.sent();
	                                            _b.label = 10;
	                                        case 10: return [3 /*break*/, 12];
	                                        case 11:
	                                            if (e_2) throw e_2.error;
	                                            return [7 /*endfinally*/];
	                                        case 12: return [7 /*endfinally*/];
	                                        case 13: return [2 /*return*/];
	                                    }
	                                });
	                            });
	                        }());
	                        _b.label = 1;
	                    case 1:
	                        _b.trys.push([1, 8, 9, 14]);
	                        iter_1 = tslib_1.__asyncValues(iter);
	                        _b.label = 2;
	                    case 2: return [4 /*yield*/, tslib_1.__await(iter_1.next())];
	                    case 3:
	                        if (!(iter_1_1 = _b.sent(), !iter_1_1.done)) return [3 /*break*/, 7];
	                        written = iter_1_1.value;
	                        return [4 /*yield*/, tslib_1.__await(written[1])];
	                    case 4: return [4 /*yield*/, _b.sent()];
	                    case 5:
	                        _b.sent();
	                        _b.label = 6;
	                    case 6: return [3 /*break*/, 2];
	                    case 7: return [3 /*break*/, 14];
	                    case 8:
	                        e_1_1 = _b.sent();
	                        e_1 = { error: e_1_1 };
	                        return [3 /*break*/, 14];
	                    case 9:
	                        _b.trys.push([9, , 12, 13]);
	                        if (!(iter_1_1 && !iter_1_1.done && (_a = iter_1.return))) return [3 /*break*/, 11];
	                        return [4 /*yield*/, tslib_1.__await(_a.call(iter_1))];
	                    case 10:
	                        _b.sent();
	                        _b.label = 11;
	                    case 11: return [3 /*break*/, 13];
	                    case 12:
	                        if (e_1) throw e_1.error;
	                        return [7 /*endfinally*/];
	                    case 13: return [7 /*endfinally*/];
	                    case 14: return [2 /*return*/];
	                }
	            });
	        });
	    };
	    /**
	     * Retrieves items from DynamoDB in batches of 100 or fewer via one or more
	     * BatchGetItem operations. The items may be from any number of tables;
	     * tables and schemas for each item are determined using the
	     * {DynamoDbSchema} property and the {DynamoDbTable} property on defined on
	     * each item supplied.
	     *
	     * This method will automatically retry any get requests returned by
	     * DynamoDB as unprocessed. Exponential backoff on unprocessed items is
	     * employed on a per-table basis.
	     *
	     * @param items A synchronous or asynchronous iterable of items to get.
	     */
	    DataMapper.prototype.batchGet = function (items, _a) {
	        var _b = _a === void 0 ? {} : _a, _c = _b.readConsistency, readConsistency = _c === void 0 ? this.readConsistency : _c, _d = _b.perTableOptions, perTableOptions = _d === void 0 ? {} : _d;
	        return tslib_1.__asyncGenerator(this, arguments, function batchGet_1() {
	            var e_3, _a, state, options, batch, batch_1, batch_1_1, _b, tableName, marshalled, _c, keyProperties, itemSchemata, _d, constructor, schema, e_3_1;
	            return tslib_1.__generator(this, function (_e) {
	                switch (_e.label) {
	                    case 0:
	                        state = {};
	                        options = {};
	                        batch = new dynamodb_batch_iterator_1.BatchGet(this.client, this.mapGetBatch(items, state, perTableOptions, options), {
	                            ConsistentRead: readConsistency === 'strong' ? true : undefined,
	                            PerTableOptions: options
	                        });
	                        _e.label = 1;
	                    case 1:
	                        _e.trys.push([1, 8, 9, 14]);
	                        batch_1 = tslib_1.__asyncValues(batch);
	                        _e.label = 2;
	                    case 2: return [4 /*yield*/, tslib_1.__await(batch_1.next())];
	                    case 3:
	                        if (!(batch_1_1 = _e.sent(), !batch_1_1.done)) return [3 /*break*/, 7];
	                        _b = tslib_1.__read(batch_1_1.value, 2), tableName = _b[0], marshalled = _b[1];
	                        _c = state[tableName], keyProperties = _c.keyProperties, itemSchemata = _c.itemSchemata;
	                        _d = itemSchemata[itemIdentifier(marshalled, keyProperties)], constructor = _d.constructor, schema = _d.schema;
	                        return [4 /*yield*/, tslib_1.__await(dynamodb_data_marshaller_1.unmarshallItem(schema, marshalled, constructor))];
	                    case 4: return [4 /*yield*/, _e.sent()];
	                    case 5:
	                        _e.sent();
	                        _e.label = 6;
	                    case 6: return [3 /*break*/, 2];
	                    case 7: return [3 /*break*/, 14];
	                    case 8:
	                        e_3_1 = _e.sent();
	                        e_3 = { error: e_3_1 };
	                        return [3 /*break*/, 14];
	                    case 9:
	                        _e.trys.push([9, , 12, 13]);
	                        if (!(batch_1_1 && !batch_1_1.done && (_a = batch_1.return))) return [3 /*break*/, 11];
	                        return [4 /*yield*/, tslib_1.__await(_a.call(batch_1))];
	                    case 10:
	                        _e.sent();
	                        _e.label = 11;
	                    case 11: return [3 /*break*/, 13];
	                    case 12:
	                        if (e_3) throw e_3.error;
	                        return [7 /*endfinally*/];
	                    case 13: return [7 /*endfinally*/];
	                    case 14: return [2 /*return*/];
	                }
	            });
	        });
	    };
	    /**
	     * Puts items into DynamoDB in batches of 25 or fewer via one or more
	     * BatchWriteItem operations. The items may be from any number of tables;
	     * tables and schemas for each item are determined using the
	     * {DynamoDbSchema} property and the {DynamoDbTable} property on defined on
	     * each item supplied.
	     *
	     * This method will automatically retry any put requests returned by
	     * DynamoDB as unprocessed. Exponential backoff on unprocessed items is
	     * employed on a per-table basis.
	     *
	     * @param items A synchronous or asynchronous iterable of items to put.
	     */
	    DataMapper.prototype.batchPut = function (items) {
	        return tslib_1.__asyncGenerator(this, arguments, function batchPut_1() {
	            var e_4, _a, generator, _b, _c, written, e_4_1;
	            return tslib_1.__generator(this, function (_d) {
	                switch (_d.label) {
	                    case 0:
	                        generator = isIterable(items)
	                            ? function mapToPut() {
	                                var e_5, _a, items_2, items_2_1, item, e_5_1;
	                                return tslib_1.__generator(this, function (_b) {
	                                    switch (_b.label) {
	                                        case 0:
	                                            _b.trys.push([0, 5, 6, 7]);
	                                            items_2 = tslib_1.__values(items), items_2_1 = items_2.next();
	                                            _b.label = 1;
	                                        case 1:
	                                            if (!!items_2_1.done) return [3 /*break*/, 4];
	                                            item = items_2_1.value;
	                                            return [4 /*yield*/, ['put', item]];
	                                        case 2:
	                                            _b.sent();
	                                            _b.label = 3;
	                                        case 3:
	                                            items_2_1 = items_2.next();
	                                            return [3 /*break*/, 1];
	                                        case 4: return [3 /*break*/, 7];
	                                        case 5:
	                                            e_5_1 = _b.sent();
	                                            e_5 = { error: e_5_1 };
	                                            return [3 /*break*/, 7];
	                                        case 6:
	                                            try {
	                                                if (items_2_1 && !items_2_1.done && (_a = items_2.return)) _a.call(items_2);
	                                            }
	                                            finally { if (e_5) throw e_5.error; }
	                                            return [7 /*endfinally*/];
	                                        case 7: return [2 /*return*/];
	                                    }
	                                });
	                            }()
	                            : function mapToPut() {
	                                return tslib_1.__asyncGenerator(this, arguments, function mapToPut_1() {
	                                    var e_6, _a, items_3, items_3_1, item, e_6_1;
	                                    return tslib_1.__generator(this, function (_b) {
	                                        switch (_b.label) {
	                                            case 0:
	                                                _b.trys.push([0, 7, 8, 13]);
	                                                items_3 = tslib_1.__asyncValues(items);
	                                                _b.label = 1;
	                                            case 1: return [4 /*yield*/, tslib_1.__await(items_3.next())];
	                                            case 2:
	                                                if (!(items_3_1 = _b.sent(), !items_3_1.done)) return [3 /*break*/, 6];
	                                                item = items_3_1.value;
	                                                return [4 /*yield*/, tslib_1.__await(['put', item])];
	                                            case 3: return [4 /*yield*/, _b.sent()];
	                                            case 4:
	                                                _b.sent();
	                                                _b.label = 5;
	                                            case 5: return [3 /*break*/, 1];
	                                            case 6: return [3 /*break*/, 13];
	                                            case 7:
	                                                e_6_1 = _b.sent();
	                                                e_6 = { error: e_6_1 };
	                                                return [3 /*break*/, 13];
	                                            case 8:
	                                                _b.trys.push([8, , 11, 12]);
	                                                if (!(items_3_1 && !items_3_1.done && (_a = items_3.return))) return [3 /*break*/, 10];
	                                                return [4 /*yield*/, tslib_1.__await(_a.call(items_3))];
	                                            case 9:
	                                                _b.sent();
	                                                _b.label = 10;
	                                            case 10: return [3 /*break*/, 12];
	                                            case 11:
	                                                if (e_6) throw e_6.error;
	                                                return [7 /*endfinally*/];
	                                            case 12: return [7 /*endfinally*/];
	                                            case 13: return [2 /*return*/];
	                                        }
	                                    });
	                                });
	                            }();
	                        _d.label = 1;
	                    case 1:
	                        _d.trys.push([1, 8, 9, 14]);
	                        _b = tslib_1.__asyncValues(this.batchWrite(generator));
	                        _d.label = 2;
	                    case 2: return [4 /*yield*/, tslib_1.__await(_b.next())];
	                    case 3:
	                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 7];
	                        written = _c.value;
	                        return [4 /*yield*/, tslib_1.__await(written[1])];
	                    case 4: return [4 /*yield*/, _d.sent()];
	                    case 5:
	                        _d.sent();
	                        _d.label = 6;
	                    case 6: return [3 /*break*/, 2];
	                    case 7: return [3 /*break*/, 14];
	                    case 8:
	                        e_4_1 = _d.sent();
	                        e_4 = { error: e_4_1 };
	                        return [3 /*break*/, 14];
	                    case 9:
	                        _d.trys.push([9, , 12, 13]);
	                        if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 11];
	                        return [4 /*yield*/, tslib_1.__await(_a.call(_b))];
	                    case 10:
	                        _d.sent();
	                        _d.label = 11;
	                    case 11: return [3 /*break*/, 13];
	                    case 12:
	                        if (e_4) throw e_4.error;
	                        return [7 /*endfinally*/];
	                    case 13: return [7 /*endfinally*/];
	                    case 14: return [2 /*return*/];
	                }
	            });
	        });
	    };
	    /**
	     * Puts or deletes items from DynamoDB in batches of 25 or fewer via one or
	     * more BatchWriteItem operations. The items may belong to any number of
	     * tables; tables and schemas for each item are determined using the
	     * {DynamoDbSchema} property and the {DynamoDbTable} property on defined on
	     * each item supplied.
	     *
	     * This method will automatically retry any write requests returned by
	     * DynamoDB as unprocessed. Exponential backoff on unprocessed items is
	     * employed on a per-table basis.
	     *
	     * @param items A synchronous or asynchronous iterable of tuples of the
	     * string 'put'|'delete' and the item on which to perform the specified
	     * write action.
	     */
	    DataMapper.prototype.batchWrite = function (items) {
	        return tslib_1.__asyncGenerator(this, arguments, function batchWrite_1() {
	            var e_7, _a, state, batch, batch_2, batch_2_1, _b, tableName, _c, DeleteRequest, PutRequest, _d, keyProperties, itemSchemata, attributes, _e, constructor, schema, e_7_1;
	            return tslib_1.__generator(this, function (_f) {
	                switch (_f.label) {
	                    case 0:
	                        state = {};
	                        batch = new dynamodb_batch_iterator_1.BatchWrite(this.client, this.mapWriteBatch(items, state));
	                        _f.label = 1;
	                    case 1:
	                        _f.trys.push([1, 8, 9, 14]);
	                        batch_2 = tslib_1.__asyncValues(batch);
	                        _f.label = 2;
	                    case 2: return [4 /*yield*/, tslib_1.__await(batch_2.next())];
	                    case 3:
	                        if (!(batch_2_1 = _f.sent(), !batch_2_1.done)) return [3 /*break*/, 7];
	                        _b = tslib_1.__read(batch_2_1.value, 2), tableName = _b[0], _c = _b[1], DeleteRequest = _c.DeleteRequest, PutRequest = _c.PutRequest;
	                        _d = state[tableName], keyProperties = _d.keyProperties, itemSchemata = _d.itemSchemata;
	                        attributes = PutRequest
	                            ? PutRequest.Item
	                            : (DeleteRequest || { Key: {} }).Key;
	                        _e = itemSchemata[itemIdentifier(attributes, keyProperties)], constructor = _e.constructor, schema = _e.schema;
	                        return [4 /*yield*/, tslib_1.__await([
	                                PutRequest ? 'put' : 'delete',
	                                dynamodb_data_marshaller_1.unmarshallItem(schema, attributes, constructor)
	                            ])];
	                    case 4: return [4 /*yield*/, _f.sent()];
	                    case 5:
	                        _f.sent();
	                        _f.label = 6;
	                    case 6: return [3 /*break*/, 2];
	                    case 7: return [3 /*break*/, 14];
	                    case 8:
	                        e_7_1 = _f.sent();
	                        e_7 = { error: e_7_1 };
	                        return [3 /*break*/, 14];
	                    case 9:
	                        _f.trys.push([9, , 12, 13]);
	                        if (!(batch_2_1 && !batch_2_1.done && (_a = batch_2.return))) return [3 /*break*/, 11];
	                        return [4 /*yield*/, tslib_1.__await(_a.call(batch_2))];
	                    case 10:
	                        _f.sent();
	                        _f.label = 11;
	                    case 11: return [3 /*break*/, 13];
	                    case 12:
	                        if (e_7) throw e_7.error;
	                        return [7 /*endfinally*/];
	                    case 13: return [7 /*endfinally*/];
	                    case 14: return [2 /*return*/];
	                }
	            });
	        });
	    };
	    /**
	     * Perform a CreateTable operation using the schema accessible via the
	     * {DynamoDbSchema} property and the table name accessible via the
	     * {DynamoDbTable} property on the prototype of the constructor supplied.
	     *
	     * The promise returned by this method will not resolve until the table is
	     * active and ready for use.
	     *
	     * @param valueConstructor  The constructor used for values in the table.
	     * @param options           Options to configure the CreateTable operation
	     */
	    DataMapper.prototype.createTable = function (valueConstructor, _a) {
	        var readCapacityUnits = _a.readCapacityUnits, _b = _a.streamViewType, streamViewType = _b === void 0 ? 'NONE' : _b, writeCapacityUnits = _a.writeCapacityUnits, _c = _a.indexOptions, indexOptions = _c === void 0 ? {} : _c;
	        return tslib_1.__awaiter(this, void 0, void 0, function () {
	            var schema, _d, attributes, indexKeys, tableKeys, TableName, _e, TableStatus;
	            return tslib_1.__generator(this, function (_f) {
	                switch (_f.label) {
	                    case 0:
	                        schema = protocols_1.getSchema(valueConstructor.prototype);
	                        _d = dynamodb_data_marshaller_1.keysFromSchema(schema), attributes = _d.attributes, indexKeys = _d.indexKeys, tableKeys = _d.tableKeys;
	                        TableName = this.getTableName(valueConstructor.prototype);
	                        return [4 /*yield*/, this.client.createTable(tslib_1.__assign({}, indexDefinitions(indexKeys, indexOptions, schema), { TableName: TableName, ProvisionedThroughput: {
	                                    ReadCapacityUnits: readCapacityUnits,
	                                    WriteCapacityUnits: writeCapacityUnits,
	                                }, AttributeDefinitions: attributeDefinitionList(attributes), KeySchema: keyTypesToElementList(tableKeys), StreamSpecification: streamViewType === 'NONE'
	                                    ? { StreamEnabled: false }
	                                    : { StreamEnabled: true, StreamViewType: streamViewType } })).promise()];
	                    case 1:
	                        _e = (_f.sent()).TableDescription, TableStatus = (_e === void 0 ? { TableStatus: 'CREATING' } : _e).TableStatus;
	                        if (!(TableStatus !== 'ACTIVE')) return [3 /*break*/, 3];
	                        return [4 /*yield*/, this.client.waitFor('tableExists', { TableName: TableName }).promise()];
	                    case 2:
	                        _f.sent();
	                        _f.label = 3;
	                    case 3: return [2 /*return*/];
	                }
	            });
	        });
	    };
	    DataMapper.prototype.delete = function (itemOrParameters, options) {
	        if (options === void 0) { options = {}; }
	        return tslib_1.__awaiter(this, void 0, void 0, function () {
	            var e_8, _a, item, condition, _b, returnValues, _c, skipVersionCheck, schema, req, _d, _e, prop, inputMember, fieldSchema, versionCondition, attributes, Attributes;
	            return tslib_1.__generator(this, function (_f) {
	                switch (_f.label) {
	                    case 0:
	                        if ('item' in itemOrParameters &&
	                            itemOrParameters.item[protocols_1.DynamoDbTable]) {
	                            item = itemOrParameters.item;
	                            options = itemOrParameters;
	                        }
	                        else {
	                            item = itemOrParameters;
	                        }
	                        condition = options.condition, _b = options.returnValues, returnValues = _b === void 0 ? 'ALL_OLD' : _b, _c = options.skipVersionCheck, skipVersionCheck = _c === void 0 ? this.skipVersionCheck : _c;
	                        schema = protocols_1.getSchema(item);
	                        req = {
	                            TableName: this.getTableName(item),
	                            Key: dynamodb_data_marshaller_1.marshallKey(schema, item),
	                            ReturnValues: returnValues,
	                        };
	                        if (!skipVersionCheck) {
	                            try {
	                                for (_d = tslib_1.__values(Object.keys(schema)), _e = _d.next(); !_e.done; _e = _d.next()) {
	                                    prop = _e.value;
	                                    inputMember = item[prop];
	                                    fieldSchema = schema[prop];
	                                    if (isVersionAttribute(fieldSchema) && inputMember !== undefined) {
	                                        versionCondition = handleVersionAttribute(prop, inputMember).condition;
	                                        condition = condition
	                                            ? { type: 'And', conditions: [condition, versionCondition] }
	                                            : versionCondition;
	                                    }
	                                }
	                            }
	                            catch (e_8_1) { e_8 = { error: e_8_1 }; }
	                            finally {
	                                try {
	                                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
	                                }
	                                finally { if (e_8) throw e_8.error; }
	                            }
	                        }
	                        if (condition) {
	                            attributes = new dynamodb_expressions_1.ExpressionAttributes();
	                            req.ConditionExpression = dynamodb_data_marshaller_1.marshallConditionExpression(condition, schema, attributes).expression;
	                            if (Object.keys(attributes.names).length > 0) {
	                                req.ExpressionAttributeNames = attributes.names;
	                            }
	                            if (Object.keys(attributes.values).length > 0) {
	                                req.ExpressionAttributeValues = attributes.values;
	                            }
	                        }
	                        return [4 /*yield*/, this.client.deleteItem(req).promise()];
	                    case 1:
	                        Attributes = (_f.sent()).Attributes;
	                        if (Attributes) {
	                            return [2 /*return*/, dynamodb_data_marshaller_1.unmarshallItem(schema, Attributes, item.constructor)];
	                        }
	                        return [2 /*return*/];
	                }
	            });
	        });
	    };
	    /**
	     * Perform a DeleteTable operation using the schema accessible via the
	     * {DynamoDbSchema} property and the table name accessible via the
	     * {DynamoDbTable} property on the prototype of the constructor supplied.
	     *
	     * The promise returned by this method will not resolve until the table is
	     * deleted and can no longer be used.
	     *
	     * @param valueConstructor  The constructor used for values in the table.
	     */
	    DataMapper.prototype.deleteTable = function (valueConstructor) {
	        return tslib_1.__awaiter(this, void 0, void 0, function () {
	            var TableName;
	            return tslib_1.__generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        TableName = this.getTableName(valueConstructor.prototype);
	                        return [4 /*yield*/, this.client.deleteTable({ TableName: TableName }).promise()];
	                    case 1:
	                        _a.sent();
	                        return [4 /*yield*/, this.client.waitFor('tableNotExists', { TableName: TableName }).promise()];
	                    case 2:
	                        _a.sent();
	                        return [2 /*return*/];
	                }
	            });
	        });
	    };
	    /**
	     * If the table does not already exist, perform a CreateTable operation
	     * using the schema accessible via the {DynamoDbSchema} property and the
	     * table name accessible via the {DynamoDbTable} property on the prototype
	     * of the constructor supplied.
	     *
	     * The promise returned by this method will not resolve until the table is
	     * active and ready for use.
	     *
	     * @param valueConstructor  The constructor used for values in the table.
	     * @param options           Options to configure the CreateTable operation
	     */
	    DataMapper.prototype.ensureTableExists = function (valueConstructor, options) {
	        return tslib_1.__awaiter(this, void 0, void 0, function () {
	            var TableName, _a, TableStatus, err_1;
	            return tslib_1.__generator(this, function (_b) {
	                switch (_b.label) {
	                    case 0:
	                        TableName = this.getTableName(valueConstructor.prototype);
	                        _b.label = 1;
	                    case 1:
	                        _b.trys.push([1, 5, , 9]);
	                        return [4 /*yield*/, this.client.describeTable({ TableName: TableName }).promise()];
	                    case 2:
	                        _a = (_b.sent()).Table, TableStatus = (_a === void 0 ? { TableStatus: 'CREATING' } : _a).TableStatus;
	                        if (!(TableStatus !== 'ACTIVE')) return [3 /*break*/, 4];
	                        return [4 /*yield*/, this.client.waitFor('tableExists', { TableName: TableName }).promise()];
	                    case 3:
	                        _b.sent();
	                        _b.label = 4;
	                    case 4: return [3 /*break*/, 9];
	                    case 5:
	                        err_1 = _b.sent();
	                        if (!(err_1.name === 'ResourceNotFoundException')) return [3 /*break*/, 7];
	                        return [4 /*yield*/, this.createTable(valueConstructor, options)];
	                    case 6:
	                        _b.sent();
	                        return [3 /*break*/, 8];
	                    case 7: throw err_1;
	                    case 8: return [3 /*break*/, 9];
	                    case 9: return [2 /*return*/];
	                }
	            });
	        });
	    };
	    /**
	     * If the table exists, perform a DeleteTable operation using the schema
	     * accessible via the {DynamoDbSchema} property and the table name
	     * accessible via the {DynamoDbTable} property on the prototype of the
	     * constructor supplied.
	     *
	     * The promise returned by this method will not resolve until the table is
	     * deleted and can no longer be used.
	     *
	     * @param valueConstructor  The constructor used for values in the table.
	     */
	    DataMapper.prototype.ensureTableNotExists = function (valueConstructor) {
	        return tslib_1.__awaiter(this, void 0, void 0, function () {
	            var TableName, _a, status, err_2;
	            return tslib_1.__generator(this, function (_b) {
	                switch (_b.label) {
	                    case 0:
	                        TableName = this.getTableName(valueConstructor.prototype);
	                        _b.label = 1;
	                    case 1:
	                        _b.trys.push([1, 8, , 9]);
	                        return [4 /*yield*/, this.client.describeTable({ TableName: TableName }).promise()];
	                    case 2:
	                        _a = (_b.sent()).Table, status = (_a === void 0 ? { TableStatus: 'CREATING' } : _a).TableStatus;
	                        if (!(status === 'DELETING')) return [3 /*break*/, 4];
	                        return [4 /*yield*/, this.client.waitFor('tableNotExists', { TableName: TableName })
	                                .promise()];
	                    case 3:
	                        _b.sent();
	                        return [2 /*return*/];
	                    case 4:
	                        if (!(status === 'CREATING' || status === 'UPDATING')) return [3 /*break*/, 6];
	                        return [4 /*yield*/, this.client.waitFor('tableExists', { TableName: TableName })
	                                .promise()];
	                    case 5:
	                        _b.sent();
	                        _b.label = 6;
	                    case 6: return [4 /*yield*/, this.deleteTable(valueConstructor)];
	                    case 7:
	                        _b.sent();
	                        return [3 /*break*/, 9];
	                    case 8:
	                        err_2 = _b.sent();
	                        if (err_2.name !== 'ResourceNotFoundException') {
	                            throw err_2;
	                        }
	                        return [3 /*break*/, 9];
	                    case 9: return [2 /*return*/];
	                }
	            });
	        });
	    };
	    DataMapper.prototype.get = function (itemOrParameters, options) {
	        if (options === void 0) { options = {}; }
	        return tslib_1.__awaiter(this, void 0, void 0, function () {
	            var item, projection, _a, readConsistency, schema, req, attributes, Item;
	            return tslib_1.__generator(this, function (_b) {
	                switch (_b.label) {
	                    case 0:
	                        if ('item' in itemOrParameters &&
	                            itemOrParameters.item[protocols_1.DynamoDbTable]) {
	                            item = itemOrParameters.item;
	                            options = itemOrParameters;
	                        }
	                        else {
	                            item = itemOrParameters;
	                        }
	                        projection = options.projection, _a = options.readConsistency, readConsistency = _a === void 0 ? this.readConsistency : _a;
	                        schema = protocols_1.getSchema(item);
	                        req = {
	                            TableName: this.getTableName(item),
	                            Key: dynamodb_data_marshaller_1.marshallKey(schema, item)
	                        };
	                        if (readConsistency === 'strong') {
	                            req.ConsistentRead = true;
	                        }
	                        if (projection) {
	                            attributes = new dynamodb_expressions_1.ExpressionAttributes();
	                            req.ProjectionExpression = dynamodb_expressions_1.serializeProjectionExpression(projection.map(function (propName) { return dynamodb_data_marshaller_1.toSchemaName(propName, schema); }), attributes);
	                            if (Object.keys(attributes.names).length > 0) {
	                                req.ExpressionAttributeNames = attributes.names;
	                            }
	                        }
	                        return [4 /*yield*/, this.client.getItem(req).promise()];
	                    case 1:
	                        Item = (_b.sent()).Item;
	                        if (Item) {
	                            return [2 /*return*/, dynamodb_data_marshaller_1.unmarshallItem(schema, Item, item.constructor)];
	                        }
	                        throw new ItemNotFoundException_1.ItemNotFoundException(req);
	                }
	            });
	        });
	    };
	    DataMapper.prototype.parallelScan = function (ctorOrParams, segments, options) {
	        if (options === void 0) { options = {}; }
	        var valueConstructor;
	        if (typeof segments !== 'number') {
	            valueConstructor = ctorOrParams.valueConstructor;
	            segments = ctorOrParams.segments;
	            options = ctorOrParams;
	        }
	        else {
	            valueConstructor = ctorOrParams;
	        }
	        return new ParallelScanIterator_1.ParallelScanIterator(this.client, valueConstructor, segments, tslib_1.__assign({ readConsistency: this.readConsistency }, options, { tableNamePrefix: this.tableNamePrefix }));
	    };
	    DataMapper.prototype.put = function (itemOrParameters, options) {
	        if (options === void 0) { options = {}; }
	        return tslib_1.__awaiter(this, void 0, void 0, function () {
	            var e_9, _a, item, condition, _b, skipVersionCheck, schema, req, _c, _d, key, inputMember, fieldSchema, _e, attributeName, versionCond, attributes;
	            return tslib_1.__generator(this, function (_f) {
	                switch (_f.label) {
	                    case 0:
	                        if ('item' in itemOrParameters &&
	                            itemOrParameters.item[protocols_1.DynamoDbTable]) {
	                            item = itemOrParameters.item;
	                            options = itemOrParameters;
	                        }
	                        else {
	                            item = itemOrParameters;
	                        }
	                        condition = options.condition, _b = options.skipVersionCheck, skipVersionCheck = _b === void 0 ? this.skipVersionCheck : _b;
	                        schema = protocols_1.getSchema(item);
	                        req = {
	                            TableName: this.getTableName(item),
	                            Item: dynamodb_data_marshaller_1.marshallItem(schema, item),
	                        };
	                        if (!skipVersionCheck) {
	                            try {
	                                for (_c = tslib_1.__values(Object.keys(schema)), _d = _c.next(); !_d.done; _d = _c.next()) {
	                                    key = _d.value;
	                                    inputMember = item[key];
	                                    fieldSchema = schema[key];
	                                    _e = fieldSchema.attributeName, attributeName = _e === void 0 ? key : _e;
	                                    if (isVersionAttribute(fieldSchema)) {
	                                        versionCond = handleVersionAttribute(key, inputMember).condition;
	                                        if (req.Item[attributeName]) {
	                                            req.Item[attributeName].N = (Number(req.Item[attributeName].N) + 1).toString();
	                                        }
	                                        else {
	                                            req.Item[attributeName] = { N: "0" };
	                                        }
	                                        condition = condition
	                                            ? { type: 'And', conditions: [condition, versionCond] }
	                                            : versionCond;
	                                    }
	                                }
	                            }
	                            catch (e_9_1) { e_9 = { error: e_9_1 }; }
	                            finally {
	                                try {
	                                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
	                                }
	                                finally { if (e_9) throw e_9.error; }
	                            }
	                        }
	                        if (condition) {
	                            attributes = new dynamodb_expressions_1.ExpressionAttributes();
	                            req.ConditionExpression = dynamodb_data_marshaller_1.marshallConditionExpression(condition, schema, attributes).expression;
	                            if (Object.keys(attributes.names).length > 0) {
	                                req.ExpressionAttributeNames = attributes.names;
	                            }
	                            if (Object.keys(attributes.values).length > 0) {
	                                req.ExpressionAttributeValues = attributes.values;
	                            }
	                        }
	                        return [4 /*yield*/, this.client.putItem(req).promise()];
	                    case 1:
	                        _f.sent();
	                        return [2 /*return*/, dynamodb_data_marshaller_1.unmarshallItem(schema, req.Item, item.constructor)];
	                }
	            });
	        });
	    };
	    DataMapper.prototype.query = function (valueConstructorOrParameters, keyCondition, options) {
	        if (options === void 0) { options = {}; }
	        var valueConstructor;
	        if (!keyCondition) {
	            valueConstructor = valueConstructorOrParameters.valueConstructor;
	            keyCondition = valueConstructorOrParameters.keyCondition;
	            options = valueConstructorOrParameters;
	        }
	        else {
	            valueConstructor = valueConstructorOrParameters;
	        }
	        return new QueryIterator_1.QueryIterator(this.client, valueConstructor, keyCondition, tslib_1.__assign({ readConsistency: this.readConsistency }, options, { tableNamePrefix: this.tableNamePrefix }));
	    };
	    DataMapper.prototype.scan = function (ctorOrParams, options) {
	        if (options === void 0) { options = {}; }
	        var valueConstructor;
	        if ('valueConstructor' in ctorOrParams &&
	            ctorOrParams.valueConstructor.prototype &&
	            ctorOrParams.valueConstructor.prototype[protocols_1.DynamoDbTable]) {
	            valueConstructor = ctorOrParams.valueConstructor;
	            options = ctorOrParams;
	        }
	        else {
	            valueConstructor = ctorOrParams;
	        }
	        return new ScanIterator_1.ScanIterator(this.client, valueConstructor, tslib_1.__assign({ readConsistency: this.readConsistency }, options, { tableNamePrefix: this.tableNamePrefix }));
	    };
	    DataMapper.prototype.update = function (itemOrParameters, options) {
	        if (options === void 0) { options = {}; }
	        return tslib_1.__awaiter(this, void 0, void 0, function () {
	            var e_10, _a, item, condition, _b, onMissing, _c, skipVersionCheck, schema, expr, itemKey, _d, _e, key, inputMember, fieldSchema, _f, versionCond, value, marshalled;
	            return tslib_1.__generator(this, function (_g) {
	                if ('item' in itemOrParameters &&
	                    itemOrParameters.item[protocols_1.DynamoDbTable]) {
	                    item = itemOrParameters.item;
	                    options = itemOrParameters;
	                }
	                else {
	                    item = itemOrParameters;
	                }
	                condition = options.condition, _b = options.onMissing, onMissing = _b === void 0 ? 'remove' : _b, _c = options.skipVersionCheck, skipVersionCheck = _c === void 0 ? this.skipVersionCheck : _c;
	                schema = protocols_1.getSchema(item);
	                expr = new dynamodb_expressions_1.UpdateExpression();
	                itemKey = {};
	                try {
	                    for (_d = tslib_1.__values(Object.keys(schema)), _e = _d.next(); !_e.done; _e = _d.next()) {
	                        key = _e.value;
	                        inputMember = item[key];
	                        fieldSchema = schema[key];
	                        if (dynamodb_data_marshaller_1.isKey(fieldSchema)) {
	                            itemKey[key] = inputMember;
	                        }
	                        else if (isVersionAttribute(fieldSchema)) {
	                            _f = handleVersionAttribute(key, inputMember), versionCond = _f.condition, value = _f.value;
	                            expr.set(key, value);
	                            if (!skipVersionCheck) {
	                                condition = condition
	                                    ? { type: 'And', conditions: [condition, versionCond] }
	                                    : versionCond;
	                            }
	                        }
	                        else if (inputMember === undefined) {
	                            if (onMissing === 'remove') {
	                                expr.remove(key);
	                            }
	                        }
	                        else {
	                            marshalled = dynamodb_data_marshaller_1.marshallValue(fieldSchema, inputMember);
	                            if (marshalled) {
	                                expr.set(key, new dynamodb_expressions_1.AttributeValue(marshalled));
	                            }
	                        }
	                    }
	                }
	                catch (e_10_1) { e_10 = { error: e_10_1 }; }
	                finally {
	                    try {
	                        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
	                    }
	                    finally { if (e_10) throw e_10.error; }
	                }
	                return [2 /*return*/, this.doExecuteUpdateExpression(expr, itemKey, protocols_1.getSchema(item), protocols_1.getTableName(item), item.constructor, { condition: condition })];
	            });
	        });
	    };
	    /**
	     * Execute a custom update expression using the schema and table name
	     * defined on the provided `valueConstructor`.
	     *
	     * This method does not support automatic version checking, as the current
	     * state of a table's version attribute cannot be inferred from an update
	     * expression object. To perform a version check manually, add a condition
	     * expression:
	     *
	     * ```typescript
	     *  const currentVersion = 1;
	     *  updateExpression.set('nameOfVersionAttribute', currentVersion + 1);
	     *  const condition = {
	     *      type: 'Equals',
	     *      subject: 'nameOfVersionAttribute',
	     *      object: currentVersion
	     *  };
	     *
	     *  const updated = await mapper.executeUpdateExpression(
	     *      updateExpression,
	     *      itemKey,
	     *      constructor,
	     *      {condition}
	     *  );
	     * ```
	     *
	     * **NB:** Property names and attribute paths in the update expression
	     * should reflect the names used in the schema.
	     *
	     * @param expression        The update expression to execute.
	     * @param key               The full key to identify the object being
	     *                          updated.
	     * @param valueConstructor  The constructor with which to map the result to
	     *                          a domain object.
	     * @param options           Options with which to customize the UpdateItem
	     *                          request.
	     *
	     * @returns The updated item.
	     */
	    DataMapper.prototype.executeUpdateExpression = function (expression, key, valueConstructor, options) {
	        if (options === void 0) { options = {}; }
	        return tslib_1.__awaiter(this, void 0, void 0, function () {
	            return tslib_1.__generator(this, function (_a) {
	                return [2 /*return*/, this.doExecuteUpdateExpression(expression, key, protocols_1.getSchema(valueConstructor.prototype), protocols_1.getTableName(valueConstructor.prototype), valueConstructor, options)];
	            });
	        });
	    };
	    DataMapper.prototype.doExecuteUpdateExpression = function (expression, key, schema, tableName, valueConstructor, options) {
	        if (options === void 0) { options = {}; }
	        return tslib_1.__awaiter(this, void 0, void 0, function () {
	            var req, attributes, rawResponse;
	            return tslib_1.__generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        req = {
	                            TableName: this.tableNamePrefix + tableName,
	                            ReturnValues: 'ALL_NEW',
	                            Key: dynamodb_data_marshaller_1.marshallKey(schema, key),
	                        };
	                        attributes = new dynamodb_expressions_1.ExpressionAttributes();
	                        if (options.condition) {
	                            req.ConditionExpression = dynamodb_data_marshaller_1.marshallConditionExpression(options.condition, schema, attributes).expression;
	                        }
	                        req.UpdateExpression = dynamodb_data_marshaller_1.marshallUpdateExpression(expression, schema, attributes).expression;
	                        if (Object.keys(attributes.names).length > 0) {
	                            req.ExpressionAttributeNames = attributes.names;
	                        }
	                        if (Object.keys(attributes.values).length > 0) {
	                            req.ExpressionAttributeValues = attributes.values;
	                        }
	                        return [4 /*yield*/, this.client.updateItem(req).promise()];
	                    case 1:
	                        rawResponse = _a.sent();
	                        if (rawResponse.Attributes) {
	                            return [2 /*return*/, dynamodb_data_marshaller_1.unmarshallItem(schema, rawResponse.Attributes, valueConstructor)];
	                        }
	                        // this branch should not be reached when interacting with DynamoDB, as
	                        // the ReturnValues parameter is hardcoded to 'ALL_NEW' above. It is,
	                        // however, allowed by the service model and may therefore occur in
	                        // certain unforeseen conditions; to be safe, this case should be
	                        // converted into an error unless a compelling reason to return
	                        // undefined or an empty object presents itself.
	                        throw new Error('Update operation completed successfully, but the updated value was not returned');
	                }
	            });
	        });
	    };
	    DataMapper.prototype.getTableName = function (item) {
	        return protocols_1.getTableName(item, this.tableNamePrefix);
	    };
	    DataMapper.prototype.mapGetBatch = function (items, state, options, convertedOptions) {
	        return tslib_1.__asyncGenerator(this, arguments, function mapGetBatch_1() {
	            var e_11, _a, items_4, items_4_1, item, unprefixed, tableName, schema, _b, keyProperties, itemSchemata, marshalled, e_11_1;
	            return tslib_1.__generator(this, function (_c) {
	                switch (_c.label) {
	                    case 0:
	                        _c.trys.push([0, 7, 8, 13]);
	                        items_4 = tslib_1.__asyncValues(items);
	                        _c.label = 1;
	                    case 1: return [4 /*yield*/, tslib_1.__await(items_4.next())];
	                    case 2:
	                        if (!(items_4_1 = _c.sent(), !items_4_1.done)) return [3 /*break*/, 6];
	                        item = items_4_1.value;
	                        unprefixed = protocols_1.getTableName(item);
	                        tableName = this.tableNamePrefix + unprefixed;
	                        schema = protocols_1.getSchema(item);
	                        if (unprefixed in options && !(tableName in convertedOptions)) {
	                            convertedOptions[tableName] = convertBatchGetOptions(options[unprefixed], schema);
	                        }
	                        if (!(tableName in state)) {
	                            state[tableName] = {
	                                keyProperties: getKeyProperties(schema),
	                                itemSchemata: {}
	                            };
	                        }
	                        _b = state[tableName], keyProperties = _b.keyProperties, itemSchemata = _b.itemSchemata;
	                        marshalled = dynamodb_data_marshaller_1.marshallKey(schema, item);
	                        itemSchemata[itemIdentifier(marshalled, keyProperties)] = {
	                            constructor: item.constructor,
	                            schema: schema,
	                        };
	                        return [4 /*yield*/, tslib_1.__await([tableName, marshalled])];
	                    case 3: return [4 /*yield*/, _c.sent()];
	                    case 4:
	                        _c.sent();
	                        _c.label = 5;
	                    case 5: return [3 /*break*/, 1];
	                    case 6: return [3 /*break*/, 13];
	                    case 7:
	                        e_11_1 = _c.sent();
	                        e_11 = { error: e_11_1 };
	                        return [3 /*break*/, 13];
	                    case 8:
	                        _c.trys.push([8, , 11, 12]);
	                        if (!(items_4_1 && !items_4_1.done && (_a = items_4.return))) return [3 /*break*/, 10];
	                        return [4 /*yield*/, tslib_1.__await(_a.call(items_4))];
	                    case 9:
	                        _c.sent();
	                        _c.label = 10;
	                    case 10: return [3 /*break*/, 12];
	                    case 11:
	                        if (e_11) throw e_11.error;
	                        return [7 /*endfinally*/];
	                    case 12: return [7 /*endfinally*/];
	                    case 13: return [2 /*return*/];
	                }
	            });
	        });
	    };
	    DataMapper.prototype.mapWriteBatch = function (items, state) {
	        return tslib_1.__asyncGenerator(this, arguments, function mapWriteBatch_1() {
	            var e_12, _a, items_5, items_5_1, _b, type, item, unprefixed, tableName, schema, _c, keyProperties, itemSchemata, attributes, marshalled, e_12_1;
	            return tslib_1.__generator(this, function (_d) {
	                switch (_d.label) {
	                    case 0:
	                        _d.trys.push([0, 7, 8, 13]);
	                        items_5 = tslib_1.__asyncValues(items);
	                        _d.label = 1;
	                    case 1: return [4 /*yield*/, tslib_1.__await(items_5.next())];
	                    case 2:
	                        if (!(items_5_1 = _d.sent(), !items_5_1.done)) return [3 /*break*/, 6];
	                        _b = tslib_1.__read(items_5_1.value, 2), type = _b[0], item = _b[1];
	                        unprefixed = protocols_1.getTableName(item);
	                        tableName = this.tableNamePrefix + unprefixed;
	                        schema = protocols_1.getSchema(item);
	                        if (!(tableName in state)) {
	                            state[tableName] = {
	                                keyProperties: getKeyProperties(schema),
	                                itemSchemata: {}
	                            };
	                        }
	                        _c = state[tableName], keyProperties = _c.keyProperties, itemSchemata = _c.itemSchemata;
	                        attributes = type === 'delete'
	                            ? dynamodb_data_marshaller_1.marshallKey(schema, item)
	                            : dynamodb_data_marshaller_1.marshallItem(schema, item);
	                        marshalled = type === 'delete'
	                            ? { DeleteRequest: { Key: attributes } }
	                            : { PutRequest: { Item: attributes } };
	                        itemSchemata[itemIdentifier(attributes, keyProperties)] = {
	                            constructor: item.constructor,
	                            schema: schema,
	                        };
	                        return [4 /*yield*/, tslib_1.__await([tableName, marshalled])];
	                    case 3: return [4 /*yield*/, _d.sent()];
	                    case 4:
	                        _d.sent();
	                        _d.label = 5;
	                    case 5: return [3 /*break*/, 1];
	                    case 6: return [3 /*break*/, 13];
	                    case 7:
	                        e_12_1 = _d.sent();
	                        e_12 = { error: e_12_1 };
	                        return [3 /*break*/, 13];
	                    case 8:
	                        _d.trys.push([8, , 11, 12]);
	                        if (!(items_5_1 && !items_5_1.done && (_a = items_5.return))) return [3 /*break*/, 10];
	                        return [4 /*yield*/, tslib_1.__await(_a.call(items_5))];
	                    case 9:
	                        _d.sent();
	                        _d.label = 10;
	                    case 10: return [3 /*break*/, 12];
	                    case 11:
	                        if (e_12) throw e_12.error;
	                        return [7 /*endfinally*/];
	                    case 12: return [7 /*endfinally*/];
	                    case 13: return [2 /*return*/];
	                }
	            });
	        });
	    };
	    return DataMapper;
	}());
	exports.DataMapper = DataMapper;
	function attributeDefinitionList(attributes) {
	    return Object.keys(attributes).map(function (name) { return ({
	        AttributeName: name,
	        AttributeType: attributes[name]
	    }); });
	}
	function convertBatchGetOptions(options, itemSchema) {
	    var out = {};
	    if (options.readConsistency === 'strong') {
	        out.ConsistentRead = true;
	    }
	    if (options.projection) {
	        var attributes = new dynamodb_expressions_1.ExpressionAttributes();
	        out.ProjectionExpression = dynamodb_expressions_1.serializeProjectionExpression(options.projection.map(function (propName) { return dynamodb_data_marshaller_1.toSchemaName(propName, options.projectionSchema || itemSchema); }), attributes);
	        out.ExpressionAttributeNames = attributes.names;
	    }
	    return out;
	}
	function getKeyProperties(schema) {
	    var e_13, _a;
	    var keys = [];
	    try {
	        for (var _b = tslib_1.__values(Object.keys(schema).sort()), _c = _b.next(); !_c.done; _c = _b.next()) {
	            var property = _c.value;
	            var fieldSchema = schema[property];
	            if (dynamodb_data_marshaller_1.isKey(fieldSchema)) {
	                keys.push(fieldSchema.attributeName || property);
	            }
	        }
	    }
	    catch (e_13_1) { e_13 = { error: e_13_1 }; }
	    finally {
	        try {
	            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	        }
	        finally { if (e_13) throw e_13.error; }
	    }
	    return keys;
	}
	function handleVersionAttribute(attributeName, inputMember) {
	    var condition;
	    var value;
	    if (inputMember === undefined) {
	        condition = new dynamodb_expressions_1.FunctionExpression('attribute_not_exists', new dynamodb_expressions_1.AttributePath([
	            { type: 'AttributeName', name: attributeName }
	        ]));
	        value = new dynamodb_expressions_1.AttributeValue({ N: "0" });
	    }
	    else {
	        condition = {
	            type: 'Equals',
	            subject: attributeName,
	            object: inputMember,
	        };
	        value = new dynamodb_expressions_1.MathematicalExpression(new dynamodb_expressions_1.AttributePath(attributeName), '+', 1);
	    }
	    return { condition: condition, value: value };
	}
	function indexDefinitions(keys, options, schema) {
	    var e_14, _a;
	    var globalIndices = [];
	    var localIndices = [];
	    try {
	        for (var _b = tslib_1.__values(Object.keys(keys)), _c = _b.next(); !_c.done; _c = _b.next()) {
	            var IndexName = _c.value;
	            var KeySchema = keyTypesToElementList(keys[IndexName]);
	            var indexOptions = options[IndexName];
	            if (!indexOptions) {
	                throw new Error("No options provided for " + IndexName + " index");
	            }
	            var indexInfo = {
	                IndexName: IndexName,
	                KeySchema: KeySchema,
	                Projection: indexProjection(schema, indexOptions.projection),
	            };
	            if (indexOptions.type === 'local') {
	                localIndices.push(indexInfo);
	            }
	            else {
	                globalIndices.push(tslib_1.__assign({}, indexInfo, { ProvisionedThroughput: {
	                        ReadCapacityUnits: indexOptions.readCapacityUnits,
	                        WriteCapacityUnits: indexOptions.writeCapacityUnits,
	                    } }));
	            }
	        }
	    }
	    catch (e_14_1) { e_14 = { error: e_14_1 }; }
	    finally {
	        try {
	            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	        }
	        finally { if (e_14) throw e_14.error; }
	    }
	    return {
	        GlobalSecondaryIndexes: globalIndices.length ? globalIndices : void 0,
	        LocalSecondaryIndexes: localIndices.length ? localIndices : void 0,
	    };
	}
	function indexProjection(schema, projection) {
	    if (typeof projection === 'string') {
	        return {
	            ProjectionType: projection === 'all' ? 'ALL' : 'KEYS_ONLY',
	        };
	    }
	    return {
	        ProjectionType: 'INCLUDE',
	        NonKeyAttributes: projection.map(function (propName) { return dynamodb_data_marshaller_1.getSchemaName(propName, schema); })
	    };
	}
	function isIterable(arg) {
	    return Boolean(arg) && typeof arg[Symbol.iterator] === 'function';
	}
	function isVersionAttribute(fieldSchema) {
	    return fieldSchema.type === 'Number'
	        && Boolean(fieldSchema.versionAttribute);
	}
	function itemIdentifier(marshalled, keyProperties) {
	    var e_15, _a;
	    var keyAttributes = [];
	    try {
	        for (var keyProperties_1 = tslib_1.__values(keyProperties), keyProperties_1_1 = keyProperties_1.next(); !keyProperties_1_1.done; keyProperties_1_1 = keyProperties_1.next()) {
	            var key = keyProperties_1_1.value;
	            var value = marshalled[key];
	            key + "=" + (value.B || value.N || value.S);
	        }
	    }
	    catch (e_15_1) { e_15 = { error: e_15_1 }; }
	    finally {
	        try {
	            if (keyProperties_1_1 && !keyProperties_1_1.done && (_a = keyProperties_1.return)) _a.call(keyProperties_1);
	        }
	        finally { if (e_15) throw e_15.error; }
	    }
	    return keyAttributes.join(':');
	}
	function keyTypesToElementList(keys) {
	    return Object.keys(keys).map(function (name) { return ({
	        AttributeName: name,
	        KeyType: keys[name]
	    }); });
	}
	//# sourceMappingURL=DataMapper.js.map

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	/**
	 * An exception thrown when an item was sought with a DynamoDB::GetItem
	 * request and not found. Includes the original request sent as
	 * `itemSought`.
	 */
	var ItemNotFoundException = /** @class */ (function (_super) {
	    tslib_1.__extends(ItemNotFoundException, _super);
	    function ItemNotFoundException(itemSought, message) {
	        if (message === void 0) { message = defaultErrorMessage(itemSought); }
	        var _this = _super.call(this, message) || this;
	        _this.itemSought = itemSought;
	        _this.name = 'ItemNotFoundException';
	        return _this;
	    }
	    return ItemNotFoundException;
	}(Error));
	exports.ItemNotFoundException = ItemNotFoundException;
	function defaultErrorMessage(itemSought) {
	    return "No item with the key " + JSON.stringify(itemSought.Key) + " found in the " + itemSought.TableName + " table.";
	}
	//# sourceMappingURL=ItemNotFoundException.js.map

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var Iterator_1 = __webpack_require__(101);
	var ParallelScanPaginator_1 = __webpack_require__(103);
	/**
	 * Iterates over each item returned by a parallel DynamoDB scan until no more
	 * pages are available.
	 */
	var ParallelScanIterator = /** @class */ (function (_super) {
	    tslib_1.__extends(ParallelScanIterator, _super);
	    function ParallelScanIterator(client, itemConstructor, segments, options) {
	        if (options === void 0) { options = {}; }
	        return _super.call(this, new ParallelScanPaginator_1.ParallelScanPaginator(client, itemConstructor, segments, options)) || this;
	    }
	    return ParallelScanIterator;
	}(Iterator_1.Iterator));
	exports.ParallelScanIterator = ParallelScanIterator;
	//# sourceMappingURL=ParallelScanIterator.js.map

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	__webpack_require__(102);
	var Iterator = /** @class */ (function () {
	    function Iterator(paginator) {
	        this.paginator = paginator;
	        this._count = 0;
	        this.lastResolved = Promise.resolve();
	        this.pending = [];
	    }
	    /**
	     * @inheritDoc
	     */
	    Iterator.prototype[Symbol.asyncIterator] = function () {
	        return this;
	    };
	    /**
	     * @inheritDoc
	     */
	    Iterator.prototype.next = function () {
	        var _this = this;
	        this.lastResolved = this.lastResolved.then(function () { return _this.getNext(); });
	        return this.lastResolved;
	    };
	    /**
	     * Detaches the underlying paginator from this iterator and returns it. The
	     * paginator will yield arrays of unmarshalled items, with each yielded
	     * array corresponding to a single call to the underlying API. As with the
	     * underlying API, pages may contain a variable number of items or no items,
	     * in which case an empty array will be yielded.
	     *
	     * Calling this method will disable further iteration.
	     */
	    Iterator.prototype.pages = function () {
	        // Prevent the iterator from being used further and squelch any uncaught
	        // promise rejection warnings
	        this.lastResolved = Promise.reject(new Error('The underlying paginator has been detached from this iterator.'));
	        this.lastResolved.catch(function () { });
	        return this.paginator;
	    };
	    /**
	     * @inheritDoc
	     */
	    Iterator.prototype.return = function () {
	        // Prevent any further use of this iterator
	        this.lastResolved = Promise.reject(new Error('Iteration has been manually interrupted and may not be resumed'));
	        this.lastResolved.catch(function () { });
	        // Empty the pending queue to free up memory
	        this.pending.length = 0;
	        return this.paginator.return();
	    };
	    Object.defineProperty(Iterator.prototype, "consumedCapacity", {
	        /**
	         * Retrieve the reported capacity consumed by this iterator. Will be
	         * undefined unless returned consumed capacity is requested.
	         */
	        get: function () {
	            return this.paginator.consumedCapacity;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Iterator.prototype, "count", {
	        /**
	         * Retrieve the number of items yielded thus far by this iterator.
	         */
	        get: function () {
	            return this._count;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Iterator.prototype, "scannedCount", {
	        /**
	         * Retrieve the number of items scanned thus far during the execution of
	         * this iterator. This number should be the same as {@link count} unless a
	         * filter expression was used.
	         */
	        get: function () {
	            return this.paginator.scannedCount;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Iterator.prototype.getNext = function () {
	        return tslib_1.__awaiter(this, void 0, void 0, function () {
	            var _this = this;
	            return tslib_1.__generator(this, function (_a) {
	                if (this.pending.length > 0) {
	                    this.lastYielded = this.pending.shift();
	                    this._count++;
	                    return [2 /*return*/, {
	                            done: false,
	                            value: this.lastYielded
	                        }];
	                }
	                return [2 /*return*/, this.paginator.next().then(function (_a) {
	                        var _b = _a.value, value = _b === void 0 ? [] : _b, done = _a.done;
	                        var _c;
	                        if (!done) {
	                            (_c = _this.pending).push.apply(_c, tslib_1.__spread(value));
	                            return _this.getNext();
	                        }
	                        _this.lastYielded = undefined;
	                        return { done: true };
	                    })];
	            });
	        });
	    };
	    return Iterator;
	}());
	exports.Iterator = Iterator;
	//# sourceMappingURL=Iterator.js.map

/***/ }),
/* 102 */
/***/ (function(module, exports) {

	"use strict";
	/**
	 * Provides a simple polyfill for runtime environments that provide a Symbol
	 * implementation but do not have Symbol.asyncIterator available by default.
	 */
	if (Symbol && !Symbol.asyncIterator) {
	    Symbol.asyncIterator = Symbol.for("__@@asyncIterator__");
	}
	//# sourceMappingURL=asyncIteratorSymbolPolyfill.js.map

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var buildScanInput_1 = __webpack_require__(104);
	var Paginator_1 = __webpack_require__(136);
	var protocols_1 = __webpack_require__(135);
	var dynamodb_query_iterator_1 = __webpack_require__(137);
	var dynamodb_data_marshaller_1 = __webpack_require__(106);
	/**
	 * Iterates over each page of items returned by a parallel DynamoDB scan until
	 * no more pages are available.
	 */
	var ParallelScanPaginator = /** @class */ (function (_super) {
	    tslib_1.__extends(ParallelScanPaginator, _super);
	    function ParallelScanPaginator(client, itemConstructor, segments, options) {
	        if (options === void 0) { options = {}; }
	        var _this = this;
	        var schema = protocols_1.getSchema(itemConstructor.prototype);
	        var input = tslib_1.__assign({}, buildScanInput_1.buildScanInput(itemConstructor, options), { TotalSegments: segments, ExclusiveStartKey: undefined, Segment: undefined });
	        var scanState;
	        if (options.scanState) {
	            scanState = options.scanState.map(function (_a) {
	                var initialized = _a.initialized, lastKey = _a.lastEvaluatedKey;
	                return ({
	                    initialized: initialized,
	                    LastEvaluatedKey: lastKey
	                        ? dynamodb_data_marshaller_1.marshallKey(schema, lastKey, options.indexName)
	                        : undefined
	                });
	            });
	        }
	        var paginator = new dynamodb_query_iterator_1.ParallelScanPaginator(client, input, scanState);
	        _this = _super.call(this, paginator, itemConstructor) || this;
	        _this._paginator = paginator;
	        _this._ctor = itemConstructor;
	        _this._schema = schema;
	        return _this;
	    }
	    Object.defineProperty(ParallelScanPaginator.prototype, "lastEvaluatedKey", {
	        /**
	         * The `lastEvaluatedKey` attribute is not available on parallel scans. Use
	         * {@link scanState} instead.
	         */
	        get: function () {
	            return undefined;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ParallelScanPaginator.prototype, "scanState", {
	        /**
	         * A snapshot of the current state of a parallel scan. May be used to resume
	         * a parallel scan with a separate paginator.
	         */
	        get: function () {
	            var _this = this;
	            return this._paginator.scanState.map(function (_a) {
	                var initialized = _a.initialized, LastEvaluatedKey = _a.LastEvaluatedKey;
	                return ({
	                    initialized: initialized,
	                    lastEvaluatedKey: LastEvaluatedKey
	                        ? dynamodb_data_marshaller_1.unmarshallItem(_this._schema, LastEvaluatedKey, _this._ctor)
	                        : undefined
	                });
	            });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return ParallelScanPaginator;
	}(Paginator_1.Paginator));
	exports.ParallelScanPaginator = ParallelScanPaginator;
	//# sourceMappingURL=ParallelScanPaginator.js.map

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var marshallStartKey_1 = __webpack_require__(105);
	var protocols_1 = __webpack_require__(135);
	var dynamodb_data_marshaller_1 = __webpack_require__(106);
	var dynamodb_expressions_1 = __webpack_require__(113);
	/**
	 * @internal
	 */
	function buildScanInput(valueConstructor, options) {
	    if (options === void 0) { options = {}; }
	    var filter = options.filter, indexName = options.indexName, pageSize = options.pageSize, projection = options.projection, readConsistency = options.readConsistency, segment = options.segment, startKey = options.startKey, prefix = options.tableNamePrefix, totalSegments = options.totalSegments;
	    var req = {
	        TableName: protocols_1.getTableName(valueConstructor.prototype, prefix),
	        Limit: pageSize,
	        IndexName: indexName,
	        Segment: segment,
	        TotalSegments: totalSegments,
	    };
	    if (readConsistency === 'strong') {
	        req.ConsistentRead = true;
	    }
	    var schema = protocols_1.getSchema(valueConstructor.prototype);
	    var attributes = new dynamodb_expressions_1.ExpressionAttributes();
	    if (filter) {
	        req.FilterExpression = dynamodb_data_marshaller_1.marshallConditionExpression(filter, schema, attributes).expression;
	    }
	    if (projection) {
	        req.ProjectionExpression = dynamodb_data_marshaller_1.marshallProjectionExpression(projection, schema, attributes).expression;
	    }
	    if (Object.keys(attributes.names).length > 0) {
	        req.ExpressionAttributeNames = attributes.names;
	    }
	    if (Object.keys(attributes.values).length > 0) {
	        req.ExpressionAttributeValues = attributes.values;
	    }
	    if (startKey) {
	        req.ExclusiveStartKey = marshallStartKey_1.marshallStartKey(schema, startKey);
	    }
	    return req;
	}
	exports.buildScanInput = buildScanInput;
	//# sourceMappingURL=buildScanInput.js.map

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var dynamodb_data_marshaller_1 = __webpack_require__(106);
	/**
	 * @internal
	 */
	function marshallStartKey(schema, startKey) {
	    var e_1, _a;
	    var key = {};
	    try {
	        for (var _b = tslib_1.__values(Object.keys(startKey)), _c = _b.next(); !_c.done; _c = _b.next()) {
	            var propertyName = _c.value;
	            var propSchema = schema[propertyName];
	            var _d = propSchema.attributeName, attributeName = _d === void 0 ? propertyName : _d;
	            if (propSchema) {
	                key[attributeName] = dynamodb_data_marshaller_1.marshallValue(propSchema, startKey[propertyName]);
	            }
	        }
	    }
	    catch (e_1_1) { e_1 = { error: e_1_1 }; }
	    finally {
	        try {
	            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	        }
	        finally { if (e_1) throw e_1.error; }
	    }
	    return key;
	}
	exports.marshallStartKey = marshallStartKey;
	//# sourceMappingURL=marshallStartKey.js.map

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	tslib_1.__exportStar(__webpack_require__(107), exports);
	tslib_1.__exportStar(__webpack_require__(108), exports);
	tslib_1.__exportStar(__webpack_require__(109), exports);
	tslib_1.__exportStar(__webpack_require__(110), exports);
	tslib_1.__exportStar(__webpack_require__(111), exports);
	tslib_1.__exportStar(__webpack_require__(129), exports);
	tslib_1.__exportStar(__webpack_require__(131), exports);
	tslib_1.__exportStar(__webpack_require__(132), exports);
	tslib_1.__exportStar(__webpack_require__(133), exports);
	tslib_1.__exportStar(__webpack_require__(112), exports);
	tslib_1.__exportStar(__webpack_require__(134), exports);
	//# sourceMappingURL=index.js.map

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	/**
	 * An error thrown when a marshaller or unmarshaller cannot understand a node of
	 * the provided schema.
	 */
	var InvalidSchemaError = /** @class */ (function (_super) {
	    tslib_1.__extends(InvalidSchemaError, _super);
	    function InvalidSchemaError(node, message) {
	        var _this = _super.call(this, message) || this;
	        _this.node = node;
	        return _this;
	    }
	    return InvalidSchemaError;
	}(Error));
	exports.InvalidSchemaError = InvalidSchemaError;
	//# sourceMappingURL=InvalidSchemaError.js.map

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	/**
	 * An error thrown by the marshaller when a node of the provided input cannot be
	 * marshalled into the type specified in the schema.
	 */
	var InvalidValueError = /** @class */ (function (_super) {
	    tslib_1.__extends(InvalidValueError, _super);
	    function InvalidValueError(invalidValue, message) {
	        var _this = _super.call(this, message) || this;
	        _this.invalidValue = invalidValue;
	        return _this;
	    }
	    return InvalidValueError;
	}(Error));
	exports.InvalidValueError = InvalidValueError;
	//# sourceMappingURL=InvalidValueError.js.map

/***/ }),
/* 109 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function isKey(fieldSchema, indexName) {
	    if (fieldSchema.type === 'Binary' ||
	        fieldSchema.type === 'Custom' ||
	        fieldSchema.type === 'Date' ||
	        fieldSchema.type === 'Number' ||
	        fieldSchema.type === 'String') {
	        return indexName !== undefined
	            ? Boolean(fieldSchema.indexKeyConfigurations &&
	                fieldSchema.indexKeyConfigurations[indexName]) : Boolean(fieldSchema.keyType);
	    }
	    return false;
	}
	exports.isKey = isKey;
	//# sourceMappingURL=isKey.js.map

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	function keysFromSchema(schema) {
	    var e_1, _a, e_2, _b;
	    var attributes = {};
	    var tableKeys = {};
	    var indexKeys = {};
	    try {
	        for (var _c = tslib_1.__values(Object.keys(schema)), _d = _c.next(); !_d.done; _d = _c.next()) {
	            var propertyName = _d.value;
	            var fieldSchema = schema[propertyName];
	            if (fieldSchema.type === 'Binary' ||
	                fieldSchema.type === 'Custom' ||
	                fieldSchema.type === 'Date' ||
	                fieldSchema.type === 'Number' ||
	                fieldSchema.type === 'String') {
	                var _e = fieldSchema.attributeName, attributeName = _e === void 0 ? propertyName : _e;
	                if (fieldSchema.keyType) {
	                    attributes[attributeName] = attributeType(fieldSchema);
	                    tableKeys[attributeName] = fieldSchema.keyType;
	                }
	                if (fieldSchema.indexKeyConfigurations &&
	                    Object.keys(fieldSchema.indexKeyConfigurations).length > 0) {
	                    attributes[attributeName] = attributeType(fieldSchema);
	                    try {
	                        for (var _f = tslib_1.__values(Object.keys(fieldSchema.indexKeyConfigurations)), _g = _f.next(); !_g.done; _g = _f.next()) {
	                            var indexName = _g.value;
	                            if (!(indexName in indexKeys)) {
	                                indexKeys[indexName] = {};
	                            }
	                            indexKeys[indexName][attributeName]
	                                = fieldSchema.indexKeyConfigurations[indexName];
	                        }
	                    }
	                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
	                    finally {
	                        try {
	                            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
	                        }
	                        finally { if (e_2) throw e_2.error; }
	                    }
	                }
	            }
	        }
	    }
	    catch (e_1_1) { e_1 = { error: e_1_1 }; }
	    finally {
	        try {
	            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
	        }
	        finally { if (e_1) throw e_1.error; }
	    }
	    return { attributes: attributes, tableKeys: tableKeys, indexKeys: indexKeys };
	}
	exports.keysFromSchema = keysFromSchema;
	function attributeType(fieldSchema) {
	    switch (fieldSchema.type) {
	        case 'Binary':
	            return 'B';
	        case 'Custom':
	            if (!fieldSchema.attributeType) {
	                throw new Error('Invalid schema: no attribute type defined for custom field');
	            }
	            return fieldSchema.attributeType;
	        case 'Date':
	        case 'Number':
	            return 'N';
	        case 'String':
	            return 'S';
	    }
	}
	//# sourceMappingURL=keysFromSchema.js.map

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var toSchemaName_1 = __webpack_require__(112);
	var dynamodb_expressions_1 = __webpack_require__(113);
	/**
	 * Serialize a condition expression, substituting any property names for the
	 * corresponding attribute names in the provided schema.
	 *
	 * @param expression The expression object to marshall.
	 * @param schema The schema of the table to which the expression pertains.
	 * @param attributes An optional ExpressionAttributes object to synchronize
	 *                      substitutions across multiple expressions.
	 */
	function marshallConditionExpression(expression, schema, attributes) {
	    if (attributes === void 0) { attributes = new dynamodb_expressions_1.ExpressionAttributes; }
	    var serialized = dynamodb_expressions_1.serializeConditionExpression(normalizeConditionExpression(expression, schema), attributes);
	    return {
	        expression: serialized,
	        ExpressionAttributeNames: attributes.names,
	        ExpressionAttributeValues: attributes.values,
	    };
	}
	exports.marshallConditionExpression = marshallConditionExpression;
	/**
	 * Serialize a function expression, substituting any property names for the
	 * corresponding attribute names in the provided schema.
	 *
	 * @param expression The expression object to marshall.
	 * @param schema The schema of the table to which the expression pertains.
	 * @param attributes An optional ExpressionAttributes object to synchronize
	 *                      substitutions across multiple expressions.
	 */
	function marshallFunctionExpression(expression, schema, attributes) {
	    if (attributes === void 0) { attributes = new dynamodb_expressions_1.ExpressionAttributes; }
	    var serialized = normalizeFunctionExpression(expression, schema)
	        .serialize(attributes);
	    return {
	        expression: serialized,
	        ExpressionAttributeNames: attributes.names,
	        ExpressionAttributeValues: attributes.values,
	    };
	}
	exports.marshallFunctionExpression = marshallFunctionExpression;
	/**
	 * Serialize a mathematical expression, substituting any property names for the
	 * corresponding attribute names in the provided schema.
	 *
	 * @param expression The expression object to marshall.
	 * @param schema The schema of the table to which the expression pertains.
	 * @param attributes An optional ExpressionAttributes object to synchronize
	 *                      substitutions across multiple expressions.
	 */
	function marshallMathematicalExpression(expression, schema, attributes) {
	    if (attributes === void 0) { attributes = new dynamodb_expressions_1.ExpressionAttributes; }
	    var serialized = normalizeMathematicalExpression(expression, schema)
	        .serialize(attributes);
	    return {
	        expression: serialized,
	        ExpressionAttributeNames: attributes.names,
	        ExpressionAttributeValues: attributes.values,
	    };
	}
	exports.marshallMathematicalExpression = marshallMathematicalExpression;
	/**
	 * Serialize a projection expression, substituting any property names for the
	 * corresponding attribute names in the provided schema.
	 *
	 * @param expression The expression object to marshall.
	 * @param schema The schema of the table to which the expression pertains.
	 * @param attributes An optional ExpressionAttributes object to synchronize
	 *                      substitutions across multiple expressions.
	 */
	function marshallProjectionExpression(expression, schema, attributes) {
	    if (attributes === void 0) { attributes = new dynamodb_expressions_1.ExpressionAttributes; }
	    var serialized = dynamodb_expressions_1.serializeProjectionExpression(expression.map(function (el) { return toSchemaName_1.toSchemaName(el, schema); }), attributes);
	    return {
	        expression: serialized,
	        ExpressionAttributeNames: attributes.names,
	        ExpressionAttributeValues: attributes.values,
	    };
	}
	exports.marshallProjectionExpression = marshallProjectionExpression;
	/**
	 * Serialize an update expression, substituting any property names for the
	 * corresponding attribute names in the provided schema.
	 *
	 * @param expression The expression object to marshall.
	 * @param schema The schema of the table to which the expression pertains.
	 * @param attributes An optional ExpressionAttributes object to synchronize
	 *                      substitutions across multiple expressions.
	 */
	function marshallUpdateExpression(expression, schema, attributes) {
	    if (attributes === void 0) { attributes = new dynamodb_expressions_1.ExpressionAttributes; }
	    var serialized = normalizeUpdateExpression(expression, schema)
	        .serialize(attributes);
	    return {
	        expression: serialized,
	        ExpressionAttributeNames: attributes.names,
	        ExpressionAttributeValues: attributes.values,
	    };
	}
	exports.marshallUpdateExpression = marshallUpdateExpression;
	function normalizeConditionExpression(expression, schema) {
	    if (dynamodb_expressions_1.FunctionExpression.isFunctionExpression(expression)) {
	        return normalizeFunctionExpression(expression, schema);
	    }
	    switch (expression.type) {
	        case 'Equals':
	        case 'NotEquals':
	        case 'LessThan':
	        case 'LessThanOrEqualTo':
	        case 'GreaterThan':
	        case 'GreaterThanOrEqualTo':
	            return tslib_1.__assign({}, expression, { subject: toSchemaName_1.toSchemaName(expression.subject, schema), object: normalizeIfPath(expression.object, schema) });
	        case 'Between':
	            return tslib_1.__assign({}, expression, { subject: toSchemaName_1.toSchemaName(expression.subject, schema), lowerBound: normalizeIfPath(expression.lowerBound, schema), upperBound: normalizeIfPath(expression.upperBound, schema) });
	        case 'Membership':
	            return tslib_1.__assign({}, expression, { subject: toSchemaName_1.toSchemaName(expression.subject, schema), values: expression.values.map(function (arg) { return normalizeIfPath(arg, schema); }) });
	        case 'Not':
	            return tslib_1.__assign({}, expression, { condition: normalizeConditionExpression(expression.condition, schema) });
	        case 'And':
	        case 'Or':
	            return tslib_1.__assign({}, expression, { conditions: expression.conditions.map(function (condition) {
	                    return normalizeConditionExpression(condition, schema);
	                }) });
	    }
	}
	function normalizeFunctionExpression(expression, schema) {
	    return new (dynamodb_expressions_1.FunctionExpression.bind.apply(dynamodb_expressions_1.FunctionExpression, tslib_1.__spread([void 0, expression.name], expression.args.map(function (arg) { return normalizeIfPath(arg, schema); }))))();
	}
	function normalizeMathematicalExpression(expression, schema) {
	    return new dynamodb_expressions_1.MathematicalExpression(dynamodb_expressions_1.AttributePath.isAttributePath(expression.lhs) || typeof expression.lhs === 'string'
	        ? toSchemaName_1.toSchemaName(expression.lhs, schema)
	        : expression.lhs, expression.operator, dynamodb_expressions_1.AttributePath.isAttributePath(expression.rhs) || typeof expression.rhs === 'string'
	        ? toSchemaName_1.toSchemaName(expression.rhs, schema)
	        : expression.rhs);
	}
	var mapsToTransform = [
	    ['toAdd', 'add'],
	    ['toDelete', 'delete'],
	    ['toSet', 'set'],
	];
	function normalizeUpdateExpression(expression, schema) {
	    var e_1, _a, e_2, _b;
	    var normalized = new dynamodb_expressions_1.UpdateExpression;
	    try {
	        for (var mapsToTransform_1 = tslib_1.__values(mapsToTransform), mapsToTransform_1_1 = mapsToTransform_1.next(); !mapsToTransform_1_1.done; mapsToTransform_1_1 = mapsToTransform_1.next()) {
	            var _c = tslib_1.__read(mapsToTransform_1_1.value, 2), dataSet = _c[0], exprMethod = _c[1];
	            try {
	                for (var _d = tslib_1.__values(expression[dataSet]), _e = _d.next(); !_e.done; _e = _d.next()) {
	                    var _f = tslib_1.__read(_e.value, 2), path = _f[0], value = _f[1];
	                    normalized[exprMethod](toSchemaName_1.toSchemaName(path, schema), value);
	                }
	            }
	            catch (e_2_1) { e_2 = { error: e_2_1 }; }
	            finally {
	                try {
	                    if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
	                }
	                finally { if (e_2) throw e_2.error; }
	            }
	        }
	    }
	    catch (e_1_1) { e_1 = { error: e_1_1 }; }
	    finally {
	        try {
	            if (mapsToTransform_1_1 && !mapsToTransform_1_1.done && (_a = mapsToTransform_1.return)) _a.call(mapsToTransform_1);
	        }
	        finally { if (e_1) throw e_1.error; }
	    }
	    expression.toRemove.forEach(function (el) { return normalized.remove(toSchemaName_1.toSchemaName(el, schema)); });
	    return normalized;
	}
	function normalizeIfPath(path, schema) {
	    if (dynamodb_expressions_1.AttributePath.isAttributePath(path)) {
	        return toSchemaName_1.toSchemaName(path, schema);
	    }
	    return path;
	}
	//# sourceMappingURL=marshallExpression.js.map

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var dynamodb_expressions_1 = __webpack_require__(113);
	function toSchemaName(path, schema) {
	    var e_1, _a;
	    if (typeof path === 'string') {
	        path = new dynamodb_expressions_1.AttributePath(path);
	    }
	    var elements = path.elements.map(function (el) { return (tslib_1.__assign({}, el)); });
	    var cursor = {
	        type: 'Document',
	        members: schema
	    };
	    try {
	        for (var elements_1 = tslib_1.__values(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
	            var element = elements_1_1.value;
	            if (element.type === 'AttributeName' &&
	                cursor &&
	                cursor.type === 'Document') {
	                var name = element.name;
	                element.name = getSchemaName(name, cursor.members);
	                cursor = cursor.members[name];
	            }
	            else if (element.type === 'ListIndex' &&
	                cursor &&
	                cursor.type === 'List') {
	                cursor = cursor.memberType;
	            }
	            else {
	                break;
	            }
	        }
	    }
	    catch (e_1_1) { e_1 = { error: e_1_1 }; }
	    finally {
	        try {
	            if (elements_1_1 && !elements_1_1.done && (_a = elements_1.return)) _a.call(elements_1);
	        }
	        finally { if (e_1) throw e_1.error; }
	    }
	    return new dynamodb_expressions_1.AttributePath(elements);
	}
	exports.toSchemaName = toSchemaName;
	function getSchemaName(propertyName, schema) {
	    var fieldSchema = schema[propertyName];
	    if (fieldSchema) {
	        var _a = fieldSchema.attributeName, attributeName = _a === void 0 ? propertyName : _a;
	        return attributeName;
	    }
	    return propertyName;
	}
	exports.getSchemaName = getSchemaName;
	//# sourceMappingURL=toSchemaName.js.map

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	tslib_1.__exportStar(__webpack_require__(114), exports);
	tslib_1.__exportStar(__webpack_require__(115), exports);
	tslib_1.__exportStar(__webpack_require__(116), exports);
	tslib_1.__exportStar(__webpack_require__(118), exports);
	tslib_1.__exportStar(__webpack_require__(117), exports);
	tslib_1.__exportStar(__webpack_require__(126), exports);
	tslib_1.__exportStar(__webpack_require__(127), exports);
	tslib_1.__exportStar(__webpack_require__(128), exports);
	//# sourceMappingURL=index.js.map

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var ATTRIBUTE_PATH_TAG = 'AmazonDynamoDbAttributePath';
	var EXPECTED_TAG = "[object " + ATTRIBUTE_PATH_TAG + "]";
	/**
	 * The path to an attribute of a DynamoDB item or to a property
	 * or member thereof. Supports map property access (`map.property`)
	 * and list member access (`list[1]`).
	 *
	 * Control characters that are part of the property identifier may be
	 * used when escaped with a backslash (`\`) character.
	 */
	var AttributePath = /** @class */ (function () {
	    function AttributePath(path) {
	        this[Symbol.toStringTag] = ATTRIBUTE_PATH_TAG;
	        if (typeof path === 'string') {
	            this.elements = parsePath(path);
	        }
	        else {
	            this.elements = tslib_1.__spread(path);
	        }
	    }
	    /**
	     * Determine if the provided value is an AttributePath object.
	     * Compatible with AttributePath objects generated in other iframes
	     * or Node VMs.
	     */
	    AttributePath.isAttributePath = function (arg) {
	        return arg instanceof AttributePath
	            || Object.prototype.toString.call(arg) === EXPECTED_TAG;
	    };
	    return AttributePath;
	}());
	exports.AttributePath = AttributePath;
	var LEFT_BRACKET = '[';
	var RIGHT_BRACKET = ']';
	var PATH_DELIMITER = '.';
	var ESCAPE_CHARACTER = '\\';
	function parsePath(path) {
	    var elements = [];
	    var state = 1001 /* identifier */;
	    var collected = '';
	    for (var iter = path[Symbol.iterator](), curr = iter.next(), peek = iter.next(); curr.done === false; curr = peek, peek = iter.next()) {
	        if (state === 1001 /* identifier */) {
	            switch (curr.value) {
	                case LEFT_BRACKET:
	                    state = 1002 /* listIndex */;
	                // fallthrough
	                case PATH_DELIMITER:
	                    if (collected === '') {
	                        throw new Error("Invalid control character encountered in path: " + path);
	                    }
	                    elements.push({ type: 'AttributeName', name: collected });
	                    collected = '';
	                    break;
	                case ESCAPE_CHARACTER:
	                    if (peek.value === PATH_DELIMITER ||
	                        peek.value === LEFT_BRACKET ||
	                        peek.value === ESCAPE_CHARACTER) {
	                        curr = peek;
	                        peek = iter.next();
	                    }
	                // fallthrough
	                default:
	                    collected += curr.value;
	            }
	        }
	        else if (state === 1002 /* listIndex */) {
	            switch (curr.value) {
	                case RIGHT_BRACKET:
	                    var intVal = parseInt(collected);
	                    if (!isFinite(intVal)) {
	                        throw new Error("Invalid array index (" + collected + ") encountered in path: " + path);
	                    }
	                    elements.push({ type: 'ListIndex', index: intVal });
	                    collected = '';
	                    state = 1000 /* controlCharacter */;
	                    break;
	                case '0':
	                case '1':
	                case '2':
	                case '3':
	                case '4':
	                case '5':
	                case '6':
	                case '7':
	                case '8':
	                case '9':
	                    collected += curr.value;
	                    break;
	                default:
	                    throw new Error("Invalid array index character (" + curr.value + ") encountered in path: " + path);
	            }
	        }
	        else {
	            switch (curr.value) {
	                case LEFT_BRACKET:
	                    state = 1002 /* listIndex */;
	                    break;
	                case PATH_DELIMITER:
	                    state = 1001 /* identifier */;
	                    break;
	                default:
	                    throw new Error("Bare identifier encountered between list index accesses in path: " + path);
	            }
	        }
	    }
	    if (collected.length > 0) {
	        elements.push({ type: 'AttributeName', name: collected });
	    }
	    return elements;
	}
	//# sourceMappingURL=AttributePath.js.map

/***/ }),
/* 115 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var MARSHALLED_ATTRIBUTE_VALUE_TAG = 'AmazonDynamoDbAttributeValue';
	var EXPECTED_TOSTRING = "[object " + MARSHALLED_ATTRIBUTE_VALUE_TAG + "]";
	/**
	 * An object containing an already-marshalled DynamoDB AttributeValue.
	 * Intended to allow marshalled AttributeValues to be identified as such
	 * and distinguished from maps that resemble marshalled values.
	 */
	var AttributeValue = /** @class */ (function () {
	    function AttributeValue(marshalled) {
	        this.marshalled = marshalled;
	        this[Symbol.toStringTag] = MARSHALLED_ATTRIBUTE_VALUE_TAG;
	    }
	    AttributeValue.isAttributeValue = function (arg) {
	        return arg instanceof AttributeValue
	            || Object.prototype.toString.call(arg) === EXPECTED_TOSTRING;
	    };
	    return AttributeValue;
	}());
	exports.AttributeValue = AttributeValue;
	//# sourceMappingURL=AttributeValue.js.map

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var AttributePath_1 = __webpack_require__(114);
	var FunctionExpression_1 = __webpack_require__(117);
	/**
	 * Create an expression predicate asserting that the subject is equal to the
	 * predicate.
	 */
	function equals(operand) {
	    return {
	        type: 'Equals',
	        object: operand,
	    };
	}
	exports.equals = equals;
	function notEquals(operand) {
	    return {
	        type: 'NotEquals',
	        object: operand,
	    };
	}
	exports.notEquals = notEquals;
	function lessThan(operand) {
	    return {
	        type: 'LessThan',
	        object: operand,
	    };
	}
	exports.lessThan = lessThan;
	function lessThanOrEqualTo(operand) {
	    return {
	        type: 'LessThanOrEqualTo',
	        object: operand,
	    };
	}
	exports.lessThanOrEqualTo = lessThanOrEqualTo;
	function greaterThan(operand) {
	    return {
	        type: 'GreaterThan',
	        object: operand,
	    };
	}
	exports.greaterThan = greaterThan;
	function greaterThanOrEqualTo(operand) {
	    return {
	        type: 'GreaterThanOrEqualTo',
	        object: operand,
	    };
	}
	exports.greaterThanOrEqualTo = greaterThanOrEqualTo;
	function between(lowerBound, upperBound) {
	    return {
	        type: 'Between',
	        lowerBound: lowerBound,
	        upperBound: upperBound,
	    };
	}
	exports.between = between;
	function inList() {
	    var operands = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        operands[_i] = arguments[_i];
	    }
	    return {
	        type: 'Membership',
	        values: operands,
	    };
	}
	exports.inList = inList;
	/**
	 * Evaluate whether the provided value is a condition expression predicate.
	 */
	function isConditionExpressionPredicate(arg) {
	    if (arg && typeof arg === 'object') {
	        switch (arg.type) {
	            case 'Equals':
	            case 'NotEquals':
	            case 'LessThan':
	            case 'LessThanOrEqualTo':
	            case 'GreaterThan':
	            case 'GreaterThanOrEqualTo':
	                return arg.object !== undefined;
	            case 'Between':
	                return arg.lowerBound !== undefined
	                    && arg.upperBound !== undefined;
	            case 'Membership':
	                return Array.isArray(arg.values);
	        }
	    }
	    return false;
	}
	exports.isConditionExpressionPredicate = isConditionExpressionPredicate;
	function isConditionExpressionSubject(arg) {
	    return Boolean(arg)
	        && typeof arg === 'object'
	        && (typeof arg.subject === 'string' || AttributePath_1.AttributePath.isAttributePath(arg.subject));
	}
	exports.isConditionExpressionSubject = isConditionExpressionSubject;
	/**
	 * Evaluates whether the provided value is a condition expression.
	 */
	function isConditionExpression(arg) {
	    var e_1, _a;
	    if (FunctionExpression_1.FunctionExpression.isFunctionExpression(arg)) {
	        return true;
	    }
	    if (Boolean(arg) && typeof arg === 'object') {
	        switch (arg.type) {
	            case 'Not':
	                return isConditionExpression(arg.condition);
	            case 'And':
	            case 'Or':
	                if (Array.isArray(arg.conditions)) {
	                    try {
	                        for (var _b = tslib_1.__values(arg.conditions), _c = _b.next(); !_c.done; _c = _b.next()) {
	                            var condition = _c.value;
	                            if (!isConditionExpression(condition)) {
	                                return false;
	                            }
	                        }
	                    }
	                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
	                    finally {
	                        try {
	                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	                        }
	                        finally { if (e_1) throw e_1.error; }
	                    }
	                    return true;
	                }
	                return false;
	            default:
	                return isConditionExpressionSubject(arg)
	                    && isConditionExpressionPredicate(arg);
	        }
	    }
	    return false;
	}
	exports.isConditionExpression = isConditionExpression;
	/**
	 * Convert the provided condition expression object to a string, escaping any
	 * values and attributes to expression-safe placeholders whose expansion value
	 * will be managed by the provided ExpressionAttributes object.
	 */
	function serializeConditionExpression(condition, attributes) {
	    if (FunctionExpression_1.FunctionExpression.isFunctionExpression(condition)) {
	        return condition.serialize(attributes);
	    }
	    switch (condition.type) {
	        case 'Equals':
	            return serializeBinaryComparison(condition, attributes, '=');
	        case 'NotEquals':
	            return serializeBinaryComparison(condition, attributes, '<>');
	        case 'LessThan':
	            return serializeBinaryComparison(condition, attributes, '<');
	        case 'LessThanOrEqualTo':
	            return serializeBinaryComparison(condition, attributes, '<=');
	        case 'GreaterThan':
	            return serializeBinaryComparison(condition, attributes, '>');
	        case 'GreaterThanOrEqualTo':
	            return serializeBinaryComparison(condition, attributes, '>=');
	        case 'Between':
	            return attributes.addName(condition.subject) + " BETWEEN " + serializeOperand(condition.lowerBound, attributes) + " AND " + serializeOperand(condition.upperBound, attributes);
	        case 'Membership':
	            return attributes.addName(condition.subject) + " IN (" + condition.values.map(function (val) { return serializeOperand(val, attributes); })
	                .join(', ') + ")";
	        case 'Not':
	            return "NOT (" + serializeConditionExpression(condition.condition, attributes) + ")";
	        case 'And':
	        case 'Or':
	            if (condition.conditions.length === 1) {
	                return serializeConditionExpression(condition.conditions[0], attributes);
	            }
	            return condition.conditions
	                .map(function (cond) { return "(" + serializeConditionExpression(cond, attributes) + ")"; })
	                .join(" " + condition.type.toUpperCase() + " ");
	    }
	}
	exports.serializeConditionExpression = serializeConditionExpression;
	function serializeBinaryComparison(cond, attributes, comparator) {
	    return attributes.addName(cond.subject) + " " + comparator + " " + serializeOperand(cond.object, attributes);
	}
	function serializeOperand(operand, attributes) {
	    return AttributePath_1.AttributePath.isAttributePath(operand)
	        ? attributes.addName(operand)
	        : attributes.addValue(operand);
	}
	//# sourceMappingURL=ConditionExpression.js.map

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var AttributePath_1 = __webpack_require__(114);
	var FUNCTION_EXPRESSION_TAG = 'AmazonDynamoDbFunctionExpression';
	var EXPECTED_TOSTRING = "[object " + FUNCTION_EXPRESSION_TAG + "]";
	/**
	 * An object representing a DynamoDB function expression.
	 */
	var FunctionExpression = /** @class */ (function () {
	    function FunctionExpression(name) {
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        this.name = name;
	        this[Symbol.toStringTag] = FUNCTION_EXPRESSION_TAG;
	        this.args = args;
	    }
	    FunctionExpression.prototype.serialize = function (attributes) {
	        var expressionSafeArgs = this.args.map(function (arg) { return AttributePath_1.AttributePath.isAttributePath(arg)
	            ? attributes.addName(arg)
	            : attributes.addValue(arg); });
	        return this.name + "(" + expressionSafeArgs.join(', ') + ")";
	    };
	    /**
	     * Evaluate whether the provided value is a FunctionExpression object.
	     */
	    FunctionExpression.isFunctionExpression = function (arg) {
	        return arg instanceof FunctionExpression
	            || Object.prototype.toString.call(arg) === EXPECTED_TOSTRING;
	    };
	    return FunctionExpression;
	}());
	exports.FunctionExpression = FunctionExpression;
	//# sourceMappingURL=FunctionExpression.js.map

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var AttributePath_1 = __webpack_require__(114);
	var AttributeValue_1 = __webpack_require__(115);
	var dynamodb_auto_marshaller_1 = __webpack_require__(119);
	/**
	 * An object that manages expression attribute name and value substitution.
	 */
	var ExpressionAttributes = /** @class */ (function () {
	    function ExpressionAttributes() {
	        this.names = {};
	        this.values = {};
	        this.marshaller = new dynamodb_auto_marshaller_1.Marshaller();
	        this.nameMap = {};
	        this._ctr = 0;
	    }
	    /**
	     * Add an attribute path to this substitution context.
	     *
	     * @returns The substitution value to use in the expression. The same
	     * attribute name will always be converted to the same substitution value
	     * when supplied to the same ExpressionAttributes object multiple times.
	     */
	    ExpressionAttributes.prototype.addName = function (path) {
	        var e_1, _a;
	        if (AttributePath_1.AttributePath.isAttributePath(path)) {
	            var escapedPath = '';
	            try {
	                for (var _b = tslib_1.__values(path.elements), _c = _b.next(); !_c.done; _c = _b.next()) {
	                    var element = _c.value;
	                    if (element.type === 'AttributeName') {
	                        escapedPath += "." + this.addAttributeName(element.name);
	                    }
	                    else {
	                        escapedPath += "[" + element.index + "]";
	                    }
	                }
	            }
	            catch (e_1_1) { e_1 = { error: e_1_1 }; }
	            finally {
	                try {
	                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	                }
	                finally { if (e_1) throw e_1.error; }
	            }
	            return escapedPath.substring(1);
	        }
	        return this.addName(new AttributePath_1.AttributePath(path));
	    };
	    /**
	     * Add an attribute value to this substitution context.
	     *
	     * @returns The substitution value to use in the expression.
	     */
	    ExpressionAttributes.prototype.addValue = function (value) {
	        var modeledAttrValue = AttributeValue_1.AttributeValue.isAttributeValue(value)
	            ? value.marshalled
	            : this.marshaller.marshallValue(value);
	        var substitution = ":val" + this._ctr++;
	        this.values[substitution] = modeledAttrValue;
	        return substitution;
	    };
	    ExpressionAttributes.prototype.addAttributeName = function (attributeName) {
	        if (!(attributeName in this.nameMap)) {
	            this.nameMap[attributeName] = "#attr" + this._ctr++;
	            this.names[this.nameMap[attributeName]] = attributeName;
	        }
	        return this.nameMap[attributeName];
	    };
	    return ExpressionAttributes;
	}());
	exports.ExpressionAttributes = ExpressionAttributes;
	//# sourceMappingURL=ExpressionAttributes.js.map

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	tslib_1.__exportStar(__webpack_require__(120), exports);
	tslib_1.__exportStar(__webpack_require__(122), exports);
	tslib_1.__exportStar(__webpack_require__(124), exports);
	tslib_1.__exportStar(__webpack_require__(125), exports);


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var ObjectSet_1 = __webpack_require__(121);
	/**
	 * A set of binary values represented as either ArrayBuffer objects or
	 * ArrayBufferView objects. Equality is determined by the underlying byte
	 * sequence and not by the identity or view window type of the provided value.
	 */
	var BinarySet = /** @class */ (function (_super) {
	    tslib_1.__extends(BinarySet, _super);
	    function BinarySet() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    BinarySet.prototype.delete = function (value) {
	        var valueView = getBinaryView(value);
	        var scrubbedValues = this._values.filter(function (item) {
	            return !binaryEquals(getBinaryView(item), valueView);
	        });
	        var numRemoved = this._values.length - scrubbedValues.length;
	        this._values = scrubbedValues;
	        return numRemoved > 0;
	    };
	    /**
	     * @inheritDoc
	     *
	     * Equality is determined by inspecting the bytes of the ArrayBuffer or
	     * ArrayBufferView.
	     *
	     * @example On a little-endian system, the following values would be
	     * considered equal:
	     *
	     *     new Uint32Array([0xdeadbeef]);
	     *     (new Uint32Array([0xdeadbeef])).buffer;
	     *     new Uint16Array([0xbeef, 0xdead]);
	     *     new Uint8Array([0xef, 0xbe, 0xad, 0xde]);
	     */
	    BinarySet.prototype.has = function (value) {
	        var e_1, _a;
	        var valueView = getBinaryView(value);
	        try {
	            for (var _b = tslib_1.__values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
	                var item = _c.value;
	                if (binaryEquals(getBinaryView(item), valueView)) {
	                    return true;
	                }
	            }
	        }
	        catch (e_1_1) { e_1 = { error: e_1_1 }; }
	        finally {
	            try {
	                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	            }
	            finally { if (e_1) throw e_1.error; }
	        }
	        return false;
	    };
	    return BinarySet;
	}(ObjectSet_1.ObjectSet));
	exports.BinarySet = BinarySet;
	function binaryEquals(a, b) {
	    if (a.byteLength !== b.byteLength) {
	        return false;
	    }
	    for (var i = 0; i < a.byteLength; i++) {
	        if (a.getUint8(i) !== b.getUint8(i)) {
	            return false;
	        }
	    }
	    return true;
	}
	function getBinaryView(value) {
	    return ArrayBuffer.isView(value)
	        ? new DataView(value.buffer, value.byteOffset, value.byteLength)
	        : new DataView(value);
	}


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var ObjectSet = /** @class */ (function () {
	    /**
	     * Creates a new ObjectSet and optionally seeds it with values.
	     *
	     * @param iterable An optional iterable of values to add to the set.
	     */
	    function ObjectSet(iterable) {
	        var e_1, _a;
	        /**
	         * Returns the string literal 'Set' for use by Object.prototype.toString.
	         * This allows for identifying Sets without checking constructor identity.
	         */
	        this[Symbol.toStringTag] = 'Set';
	        this._values = [];
	        if (iterable) {
	            try {
	                for (var iterable_1 = tslib_1.__values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
	                    var item = iterable_1_1.value;
	                    this.add(item);
	                }
	            }
	            catch (e_1_1) { e_1 = { error: e_1_1 }; }
	            finally {
	                try {
	                    if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
	                }
	                finally { if (e_1) throw e_1.error; }
	            }
	        }
	    }
	    /**
	     * Add a value to the set. If the value is already contained in the set, it
	     * will not be added a second time.
	     *
	     * @param value The value to add
	     */
	    ObjectSet.prototype.add = function (value) {
	        if (!this.has(value)) {
	            this._values.push(value);
	        }
	        return this;
	    };
	    /**
	     * Remove all values from the set.
	     */
	    ObjectSet.prototype.clear = function () {
	        this._values = [];
	    };
	    /**
	     * Returns an iterable two-member tuples for each item in the set, where
	     * the item is provided twice.
	     *
	     * Part of the ES2015 Set specification for compatibility with Map objects.
	     */
	    ObjectSet.prototype.entries = function () {
	        return this._values.map(function (value) { return [value, value]; })[Symbol.iterator]();
	    };
	    /**
	     * Invokes a callback once for each member of the set.
	     *
	     * @param callback The function to invoke with each set member
	     * @param thisArg The `this` context on which to invoke the callback
	     */
	    ObjectSet.prototype.forEach = function (callback, thisArg) {
	        var _this = this;
	        this._values.forEach(function (value, index, array) {
	            callback.call(thisArg, value, value, _this);
	        }, thisArg);
	    };
	    /**
	     * Returns an IterableIterator of each member of the set.
	     */
	    ObjectSet.prototype.keys = function () {
	        return this[Symbol.iterator]();
	    };
	    Object.defineProperty(ObjectSet.prototype, "size", {
	        /**
	         * Returns the number of members in the set.
	         */
	        get: function () {
	            return this._values.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Returns an IterableIterator of each member of the set.
	     */
	    ObjectSet.prototype.values = function () {
	        return this[Symbol.iterator]();
	    };
	    /**
	     * Returns an IterableIterator of each member of the set.
	     */
	    ObjectSet.prototype[Symbol.iterator] = function () {
	        return this._values[Symbol.iterator]();
	    };
	    return ObjectSet;
	}());
	exports.ObjectSet = ObjectSet;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var BinarySet_1 = __webpack_require__(120);
	var isArrayBuffer_1 = __webpack_require__(123);
	var NumberValue_1 = __webpack_require__(124);
	var NumberValueSet_1 = __webpack_require__(125);
	exports.EmptyHandlingStrategies = {
	    omit: 'omit',
	    nullify: 'nullify',
	    leave: 'leave',
	};
	exports.InvalidHandlingStrategies = {
	    /**
	     * Remove any invalid values from the serialized output.
	     */
	    omit: 'omit',
	    /**
	     * Throw an error when an unserializable value is encountered.
	     */
	    throw: 'throw',
	};
	/**
	 * A class that will convert arbitrary JavaScript data types to their most
	 * logical in the DynamoDB schema.
	 */
	var Marshaller = /** @class */ (function () {
	    function Marshaller(_a) {
	        var _b = _a === void 0 ? {} : _a, _c = _b.onEmpty, onEmpty = _c === void 0 ? 'leave' : _c, _d = _b.onInvalid, onInvalid = _d === void 0 ? 'throw' : _d, _e = _b.unwrapNumbers, unwrapNumbers = _e === void 0 ? false : _e;
	        this.onEmpty = onEmpty;
	        this.onInvalid = onInvalid;
	        this.unwrapNumbers = unwrapNumbers;
	    }
	    /**
	     * Convert a JavaScript object with string keys and arbitrary values into an
	     * object with string keys and DynamoDB AttributeValue objects as values.
	     */
	    Marshaller.prototype.marshallItem = function (item) {
	        var value = this.marshallValue(item);
	        if (!(value && value.M) && this.onInvalid === 'throw') {
	            throw new Error("Cannot serialize " + typeof item + " as an attribute map");
	        }
	        return value && value.M ? value.M : {};
	    };
	    /**
	     * Convert a JavaScript value into a DynamoDB AttributeValue or `undefined`.
	     *
	     * @throws Error if the value cannot be converted to a DynamoDB type and the
	     * marshaller has been configured to throw on invalid input.
	     */
	    Marshaller.prototype.marshallValue = function (value) {
	        switch (typeof value) {
	            case 'boolean':
	                return { BOOL: value };
	            case 'number':
	                return { N: value.toString(10) };
	            case 'object':
	                return this.marshallComplexType(value);
	            case 'string':
	                return value ? { S: value } : this.handleEmptyString(value);
	            case 'undefined':
	                return undefined;
	            case 'function':
	            case 'symbol':
	            default:
	                if (this.onInvalid === 'throw') {
	                    throw new Error("Cannot serialize values of the " + typeof value + " type");
	                }
	        }
	    };
	    /**
	     * Convert a DynamoDB operation result (an object with string keys and
	     * AttributeValue values) to an object with string keys and native
	     * JavaScript values.
	     */
	    Marshaller.prototype.unmarshallItem = function (item) {
	        return this.unmarshallValue({ M: item });
	    };
	    /**
	     * Convert a DynamoDB AttributeValue into a native JavaScript value.
	     */
	    Marshaller.prototype.unmarshallValue = function (item) {
	        var _this = this;
	        var e_1, _a, e_2, _b;
	        if (item.S !== undefined) {
	            return item.S;
	        }
	        if (item.N !== undefined) {
	            return this.unwrapNumbers
	                ? Number(item.N)
	                : new NumberValue_1.NumberValue(item.N);
	        }
	        if (item.B !== undefined) {
	            return item.B;
	        }
	        if (item.BOOL !== undefined) {
	            return item.BOOL;
	        }
	        if (item.NULL !== undefined) {
	            return null;
	        }
	        if (item.SS !== undefined) {
	            var set = new Set();
	            try {
	                for (var _c = tslib_1.__values(item.SS), _d = _c.next(); !_d.done; _d = _c.next()) {
	                    var member = _d.value;
	                    set.add(member);
	                }
	            }
	            catch (e_1_1) { e_1 = { error: e_1_1 }; }
	            finally {
	                try {
	                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
	                }
	                finally { if (e_1) throw e_1.error; }
	            }
	            return set;
	        }
	        if (item.NS !== undefined) {
	            if (this.unwrapNumbers) {
	                var set = new Set();
	                try {
	                    for (var _e = tslib_1.__values(item.NS), _f = _e.next(); !_f.done; _f = _e.next()) {
	                        var member = _f.value;
	                        set.add(Number(member));
	                    }
	                }
	                catch (e_2_1) { e_2 = { error: e_2_1 }; }
	                finally {
	                    try {
	                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
	                    }
	                    finally { if (e_2) throw e_2.error; }
	                }
	                return set;
	            }
	            return new NumberValueSet_1.NumberValueSet(item.NS.map(function (numberString) { return new NumberValue_1.NumberValue(numberString); }));
	        }
	        if (item.BS !== undefined) {
	            return new BinarySet_1.BinarySet(item.BS);
	        }
	        if (item.L !== undefined) {
	            return item.L.map(this.unmarshallValue.bind(this));
	        }
	        var _g = item.M, M = _g === void 0 ? {} : _g;
	        return Object.keys(M).reduce(function (map, key) {
	            map[key] = _this.unmarshallValue(M[key]);
	            return map;
	        }, {});
	    };
	    Marshaller.prototype.marshallComplexType = function (value) {
	        if (value === null) {
	            return { NULL: true };
	        }
	        if (NumberValue_1.NumberValue.isNumberValue(value)) {
	            return { N: value.toString() };
	        }
	        if (isBinaryValue(value)) {
	            return this.marshallBinaryValue(value);
	        }
	        if (isSet(value)) {
	            return this.marshallSet(value);
	        }
	        if (isMap(value)) {
	            return this.marshallMap(value);
	        }
	        if (isIterable(value)) {
	            return this.marshallList(value);
	        }
	        return this.marshallObject(value);
	    };
	    Marshaller.prototype.marshallBinaryValue = function (binary) {
	        if (binary.byteLength > 0 || this.onEmpty === 'leave') {
	            return { B: binary };
	        }
	        if (this.onEmpty === 'nullify') {
	            return { NULL: true };
	        }
	    };
	    Marshaller.prototype.marshallList = function (list) {
	        var e_3, _a;
	        var values = [];
	        try {
	            for (var list_1 = tslib_1.__values(list), list_1_1 = list_1.next(); !list_1_1.done; list_1_1 = list_1.next()) {
	                var value = list_1_1.value;
	                var marshalled = this.marshallValue(value);
	                if (marshalled) {
	                    values.push(marshalled);
	                }
	            }
	        }
	        catch (e_3_1) { e_3 = { error: e_3_1 }; }
	        finally {
	            try {
	                if (list_1_1 && !list_1_1.done && (_a = list_1.return)) _a.call(list_1);
	            }
	            finally { if (e_3) throw e_3.error; }
	        }
	        return { L: values };
	    };
	    Marshaller.prototype.marshallMap = function (map) {
	        var e_4, _a;
	        var members = {};
	        try {
	            for (var map_1 = tslib_1.__values(map), map_1_1 = map_1.next(); !map_1_1.done; map_1_1 = map_1.next()) {
	                var _b = tslib_1.__read(map_1_1.value, 2), key = _b[0], value = _b[1];
	                if (typeof key !== 'string') {
	                    if (this.onInvalid === 'omit') {
	                        continue;
	                    }
	                    throw new Error("MapAttributeValues must have strings as keys; " + typeof key + " received instead");
	                }
	                var marshalled = this.marshallValue(value);
	                if (marshalled) {
	                    members[key] = marshalled;
	                }
	            }
	        }
	        catch (e_4_1) { e_4 = { error: e_4_1 }; }
	        finally {
	            try {
	                if (map_1_1 && !map_1_1.done && (_a = map_1.return)) _a.call(map_1);
	            }
	            finally { if (e_4) throw e_4.error; }
	        }
	        return { M: members };
	    };
	    Marshaller.prototype.marshallObject = function (object) {
	        var _this = this;
	        return {
	            M: Object.keys(object).reduce(function (map, key) {
	                var marshalled = _this.marshallValue(object[key]);
	                if (marshalled) {
	                    map[key] = marshalled;
	                }
	                return map;
	            }, {}),
	        };
	    };
	    Marshaller.prototype.marshallSet = function (arg) {
	        switch (getSetType(arg[Symbol.iterator]().next().value)) {
	            case 'binary':
	                return this.collectSet(arg, isBinaryEmpty, 'BS', 'binary');
	            case 'number':
	                return this.collectSet(arg, isNumberEmpty, 'NS', 'number', stringifyNumber);
	            case 'string':
	                return this.collectSet(arg, isStringEmpty, 'SS', 'string');
	            case 'unknown':
	                if (this.onInvalid === 'throw') {
	                    throw new Error('Sets must be composed of strings,' +
	                        ' binary values, or numbers');
	                }
	                return undefined;
	            case 'undefined':
	                if (this.onEmpty === 'nullify') {
	                    return { NULL: true };
	                }
	        }
	    };
	    Marshaller.prototype.collectSet = function (set, isEmpty, tag, elementType, transform) {
	        var e_5, _a, _b;
	        var values = [];
	        try {
	            for (var set_1 = tslib_1.__values(set), set_1_1 = set_1.next(); !set_1_1.done; set_1_1 = set_1.next()) {
	                var element = set_1_1.value;
	                if (getSetType(element) !== elementType) {
	                    if (this.onInvalid === 'omit') {
	                        continue;
	                    }
	                    throw new Error("Unable to serialize " + typeof element + " as a member of a " + elementType + " set");
	                }
	                if (!isEmpty(element) ||
	                    this.onEmpty === 'leave') {
	                    values.push(transform ? transform(element) : element);
	                }
	            }
	        }
	        catch (e_5_1) { e_5 = { error: e_5_1 }; }
	        finally {
	            try {
	                if (set_1_1 && !set_1_1.done && (_a = set_1.return)) _a.call(set_1);
	            }
	            finally { if (e_5) throw e_5.error; }
	        }
	        if (values.length > 0 || this.onEmpty === 'leave') {
	            return _b = {}, _b[tag] = values, _b;
	        }
	        if (this.onEmpty === 'nullify') {
	            return { NULL: true };
	        }
	    };
	    Marshaller.prototype.handleEmptyString = function (value) {
	        switch (this.onEmpty) {
	            case 'leave':
	                return { S: value };
	            case 'nullify':
	                return { NULL: true };
	        }
	    };
	    return Marshaller;
	}());
	exports.Marshaller = Marshaller;
	function getSetType(arg) {
	    var type = typeof arg;
	    if (type === 'string' || type === 'number' || type === 'undefined') {
	        return type;
	    }
	    if (NumberValue_1.NumberValue.isNumberValue(arg)) {
	        return 'number';
	    }
	    if (ArrayBuffer.isView(arg) || isArrayBuffer_1.isArrayBuffer(arg)) {
	        return 'binary';
	    }
	    return 'unknown';
	}
	function isBinaryEmpty(arg) {
	    return arg.byteLength === 0;
	}
	function isBinaryValue(arg) {
	    return ArrayBuffer.isView(arg) || isArrayBuffer_1.isArrayBuffer(arg);
	}
	function isIterable(arg) {
	    return Boolean(arg) && typeof arg[Symbol.iterator] === 'function';
	}
	function isMap(arg) {
	    return Boolean(arg)
	        && Object.prototype.toString.call(arg) === '[object Map]';
	}
	function isNumberEmpty() {
	    return false;
	}
	function isSet(arg) {
	    return Boolean(arg)
	        && Object.prototype.toString.call(arg) === '[object Set]';
	}
	function isStringEmpty(arg) {
	    return arg.length === 0;
	}
	function stringifyNumber(arg) {
	    return arg.toString();
	}


/***/ }),
/* 123 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Determines if the provided argument is an ArrayBuffer object. Compatible with
	 * ArrayBuffers created in separate iframes and VMs.
	 */
	function isArrayBuffer(arg) {
	    return (typeof ArrayBuffer === 'function' && arg instanceof ArrayBuffer) ||
	        Object.prototype.toString.call(arg) === '[object ArrayBuffer]';
	}
	exports.isArrayBuffer = isArrayBuffer;


/***/ }),
/* 124 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var NUMBER_VALUE_TAG = 'DynamoDbNumberValue';
	var EXPECTED_TAG = "[object " + NUMBER_VALUE_TAG + "]";
	/**
	 * A number that may contain greater precision than can safely be stored in
	 * JavaScript's `number` data type. Numerical values are represented internally
	 * as strings (the format used by DynamoDB's JSON-based data representation
	 * schema).
	 */
	var NumberValue = /** @class */ (function () {
	    function NumberValue(value) {
	        this[Symbol.toStringTag] = NUMBER_VALUE_TAG;
	        this.value = value.toString().trim();
	    }
	    /**
	     * Convert the value to its desired JSON representation. Called by
	     * `JSON.stringify`.
	     */
	    NumberValue.prototype.toJSON = function () {
	        return this.valueOf();
	    };
	    /**
	     * Convert the value to its desired string representation. Called
	     * automatically when objects are coerced into strings.
	     */
	    NumberValue.prototype.toString = function () {
	        return this.value;
	    };
	    /**
	     * Convert the value to its desired literal representation. Called
	     * automatically when objects appear in arithmetic expressions.
	     */
	    NumberValue.prototype.valueOf = function () {
	        return Number(this.value);
	    };
	    /**
	     * Evaluate whether the provided value is a NumberValue object.
	     */
	    NumberValue.isNumberValue = function (arg) {
	        return (typeof NumberValue === 'function' && arg instanceof NumberValue)
	            || Object.prototype.toString.call(arg) === EXPECTED_TAG;
	    };
	    return NumberValue;
	}());
	exports.NumberValue = NumberValue;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var ObjectSet_1 = __webpack_require__(121);
	var NumberValue_1 = __webpack_require__(124);
	/**
	 * A set of numeric values represented internally as NumberValue objects.
	 * Equality is determined by the string representation of the number and not by
	 * the identity or data type of the provided value.
	 */
	var NumberValueSet = /** @class */ (function (_super) {
	    tslib_1.__extends(NumberValueSet, _super);
	    function NumberValueSet() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    /**
	     * @inheritDoc
	     *
	     * If a number or string is provided, it will be converted to a NumberValue
	     * object.
	     */
	    NumberValueSet.prototype.add = function (value) {
	        if (typeof value === 'number' || typeof value === 'string') {
	            value = new NumberValue_1.NumberValue(value);
	        }
	        _super.prototype.add.call(this, value);
	        return this;
	    };
	    NumberValueSet.prototype.delete = function (value) {
	        var valueString = value.toString();
	        var scrubbedValues = this._values
	            .filter(function (item) { return item.toString() !== valueString; });
	        var numRemoved = this._values.length - scrubbedValues.length;
	        this._values = scrubbedValues;
	        return numRemoved > 0;
	    };
	    NumberValueSet.prototype.has = function (value) {
	        var e_1, _a;
	        var valueString = value.toString();
	        try {
	            for (var _b = tslib_1.__values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
	                var item = _c.value;
	                if (item.toString() === valueString) {
	                    return true;
	                }
	            }
	        }
	        catch (e_1_1) { e_1 = { error: e_1_1 }; }
	        finally {
	            try {
	                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	            }
	            finally { if (e_1) throw e_1.error; }
	        }
	        return false;
	    };
	    return NumberValueSet;
	}(ObjectSet_1.ObjectSet));
	exports.NumberValueSet = NumberValueSet;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var AttributePath_1 = __webpack_require__(114);
	var MATHEMATICAL_EXPRESSION_TAG = 'AmazonDynamoDbMathematicalExpression';
	var EXPECTED_TOSTRING = "[object " + MATHEMATICAL_EXPRESSION_TAG + "]";
	/**
	 * An object representing a DynamoDB function expression.
	 */
	var MathematicalExpression = /** @class */ (function () {
	    function MathematicalExpression(lhs, operator, rhs) {
	        this.lhs = lhs;
	        this.operator = operator;
	        this.rhs = rhs;
	        this[Symbol.toStringTag] = MATHEMATICAL_EXPRESSION_TAG;
	    }
	    MathematicalExpression.prototype.serialize = function (attributes) {
	        var safeArgs = [this.lhs, this.rhs].map(function (arg) { return AttributePath_1.AttributePath.isAttributePath(arg) || typeof arg === 'string'
	            ? attributes.addName(arg)
	            : attributes.addValue(arg); });
	        return safeArgs[0] + " " + this.operator + " " + safeArgs[1];
	    };
	    /**
	     * Evaluate whether the provided value is a MathematicalExpression object.
	     */
	    MathematicalExpression.isMathematicalExpression = function (arg) {
	        return arg instanceof MathematicalExpression
	            || Object.prototype.toString.call(arg) === EXPECTED_TOSTRING;
	    };
	    return MathematicalExpression;
	}());
	exports.MathematicalExpression = MathematicalExpression;
	//# sourceMappingURL=MathematicalExpression.js.map

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	/**
	 * Convert the supplied projection expression to the string format
	 * expected by DynamoDB, substituting all attribute paths using the
	 * provided ExpressionAttributes object.
	 */
	function serializeProjectionExpression(projection, attributes) {
	    var e_1, _a;
	    var serialized = [];
	    try {
	        for (var projection_1 = tslib_1.__values(projection), projection_1_1 = projection_1.next(); !projection_1_1.done; projection_1_1 = projection_1.next()) {
	            var projected = projection_1_1.value;
	            serialized.push(attributes.addName(projected));
	        }
	    }
	    catch (e_1_1) { e_1 = { error: e_1_1 }; }
	    finally {
	        try {
	            if (projection_1_1 && !projection_1_1.done && (_a = projection_1.return)) _a.call(projection_1);
	        }
	        finally { if (e_1) throw e_1.error; }
	    }
	    return serialized.join(', ');
	}
	exports.serializeProjectionExpression = serializeProjectionExpression;
	//# sourceMappingURL=ProjectionExpression.js.map

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var AttributePath_1 = __webpack_require__(114);
	var FunctionExpression_1 = __webpack_require__(117);
	var MathematicalExpression_1 = __webpack_require__(126);
	/**
	 * An object representing a DynamoDB update expression.
	 */
	var UpdateExpression = /** @class */ (function () {
	    function UpdateExpression() {
	        this.toAdd = new Map();
	        this.toDelete = new Map();
	        this.toRemove = new Set();
	        this.toSet = new Map();
	    }
	    /**
	     * Add a directive to the expression's `add` clause.
	     */
	    UpdateExpression.prototype.add = function (path, value) {
	        this.toAdd.set(AttributePath_1.AttributePath.isAttributePath(path) ? path : new AttributePath_1.AttributePath(path), value);
	    };
	    /**
	     * Add a directive to the expression's `delete` clause.
	     */
	    UpdateExpression.prototype.delete = function (path, value) {
	        this.toDelete.set(AttributePath_1.AttributePath.isAttributePath(path) ? path : new AttributePath_1.AttributePath(path), value);
	    };
	    /**
	     * Add a directive to the expression's `remove` clause.
	     */
	    UpdateExpression.prototype.remove = function (path) {
	        this.toRemove.add(AttributePath_1.AttributePath.isAttributePath(path) ? path : new AttributePath_1.AttributePath(path));
	    };
	    /**
	     * Add a directive to the expression's `set` clause.
	     */
	    UpdateExpression.prototype.set = function (path, value) {
	        this.toSet.set(AttributePath_1.AttributePath.isAttributePath(path) ? path : new AttributePath_1.AttributePath(path), value);
	    };
	    UpdateExpression.prototype.serialize = function (attributes) {
	        var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
	        var clauses = [];
	        var phrases = [];
	        try {
	            for (var _e = tslib_1.__values([
	                [this.toAdd, 'ADD'],
	                [this.toDelete, 'DELETE'],
	            ]), _f = _e.next(); !_f.done; _f = _e.next()) {
	                var _g = tslib_1.__read(_f.value, 2), mapping = _g[0], verb = _g[1];
	                try {
	                    for (var _h = tslib_1.__values(mapping.entries()), _j = _h.next(); !_j.done; _j = _h.next()) {
	                        var _k = tslib_1.__read(_j.value, 2), key = _k[0], value = _k[1];
	                        phrases.push(attributes.addName(key) + " " + attributes.addValue(value));
	                    }
	                }
	                catch (e_2_1) { e_2 = { error: e_2_1 }; }
	                finally {
	                    try {
	                        if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
	                    }
	                    finally { if (e_2) throw e_2.error; }
	                }
	                if (phrases.length > 0) {
	                    clauses.push(verb + " " + phrases.join(', '));
	                    phrases.length = 0;
	                }
	            }
	        }
	        catch (e_1_1) { e_1 = { error: e_1_1 }; }
	        finally {
	            try {
	                if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
	            }
	            finally { if (e_1) throw e_1.error; }
	        }
	        try {
	            for (var _l = tslib_1.__values(this.toSet.entries()), _m = _l.next(); !_m.done; _m = _l.next()) {
	                var _o = tslib_1.__read(_m.value, 2), key = _o[0], value = _o[1];
	                phrases.push(attributes.addName(key) + " = " + (FunctionExpression_1.FunctionExpression.isFunctionExpression(value) || MathematicalExpression_1.MathematicalExpression.isMathematicalExpression(value)
	                    ? value.serialize(attributes) : attributes.addValue(value)));
	            }
	        }
	        catch (e_3_1) { e_3 = { error: e_3_1 }; }
	        finally {
	            try {
	                if (_m && !_m.done && (_c = _l.return)) _c.call(_l);
	            }
	            finally { if (e_3) throw e_3.error; }
	        }
	        if (phrases.length > 0) {
	            clauses.push("SET " + phrases.join(', '));
	            phrases.length = 0;
	        }
	        try {
	            for (var _p = tslib_1.__values(this.toRemove), _q = _p.next(); !_q.done; _q = _p.next()) {
	                var keyToRemove = _q.value;
	                phrases.push(attributes.addName(keyToRemove));
	            }
	        }
	        catch (e_4_1) { e_4 = { error: e_4_1 }; }
	        finally {
	            try {
	                if (_q && !_q.done && (_d = _p.return)) _d.call(_p);
	            }
	            finally { if (e_4) throw e_4.error; }
	        }
	        if (phrases.length > 0) {
	            clauses.push("REMOVE " + phrases.join(', '));
	            phrases.length = 0;
	        }
	        return clauses.join(' ');
	    };
	    return UpdateExpression;
	}());
	exports.UpdateExpression = UpdateExpression;
	//# sourceMappingURL=UpdateExpression.js.map

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var InvalidValueError_1 = __webpack_require__(108);
	var InvalidSchemaError_1 = __webpack_require__(107);
	var dynamodb_auto_marshaller_1 = __webpack_require__(119);
	var bytes = __webpack_require__(130);
	/**
	 * Converts a JavaScript object into a DynamoDB Item.
	 *
	 * @param schema Metadata explaining how the provided input is to be marshalled
	 * @param input JavaScript object to convert
	 */
	function marshallItem(schema, input) {
	    var e_1, _a;
	    var marshalled = {};
	    try {
	        for (var _b = tslib_1.__values(Object.keys(schema)), _c = _b.next(); !_c.done; _c = _b.next()) {
	            var key = _c.value;
	            var value = input[key];
	            var _d = schema[key].attributeName, attributeName = _d === void 0 ? key : _d;
	            var marshalledValue = marshallValue(schema[key], value);
	            if (marshalledValue) {
	                marshalled[attributeName] = marshalledValue;
	            }
	        }
	    }
	    catch (e_1_1) { e_1 = { error: e_1_1 }; }
	    finally {
	        try {
	            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	        }
	        finally { if (e_1) throw e_1.error; }
	    }
	    return marshalled;
	}
	exports.marshallItem = marshallItem;
	/**
	 * Converts a value into a DynamoDB AttributeValue.
	 *
	 * @param schemaType    Metadata outlining how the value is to be understood and
	 *                      converted
	 * @param input         Value to convert
	 */
	function marshallValue(schemaType, input) {
	    var e_2, _a, e_3, _b, e_4, _c, e_5, _d, e_6, _e, e_7, _f;
	    if (input === undefined) {
	        var defaultProvider = schemaType.defaultProvider;
	        if (typeof defaultProvider === 'function') {
	            input = defaultProvider();
	        }
	        else {
	            return undefined;
	        }
	    }
	    if (schemaType.type === 'Any') {
	        var _g = schemaType.onEmpty, onEmpty = _g === void 0 ? 'nullify' : _g, _h = schemaType.onInvalid, onInvalid = _h === void 0 ? 'omit' : _h, _j = schemaType.unwrapNumbers, unwrapNumbers = _j === void 0 ? false : _j;
	        var marshaller = new dynamodb_auto_marshaller_1.Marshaller({ onEmpty: onEmpty, onInvalid: onInvalid, unwrapNumbers: unwrapNumbers });
	        return marshaller.marshallValue(input);
	    }
	    if (schemaType.type === 'Binary') {
	        if (!input || input.length === 0 || input.byteLength === 0) {
	            return { NULL: true };
	        }
	        return { B: marshallBinary(input) };
	    }
	    if (schemaType.type === 'Boolean') {
	        return { BOOL: Boolean(input) };
	    }
	    if (schemaType.type === 'Custom') {
	        return schemaType.marshall(input);
	    }
	    if (schemaType.type === 'Collection') {
	        var _k = schemaType.onEmpty, onEmpty = _k === void 0 ? 'nullify' : _k, _l = schemaType.onInvalid, onInvalid = _l === void 0 ? 'omit' : _l, _m = schemaType.unwrapNumbers, unwrapNumbers = _m === void 0 ? false : _m;
	        var marshaller = new dynamodb_auto_marshaller_1.Marshaller({ onEmpty: onEmpty, onInvalid: onInvalid, unwrapNumbers: unwrapNumbers });
	        var collected = [];
	        try {
	            for (var input_1 = tslib_1.__values(input), input_1_1 = input_1.next(); !input_1_1.done; input_1_1 = input_1.next()) {
	                var element = input_1_1.value;
	                var marshalled = marshaller.marshallValue(element);
	                if (marshalled) {
	                    collected.push(marshalled);
	                }
	            }
	        }
	        catch (e_2_1) { e_2 = { error: e_2_1 }; }
	        finally {
	            try {
	                if (input_1_1 && !input_1_1.done && (_a = input_1.return)) _a.call(input_1);
	            }
	            finally { if (e_2) throw e_2.error; }
	        }
	        return { L: collected };
	    }
	    if (schemaType.type === 'Date') {
	        var date = void 0;
	        if (typeof input === 'string') {
	            date = new Date(input);
	        }
	        else if (typeof input === 'number') {
	            date = new Date(input * 1000);
	        }
	        else if (isDate(input)) {
	            date = input;
	        }
	        else {
	            throw new InvalidValueError_1.InvalidValueError(input, 'Unable to convert value to date');
	        }
	        return { N: marshallNumber(Math.floor(date.valueOf() / 1000)) };
	    }
	    if (schemaType.type === 'Document') {
	        return { M: marshallItem(schemaType.members, input) };
	    }
	    if (schemaType.type === 'Hash') {
	        var _o = schemaType.onEmpty, onEmpty = _o === void 0 ? 'nullify' : _o, _p = schemaType.onInvalid, onInvalid = _p === void 0 ? 'omit' : _p, _q = schemaType.unwrapNumbers, unwrapNumbers = _q === void 0 ? false : _q;
	        var marshaller = new dynamodb_auto_marshaller_1.Marshaller({ onEmpty: onEmpty, onInvalid: onInvalid, unwrapNumbers: unwrapNumbers });
	        return { M: marshaller.marshallItem(input) };
	    }
	    if (schemaType.type === 'List') {
	        var elements = [];
	        try {
	            for (var input_2 = tslib_1.__values(input), input_2_1 = input_2.next(); !input_2_1.done; input_2_1 = input_2.next()) {
	                var member = input_2_1.value;
	                var marshalled = marshallValue(schemaType.memberType, member);
	                if (marshalled) {
	                    elements.push(marshalled);
	                }
	            }
	        }
	        catch (e_3_1) { e_3 = { error: e_3_1 }; }
	        finally {
	            try {
	                if (input_2_1 && !input_2_1.done && (_b = input_2.return)) _b.call(input_2);
	            }
	            finally { if (e_3) throw e_3.error; }
	        }
	        return { L: elements };
	    }
	    if (schemaType.type === 'Map') {
	        var marshalled = {};
	        if (typeof input[Symbol.iterator] === 'function') {
	            try {
	                for (var input_3 = tslib_1.__values(input), input_3_1 = input_3.next(); !input_3_1.done; input_3_1 = input_3.next()) {
	                    var _r = tslib_1.__read(input_3_1.value, 2), key = _r[0], value = _r[1];
	                    var marshalledValue = marshallValue(schemaType.memberType, value);
	                    if (marshalledValue) {
	                        marshalled[key] = marshalledValue;
	                    }
	                }
	            }
	            catch (e_4_1) { e_4 = { error: e_4_1 }; }
	            finally {
	                try {
	                    if (input_3_1 && !input_3_1.done && (_c = input_3.return)) _c.call(input_3);
	                }
	                finally { if (e_4) throw e_4.error; }
	            }
	        }
	        else if (typeof input === 'object') {
	            try {
	                for (var _s = tslib_1.__values(Object.keys(input)), _t = _s.next(); !_t.done; _t = _s.next()) {
	                    var key = _t.value;
	                    var marshalledValue = marshallValue(schemaType.memberType, input[key]);
	                    if (marshalledValue) {
	                        marshalled[key] = marshalledValue;
	                    }
	                }
	            }
	            catch (e_5_1) { e_5 = { error: e_5_1 }; }
	            finally {
	                try {
	                    if (_t && !_t.done && (_d = _s.return)) _d.call(_s);
	                }
	                finally { if (e_5) throw e_5.error; }
	            }
	        }
	        else {
	            throw new InvalidValueError_1.InvalidValueError(input, 'Unable to convert value to map');
	        }
	        return { M: marshalled };
	    }
	    if (schemaType.type === 'Null') {
	        return { NULL: true };
	    }
	    if (schemaType.type === 'Number') {
	        return { N: marshallNumber(input) };
	    }
	    if (schemaType.type === 'Set') {
	        if (schemaType.memberType === 'Binary') {
	            if (!(input instanceof dynamodb_auto_marshaller_1.BinarySet)) {
	                var set = new dynamodb_auto_marshaller_1.BinarySet();
	                try {
	                    for (var input_4 = tslib_1.__values(input), input_4_1 = input_4.next(); !input_4_1.done; input_4_1 = input_4.next()) {
	                        var item = input_4_1.value;
	                        set.add(marshallBinary(item));
	                    }
	                }
	                catch (e_6_1) { e_6 = { error: e_6_1 }; }
	                finally {
	                    try {
	                        if (input_4_1 && !input_4_1.done && (_e = input_4.return)) _e.call(input_4);
	                    }
	                    finally { if (e_6) throw e_6.error; }
	                }
	                input = set;
	            }
	            return marshallSet(input, marshallBinary, function (bin) { return bin.byteLength === 0; }, 'BS');
	        }
	        if (schemaType.memberType === 'Number') {
	            if (!(input instanceof Set)) {
	                input = new dynamodb_auto_marshaller_1.NumberValueSet(input);
	            }
	            return marshallSet(input, marshallNumber, function () { return false; }, 'NS');
	        }
	        if (schemaType.memberType === 'String') {
	            if (!(input instanceof Set)) {
	                var original = input;
	                input = new Set();
	                try {
	                    for (var original_1 = tslib_1.__values(original), original_1_1 = original_1.next(); !original_1_1.done; original_1_1 = original_1.next()) {
	                        var el = original_1_1.value;
	                        input.add(el);
	                    }
	                }
	                catch (e_7_1) { e_7 = { error: e_7_1 }; }
	                finally {
	                    try {
	                        if (original_1_1 && !original_1_1.done && (_f = original_1.return)) _f.call(original_1);
	                    }
	                    finally { if (e_7) throw e_7.error; }
	                }
	            }
	            return marshallSet(input, marshallString, function (string) { return string.length === 0; }, 'SS');
	        }
	        throw new InvalidSchemaError_1.InvalidSchemaError(schemaType, "Unrecognized set member type: " + schemaType.memberType);
	    }
	    if (schemaType.type === 'String') {
	        var string = marshallString(input);
	        if (string.length === 0) {
	            return { NULL: true };
	        }
	        return { S: string };
	    }
	    if (schemaType.type === 'Tuple') {
	        return {
	            L: schemaType.members
	                .map(function (type, index) { return marshallValue(type, input[index]); })
	                .filter(function (val) { return val !== undefined; })
	        };
	    }
	    throw new InvalidSchemaError_1.InvalidSchemaError(schemaType, 'Unrecognized schema node');
	}
	exports.marshallValue = marshallValue;
	function marshallBinary(input) {
	    if (ArrayBuffer.isView(input)) {
	        return new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
	    }
	    if (isArrayBuffer(input)) {
	        return new Uint8Array(input);
	    }
	    return Uint8Array.from(bytes(input));
	}
	function marshallNumber(input) {
	    return input.toString(10);
	}
	function marshallString(input) {
	    return input.toString();
	}
	function marshallSet(value, marshaller, isEmpty, setTag) {
	    var e_8, _a, _b;
	    var collected = [];
	    try {
	        for (var value_1 = tslib_1.__values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
	            var member = value_1_1.value;
	            var marshalled = marshaller(member);
	            if (isEmpty(marshalled)) {
	                // DynamoDB sets cannot contain empty values
	                continue;
	            }
	            collected.push(marshalled);
	        }
	    }
	    catch (e_8_1) { e_8 = { error: e_8_1 }; }
	    finally {
	        try {
	            if (value_1_1 && !value_1_1.done && (_a = value_1.return)) _a.call(value_1);
	        }
	        finally { if (e_8) throw e_8.error; }
	    }
	    if (collected.length === 0) {
	        return { NULL: true };
	    }
	    return _b = {}, _b[setTag] = collected, _b;
	}
	function isArrayBuffer(arg) {
	    return typeof ArrayBuffer === 'function'
	        && (arg instanceof ArrayBuffer ||
	            Object.prototype.toString.call(arg) === '[object ArrayBuffer]');
	}
	function isDate(arg) {
	    return arg instanceof Date
	        || Object.prototype.toString.call(arg) === '[object Date]';
	}
	//# sourceMappingURL=marshallItem.js.map

/***/ }),
/* 130 */
/***/ (function(module, exports) {

	module.exports = function (str) {
	    var bytes = [];
	    for (var i = 0; i < str.length; i++) {
	        var c = str.charCodeAt(i);
	        if (c >= 0xd800 && c <= 0xdbff && i + 1 < str.length) {
	            var cn = str.charCodeAt(i + 1);
	            if (cn >= 0xdc00 && cn <= 0xdfff) {
	                var pt = (c - 0xd800) * 0x400 + cn - 0xdc00 + 0x10000;
	                
	                bytes.push(
	                    0xf0 + Math.floor(pt / 64 / 64 / 64),
	                    0x80 + Math.floor(pt / 64 / 64) % 64,
	                    0x80 + Math.floor(pt / 64) % 64,
	                    0x80 + pt % 64
	                );
	                i += 1;
	                continue;
	            }
	        }
	        if (c >= 2048) {
	            bytes.push(
	                0xe0 + Math.floor(c / 64 / 64),
	                0x80 + Math.floor(c / 64) % 64,
	                0x80 + c % 64
	            );
	        }
	        else if (c >= 128) {
	            bytes.push(0xc0 + Math.floor(c / 64), 0x80 + c % 64);
	        }
	        else bytes.push(c);
	    }
	    return bytes;
	};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var isKey_1 = __webpack_require__(109);
	var marshallItem_1 = __webpack_require__(129);
	function marshallKey(schema, input, indexName) {
	    var e_1, _a;
	    var marshalled = {};
	    try {
	        for (var _b = tslib_1.__values(Object.keys(schema)), _c = _b.next(); !_c.done; _c = _b.next()) {
	            var propertyKey = _c.value;
	            var fieldSchema = schema[propertyKey];
	            if (isKey_1.isKey(fieldSchema, indexName)) {
	                var _d = fieldSchema.attributeName, attributeName = _d === void 0 ? propertyKey : _d;
	                var value = marshallItem_1.marshallValue(fieldSchema, input[propertyKey]);
	                if (value) {
	                    marshalled[attributeName] = value;
	                }
	            }
	        }
	    }
	    catch (e_1_1) { e_1 = { error: e_1_1 }; }
	    finally {
	        try {
	            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	        }
	        finally { if (e_1) throw e_1.error; }
	    }
	    return marshalled;
	}
	exports.marshallKey = marshallKey;
	//# sourceMappingURL=marshallKey.js.map

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var SchemaType_1 = __webpack_require__(133);
	/**
	 * Evaluates whether the provided argument is a Schema object
	 */
	function isSchema(arg) {
	    var e_1, _a;
	    if (!Boolean(arg) || typeof arg !== 'object') {
	        return false;
	    }
	    try {
	        for (var _b = tslib_1.__values(Object.keys(arg)), _c = _b.next(); !_c.done; _c = _b.next()) {
	            var key = _c.value;
	            if (!SchemaType_1.isSchemaType(arg[key])) {
	                return false;
	            }
	        }
	    }
	    catch (e_1_1) { e_1 = { error: e_1_1 }; }
	    finally {
	        try {
	            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	        }
	        finally { if (e_1) throw e_1.error; }
	    }
	    return true;
	}
	exports.isSchema = isSchema;
	//# sourceMappingURL=Schema.js.map

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	/**
	 * The enumeration of types supported by this marshaller package.
	 */
	exports.TypeTags = {
	    Any: 'Any',
	    Binary: 'Binary',
	    Boolean: 'Boolean',
	    Collection: 'Collection',
	    Custom: 'Custom',
	    Date: 'Date',
	    Document: 'Document',
	    Hash: 'Hash',
	    List: 'List',
	    Map: 'Map',
	    Null: 'Null',
	    Number: 'Number',
	    Set: 'Set',
	    String: 'String',
	    Tuple: 'Tuple',
	};
	function isBaseType(arg) {
	    return Boolean(arg) && typeof arg === 'object'
	        && typeof arg.type === 'string'
	        && arg.type in exports.TypeTags
	        && ['string', 'undefined'].indexOf(typeof arg.attributeName) > -1;
	}
	/**
	 * The types of keys a given attribute can represent.
	 */
	exports.KeyTypes = {
	    HASH: 'HASH',
	    RANGE: 'RANGE',
	};
	function isKeyableType(arg) {
	    var e_1, _a;
	    var _b = arg, keyType = _b.keyType, indexKeyConfigurations = _b.indexKeyConfigurations;
	    if (!(keyType === undefined || keyType in exports.KeyTypes)) {
	        return false;
	    }
	    var idxKeysType = typeof indexKeyConfigurations;
	    if (indexKeyConfigurations && idxKeysType === 'object') {
	        try {
	            for (var _c = tslib_1.__values(Object.keys(indexKeyConfigurations)), _d = _c.next(); !_d.done; _d = _c.next()) {
	                var indexName = _d.value;
	                if (!(indexKeyConfigurations[indexName] in exports.KeyTypes)) {
	                    return false;
	                }
	            }
	        }
	        catch (e_1_1) { e_1 = { error: e_1_1 }; }
	        finally {
	            try {
	                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
	            }
	            finally { if (e_1) throw e_1.error; }
	        }
	        return true;
	    }
	    return idxKeysType === 'undefined';
	}
	function isSchemaType(arg, alreadyVisited) {
	    if (alreadyVisited === void 0) { alreadyVisited = new Set(); }
	    if (isBaseType(arg)) {
	        if (alreadyVisited.has(arg)) {
	            return true;
	        }
	        alreadyVisited.add(arg);
	        switch (arg.type) {
	            case 'Binary':
	            case 'Date':
	            case 'String':
	                return isKeyableType(arg);
	            case 'Custom':
	                return isKeyableType(arg)
	                    && typeof arg.marshall === 'function'
	                    && typeof arg.unmarshall === 'function'
	                    && [
	                        void 0,
	                        'S',
	                        'N',
	                        'B',
	                    ].indexOf(arg.attributeType) > -1;
	            case 'Document':
	                return isDocumentType(arg, alreadyVisited);
	            case 'List':
	            case 'Map':
	                return isSchemaType(arg.memberType, alreadyVisited);
	            case 'Number':
	                return isKeyableType(arg) && ['boolean', 'undefined']
	                    .indexOf(typeof arg.versionAttribute) > -1;
	            case 'Tuple':
	                return isTupleType(arg, alreadyVisited);
	            default:
	                return true;
	        }
	    }
	    return false;
	}
	exports.isSchemaType = isSchemaType;
	function isDocumentType(arg, alreadyVisited) {
	    var e_2, _a;
	    var _b = arg, valueConstructor = _b.valueConstructor, members = _b.members;
	    if (!members || typeof members !== 'object') {
	        return false;
	    }
	    try {
	        for (var _c = tslib_1.__values(Object.keys(members)), _d = _c.next(); !_d.done; _d = _c.next()) {
	            var key = _d.value;
	            if (!isSchemaType(members[key], alreadyVisited)) {
	                return false;
	            }
	        }
	    }
	    catch (e_2_1) { e_2 = { error: e_2_1 }; }
	    finally {
	        try {
	            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
	        }
	        finally { if (e_2) throw e_2.error; }
	    }
	    return ['function', 'undefined',].indexOf(typeof valueConstructor) > -1;
	}
	function isTupleType(arg, alreadyVisited) {
	    var e_3, _a;
	    var members = arg.members;
	    if (!Array.isArray(members)) {
	        return false;
	    }
	    try {
	        for (var members_1 = tslib_1.__values(members), members_1_1 = members_1.next(); !members_1_1.done; members_1_1 = members_1.next()) {
	            var member = members_1_1.value;
	            if (!isSchemaType(member, alreadyVisited)) {
	                return false;
	            }
	        }
	    }
	    catch (e_3_1) { e_3 = { error: e_3_1 }; }
	    finally {
	        try {
	            if (members_1_1 && !members_1_1.done && (_a = members_1.return)) _a.call(members_1);
	        }
	        finally { if (e_3) throw e_3.error; }
	    }
	    return true;
	}
	//# sourceMappingURL=SchemaType.js.map

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var InvalidSchemaError_1 = __webpack_require__(107);
	var dynamodb_auto_marshaller_1 = __webpack_require__(119);
	/**
	 * Unmarshall a DynamoDB item into a JavaScript value.
	 *
	 * @param schema            Metadata outlining the types to be expected
	 *                          throughout the input
	 * @param input             The value to unmarshall
	 * @param valueConstructor  A zero-argument constructor used to create the
	 *                          object onto which the input should be unmarshalled
	 */
	function unmarshallItem(schema, input, valueConstructor) {
	    var e_1, _a;
	    var unmarshalled = valueConstructor
	        ? new valueConstructor()
	        : Object.create(null);
	    try {
	        for (var _b = tslib_1.__values(Object.keys(schema)), _c = _b.next(); !_c.done; _c = _b.next()) {
	            var key = _c.value;
	            var _d = schema[key].attributeName, attributeName = _d === void 0 ? key : _d;
	            if (attributeName in input) {
	                unmarshalled[key] = unmarshallValue(schema[key], input[attributeName]);
	            }
	        }
	    }
	    catch (e_1_1) { e_1 = { error: e_1_1 }; }
	    finally {
	        try {
	            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	        }
	        finally { if (e_1) throw e_1.error; }
	    }
	    return unmarshalled;
	}
	exports.unmarshallItem = unmarshallItem;
	function unmarshallValue(schemaType, input) {
	    switch (schemaType.type) {
	        case 'Any':
	        case 'Collection':
	        case 'Hash':
	            var autoMarshaller = new dynamodb_auto_marshaller_1.Marshaller();
	            return autoMarshaller.unmarshallValue(input);
	        case 'Binary':
	            if (input.NULL) {
	                return new Uint8Array(0);
	            }
	            return input.B;
	        case 'Boolean':
	            return input.BOOL;
	        case 'Custom':
	            return schemaType.unmarshall(input);
	        case 'Date':
	            return input.N ? new Date(Number(input.N) * 1000) : undefined;
	        case 'Document':
	            return input.M
	                ? unmarshallItem(schemaType.members, input.M, schemaType.valueConstructor) : undefined;
	        case 'List':
	            return input.L ? unmarshallList(schemaType, input.L) : undefined;
	        case 'Map':
	            return input.M ? unmarshallMap(schemaType, input.M) : undefined;
	        case 'Null':
	            return input.NULL ? null : undefined;
	        case 'Number':
	            return typeof input.N === 'string' ? Number(input.N) : undefined;
	        case 'Set':
	            switch (schemaType.memberType) {
	                case 'Binary':
	                    if (input.NULL) {
	                        return new dynamodb_auto_marshaller_1.BinarySet();
	                    }
	                    return typeof input.BS !== 'undefined'
	                        ? new dynamodb_auto_marshaller_1.BinarySet(input.BS)
	                        : undefined;
	                case 'Number':
	                    if (input.NULL) {
	                        return new Set();
	                    }
	                    return input.NS ? unmarshallNumberSet(input.NS) : undefined;
	                case 'String':
	                    if (input.NULL) {
	                        return new Set();
	                    }
	                    return input.SS ? unmarshallStringSet(input.SS) : undefined;
	                default:
	                    throw new InvalidSchemaError_1.InvalidSchemaError(schemaType, "Unrecognized set member type: " + schemaType.memberType);
	            }
	        case 'String':
	            return input.NULL ? '' : input.S;
	        case 'Tuple':
	            return input.L ? unmarshallTuple(schemaType, input.L) : undefined;
	    }
	    throw new InvalidSchemaError_1.InvalidSchemaError(schemaType, 'Unrecognized schema node');
	}
	function unmarshallList(schemaType, input) {
	    var e_2, _a;
	    var list = [];
	    try {
	        for (var input_1 = tslib_1.__values(input), input_1_1 = input_1.next(); !input_1_1.done; input_1_1 = input_1.next()) {
	            var element = input_1_1.value;
	            list.push(unmarshallValue(schemaType.memberType, element));
	        }
	    }
	    catch (e_2_1) { e_2 = { error: e_2_1 }; }
	    finally {
	        try {
	            if (input_1_1 && !input_1_1.done && (_a = input_1.return)) _a.call(input_1);
	        }
	        finally { if (e_2) throw e_2.error; }
	    }
	    return list;
	}
	function unmarshallMap(schemaType, input) {
	    var e_3, _a;
	    var map = new Map();
	    try {
	        for (var _b = tslib_1.__values(Object.keys(input)), _c = _b.next(); !_c.done; _c = _b.next()) {
	            var key = _c.value;
	            map.set(key, unmarshallValue(schemaType.memberType, input[key]));
	        }
	    }
	    catch (e_3_1) { e_3 = { error: e_3_1 }; }
	    finally {
	        try {
	            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	        }
	        finally { if (e_3) throw e_3.error; }
	    }
	    return map;
	}
	function unmarshallNumberSet(input) {
	    var e_4, _a;
	    var set = new Set();
	    try {
	        for (var input_2 = tslib_1.__values(input), input_2_1 = input_2.next(); !input_2_1.done; input_2_1 = input_2.next()) {
	            var number = input_2_1.value;
	            set.add(Number(number));
	        }
	    }
	    catch (e_4_1) { e_4 = { error: e_4_1 }; }
	    finally {
	        try {
	            if (input_2_1 && !input_2_1.done && (_a = input_2.return)) _a.call(input_2);
	        }
	        finally { if (e_4) throw e_4.error; }
	    }
	    return set;
	}
	function unmarshallStringSet(input) {
	    var e_5, _a;
	    var set = new Set();
	    try {
	        for (var input_3 = tslib_1.__values(input), input_3_1 = input_3.next(); !input_3_1.done; input_3_1 = input_3.next()) {
	            var string = input_3_1.value;
	            set.add(string);
	        }
	    }
	    catch (e_5_1) { e_5 = { error: e_5_1 }; }
	    finally {
	        try {
	            if (input_3_1 && !input_3_1.done && (_a = input_3.return)) _a.call(input_3);
	        }
	        finally { if (e_5) throw e_5.error; }
	    }
	    return set;
	}
	function unmarshallTuple(schemaType, input) {
	    var members = schemaType.members;
	    var tuple = [];
	    for (var i = 0; i < members.length; i++) {
	        tuple.push(unmarshallValue(members[i], input[i]));
	    }
	    return tuple;
	}
	//# sourceMappingURL=unmarshallItem.js.map

/***/ }),
/* 135 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Table metadata is reported by items submitted to the data mapper via methods
	 * identified by symbols. This is done both to disambiguate data (which should
	 * always be identified by string keys) from metadata and also to allow an
	 * eventually integration with the First-Class Protocols proposal as described
	 * at {@link https://github.com/michaelficarra/proposal-first-class-protocols}
	 * (currently at stage 1 in the ECMAScript change acceptance process).
	 *
	 * Because the protocol proposal allows implementation to be declared
	 * dynamically at runtime (and also because TypeScript does not allow
	 * user-defined symbols to appear in type declarations), protocol adherence
	 * should be detected on objects at runtime rather than on types via static
	 * analysis.
	 */
	/**
	 * Used to designate the mapping of an object from its JavaScript form to its
	 * representation in a DynamoDB Table or nested map.
	 *
	 * @example
	 *
	 *      class FooDocument {
	 *          [DynamoDbSchema]() {
	 *              return {
	 *                  bar: {type: 'String'},
	 *                  baz: {type: 'Number'},
	 *              };
	 *          }
	 *      }
	 */
	exports.DynamoDbSchema = Symbol('DynamoDbSchema');
	function getSchema(item) {
	    if (item) {
	        var schema = item[exports.DynamoDbSchema];
	        if (schema && typeof schema === 'object') {
	            return schema;
	        }
	    }
	    throw new Error('The provided item did not adhere to the DynamoDbDocument protocol.' +
	        ' No object property was found at the `DynamoDbSchema` symbol');
	}
	exports.getSchema = getSchema;
	/**
	 * Used to designate that an object represents a row of the named DynamoDB
	 * table. Meant to be used in conjunction with {DynamoDbSchema}.
	 *
	 * @example
	 *
	 *      class FooDocument {
	 *          [DynamoDbTable]() {
	 *              return 'FooTable';
	 *          }
	 *
	 *          [DynamoDbSchema]() {
	 *              return {
	 *                  bar: {type: 'String'},
	 *                  baz: {type: 'Number'},
	 *              };
	 *          }
	 *      }
	 */
	exports.DynamoDbTable = Symbol('DynamoDbTableName');
	function getTableName(item, tableNamePrefix) {
	    if (tableNamePrefix === void 0) { tableNamePrefix = ''; }
	    if (item) {
	        var tableName = item[exports.DynamoDbTable];
	        if (typeof tableName === 'string') {
	            return tableNamePrefix + tableName;
	        }
	    }
	    throw new Error('The provided item did not adhere to the DynamoDbTable protocol. No' +
	        ' string property was found at the `DynamoDbTable` symbol');
	}
	exports.getTableName = getTableName;
	/**
	 * Used to designate which fields on an object have been changed. The method
	 * identified by this symbol should return a iterable that enumerates the fields
	 * that have been altered.
	 *
	 * @example
	 *
	 *      class FooDocument {
	 *          constructor() {
	 *              this._dirtyFields = new Set();
	 *              this._foo = '';
	 *          }
	 *
	 *          get foo() {
	 *              return this._foo;
	 *          }
	 *
	 *          set foo(value) {
	 *              this._foo = value;
	 *              this._dirtyFields.add('foo');
	 *          }
	 *
	 *          [DynamoDbDirtyFields]() {
	 *              return this._dirtyFields.values();
	 *          }
	 *      }
	 */
	exports.DynamoDbDirtyFields = Symbol('DynamoDbDirtyFields');
	//# sourceMappingURL=protocols.js.map

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var protocols_1 = __webpack_require__(135);
	var dynamodb_data_marshaller_1 = __webpack_require__(106);
	__webpack_require__(102);
	var Paginator = /** @class */ (function () {
	    function Paginator(paginator, valueConstructor) {
	        this.paginator = paginator;
	        this.valueConstructor = valueConstructor;
	        this.lastResolved = Promise.resolve();
	        this.itemSchema = protocols_1.getSchema(valueConstructor.prototype);
	    }
	    /**
	     * @inheritDoc
	     */
	    Paginator.prototype[Symbol.asyncIterator] = function () {
	        return this;
	    };
	    /**
	     * @inheritDoc
	     */
	    Paginator.prototype.next = function () {
	        var _this = this;
	        this.lastResolved = this.lastResolved.then(function () { return _this.getNext(); });
	        return this.lastResolved;
	    };
	    /**
	     * @inheritDoc
	     */
	    Paginator.prototype.return = function () {
	        // Prevent any further use of this iterator
	        this.lastResolved = Promise.reject(new Error('Iteration has been manually interrupted and may not be resumed'));
	        this.lastResolved.catch(function () { });
	        return this.paginator.return();
	    };
	    Object.defineProperty(Paginator.prototype, "consumedCapacity", {
	        /**
	         * Retrieve the reported capacity consumed by this paginator. Will be
	         * undefined unless returned consumed capacity is requested.
	         */
	        get: function () {
	            return this.paginator.consumedCapacity;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Paginator.prototype, "count", {
	        /**
	         * Retrieve the number of items yielded thus far by this paginator.
	         */
	        get: function () {
	            return this.paginator.count;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Paginator.prototype, "lastEvaluatedKey", {
	        /**
	         * Retrieve the last reported `LastEvaluatedKey`, unmarshalled according to
	         * the schema used by this paginator.
	         */
	        get: function () {
	            return this.lastKey;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Paginator.prototype, "scannedCount", {
	        /**
	         * Retrieve the number of items scanned thus far during the execution of
	         * this paginator. This number should be the same as {@link count} unless a
	         * filter expression was used.
	         */
	        get: function () {
	            return this.paginator.scannedCount;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Paginator.prototype.getNext = function () {
	        return tslib_1.__awaiter(this, void 0, void 0, function () {
	            var _this = this;
	            return tslib_1.__generator(this, function (_a) {
	                return [2 /*return*/, this.paginator.next().then(function (_a) {
	                        var _b = _a.value, value = _b === void 0 ? {} : _b, done = _a.done;
	                        if (!done) {
	                            _this.lastKey = value.LastEvaluatedKey && dynamodb_data_marshaller_1.unmarshallItem(_this.itemSchema, value.LastEvaluatedKey, _this.valueConstructor);
	                            return {
	                                value: (value.Items || []).map(function (item) { return dynamodb_data_marshaller_1.unmarshallItem(_this.itemSchema, item, _this.valueConstructor); }),
	                                done: false
	                            };
	                        }
	                        return { done: true };
	                    })];
	            });
	        });
	    };
	    return Paginator;
	}());
	exports.Paginator = Paginator;
	//# sourceMappingURL=Paginator.js.map

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	tslib_1.__exportStar(__webpack_require__(138), exports);
	tslib_1.__exportStar(__webpack_require__(140), exports);
	tslib_1.__exportStar(__webpack_require__(144), exports);
	tslib_1.__exportStar(__webpack_require__(145), exports);
	tslib_1.__exportStar(__webpack_require__(146), exports);
	tslib_1.__exportStar(__webpack_require__(142), exports);
	//# sourceMappingURL=index.js.map

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var ItemIterator_1 = __webpack_require__(139);
	var ParallelScanPaginator_1 = __webpack_require__(140);
	var ParallelScanIterator = /** @class */ (function (_super) {
	    tslib_1.__extends(ParallelScanIterator, _super);
	    function ParallelScanIterator(client, input, scanState) {
	        return _super.call(this, new ParallelScanPaginator_1.ParallelScanPaginator(client, input, scanState)) || this;
	    }
	    return ParallelScanIterator;
	}(ItemIterator_1.ItemIterator));
	exports.ParallelScanIterator = ParallelScanIterator;
	//# sourceMappingURL=ParallelScanIterator.js.map

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	if (Symbol && !Symbol.asyncIterator) {
	    Symbol.asyncIterator = Symbol.for("__@@asyncIterator__");
	}
	var ItemIterator = /** @class */ (function () {
	    function ItemIterator(paginator) {
	        this.paginator = paginator;
	        this._iteratedCount = 0;
	        this.lastResolved = Promise.resolve();
	        this.pending = [];
	    }
	    /**
	     * @inheritDoc
	     */
	    ItemIterator.prototype[Symbol.asyncIterator] = function () {
	        return this;
	    };
	    Object.defineProperty(ItemIterator.prototype, "consumedCapacity", {
	        /**
	         * The capacity units consumed by the Scan operation. The data returned
	         * includes the total provisioned throughput consumed, along with statistics
	         * for the table and any indexes involved in the operation. ConsumedCapacity
	         * is only returned if the ReturnConsumedCapacity parameter was specified.
	         */
	        get: function () {
	            return this.paginator.consumedCapacity;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ItemIterator.prototype, "count", {
	        /**
	         * The number of items that have been iterated over.
	         */
	        get: function () {
	            return this._iteratedCount;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * @inheritDoc
	     */
	    ItemIterator.prototype.next = function () {
	        var _this = this;
	        this.lastResolved = this.lastResolved.then(function () { return _this.getNext(); });
	        return this.lastResolved;
	    };
	    /**
	     * Detaches the underlying paginator from this iterator and returns it. The
	     * paginator will yield arrays of unmarshalled items, with each yielded
	     * array corresponding to a single call to the underlying API. As with the
	     * underlying API, pages may contain a variable number of items or no items,
	     * in which case an empty array will be yielded.
	     *
	     * Calling this method will disable further iteration.
	     */
	    ItemIterator.prototype.pages = function () {
	        // Prevent the iterator from being used further and squelch any uncaught
	        // promise rejection warnings
	        this.lastResolved = Promise.reject(new Error('The underlying paginator has been detached from this iterator.'));
	        this.lastResolved.catch(function () { });
	        return this.paginator;
	    };
	    /**
	     * @inheritDoc
	     */
	    ItemIterator.prototype.return = function () {
	        // Prevent any further use of this iterator
	        this.lastResolved = Promise.reject(new Error('Iteration has been manually interrupted and may not be resumed'));
	        this.lastResolved.catch(function () { });
	        // Clear the pending queue to free up memory
	        this.pending.length = 0;
	        return this.paginator.return().then(doneSigil);
	    };
	    Object.defineProperty(ItemIterator.prototype, "scannedCount", {
	        /**
	         * The number of items evaluated, before any ScanFilter is applied. A high
	         * scannedCount value with few, or no, Count results indicates an
	         * inefficient Scan operation. For more information, see Count and
	         * ScannedCount in the Amazon DynamoDB Developer Guide.
	         */
	        get: function () {
	            return this.paginator.scannedCount;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ItemIterator.prototype.getNext = function () {
	        var _this = this;
	        if (this.pending.length > 0) {
	            this._iteratedCount++;
	            return Promise.resolve({
	                value: this.pending.shift(),
	                done: false
	            });
	        }
	        return this.paginator.next().then(function (_a) {
	            var done = _a.done, value = _a.value;
	            var _b;
	            if (done) {
	                return { done: done };
	            }
	            (_b = _this.pending).push.apply(_b, tslib_1.__spread(value.Items || []));
	            return _this.getNext();
	        });
	    };
	    return ItemIterator;
	}());
	exports.ItemIterator = ItemIterator;
	function doneSigil() {
	    return { done: true };
	}
	//# sourceMappingURL=ItemIterator.js.map

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var mergeConsumedCapacities_1 = __webpack_require__(141);
	var ScanPaginator_1 = __webpack_require__(142);
	if (Symbol && !Symbol.asyncIterator) {
	    Symbol.asyncIterator = Symbol.for("__@@asyncIterator__");
	}
	var ParallelScanPaginator = /** @class */ (function () {
	    function ParallelScanPaginator(client, input, scanState) {
	        if (scanState === void 0) { scanState = nullScanState(input.TotalSegments); }
	        this.pending = [];
	        this.lastResolved = Promise.resolve();
	        var TotalSegments = input.TotalSegments;
	        if (scanState.length !== TotalSegments) {
	            throw new Error("Parallel scan state must have a length equal to the number of "
	                + ("scan segments. Expected an array of " + TotalSegments + " but")
	                + ("received an array with " + scanState.length + " elements."));
	        }
	        this.iterators = new Array(TotalSegments);
	        for (var i = 0; i < TotalSegments; i++) {
	            var iterator = new ScanPaginator_1.ScanPaginator(client, tslib_1.__assign({}, input, { Segment: i, ExclusiveStartKey: scanState[i].LastEvaluatedKey }));
	            this.iterators[i] = iterator;
	            // If the segment has not been initialized or a pagination token has
	            // been received, request the next page.
	            if (!scanState[i].initialized || scanState[i].LastEvaluatedKey) {
	                this.refillPending(iterator, i);
	            }
	        }
	        this._scanState = tslib_1.__spread(scanState);
	    }
	    /**
	     * @inheritDoc
	     */
	    ParallelScanPaginator.prototype[Symbol.asyncIterator] = function () {
	        return this;
	    };
	    Object.defineProperty(ParallelScanPaginator.prototype, "consumedCapacity", {
	        /**
	         * @inheritDoc
	         */
	        get: function () {
	            return this.iterators.reduce(function (merged, paginator) { return mergeConsumedCapacities_1.mergeConsumedCapacities(merged, paginator.consumedCapacity); }, undefined);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ParallelScanPaginator.prototype, "count", {
	        /**
	         * @inheritDoc
	         */
	        get: function () {
	            return this.iterators.reduce(function (sum, paginator) { return sum + paginator.count; }, 0);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * @inheritDoc
	     */
	    ParallelScanPaginator.prototype.next = function () {
	        var _this = this;
	        this.lastResolved = this.lastResolved.then(function () { return _this.getNext(); });
	        return this.lastResolved;
	    };
	    ParallelScanPaginator.prototype.getNext = function () {
	        return tslib_1.__awaiter(this, void 0, void 0, function () {
	            var _a, iterator, _b, value, done, segment, i;
	            return tslib_1.__generator(this, function (_c) {
	                switch (_c.label) {
	                    case 0:
	                        if (this.pending.length === 0) {
	                            return [2 /*return*/, doneSigil()];
	                        }
	                        return [4 /*yield*/, Promise.race(this.pending.map(function (pending) { return pending.result; }))];
	                    case 1:
	                        _a = _c.sent(), iterator = _a.iterator, _b = _a.result, value = _b.value, done = _b.done, segment = _a.segment;
	                        // Update the scan state for this segment. This will either be the last
	                        // evaluated key (for an unfinished segment) or undefined (for a
	                        // completed segment).
	                        this._scanState[segment] = {
	                            initialized: true,
	                            LastEvaluatedKey: value && value.LastEvaluatedKey,
	                        };
	                        // Remove the result from the pending set.
	                        for (i = this.pending.length - 1; i >= 0; i--) {
	                            if (this.pending[i].iterator === iterator) {
	                                this.pending.splice(i, 1);
	                            }
	                        }
	                        // If the iterator is not finished, add its next result to the pending
	                        // set.
	                        if (!done) {
	                            this.refillPending(iterator, segment);
	                            return [2 /*return*/, { value: value, done: done }];
	                        }
	                        else {
	                            // If a segment has finished but there are still outstanding
	                            // requests, recur. A done sigil will be returned when the pending
	                            // queue is empty.
	                            return [2 /*return*/, this.getNext()];
	                        }
	                        return [2 /*return*/];
	                }
	            });
	        });
	    };
	    /**
	     * @inheritDoc
	     */
	    ParallelScanPaginator.prototype.return = function () {
	        return tslib_1.__awaiter(this, void 0, void 0, function () {
	            return tslib_1.__generator(this, function (_a) {
	                this.pending.length = 0;
	                return [2 /*return*/, Promise.all(this.iterators.map(function (iterator) { return iterator.return(); }))
	                        .then(doneSigil)];
	            });
	        });
	    };
	    Object.defineProperty(ParallelScanPaginator.prototype, "scannedCount", {
	        /**
	         * @inheritDoc
	         */
	        get: function () {
	            return this.iterators.reduce(function (sum, paginator) { return sum + paginator.scannedCount; }, 0);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ParallelScanPaginator.prototype, "scanState", {
	        /**
	         * A snapshot of the current state of a parallel scan. May be used to resume
	         * a parallel scan with a separate paginator.
	         */
	        get: function () {
	            return tslib_1.__spread(this._scanState);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ParallelScanPaginator.prototype.refillPending = function (iterator, segment) {
	        // Use .push to reorder segments within the array of pending results.
	        // Promise.race will iterate over the array of pending results until a
	        // resolved promise is found and therefore will naturally favor promises
	        // towards the head of the queue. Removing resolved segments and sending
	        // them to the back of the line will keep this implementation detail
	        // from creating hot and cold scan segments.
	        this.pending.push({
	            iterator: iterator,
	            result: iterator.next()
	                .then(function (result) { return ({ iterator: iterator, result: result, segment: segment }); }),
	        });
	    };
	    return ParallelScanPaginator;
	}());
	exports.ParallelScanPaginator = ParallelScanPaginator;
	function doneSigil() {
	    return { done: true };
	}
	/**
	 * `Array.prototype.fill` is not available in IE, so a loop is used instead
	 */
	function nullScanState(length) {
	    var target = new Array(length);
	    for (var i = 0; i < length; i++) {
	        target[i] = { initialized: false };
	    }
	    return target;
	}
	//# sourceMappingURL=ParallelScanPaginator.js.map

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	/**
	 * @internal
	 */
	function mergeConsumedCapacities(a, b) {
	    if (a || b) {
	        a = a || {};
	        b = b || {};
	        if ((a.TableName && b.TableName) && a.TableName !== b.TableName) {
	            throw new Error('Consumed capacity reports may only be merged if they describe the same table');
	        }
	        return {
	            TableName: a.TableName || b.TableName,
	            CapacityUnits: (a.CapacityUnits || 0) + (b.CapacityUnits || 0),
	            Table: mergeCapacities(a.Table, b.Table),
	            LocalSecondaryIndexes: mergeCapacityMaps(a.LocalSecondaryIndexes, b.LocalSecondaryIndexes),
	            GlobalSecondaryIndexes: mergeCapacityMaps(a.GlobalSecondaryIndexes, b.GlobalSecondaryIndexes),
	        };
	    }
	}
	exports.mergeConsumedCapacities = mergeConsumedCapacities;
	function mergeCapacities(a, b) {
	    if (a || b) {
	        return {
	            CapacityUnits: ((a && a.CapacityUnits) || 0) +
	                ((b && b.CapacityUnits) || 0),
	        };
	    }
	}
	function mergeCapacityMaps(a, b) {
	    var e_1, _a, e_2, _b, e_3, _c;
	    if (a || b) {
	        var out = {};
	        a = a || {};
	        b = b || {};
	        var keys = new Set();
	        try {
	            for (var _d = tslib_1.__values([a, b]), _e = _d.next(); !_e.done; _e = _d.next()) {
	                var map = _e.value;
	                try {
	                    for (var _f = tslib_1.__values(Object.keys(map)), _g = _f.next(); !_g.done; _g = _f.next()) {
	                        var indexName = _g.value;
	                        keys.add(indexName);
	                    }
	                }
	                catch (e_2_1) { e_2 = { error: e_2_1 }; }
	                finally {
	                    try {
	                        if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
	                    }
	                    finally { if (e_2) throw e_2.error; }
	                }
	            }
	        }
	        catch (e_1_1) { e_1 = { error: e_1_1 }; }
	        finally {
	            try {
	                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
	            }
	            finally { if (e_1) throw e_1.error; }
	        }
	        try {
	            for (var keys_1 = tslib_1.__values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
	                var key = keys_1_1.value;
	                out[key] = mergeCapacities(a[key], b[key]);
	            }
	        }
	        catch (e_3_1) { e_3 = { error: e_3_1 }; }
	        finally {
	            try {
	                if (keys_1_1 && !keys_1_1.done && (_c = keys_1.return)) _c.call(keys_1);
	            }
	            finally { if (e_3) throw e_3.error; }
	        }
	        return out;
	    }
	}
	//# sourceMappingURL=mergeConsumedCapacities.js.map

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var DynamoDbPaginator_1 = __webpack_require__(143);
	var ScanPaginator = /** @class */ (function (_super) {
	    tslib_1.__extends(ScanPaginator, _super);
	    function ScanPaginator(client, input, limit) {
	        var _this = _super.call(this, limit) || this;
	        _this.client = client;
	        _this.nextRequest = tslib_1.__assign({}, input, { Limit: _this.getNextPageSize(input.Limit) });
	        return _this;
	    }
	    ScanPaginator.prototype.getNext = function () {
	        var _this = this;
	        if (this.nextRequest) {
	            return this.client.scan(tslib_1.__assign({}, this.nextRequest, { Limit: this.getNextPageSize(this.nextRequest.Limit) }))
	                .promise()
	                .then(function (output) {
	                if (_this.nextRequest && output.LastEvaluatedKey) {
	                    _this.nextRequest = tslib_1.__assign({}, _this.nextRequest, { ExclusiveStartKey: output.LastEvaluatedKey });
	                }
	                else {
	                    _this.nextRequest = undefined;
	                }
	                return Promise.resolve({
	                    value: output,
	                    done: false
	                });
	            });
	        }
	        return Promise.resolve({ done: true });
	    };
	    return ScanPaginator;
	}(DynamoDbPaginator_1.DynamoDbPaginator));
	exports.ScanPaginator = ScanPaginator;
	//# sourceMappingURL=ScanPaginator.js.map

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var mergeConsumedCapacities_1 = __webpack_require__(141);
	if (Symbol && !Symbol.asyncIterator) {
	    Symbol.asyncIterator = Symbol.for("__@@asyncIterator__");
	}
	var DynamoDbPaginator = /** @class */ (function () {
	    function DynamoDbPaginator(limit) {
	        this.limit = limit;
	        this._count = 0;
	        this._scannedCount = 0;
	        this.lastResolved = Promise.resolve();
	    }
	    /**
	     * @inheritDoc
	     */
	    DynamoDbPaginator.prototype[Symbol.asyncIterator] = function () {
	        return this;
	    };
	    Object.defineProperty(DynamoDbPaginator.prototype, "consumedCapacity", {
	        /**
	         * @inheritDoc
	         */
	        get: function () {
	            return this._consumedCapacity;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DynamoDbPaginator.prototype, "count", {
	        /**
	         * @inheritDoc
	         */
	        get: function () {
	            return this._count;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DynamoDbPaginator.prototype, "lastEvaluatedKey", {
	        /**
	         * Get the LastEvaluatedKey of the last result page yielded by this
	         * paginator or undefined if the scan has already been exhausted.
	         */
	        get: function () {
	            return this._lastKey;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * @inheritDoc
	     */
	    DynamoDbPaginator.prototype.next = function () {
	        var _this = this;
	        this.lastResolved = this.lastResolved.then(function () {
	            if (_this.count >= (_this.limit === undefined ? Infinity : _this.limit)) {
	                return { done: true };
	            }
	            return _this.getNext().then(function (_a) {
	                var done = _a.done, value = _a.value;
	                if (value && !done) {
	                    _this._lastKey = value.LastEvaluatedKey;
	                    _this._count += (value.Items || []).length;
	                    _this._scannedCount += (value.ScannedCount || 0);
	                    _this._consumedCapacity = mergeConsumedCapacities_1.mergeConsumedCapacities(_this._consumedCapacity, value.ConsumedCapacity);
	                }
	                return { value: value, done: done };
	            });
	        });
	        return this.lastResolved;
	    };
	    /**
	     * @inheritDoc
	     */
	    DynamoDbPaginator.prototype.return = function () {
	        // Prevent any further use of this iterator
	        this.lastResolved = Promise.reject(new Error('Iteration has been manually interrupted and may not be resumed'));
	        this.lastResolved.catch(function () { });
	        return Promise.resolve({ done: true });
	    };
	    Object.defineProperty(DynamoDbPaginator.prototype, "scannedCount", {
	        /**
	         * @inheritDoc
	         */
	        get: function () {
	            return this._scannedCount;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    DynamoDbPaginator.prototype.getNextPageSize = function (requestedPageSize) {
	        if (this.limit === undefined) {
	            return requestedPageSize;
	        }
	        return Math.min(requestedPageSize === undefined ? Infinity : requestedPageSize, this.limit - this.count);
	    };
	    return DynamoDbPaginator;
	}());
	exports.DynamoDbPaginator = DynamoDbPaginator;
	//# sourceMappingURL=DynamoDbPaginator.js.map

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var ItemIterator_1 = __webpack_require__(139);
	var QueryPaginator_1 = __webpack_require__(145);
	var QueryIterator = /** @class */ (function (_super) {
	    tslib_1.__extends(QueryIterator, _super);
	    function QueryIterator(client, input, limit) {
	        return _super.call(this, new QueryPaginator_1.QueryPaginator(client, input, limit)) || this;
	    }
	    return QueryIterator;
	}(ItemIterator_1.ItemIterator));
	exports.QueryIterator = QueryIterator;
	//# sourceMappingURL=QueryIterator.js.map

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var DynamoDbPaginator_1 = __webpack_require__(143);
	var QueryPaginator = /** @class */ (function (_super) {
	    tslib_1.__extends(QueryPaginator, _super);
	    function QueryPaginator(client, input, limit) {
	        var _this = _super.call(this, limit) || this;
	        _this.client = client;
	        _this.nextRequest = tslib_1.__assign({}, input);
	        return _this;
	    }
	    QueryPaginator.prototype.getNext = function () {
	        var _this = this;
	        if (this.nextRequest) {
	            return this.client.query(tslib_1.__assign({}, this.nextRequest, { Limit: this.getNextPageSize(this.nextRequest.Limit) }))
	                .promise()
	                .then(function (output) {
	                if (_this.nextRequest && output.LastEvaluatedKey) {
	                    _this.nextRequest = tslib_1.__assign({}, _this.nextRequest, { ExclusiveStartKey: output.LastEvaluatedKey });
	                }
	                else {
	                    _this.nextRequest = undefined;
	                }
	                return Promise.resolve({
	                    value: output,
	                    done: false
	                });
	            });
	        }
	        return Promise.resolve({ done: true });
	    };
	    return QueryPaginator;
	}(DynamoDbPaginator_1.DynamoDbPaginator));
	exports.QueryPaginator = QueryPaginator;
	//# sourceMappingURL=QueryPaginator.js.map

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var ItemIterator_1 = __webpack_require__(139);
	var ScanPaginator_1 = __webpack_require__(142);
	var ScanIterator = /** @class */ (function (_super) {
	    tslib_1.__extends(ScanIterator, _super);
	    function ScanIterator(client, input, limit) {
	        return _super.call(this, new ScanPaginator_1.ScanPaginator(client, input, limit)) || this;
	    }
	    return ScanIterator;
	}(ItemIterator_1.ItemIterator));
	exports.ScanIterator = ScanIterator;
	//# sourceMappingURL=ScanIterator.js.map

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var Iterator_1 = __webpack_require__(101);
	var QueryPaginator_1 = __webpack_require__(148);
	/**
	 * Iterates over each item returned by a DynamoDB query until no more pages are
	 * available.
	 */
	var QueryIterator = /** @class */ (function (_super) {
	    tslib_1.__extends(QueryIterator, _super);
	    function QueryIterator(client, valueConstructor, keyCondition, options) {
	        return _super.call(this, new QueryPaginator_1.QueryPaginator(client, valueConstructor, keyCondition, options)) || this;
	    }
	    return QueryIterator;
	}(Iterator_1.Iterator));
	exports.QueryIterator = QueryIterator;
	//# sourceMappingURL=QueryIterator.js.map

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var marshallStartKey_1 = __webpack_require__(105);
	var Paginator_1 = __webpack_require__(136);
	var protocols_1 = __webpack_require__(135);
	var dynamodb_query_iterator_1 = __webpack_require__(137);
	var dynamodb_data_marshaller_1 = __webpack_require__(106);
	var dynamodb_expressions_1 = __webpack_require__(113);
	/**
	 * Iterates over each page of items returned by a DynamoDB query until no more
	 * pages are available.
	 */
	var QueryPaginator = /** @class */ (function (_super) {
	    tslib_1.__extends(QueryPaginator, _super);
	    function QueryPaginator(client, valueConstructor, keyCondition, options) {
	        if (options === void 0) { options = {}; }
	        var _this = this;
	        var itemSchema = protocols_1.getSchema(valueConstructor.prototype);
	        var filter = options.filter, indexName = options.indexName, limit = options.limit, pageSize = options.pageSize, projection = options.projection, readConsistency = options.readConsistency, scanIndexForward = options.scanIndexForward, startKey = options.startKey, prefix = options.tableNamePrefix;
	        var req = {
	            TableName: protocols_1.getTableName(valueConstructor.prototype, prefix),
	            ScanIndexForward: scanIndexForward,
	            Limit: pageSize,
	            IndexName: indexName,
	        };
	        if (readConsistency === 'strong') {
	            req.ConsistentRead = true;
	        }
	        var attributes = new dynamodb_expressions_1.ExpressionAttributes();
	        req.KeyConditionExpression = dynamodb_data_marshaller_1.marshallConditionExpression(normalizeKeyCondition(keyCondition), itemSchema, attributes).expression;
	        if (filter) {
	            req.FilterExpression = dynamodb_data_marshaller_1.marshallConditionExpression(filter, itemSchema, attributes).expression;
	        }
	        if (projection) {
	            req.ProjectionExpression = dynamodb_data_marshaller_1.marshallProjectionExpression(projection, itemSchema, attributes).expression;
	        }
	        if (Object.keys(attributes.names).length > 0) {
	            req.ExpressionAttributeNames = attributes.names;
	        }
	        if (Object.keys(attributes.values).length > 0) {
	            req.ExpressionAttributeValues = attributes.values;
	        }
	        if (startKey) {
	            req.ExclusiveStartKey = marshallStartKey_1.marshallStartKey(itemSchema, startKey);
	        }
	        _this = _super.call(this, new dynamodb_query_iterator_1.QueryPaginator(client, req, limit), valueConstructor) || this;
	        return _this;
	    }
	    return QueryPaginator;
	}(Paginator_1.Paginator));
	exports.QueryPaginator = QueryPaginator;
	function normalizeKeyCondition(keyCondition) {
	    var e_1, _a;
	    if (dynamodb_expressions_1.isConditionExpression(keyCondition)) {
	        return keyCondition;
	    }
	    var conditions = [];
	    try {
	        for (var _b = tslib_1.__values(Object.keys(keyCondition)), _c = _b.next(); !_c.done; _c = _b.next()) {
	            var property = _c.value;
	            var predicate = keyCondition[property];
	            if (dynamodb_expressions_1.isConditionExpressionPredicate(predicate)) {
	                conditions.push(tslib_1.__assign({}, predicate, { subject: property }));
	            }
	            else {
	                conditions.push({
	                    type: 'Equals',
	                    subject: property,
	                    object: predicate,
	                });
	            }
	        }
	    }
	    catch (e_1_1) { e_1 = { error: e_1_1 }; }
	    finally {
	        try {
	            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	        }
	        finally { if (e_1) throw e_1.error; }
	    }
	    if (conditions.length === 1) {
	        return conditions[0];
	    }
	    return { type: 'And', conditions: conditions };
	}
	//# sourceMappingURL=QueryPaginator.js.map

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var Iterator_1 = __webpack_require__(101);
	var ScanPaginator_1 = __webpack_require__(150);
	/**
	 * Iterates over each item returned by a DynamoDB scan until no more pages are
	 * available.
	 */
	var ScanIterator = /** @class */ (function (_super) {
	    tslib_1.__extends(ScanIterator, _super);
	    function ScanIterator(client, valueConstructor, options) {
	        return _super.call(this, new ScanPaginator_1.ScanPaginator(client, valueConstructor, options)) || this;
	    }
	    return ScanIterator;
	}(Iterator_1.Iterator));
	exports.ScanIterator = ScanIterator;
	//# sourceMappingURL=ScanIterator.js.map

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var buildScanInput_1 = __webpack_require__(104);
	var Paginator_1 = __webpack_require__(136);
	var dynamodb_query_iterator_1 = __webpack_require__(137);
	/**
	 * Iterates over each page of items returned by a DynamoDB scan until no more
	 * pages are available.
	 */
	var ScanPaginator = /** @class */ (function (_super) {
	    tslib_1.__extends(ScanPaginator, _super);
	    function ScanPaginator(client, itemConstructor, options) {
	        if (options === void 0) { options = {}; }
	        return _super.call(this, new dynamodb_query_iterator_1.ScanPaginator(client, buildScanInput_1.buildScanInput(itemConstructor, options), options.limit), itemConstructor) || this;
	    }
	    return ScanPaginator;
	}(Paginator_1.Paginator));
	exports.ScanPaginator = ScanPaginator;
	//# sourceMappingURL=ScanPaginator.js.map

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	tslib_1.__exportStar(__webpack_require__(152), exports);
	tslib_1.__exportStar(__webpack_require__(154), exports);
	//# sourceMappingURL=index.js.map

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var BatchOperation_1 = __webpack_require__(153);
	exports.MAX_READ_BATCH_SIZE = 100;
	/**
	 * Retrieves items from DynamoDB in batches of 100 or fewer via one or more
	 * BatchGetItem operations. The items may be from any number of tables.
	 *
	 * This method will automatically retry any get requests returned by DynamoDB as
	 * unprocessed. Exponential backoff on unprocessed items is employed on a
	 * per-table basis.
	 */
	var BatchGet = /** @class */ (function (_super) {
	    tslib_1.__extends(BatchGet, _super);
	    /**
	     * @param client    The AWS SDK client with which to communicate with
	     *                  DynamoDB.
	     * @param items     A synchronous or asynchronous iterable of tuples
	     *                  describing the reads to execute. The first member of the
	     *                  tuple should be the name of the table from which to
	     *                  read, and the second should be the marshalled key.
	     * @param options   Additional options to apply to the operations executed.
	     */
	    function BatchGet(client, items, _a) {
	        var _b = _a === void 0 ? {} : _a, ConsistentRead = _b.ConsistentRead, _c = _b.PerTableOptions, PerTableOptions = _c === void 0 ? {} : _c;
	        var _this = _super.call(this, client, items) || this;
	        _this.batchSize = exports.MAX_READ_BATCH_SIZE;
	        _this.consistentRead = ConsistentRead;
	        _this.options = PerTableOptions;
	        return _this;
	    }
	    BatchGet.prototype.doBatchRequest = function () {
	        return tslib_1.__awaiter(this, void 0, void 0, function () {
	            var e_1, _a, e_2, _b, e_3, _c, operationInput, batchSize, _d, tableName, item, _e, projection, consistentRead, attributeNames, _f, _g, Responses, _h, UnprocessedKeys, unprocessedTables, _j, _k, table, _l, _m, table, tableData, _o, _p, item;
	            return tslib_1.__generator(this, function (_q) {
	                switch (_q.label) {
	                    case 0:
	                        operationInput = { RequestItems: {} };
	                        batchSize = 0;
	                        while (this.toSend.length > 0) {
	                            _d = tslib_1.__read(this.toSend.shift(), 2), tableName = _d[0], item = _d[1];
	                            if (operationInput.RequestItems[tableName] === undefined) {
	                                _e = this.state[tableName], projection = _e.projection, consistentRead = _e.consistentRead, attributeNames = _e.attributeNames;
	                                operationInput.RequestItems[tableName] = {
	                                    Keys: [],
	                                    ConsistentRead: consistentRead,
	                                    ProjectionExpression: projection,
	                                    ExpressionAttributeNames: attributeNames,
	                                };
	                            }
	                            operationInput.RequestItems[tableName].Keys.push(item);
	                            if (++batchSize === this.batchSize) {
	                                break;
	                            }
	                        }
	                        return [4 /*yield*/, this.client.batchGetItem(operationInput).promise()];
	                    case 1:
	                        _f = _q.sent(), _g = _f.Responses, Responses = _g === void 0 ? {} : _g, _h = _f.UnprocessedKeys, UnprocessedKeys = _h === void 0 ? {} : _h;
	                        unprocessedTables = new Set();
	                        try {
	                            for (_j = tslib_1.__values(Object.keys(UnprocessedKeys)), _k = _j.next(); !_k.done; _k = _j.next()) {
	                                table = _k.value;
	                                unprocessedTables.add(table);
	                                this.handleThrottled(table, UnprocessedKeys[table].Keys);
	                            }
	                        }
	                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
	                        finally {
	                            try {
	                                if (_k && !_k.done && (_a = _j.return)) _a.call(_j);
	                            }
	                            finally { if (e_1) throw e_1.error; }
	                        }
	                        this.movePendingToThrottled(unprocessedTables);
	                        try {
	                            for (_l = tslib_1.__values(Object.keys(Responses)), _m = _l.next(); !_m.done; _m = _l.next()) {
	                                table = _m.value;
	                                tableData = this.state[table];
	                                tableData.backoffFactor = Math.max(0, tableData.backoffFactor - 1);
	                                try {
	                                    for (_o = tslib_1.__values(Responses[table]), _p = _o.next(); !_p.done; _p = _o.next()) {
	                                        item = _p.value;
	                                        this.pending.push([table, item]);
	                                    }
	                                }
	                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
	                                finally {
	                                    try {
	                                        if (_p && !_p.done && (_c = _o.return)) _c.call(_o);
	                                    }
	                                    finally { if (e_3) throw e_3.error; }
	                                }
	                            }
	                        }
	                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
	                        finally {
	                            try {
	                                if (_m && !_m.done && (_b = _l.return)) _b.call(_l);
	                            }
	                            finally { if (e_2) throw e_2.error; }
	                        }
	                        return [2 /*return*/];
	                }
	            });
	        });
	    };
	    BatchGet.prototype.getInitialTableState = function (tableName) {
	        var _a = this.options[tableName] || {}, ExpressionAttributeNames = _a.ExpressionAttributeNames, ProjectionExpression = _a.ProjectionExpression, _b = _a.ConsistentRead, ConsistentRead = _b === void 0 ? this.consistentRead : _b;
	        return tslib_1.__assign({}, _super.prototype.getInitialTableState.call(this, tableName), { attributeNames: ExpressionAttributeNames, projection: ProjectionExpression, consistentRead: ConsistentRead });
	    };
	    return BatchGet;
	}(BatchOperation_1.BatchOperation));
	exports.BatchGet = BatchGet;
	//# sourceMappingURL=BatchGet.js.map

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	if (Symbol && !Symbol.asyncIterator) {
	    Symbol.asyncIterator = Symbol.for("__@@asyncIterator__");
	}
	var BatchOperation = /** @class */ (function () {
	    /**
	     * @param client    The AWS SDK client with which to communicate with
	     *                  DynamoDB.
	     * @param items     A synchronous or asynchronous iterable of tuples
	     *                  describing the operations to execute. The first member
	     *                  of the tuple should be the name of the table targeted by
	     *                  the operation.
	     */
	    function BatchOperation(client, items) {
	        this.client = client;
	        /**
	         * Items that have been retrieved and are ready to be returned.
	         */
	        this.pending = [];
	        /**
	         * A mapping of table names to table-specific operation state (e.g., the
	         * number of throttling events experienced, etc.)
	         */
	        this.state = {};
	        /**
	         * Input elements that are prepared for immediate dispatch
	         */
	        this.toSend = [];
	        this.throttled = new Set();
	        this.sourceDone = false;
	        if (isIterable(items)) {
	            this.iterator = items[Symbol.iterator]();
	        }
	        else {
	            this.iterator = items[Symbol.asyncIterator]();
	        }
	        this.sourceNext = this.iterator.next();
	    }
	    BatchOperation.prototype.next = function () {
	        var _this = this;
	        if (this.lastResolved) {
	            this.lastResolved = this.lastResolved.then(function () { return _this.getNext(); });
	        }
	        else {
	            this.lastResolved = this.getNext();
	        }
	        return this.lastResolved;
	    };
	    BatchOperation.prototype[Symbol.asyncIterator] = function () {
	        return this;
	    };
	    /**
	     * Create and return the initial state object for a given DynamoDB table.
	     *
	     * @param tableName The name of the table whose initial state should be
	     *                  returned.
	     */
	    BatchOperation.prototype.getInitialTableState = function (tableName) {
	        return {
	            backoffFactor: 0,
	            name: tableName,
	        };
	    };
	    /**
	     * Accept an array of unprocessed items belonging to a single table and
	     * re-enqueue it for submission, making sure the appropriate level of
	     * backoff is applied to future operations on the same table.
	     *
	     * @param tableName     The table to which the unprocessed elements belong.
	     * @param unprocessed   Elements returned by DynamoDB as not yet processed.
	     *                      The elements should not be unmarshalled, but they
	     *                      should be reverted to the form used for elements
	     *                      that have not yet been sent.
	     */
	    BatchOperation.prototype.handleThrottled = function (tableName, unprocessed) {
	        var tableState = this.state[tableName];
	        tableState.backoffFactor++;
	        if (tableState.tableThrottling) {
	            this.throttled.delete(tableState.tableThrottling.backoffWaiter);
	            unprocessed.unshift.apply(unprocessed, tslib_1.__spread(tableState.tableThrottling.unprocessed));
	        }
	        tableState.tableThrottling = {
	            unprocessed: unprocessed,
	            backoffWaiter: new Promise(function (resolve) {
	                setTimeout(resolve, exponentialBackoff(tableState.backoffFactor), tableState);
	            })
	        };
	        this.throttled.add(tableState.tableThrottling.backoffWaiter);
	    };
	    /**
	     * Iterate over all pending writes and move those targeting throttled tables
	     * into the throttled queue.
	     *
	     * @param unprocessedTables     A set of tables for which some items were
	     *                              returned without being processed.
	     */
	    BatchOperation.prototype.movePendingToThrottled = function (unprocessedTables) {
	        for (var i = this.toSend.length - 1; i > -1; i--) {
	            var _a = tslib_1.__read(this.toSend[i], 2), table = _a[0], attributes = _a[1];
	            if (unprocessedTables.has(table)) {
	                this.state[table]
	                    .tableThrottling.unprocessed.push(attributes);
	                this.toSend.splice(i, 1);
	            }
	        }
	    };
	    BatchOperation.prototype.addToSendQueue = function (_a) {
	        var _b = tslib_1.__read(_a, 2), tableName = _b[0], attributes = _b[1];
	        if (!this.state[tableName]) {
	            this.state[tableName] = this.getInitialTableState(tableName);
	        }
	        var tableState = this.state[tableName];
	        if (tableState.tableThrottling) {
	            tableState.tableThrottling.unprocessed.push(attributes);
	        }
	        else {
	            this.toSend.push([tableName, attributes]);
	        }
	    };
	    BatchOperation.prototype.enqueueThrottled = function (table) {
	        var _a;
	        var _b = table.tableThrottling, backoffWaiter = _b.backoffWaiter, unprocessed = _b.unprocessed;
	        if (unprocessed.length > 0) {
	            (_a = this.toSend).push.apply(_a, tslib_1.__spread(unprocessed.map(function (attr) { return [table.name, attr]; })));
	        }
	        this.throttled.delete(backoffWaiter);
	        delete table.tableThrottling;
	    };
	    BatchOperation.prototype.getNext = function () {
	        return tslib_1.__awaiter(this, void 0, void 0, function () {
	            return tslib_1.__generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        if (this.sourceDone &&
	                            this.pending.length === 0 &&
	                            this.toSend.length === 0 &&
	                            this.throttled.size === 0) {
	                            return [2 /*return*/, { done: true }];
	                        }
	                        if (this.pending.length > 0) {
	                            return [2 /*return*/, {
	                                    done: false,
	                                    value: this.pending.shift()
	                                }];
	                        }
	                        return [4 /*yield*/, this.refillPending()];
	                    case 1:
	                        _a.sent();
	                        return [2 /*return*/, this.getNext()];
	                }
	            });
	        });
	    };
	    BatchOperation.prototype.refillPending = function () {
	        return tslib_1.__awaiter(this, void 0, void 0, function () {
	            var toProcess, _a, _b;
	            return tslib_1.__generator(this, function (_c) {
	                switch (_c.label) {
	                    case 0:
	                        if (!(!this.sourceDone &&
	                            this.toSend.length < this.batchSize)) return [3 /*break*/, 4];
	                        if (!isIteratorResult(this.sourceNext)) return [3 /*break*/, 1];
	                        _a = this.sourceNext;
	                        return [3 /*break*/, 3];
	                    case 1: return [4 /*yield*/, Promise.race([
	                            this.sourceNext,
	                            Promise.race(this.throttled)
	                        ])];
	                    case 2:
	                        _a = _c.sent();
	                        _c.label = 3;
	                    case 3:
	                        toProcess = _a;
	                        if (isIteratorResult(toProcess)) {
	                            this.sourceDone = toProcess.done;
	                            if (!this.sourceDone) {
	                                this.addToSendQueue(toProcess.value);
	                                this.sourceNext = this.iterator.next();
	                            }
	                        }
	                        else {
	                            this.enqueueThrottled(toProcess);
	                        }
	                        return [3 /*break*/, 0];
	                    case 4:
	                        if (!(this.toSend.length < this.batchSize && this.throttled.size > 0)) return [3 /*break*/, 6];
	                        _b = this.enqueueThrottled;
	                        return [4 /*yield*/, Promise.race(this.throttled)];
	                    case 5:
	                        _b.apply(this, [_c.sent()]);
	                        return [3 /*break*/, 4];
	                    case 6:
	                        if (!(this.toSend.length > 0)) return [3 /*break*/, 8];
	                        return [4 /*yield*/, this.doBatchRequest()];
	                    case 7:
	                        _c.sent();
	                        _c.label = 8;
	                    case 8: return [2 /*return*/];
	                }
	            });
	        });
	    };
	    return BatchOperation;
	}());
	exports.BatchOperation = BatchOperation;
	function exponentialBackoff(attempts) {
	    return Math.floor(Math.random() * Math.pow(2, attempts));
	}
	function isIterable(arg) {
	    return Boolean(arg) && typeof arg[Symbol.iterator] === 'function';
	}
	function isIteratorResult(arg) {
	    return Boolean(arg) && typeof arg.done === 'boolean';
	}
	//# sourceMappingURL=BatchOperation.js.map

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var BatchOperation_1 = __webpack_require__(153);
	var itemIdentifier_1 = __webpack_require__(155);
	exports.MAX_WRITE_BATCH_SIZE = 25;
	/**
	 * Puts or deletes items from DynamoDB in batches of 25 or fewer via one or more
	 * BatchWriteItem operations. The items may belong to any number of tables.
	 *
	 * The iterable of writes to perform may be synchronous or asynchronous and is
	 * expected to yield tuples describing the writes to be performed. The first
	 * member should be the table name, and the second should be {WriteRequest}
	 * object that defines either a put request or a delete request.
	 *
	 * This method will automatically retry any write requests returned by DynamoDB
	 * as unprocessed. Exponential backoff on unprocessed items is employed on a
	 * per-table basis.
	 */
	var BatchWrite = /** @class */ (function (_super) {
	    tslib_1.__extends(BatchWrite, _super);
	    function BatchWrite() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.batchSize = exports.MAX_WRITE_BATCH_SIZE;
	        return _this;
	    }
	    BatchWrite.prototype.doBatchRequest = function () {
	        return tslib_1.__awaiter(this, void 0, void 0, function () {
	            var e_1, _a, e_2, _b, e_3, _c, e_4, _d, inFlight, operationInput, batchSize, _e, tableName, marshalled, _f, UnprocessedItems, unprocessedTables, _g, _h, table, unprocessed, _j, _k, item, identifier, i, _l, tableName, attributes, processedTables, inFlight_1, inFlight_1_1, _m, tableName, marshalled, processedTables_1, processedTables_1_1, tableName;
	            return tslib_1.__generator(this, function (_o) {
	                switch (_o.label) {
	                    case 0:
	                        inFlight = [];
	                        operationInput = { RequestItems: {} };
	                        batchSize = 0;
	                        while (this.toSend.length > 0) {
	                            _e = tslib_1.__read(this.toSend.shift(), 2), tableName = _e[0], marshalled = _e[1];
	                            inFlight.push([tableName, marshalled]);
	                            if (operationInput.RequestItems[tableName] === undefined) {
	                                operationInput.RequestItems[tableName] = [];
	                            }
	                            operationInput.RequestItems[tableName].push(marshalled);
	                            if (++batchSize === this.batchSize) {
	                                break;
	                            }
	                        }
	                        return [4 /*yield*/, this.client.batchWriteItem(operationInput).promise()];
	                    case 1:
	                        _f = (_o.sent()).UnprocessedItems, UnprocessedItems = _f === void 0 ? {} : _f;
	                        unprocessedTables = new Set();
	                        try {
	                            for (_g = tslib_1.__values(Object.keys(UnprocessedItems)), _h = _g.next(); !_h.done; _h = _g.next()) {
	                                table = _h.value;
	                                unprocessedTables.add(table);
	                                unprocessed = [];
	                                try {
	                                    for (_j = tslib_1.__values(UnprocessedItems[table]), _k = _j.next(); !_k.done; _k = _j.next()) {
	                                        item = _k.value;
	                                        if (item.DeleteRequest || item.PutRequest) {
	                                            unprocessed.push(item);
	                                            identifier = itemIdentifier_1.itemIdentifier(table, item);
	                                            for (i = inFlight.length - 1; i >= 0; i--) {
	                                                _l = tslib_1.__read(inFlight[i], 2), tableName = _l[0], attributes = _l[1];
	                                                if (tableName === table &&
	                                                    itemIdentifier_1.itemIdentifier(tableName, attributes) === identifier) {
	                                                    inFlight.splice(i, 1);
	                                                }
	                                            }
	                                        }
	                                    }
	                                }
	                                catch (e_2_1) { e_2 = { error: e_2_1 }; }
	                                finally {
	                                    try {
	                                        if (_k && !_k.done && (_b = _j.return)) _b.call(_j);
	                                    }
	                                    finally { if (e_2) throw e_2.error; }
	                                }
	                                this.handleThrottled(table, unprocessed);
	                            }
	                        }
	                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
	                        finally {
	                            try {
	                                if (_h && !_h.done && (_a = _g.return)) _a.call(_g);
	                            }
	                            finally { if (e_1) throw e_1.error; }
	                        }
	                        this.movePendingToThrottled(unprocessedTables);
	                        processedTables = new Set();
	                        try {
	                            for (inFlight_1 = tslib_1.__values(inFlight), inFlight_1_1 = inFlight_1.next(); !inFlight_1_1.done; inFlight_1_1 = inFlight_1.next()) {
	                                _m = tslib_1.__read(inFlight_1_1.value, 2), tableName = _m[0], marshalled = _m[1];
	                                processedTables.add(tableName);
	                                this.pending.push([tableName, marshalled]);
	                            }
	                        }
	                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
	                        finally {
	                            try {
	                                if (inFlight_1_1 && !inFlight_1_1.done && (_c = inFlight_1.return)) _c.call(inFlight_1);
	                            }
	                            finally { if (e_3) throw e_3.error; }
	                        }
	                        try {
	                            for (processedTables_1 = tslib_1.__values(processedTables), processedTables_1_1 = processedTables_1.next(); !processedTables_1_1.done; processedTables_1_1 = processedTables_1.next()) {
	                                tableName = processedTables_1_1.value;
	                                this.state[tableName].backoffFactor =
	                                    Math.max(0, this.state[tableName].backoffFactor - 1);
	                            }
	                        }
	                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
	                        finally {
	                            try {
	                                if (processedTables_1_1 && !processedTables_1_1.done && (_d = processedTables_1.return)) _d.call(processedTables_1);
	                            }
	                            finally { if (e_4) throw e_4.error; }
	                        }
	                        return [2 /*return*/];
	                }
	            });
	        });
	    };
	    return BatchWrite;
	}(BatchOperation_1.BatchOperation));
	exports.BatchWrite = BatchWrite;
	//# sourceMappingURL=BatchWrite.js.map

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(96);
	var bytes = __webpack_require__(130);
	/**
	 * @internal
	 */
	function itemIdentifier(tableName, _a) {
	    var DeleteRequest = _a.DeleteRequest, PutRequest = _a.PutRequest;
	    if (DeleteRequest) {
	        return tableName + "::delete::" + serializeKeyTypeAttributes(DeleteRequest.Key);
	    }
	    else if (PutRequest) {
	        return tableName + "::put::" + serializeKeyTypeAttributes(PutRequest.Item);
	    }
	    throw new Error("Invalid write request provided");
	}
	exports.itemIdentifier = itemIdentifier;
	function serializeKeyTypeAttributes(attributes) {
	    var e_1, _a;
	    var keyTypeProperties = [];
	    try {
	        for (var _b = tslib_1.__values(Object.keys(attributes).sort()), _c = _b.next(); !_c.done; _c = _b.next()) {
	            var property = _c.value;
	            var attribute = attributes[property];
	            if (attribute.B) {
	                keyTypeProperties.push(property + "=" + toByteArray(attribute.B));
	            }
	            else if (attribute.N) {
	                keyTypeProperties.push(property + "=" + attribute.N);
	            }
	            else if (attribute.S) {
	                keyTypeProperties.push(property + "=" + attribute.S);
	            }
	        }
	    }
	    catch (e_1_1) { e_1 = { error: e_1_1 }; }
	    finally {
	        try {
	            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	        }
	        finally { if (e_1) throw e_1.error; }
	    }
	    return keyTypeProperties.join('&');
	}
	function toByteArray(value) {
	    if (ArrayBuffer.isView(value)) {
	        return new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
	    }
	    if (typeof value === 'string') {
	        return Uint8Array.from(bytes(value));
	    }
	    if (isArrayBuffer(value)) {
	        return new Uint8Array(value);
	    }
	    throw new Error('Unrecognized binary type');
	}
	function isArrayBuffer(arg) {
	    return (typeof ArrayBuffer === 'function' && arg instanceof ArrayBuffer) ||
	        Object.prototype.toString.call(arg) === '[object ArrayBuffer]';
	}
	//# sourceMappingURL=itemIdentifier.js.map

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var protocols_1 = __webpack_require__(135);
	function embed(documentConstructor, _a) {
	    var _b = _a === void 0 ? {} : _a, attributeName = _b.attributeName, defaultProvider = _b.defaultProvider;
	    return {
	        type: 'Document',
	        members: documentConstructor.prototype[protocols_1.DynamoDbSchema] || {},
	        attributeName: attributeName,
	        defaultProvider: defaultProvider,
	        valueConstructor: documentConstructor
	    };
	}
	exports.embed = embed;
	//# sourceMappingURL=embed.js.map

/***/ }),
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */
/***/ (function(module, exports) {

	module.exports = require("util");

/***/ }),
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */
/***/ (function(module, exports) {

	module.exports = require("crypto");

/***/ }),
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */
/***/ (function(module, exports) {

	module.exports = require("path");

/***/ }),
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DynamoDBORMError = undefined;

	var _extends2 = __webpack_require__(2);

	var _extends3 = _interopRequireDefault(_extends2);

	var _classCallCheck2 = __webpack_require__(42);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(306);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(323);

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
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(307);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(308);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(311);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(309), __esModule: true };

/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(53);
	__webpack_require__(76);
	module.exports = __webpack_require__(310).f('iterator');


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(63);


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(312), __esModule: true };

/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(313);
	__webpack_require__(75);
	__webpack_require__(321);
	__webpack_require__(322);
	module.exports = __webpack_require__(8).Symbol;


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global = __webpack_require__(7);
	var has = __webpack_require__(21);
	var DESCRIPTORS = __webpack_require__(16);
	var $export = __webpack_require__(6);
	var redefine = __webpack_require__(56);
	var META = __webpack_require__(314).KEY;
	var $fails = __webpack_require__(17);
	var shared = __webpack_require__(34);
	var setToStringTag = __webpack_require__(62);
	var uid = __webpack_require__(36);
	var wks = __webpack_require__(63);
	var wksExt = __webpack_require__(310);
	var wksDefine = __webpack_require__(315);
	var enumKeys = __webpack_require__(316);
	var isArray = __webpack_require__(317);
	var anObject = __webpack_require__(13);
	var isObject = __webpack_require__(14);
	var toIObject = __webpack_require__(25);
	var toPrimitive = __webpack_require__(19);
	var createDesc = __webpack_require__(20);
	var _create = __webpack_require__(59);
	var gOPNExt = __webpack_require__(318);
	var $GOPD = __webpack_require__(320);
	var $DP = __webpack_require__(12);
	var $keys = __webpack_require__(23);
	var gOPD = $GOPD.f;
	var dP = $DP.f;
	var gOPN = gOPNExt.f;
	var $Symbol = global.Symbol;
	var $JSON = global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE = 'prototype';
	var HIDDEN = wks('_hidden');
	var TO_PRIMITIVE = wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = shared('symbol-registry');
	var AllSymbols = shared('symbols');
	var OPSymbols = shared('op-symbols');
	var ObjectProto = Object[PROTOTYPE];
	var USE_NATIVE = typeof $Symbol == 'function';
	var QObject = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function () {
	  return _create(dP({}, 'a', {
	    get: function () { return dP(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  dP(it, key, D);
	  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if (has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _create(D, { enumerable: createDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject(it);
	  key = toPrimitive(key, true);
	  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
	  var D = gOPD(it, key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN(toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto;
	  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto) $set.call(OPSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f = $defineProperty;
	  __webpack_require__(319).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(39).f = $propertyIsEnumerable;
	  __webpack_require__(38).f = $getOwnPropertySymbols;

	  if (DESCRIPTORS && !__webpack_require__(35)) {
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function (name) {
	    return wrap(wks(name));
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

	for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

	var META = __webpack_require__(36)('meta');
	var isObject = __webpack_require__(14);
	var has = __webpack_require__(21);
	var setDesc = __webpack_require__(12).f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !__webpack_require__(17)(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(7);
	var core = __webpack_require__(8);
	var LIBRARY = __webpack_require__(35);
	var wksExt = __webpack_require__(310);
	var defineProperty = __webpack_require__(12).f;
	module.exports = function (name) {
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(23);
	var gOPS = __webpack_require__(38);
	var pIE = __webpack_require__(39);
	module.exports = function (it) {
	  var result = getKeys(it);
	  var getSymbols = gOPS.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = pIE.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(27);
	module.exports = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(25);
	var gOPN = __webpack_require__(319).f;
	var toString = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys = __webpack_require__(24);
	var hiddenKeys = __webpack_require__(37).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

	var pIE = __webpack_require__(39);
	var createDesc = __webpack_require__(20);
	var toIObject = __webpack_require__(25);
	var toPrimitive = __webpack_require__(19);
	var has = __webpack_require__(21);
	var IE8_DOM_DEFINE = __webpack_require__(15);
	var gOPD = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(16) ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	};


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(315)('asyncIterator');


/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(315)('observable');


/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(324);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(328);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(307);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(325), __esModule: true };

/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(326);
	module.exports = __webpack_require__(8).Object.setPrototypeOf;


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(6);
	$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(327).set });


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(14);
	var anObject = __webpack_require__(13);
	var check = function (O, proto) {
	  anObject(O);
	  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = __webpack_require__(9)(Function.call, __webpack_require__(320).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(329), __esModule: true };

/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(330);
	var $Object = __webpack_require__(8).Object;
	module.exports = function create(P, D) {
	  return $Object.create(P, D);
	};


/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(6);
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', { create: __webpack_require__(59) });


/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DomainError = undefined;

	var _extends2 = __webpack_require__(2);

	var _extends3 = _interopRequireDefault(_extends2);

	var _classCallCheck2 = __webpack_require__(42);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(306);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(323);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _DynamoDBORMError2 = __webpack_require__(305);

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
/* 332 */,
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(44);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.parseFields = exports.Model = undefined;

	var _classCallCheck2 = __webpack_require__(42);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _dynamodbDataMapper = __webpack_require__(95);

	var _joi = __webpack_require__(335);

	var _joi2 = _interopRequireDefault(_joi);

	var _applyValueObjectSchema = __webpack_require__(362);

	var _applyValueObjectSchema2 = _interopRequireDefault(_applyValueObjectSchema);

	var _applyAggregationRootSchema = __webpack_require__(363);

	var _applyAggregationRootSchema2 = _interopRequireDefault(_applyAggregationRootSchema);

	var _applyCommonMethods = __webpack_require__(364);

	var _applyCommonMethods2 = _interopRequireDefault(_applyCommonMethods);

	var _buildAggregationRootModels = __webpack_require__(377);

	var _buildAggregationRootModels2 = _interopRequireDefault(_buildAggregationRootModels);

	var _parseFields = __webpack_require__(378);

	var _commonSchema = __webpack_require__(379);

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
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// Load modules

	const Hoek = __webpack_require__(336);
	const Any = __webpack_require__(338);
	const Cast = __webpack_require__(343);
	const Errors = __webpack_require__(340);
	const Lazy = __webpack_require__(358);
	const Ref = __webpack_require__(339);


	// Declare internals

	const internals = {
	    alternatives: __webpack_require__(354),
	    array: __webpack_require__(359),
	    boolean: __webpack_require__(353),
	    binary: __webpack_require__(360),
	    date: __webpack_require__(344),
	    number: __webpack_require__(352),
	    object: __webpack_require__(355),
	    string: __webpack_require__(345)
	};


	internals.root = function () {

	    const any = new Any();

	    const root = any.clone();
	    root.any = function () {

	        Hoek.assert(arguments.length === 0, 'Joi.any() does not allow arguments.');

	        return any;
	    };

	    root.alternatives = root.alt = function () {

	        return arguments.length ? internals.alternatives.try.apply(internals.alternatives, arguments) : internals.alternatives;
	    };

	    root.array = function () {

	        Hoek.assert(arguments.length === 0, 'Joi.array() does not allow arguments.');

	        return internals.array;
	    };

	    root.boolean = root.bool = function () {

	        Hoek.assert(arguments.length === 0, 'Joi.boolean() does not allow arguments.');

	        return internals.boolean;
	    };

	    root.binary = function () {

	        Hoek.assert(arguments.length === 0, 'Joi.binary() does not allow arguments.');

	        return internals.binary;
	    };

	    root.date = function () {

	        Hoek.assert(arguments.length === 0, 'Joi.date() does not allow arguments.');

	        return internals.date;
	    };

	    root.func = function () {

	        Hoek.assert(arguments.length === 0, 'Joi.func() does not allow arguments.');

	        return internals.object._func();
	    };

	    root.number = function () {

	        Hoek.assert(arguments.length === 0, 'Joi.number() does not allow arguments.');

	        return internals.number;
	    };

	    root.object = function () {

	        return arguments.length ? internals.object.keys.apply(internals.object, arguments) : internals.object;
	    };

	    root.string = function () {

	        Hoek.assert(arguments.length === 0, 'Joi.string() does not allow arguments.');

	        return internals.string;
	    };

	    root.ref = function () {

	        return Ref.create.apply(null, arguments);
	    };

	    root.isRef = function (ref) {

	        return Ref.isRef(ref);
	    };

	    root.validate = function (value /*, [schema], [options], callback */) {

	        const last = arguments[arguments.length - 1];
	        const callback = typeof last === 'function' ? last : null;

	        const count = arguments.length - (callback ? 1 : 0);
	        if (count === 1) {
	            return any.validate(value, callback);
	        }

	        const options = count === 3 ? arguments[2] : {};
	        const schema = root.compile(arguments[1]);

	        return schema._validateWithOptions(value, options, callback);
	    };

	    root.describe = function () {

	        const schema = arguments.length ? root.compile(arguments[0]) : any;
	        return schema.describe();
	    };

	    root.compile = function (schema) {

	        try {
	            return Cast.schema(schema);
	        }
	        catch (err) {
	            if (err.hasOwnProperty('path')) {
	                err.message = err.message + '(' + err.path + ')';
	            }
	            throw err;
	        }
	    };

	    root.assert = function (value, schema, message) {

	        root.attempt(value, schema, message);
	    };

	    root.attempt = function (value, schema, message) {

	        const result = root.validate(value, schema);
	        const error = result.error;
	        if (error) {
	            if (!message) {
	                if (typeof error.annotate === 'function') {
	                    error.message = error.annotate();
	                }
	                throw error;
	            }

	            if (!(message instanceof Error)) {
	                if (typeof error.annotate === 'function') {
	                    error.message = `${message} ${error.annotate()}`;
	                }
	                throw error;
	            }

	            throw message;
	        }

	        return result.value;
	    };

	    root.reach = function (schema, path) {

	        Hoek.assert(schema && schema instanceof Any, 'you must provide a joi schema');
	        Hoek.assert(typeof path === 'string', 'path must be a string');

	        if (path === '') {
	            return schema;
	        }

	        const parts = path.split('.');
	        const children = schema._inner.children;
	        if (!children) {
	            return;
	        }

	        const key = parts[0];
	        for (let i = 0; i < children.length; ++i) {
	            const child = children[i];
	            if (child.key === key) {
	                return this.reach(child.schema, path.substr(key.length + 1));
	            }
	        }
	    };

	    root.lazy = function (fn) {

	        return Lazy.set(fn);
	    };

	    root.extend = function () {

	        const extensions = Hoek.flatten(Array.prototype.slice.call(arguments));
	        Hoek.assert(extensions.length > 0, 'You need to provide at least one extension');

	        this.assert(extensions, root.extensionsSchema);

	        const joi = Object.create(this.any());
	        Object.assign(joi, this);

	        for (let i = 0; i < extensions.length; ++i) {
	            let extension = extensions[i];

	            if (typeof extension === 'function') {
	                extension = extension(joi);
	            }

	            this.assert(extension, root.extensionSchema);

	            const base = (extension.base || this.any()).clone(); // Cloning because we're going to override language afterwards
	            const ctor = base.constructor;
	            const type = class extends ctor { // eslint-disable-line no-loop-func

	                constructor() {

	                    super();
	                    if (extension.base) {
	                        Object.assign(this, base);
	                    }

	                    this._type = extension.name;

	                    if (extension.language) {
	                        this._settings = this._settings || { language: {} };
	                        this._settings.language = Hoek.applyToDefaults(this._settings.language, {
	                            [extension.name]: extension.language
	                        });
	                    }
	                }

	            };

	            if (extension.coerce) {
	                type.prototype._coerce = function (value, state, options) {

	                    if (ctor.prototype._coerce) {
	                        const baseRet = ctor.prototype._coerce.call(this, value, state, options);

	                        if (baseRet.errors) {
	                            return baseRet;
	                        }

	                        value = baseRet.value;
	                    }

	                    const ret = extension.coerce.call(this, value, state, options);
	                    if (ret instanceof Errors.Err) {
	                        return { value, errors: ret };
	                    }

	                    return { value: ret };
	                };
	            }
	            if (extension.pre) {
	                type.prototype._base = function (value, state, options) {

	                    if (ctor.prototype._base) {
	                        const baseRet = ctor.prototype._base.call(this, value, state, options);

	                        if (baseRet.errors) {
	                            return baseRet;
	                        }

	                        value = baseRet.value;
	                    }

	                    const ret = extension.pre.call(this, value, state, options);
	                    if (ret instanceof Errors.Err) {
	                        return { value, errors: ret };
	                    }

	                    return { value: ret };
	                };
	            }

	            if (extension.rules) {
	                for (let j = 0; j < extension.rules.length; ++j) {
	                    const rule = extension.rules[j];
	                    const ruleArgs = rule.params ?
	                        (rule.params instanceof Any ? rule.params._inner.children.map((k) => k.key) : Object.keys(rule.params)) :
	                        [];
	                    const validateArgs = rule.params ? Cast.schema(rule.params) : null;

	                    type.prototype[rule.name] = function () { // eslint-disable-line no-loop-func

	                        if (arguments.length > ruleArgs.length) {
	                            throw new Error('Unexpected number of arguments');
	                        }

	                        const args = Array.prototype.slice.call(arguments);
	                        let hasRef = false;
	                        let arg = {};

	                        for (let k = 0; k < ruleArgs.length; ++k) {
	                            arg[ruleArgs[k]] = args[k];
	                            if (!hasRef && Ref.isRef(args[k])) {
	                                hasRef = true;
	                            }
	                        }

	                        if (validateArgs) {
	                            arg = joi.attempt(arg, validateArgs);
	                        }

	                        let schema;
	                        if (rule.validate) {
	                            const validate = function (value, state, options) {

	                                return rule.validate.call(this, arg, value, state, options);
	                            };

	                            schema = this._test(rule.name, arg, validate, {
	                                description: rule.description,
	                                hasRef
	                            });
	                        }
	                        else {
	                            schema = this.clone();
	                        }

	                        if (rule.setup) {
	                            rule.setup.call(schema, arg);
	                        }

	                        return schema;
	                    };
	                }
	            }

	            if (extension.describe) {
	                type.prototype.describe = function () {

	                    const description = ctor.prototype.describe.call(this);
	                    return extension.describe.call(this, description);
	                };
	            }

	            const instance = new type();
	            joi[extension.name] = function () {

	                return instance;
	            };
	        }

	        return joi;
	    };

	    root.extensionSchema = internals.object.keys({
	        base: internals.object.type(Any, 'Joi object'),
	        name: internals.string.required(),
	        coerce: internals.object._func().arity(3),
	        pre: internals.object._func().arity(3),
	        language: internals.object,
	        describe: internals.object._func().arity(1),
	        rules: internals.array.items(internals.object.keys({
	            name: internals.string.required(),
	            setup: internals.object._func().arity(1),
	            validate: internals.object._func().arity(4),
	            params: [
	                internals.object.pattern(/.*/, internals.object.type(Any, 'Joi object')),
	                internals.object.type(internals.object.constructor, 'Joi object')
	            ],
	            description: [internals.string, internals.object._func().arity(1)]
	        }).or('setup', 'validate'))
	    }).strict();

	    root.extensionsSchema = internals.array.items([internals.object, internals.object._func().arity(1)]).strict();

	    root.version = __webpack_require__(361).version;

	    return root;
	};


	module.exports = internals.root();


/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// Load modules

	const Crypto = __webpack_require__(210);
	const Path = __webpack_require__(236);
	const Util = __webpack_require__(190);
	const Escape = __webpack_require__(337);


	// Declare internals

	const internals = {};


	// Clone object or array

	exports.clone = function (obj, seen) {

	    if (typeof obj !== 'object' ||
	        obj === null) {

	        return obj;
	    }

	    seen = seen || new Map();

	    const lookup = seen.get(obj);
	    if (lookup) {
	        return lookup;
	    }

	    let newObj;
	    let cloneDeep = false;

	    if (!Array.isArray(obj)) {
	        if (Buffer.isBuffer(obj)) {
	            newObj = new Buffer(obj);
	        }
	        else if (obj instanceof Date) {
	            newObj = new Date(obj.getTime());
	        }
	        else if (obj instanceof RegExp) {
	            newObj = new RegExp(obj);
	        }
	        else {
	            const proto = Object.getPrototypeOf(obj);
	            if (proto &&
	                proto.isImmutable) {

	                newObj = obj;
	            }
	            else {
	                newObj = Object.create(proto);
	                cloneDeep = true;
	            }
	        }
	    }
	    else {
	        newObj = [];
	        cloneDeep = true;
	    }

	    seen.set(obj, newObj);

	    if (cloneDeep) {
	        const keys = Object.getOwnPropertyNames(obj);
	        for (let i = 0; i < keys.length; ++i) {
	            const key = keys[i];
	            const descriptor = Object.getOwnPropertyDescriptor(obj, key);
	            if (descriptor &&
	                (descriptor.get ||
	                 descriptor.set)) {

	                Object.defineProperty(newObj, key, descriptor);
	            }
	            else {
	                newObj[key] = exports.clone(obj[key], seen);
	            }
	        }
	    }

	    return newObj;
	};


	// Merge all the properties of source into target, source wins in conflict, and by default null and undefined from source are applied

	/*eslint-disable */
	exports.merge = function (target, source, isNullOverride /* = true */, isMergeArrays /* = true */) {
	/*eslint-enable */

	    exports.assert(target && typeof target === 'object', 'Invalid target value: must be an object');
	    exports.assert(source === null || source === undefined || typeof source === 'object', 'Invalid source value: must be null, undefined, or an object');

	    if (!source) {
	        return target;
	    }

	    if (Array.isArray(source)) {
	        exports.assert(Array.isArray(target), 'Cannot merge array onto an object');
	        if (isMergeArrays === false) {                                                  // isMergeArrays defaults to true
	            target.length = 0;                                                          // Must not change target assignment
	        }

	        for (let i = 0; i < source.length; ++i) {
	            target.push(exports.clone(source[i]));
	        }

	        return target;
	    }

	    const keys = Object.keys(source);
	    for (let i = 0; i < keys.length; ++i) {
	        const key = keys[i];
	        if (key === '__proto__') {
	            continue;
	        }

	        const value = source[key];
	        if (value &&
	            typeof value === 'object') {

	            if (!target[key] ||
	                typeof target[key] !== 'object' ||
	                (Array.isArray(target[key]) !== Array.isArray(value)) ||
	                value instanceof Date ||
	                Buffer.isBuffer(value) ||
	                value instanceof RegExp) {

	                target[key] = exports.clone(value);
	            }
	            else {
	                exports.merge(target[key], value, isNullOverride, isMergeArrays);
	            }
	        }
	        else {
	            if (value !== null &&
	                value !== undefined) {                              // Explicit to preserve empty strings

	                target[key] = value;
	            }
	            else if (isNullOverride !== false) {                    // Defaults to true
	                target[key] = value;
	            }
	        }
	    }

	    return target;
	};


	// Apply options to a copy of the defaults

	exports.applyToDefaults = function (defaults, options, isNullOverride) {

	    exports.assert(defaults && typeof defaults === 'object', 'Invalid defaults value: must be an object');
	    exports.assert(!options || options === true || typeof options === 'object', 'Invalid options value: must be true, falsy or an object');

	    if (!options) {                                                 // If no options, return null
	        return null;
	    }

	    const copy = exports.clone(defaults);

	    if (options === true) {                                         // If options is set to true, use defaults
	        return copy;
	    }

	    return exports.merge(copy, options, isNullOverride === true, false);
	};


	// Clone an object except for the listed keys which are shallow copied

	exports.cloneWithShallow = function (source, keys) {

	    if (!source ||
	        typeof source !== 'object') {

	        return source;
	    }

	    const storage = internals.store(source, keys);    // Move shallow copy items to storage
	    const copy = exports.clone(source);               // Deep copy the rest
	    internals.restore(copy, source, storage);       // Shallow copy the stored items and restore
	    return copy;
	};


	internals.store = function (source, keys) {

	    const storage = {};
	    for (let i = 0; i < keys.length; ++i) {
	        const key = keys[i];
	        const value = exports.reach(source, key);
	        if (value !== undefined) {
	            storage[key] = value;
	            internals.reachSet(source, key, undefined);
	        }
	    }

	    return storage;
	};


	internals.restore = function (copy, source, storage) {

	    const keys = Object.keys(storage);
	    for (let i = 0; i < keys.length; ++i) {
	        const key = keys[i];
	        internals.reachSet(copy, key, storage[key]);
	        internals.reachSet(source, key, storage[key]);
	    }
	};


	internals.reachSet = function (obj, key, value) {

	    const path = key.split('.');
	    let ref = obj;
	    for (let i = 0; i < path.length; ++i) {
	        const segment = path[i];
	        if (i + 1 === path.length) {
	            ref[segment] = value;
	        }

	        ref = ref[segment];
	    }
	};


	// Apply options to defaults except for the listed keys which are shallow copied from option without merging

	exports.applyToDefaultsWithShallow = function (defaults, options, keys) {

	    exports.assert(defaults && typeof defaults === 'object', 'Invalid defaults value: must be an object');
	    exports.assert(!options || options === true || typeof options === 'object', 'Invalid options value: must be true, falsy or an object');
	    exports.assert(keys && Array.isArray(keys), 'Invalid keys');

	    if (!options) {                                                 // If no options, return null
	        return null;
	    }

	    const copy = exports.cloneWithShallow(defaults, keys);

	    if (options === true) {                                         // If options is set to true, use defaults
	        return copy;
	    }

	    const storage = internals.store(options, keys);   // Move shallow copy items to storage
	    exports.merge(copy, options, false, false);     // Deep copy the rest
	    internals.restore(copy, options, storage);      // Shallow copy the stored items and restore
	    return copy;
	};


	// Deep object or array comparison

	exports.deepEqual = function (obj, ref, options, seen) {

	    options = options || { prototype: true };

	    const type = typeof obj;

	    if (type !== typeof ref) {
	        return false;
	    }

	    if (type !== 'object' ||
	        obj === null ||
	        ref === null) {

	        if (obj === ref) {                                                      // Copied from Deep-eql, copyright(c) 2013 Jake Luer, jake@alogicalparadox.com, MIT Licensed, https://github.com/chaijs/deep-eql
	            return obj !== 0 || 1 / obj === 1 / ref;        // -0 / +0
	        }

	        return obj !== obj && ref !== ref;                  // NaN
	    }

	    seen = seen || [];
	    if (seen.indexOf(obj) !== -1) {
	        return true;                            // If previous comparison failed, it would have stopped execution
	    }

	    seen.push(obj);

	    if (Array.isArray(obj)) {
	        if (!Array.isArray(ref)) {
	            return false;
	        }

	        if (!options.part && obj.length !== ref.length) {
	            return false;
	        }

	        for (let i = 0; i < obj.length; ++i) {
	            if (options.part) {
	                let found = false;
	                for (let j = 0; j < ref.length; ++j) {
	                    if (exports.deepEqual(obj[i], ref[j], options)) {
	                        found = true;
	                        break;
	                    }
	                }

	                return found;
	            }

	            if (!exports.deepEqual(obj[i], ref[i], options)) {
	                return false;
	            }
	        }

	        return true;
	    }

	    if (Buffer.isBuffer(obj)) {
	        if (!Buffer.isBuffer(ref)) {
	            return false;
	        }

	        if (obj.length !== ref.length) {
	            return false;
	        }

	        for (let i = 0; i < obj.length; ++i) {
	            if (obj[i] !== ref[i]) {
	                return false;
	            }
	        }

	        return true;
	    }

	    if (obj instanceof Date) {
	        return (ref instanceof Date && obj.getTime() === ref.getTime());
	    }

	    if (obj instanceof RegExp) {
	        return (ref instanceof RegExp && obj.toString() === ref.toString());
	    }

	    if (options.prototype) {
	        if (Object.getPrototypeOf(obj) !== Object.getPrototypeOf(ref)) {
	            return false;
	        }
	    }

	    const keys = Object.getOwnPropertyNames(obj);

	    if (!options.part && keys.length !== Object.getOwnPropertyNames(ref).length) {
	        return false;
	    }

	    for (let i = 0; i < keys.length; ++i) {
	        const key = keys[i];
	        const descriptor = Object.getOwnPropertyDescriptor(obj, key);
	        if (descriptor.get) {
	            if (!exports.deepEqual(descriptor, Object.getOwnPropertyDescriptor(ref, key), options, seen)) {
	                return false;
	            }
	        }
	        else if (!exports.deepEqual(obj[key], ref[key], options, seen)) {
	            return false;
	        }
	    }

	    return true;
	};


	// Remove duplicate items from array

	exports.unique = (array, key) => {

	    let result;
	    if (key) {
	        result = [];
	        const index = new Set();
	        array.forEach((item) => {

	            const identifier = item[key];
	            if (!index.has(identifier)) {
	                index.add(identifier);
	                result.push(item);
	            }
	        });
	    }
	    else {
	        result = Array.from(new Set(array));
	    }

	    return result;
	};


	// Convert array into object

	exports.mapToObject = function (array, key) {

	    if (!array) {
	        return null;
	    }

	    const obj = {};
	    for (let i = 0; i < array.length; ++i) {
	        if (key) {
	            if (array[i][key]) {
	                obj[array[i][key]] = true;
	            }
	        }
	        else {
	            obj[array[i]] = true;
	        }
	    }

	    return obj;
	};


	// Find the common unique items in two arrays

	exports.intersect = function (array1, array2, justFirst) {

	    if (!array1 || !array2) {
	        return [];
	    }

	    const common = [];
	    const hash = (Array.isArray(array1) ? exports.mapToObject(array1) : array1);
	    const found = {};
	    for (let i = 0; i < array2.length; ++i) {
	        if (hash[array2[i]] && !found[array2[i]]) {
	            if (justFirst) {
	                return array2[i];
	            }

	            common.push(array2[i]);
	            found[array2[i]] = true;
	        }
	    }

	    return (justFirst ? null : common);
	};


	// Test if the reference contains the values

	exports.contain = function (ref, values, options) {

	    /*
	        string -> string(s)
	        array -> item(s)
	        object -> key(s)
	        object -> object (key:value)
	    */

	    let valuePairs = null;
	    if (typeof ref === 'object' &&
	        typeof values === 'object' &&
	        !Array.isArray(ref) &&
	        !Array.isArray(values)) {

	        valuePairs = values;
	        values = Object.keys(values);
	    }
	    else {
	        values = [].concat(values);
	    }

	    options = options || {};            // deep, once, only, part

	    exports.assert(arguments.length >= 2, 'Insufficient arguments');
	    exports.assert(typeof ref === 'string' || typeof ref === 'object', 'Reference must be string or an object');
	    exports.assert(values.length, 'Values array cannot be empty');

	    let compare;
	    let compareFlags;
	    if (options.deep) {
	        compare = exports.deepEqual;

	        const hasOnly = options.hasOwnProperty('only');
	        const hasPart = options.hasOwnProperty('part');

	        compareFlags = {
	            prototype: hasOnly ? options.only : hasPart ? !options.part : false,
	            part: hasOnly ? !options.only : hasPart ? options.part : true
	        };
	    }
	    else {
	        compare = (a, b) => a === b;
	    }

	    let misses = false;
	    const matches = new Array(values.length);
	    for (let i = 0; i < matches.length; ++i) {
	        matches[i] = 0;
	    }

	    if (typeof ref === 'string') {
	        let pattern = '(';
	        for (let i = 0; i < values.length; ++i) {
	            const value = values[i];
	            exports.assert(typeof value === 'string', 'Cannot compare string reference to non-string value');
	            pattern += (i ? '|' : '') + exports.escapeRegex(value);
	        }

	        const regex = new RegExp(pattern + ')', 'g');
	        const leftovers = ref.replace(regex, ($0, $1) => {

	            const index = values.indexOf($1);
	            ++matches[index];
	            return '';          // Remove from string
	        });

	        misses = !!leftovers;
	    }
	    else if (Array.isArray(ref)) {
	        for (let i = 0; i < ref.length; ++i) {
	            let matched = false;
	            for (let j = 0; j < values.length && matched === false; ++j) {
	                matched = compare(values[j], ref[i], compareFlags) && j;
	            }

	            if (matched !== false) {
	                ++matches[matched];
	            }
	            else {
	                misses = true;
	            }
	        }
	    }
	    else {
	        const keys = Object.getOwnPropertyNames(ref);
	        for (let i = 0; i < keys.length; ++i) {
	            const key = keys[i];
	            const pos = values.indexOf(key);
	            if (pos !== -1) {
	                if (valuePairs &&
	                    !compare(valuePairs[key], ref[key], compareFlags)) {

	                    return false;
	                }

	                ++matches[pos];
	            }
	            else {
	                misses = true;
	            }
	        }
	    }

	    let result = false;
	    for (let i = 0; i < matches.length; ++i) {
	        result = result || !!matches[i];
	        if ((options.once && matches[i] > 1) ||
	            (!options.part && !matches[i])) {

	            return false;
	        }
	    }

	    if (options.only &&
	        misses) {

	        return false;
	    }

	    return result;
	};


	// Flatten array

	exports.flatten = function (array, target) {

	    const result = target || [];

	    for (let i = 0; i < array.length; ++i) {
	        if (Array.isArray(array[i])) {
	            exports.flatten(array[i], result);
	        }
	        else {
	            result.push(array[i]);
	        }
	    }

	    return result;
	};


	// Convert an object key chain string ('a.b.c') to reference (object[a][b][c])

	exports.reach = function (obj, chain, options) {

	    if (chain === false ||
	        chain === null ||
	        typeof chain === 'undefined') {

	        return obj;
	    }

	    options = options || {};
	    if (typeof options === 'string') {
	        options = { separator: options };
	    }

	    const path = chain.split(options.separator || '.');
	    let ref = obj;
	    for (let i = 0; i < path.length; ++i) {
	        let key = path[i];
	        if (key[0] === '-' && Array.isArray(ref)) {
	            key = key.slice(1, key.length);
	            key = ref.length - key;
	        }

	        if (!ref ||
	            !((typeof ref === 'object' || typeof ref === 'function') && key in ref) ||
	            (typeof ref !== 'object' && options.functions === false)) {         // Only object and function can have properties

	            exports.assert(!options.strict || i + 1 === path.length, 'Missing segment', key, 'in reach path ', chain);
	            exports.assert(typeof ref === 'object' || options.functions === true || typeof ref !== 'function', 'Invalid segment', key, 'in reach path ', chain);
	            ref = options.default;
	            break;
	        }

	        ref = ref[key];
	    }

	    return ref;
	};


	exports.reachTemplate = function (obj, template, options) {

	    return template.replace(/{([^}]+)}/g, ($0, chain) => {

	        const value = exports.reach(obj, chain, options);
	        return (value === undefined || value === null ? '' : value);
	    });
	};


	exports.formatStack = function (stack) {

	    const trace = [];
	    for (let i = 0; i < stack.length; ++i) {
	        const item = stack[i];
	        trace.push([item.getFileName(), item.getLineNumber(), item.getColumnNumber(), item.getFunctionName(), item.isConstructor()]);
	    }

	    return trace;
	};


	exports.formatTrace = function (trace) {

	    const display = [];

	    for (let i = 0; i < trace.length; ++i) {
	        const row = trace[i];
	        display.push((row[4] ? 'new ' : '') + row[3] + ' (' + row[0] + ':' + row[1] + ':' + row[2] + ')');
	    }

	    return display;
	};


	exports.callStack = function (slice) {

	    // http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi

	    const v8 = Error.prepareStackTrace;
	    Error.prepareStackTrace = function (_, stack) {

	        return stack;
	    };

	    const capture = {};
	    Error.captureStackTrace(capture, this);     // arguments.callee is not supported in strict mode so we use this and slice the trace of this off the result
	    const stack = capture.stack;

	    Error.prepareStackTrace = v8;

	    const trace = exports.formatStack(stack);

	    return trace.slice(1 + slice);
	};


	exports.displayStack = function (slice) {

	    const trace = exports.callStack(slice === undefined ? 1 : slice + 1);

	    return exports.formatTrace(trace);
	};


	exports.abortThrow = false;


	exports.abort = function (message, hideStack) {

	    if (process.env.NODE_ENV === 'test' || exports.abortThrow === true) {
	        throw new Error(message || 'Unknown error');
	    }

	    let stack = '';
	    if (!hideStack) {
	        stack = exports.displayStack(1).join('\n\t');
	    }
	    console.log('ABORT: ' + message + '\n\t' + stack);
	    process.exit(1);
	};


	exports.assert = function (condition /*, msg1, msg2, msg3 */) {

	    if (condition) {
	        return;
	    }

	    if (arguments.length === 2 && arguments[1] instanceof Error) {
	        throw arguments[1];
	    }

	    let msgs = [];
	    for (let i = 1; i < arguments.length; ++i) {
	        if (arguments[i] !== '') {
	            msgs.push(arguments[i]);            // Avoids Array.slice arguments leak, allowing for V8 optimizations
	        }
	    }

	    msgs = msgs.map((msg) => {

	        return typeof msg === 'string' ? msg : msg instanceof Error ? msg.message : exports.stringify(msg);
	    });

	    throw new Error(msgs.join(' ') || 'Unknown error');
	};


	exports.Timer = function () {

	    this.ts = 0;
	    this.reset();
	};


	exports.Timer.prototype.reset = function () {

	    this.ts = Date.now();
	};


	exports.Timer.prototype.elapsed = function () {

	    return Date.now() - this.ts;
	};


	exports.Bench = function () {

	    this.ts = 0;
	    this.reset();
	};


	exports.Bench.prototype.reset = function () {

	    this.ts = exports.Bench.now();
	};


	exports.Bench.prototype.elapsed = function () {

	    return exports.Bench.now() - this.ts;
	};


	exports.Bench.now = function () {

	    const ts = process.hrtime();
	    return (ts[0] * 1e3) + (ts[1] / 1e6);
	};


	// Escape string for Regex construction

	exports.escapeRegex = function (string) {

	    // Escape ^$.*+-?=!:|\/()[]{},
	    return string.replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, '\\$&');
	};


	// Base64url (RFC 4648) encode

	exports.base64urlEncode = function (value, encoding) {

	    exports.assert(typeof value === 'string' || Buffer.isBuffer(value), 'value must be string or buffer');
	    const buf = (Buffer.isBuffer(value) ? value : new Buffer(value, encoding || 'binary'));
	    return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '');
	};


	// Base64url (RFC 4648) decode

	exports.base64urlDecode = function (value, encoding) {

	    if (typeof value !== 'string') {

	        return new Error('Value not a string');
	    }

	    if (!/^[\w\-]*$/.test(value)) {

	        return new Error('Invalid character');
	    }

	    const buf = new Buffer(value, 'base64');
	    return (encoding === 'buffer' ? buf : buf.toString(encoding || 'binary'));
	};


	// Escape attribute value for use in HTTP header

	exports.escapeHeaderAttribute = function (attribute) {

	    // Allowed value characters: !#$%&'()*+,-./:;<=>?@[]^_`{|}~ and space, a-z, A-Z, 0-9, \, "

	    exports.assert(/^[ \w\!#\$%&'\(\)\*\+,\-\.\/\:;<\=>\?@\[\]\^`\{\|\}~\"\\]*$/.test(attribute), 'Bad attribute value (' + attribute + ')');

	    return attribute.replace(/\\/g, '\\\\').replace(/\"/g, '\\"');                             // Escape quotes and slash
	};


	exports.escapeHtml = function (string) {

	    return Escape.escapeHtml(string);
	};


	exports.escapeJavaScript = function (string) {

	    return Escape.escapeJavaScript(string);
	};

	exports.escapeJson = function (string) {

	    return Escape.escapeJson(string);
	};

	exports.nextTick = function (callback) {

	    return function () {

	        const args = arguments;
	        process.nextTick(() => {

	            callback.apply(null, args);
	        });
	    };
	};


	exports.once = function (method) {

	    if (method._hoekOnce) {
	        return method;
	    }

	    let once = false;
	    const wrapped = function () {

	        if (!once) {
	            once = true;
	            method.apply(null, arguments);
	        }
	    };

	    wrapped._hoekOnce = true;

	    return wrapped;
	};


	exports.isInteger = Number.isSafeInteger;


	exports.ignore = function () { };


	exports.inherits = Util.inherits;


	exports.format = Util.format;


	exports.transform = function (source, transform, options) {

	    exports.assert(source === null || source === undefined || typeof source === 'object' || Array.isArray(source), 'Invalid source object: must be null, undefined, an object, or an array');
	    const separator = (typeof options === 'object' && options !== null) ? (options.separator || '.') : '.';

	    if (Array.isArray(source)) {
	        const results = [];
	        for (let i = 0; i < source.length; ++i) {
	            results.push(exports.transform(source[i], transform, options));
	        }
	        return results;
	    }

	    const result = {};
	    const keys = Object.keys(transform);

	    for (let i = 0; i < keys.length; ++i) {
	        const key = keys[i];
	        const path = key.split(separator);
	        const sourcePath = transform[key];

	        exports.assert(typeof sourcePath === 'string', 'All mappings must be "." delineated strings');

	        let segment;
	        let res = result;

	        while (path.length > 1) {
	            segment = path.shift();
	            if (!res[segment]) {
	                res[segment] = {};
	            }
	            res = res[segment];
	        }
	        segment = path.shift();
	        res[segment] = exports.reach(source, sourcePath, options);
	    }

	    return result;
	};


	exports.uniqueFilename = function (path, extension) {

	    if (extension) {
	        extension = extension[0] !== '.' ? '.' + extension : extension;
	    }
	    else {
	        extension = '';
	    }

	    path = Path.resolve(path);
	    const name = [Date.now(), process.pid, Crypto.randomBytes(8).toString('hex')].join('-') + extension;
	    return Path.join(path, name);
	};


	exports.stringify = function () {

	    try {
	        return JSON.stringify.apply(null, arguments);
	    }
	    catch (err) {
	        return '[Cannot display object: ' + err.message + ']';
	    }
	};


	exports.shallow = function (source) {

	    const target = {};
	    const keys = Object.keys(source);
	    for (let i = 0; i < keys.length; ++i) {
	        const key = keys[i];
	        target[key] = source[key];
	    }

	    return target;
	};


/***/ }),
/* 337 */
/***/ (function(module, exports) {

	'use strict';

	// Declare internals

	const internals = {};


	exports.escapeJavaScript = function (input) {

	    if (!input) {
	        return '';
	    }

	    let escaped = '';

	    for (let i = 0; i < input.length; ++i) {

	        const charCode = input.charCodeAt(i);

	        if (internals.isSafe(charCode)) {
	            escaped += input[i];
	        }
	        else {
	            escaped += internals.escapeJavaScriptChar(charCode);
	        }
	    }

	    return escaped;
	};


	exports.escapeHtml = function (input) {

	    if (!input) {
	        return '';
	    }

	    let escaped = '';

	    for (let i = 0; i < input.length; ++i) {

	        const charCode = input.charCodeAt(i);

	        if (internals.isSafe(charCode)) {
	            escaped += input[i];
	        }
	        else {
	            escaped += internals.escapeHtmlChar(charCode);
	        }
	    }

	    return escaped;
	};


	exports.escapeJson = function (input) {

	    if (!input) {
	        return '';
	    }

	    const lessThan = 0x3C;
	    const greaterThan = 0x3E;
	    const andSymbol = 0x26;
	    const lineSeperator = 0x2028;

	    // replace method
	    let charCode;
	    return input.replace(/[<>&\u2028\u2029]/g, (match) => {

	        charCode = match.charCodeAt(0);

	        if (charCode === lessThan) {
	            return '\\u003c';
	        }
	        else if (charCode === greaterThan) {
	            return '\\u003e';
	        }
	        else if (charCode === andSymbol) {
	            return '\\u0026';
	        }
	        else if (charCode === lineSeperator) {
	            return '\\u2028';
	        }
	        return '\\u2029';
	    });
	};


	internals.escapeJavaScriptChar = function (charCode) {

	    if (charCode >= 256) {
	        return '\\u' + internals.padLeft('' + charCode, 4);
	    }

	    const hexValue = new Buffer(String.fromCharCode(charCode), 'ascii').toString('hex');
	    return '\\x' + internals.padLeft(hexValue, 2);
	};


	internals.escapeHtmlChar = function (charCode) {

	    const namedEscape = internals.namedHtml[charCode];
	    if (typeof namedEscape !== 'undefined') {
	        return namedEscape;
	    }

	    if (charCode >= 256) {
	        return '&#' + charCode + ';';
	    }

	    const hexValue = new Buffer(String.fromCharCode(charCode), 'ascii').toString('hex');
	    return '&#x' + internals.padLeft(hexValue, 2) + ';';
	};


	internals.padLeft = function (str, len) {

	    while (str.length < len) {
	        str = '0' + str;
	    }

	    return str;
	};


	internals.isSafe = function (charCode) {

	    return (typeof internals.safeCharCodes[charCode] !== 'undefined');
	};


	internals.namedHtml = {
	    '38': '&amp;',
	    '60': '&lt;',
	    '62': '&gt;',
	    '34': '&quot;',
	    '160': '&nbsp;',
	    '162': '&cent;',
	    '163': '&pound;',
	    '164': '&curren;',
	    '169': '&copy;',
	    '174': '&reg;'
	};


	internals.safeCharCodes = (function () {

	    const safe = {};

	    for (let i = 32; i < 123; ++i) {

	        if ((i >= 97) ||                    // a-z
	            (i >= 65 && i <= 90) ||         // A-Z
	            (i >= 48 && i <= 57) ||         // 0-9
	            i === 32 ||                     // space
	            i === 46 ||                     // .
	            i === 44 ||                     // ,
	            i === 45 ||                     // -
	            i === 58 ||                     // :
	            i === 95) {                     // _

	            safe[i] = null;
	        }
	    }

	    return safe;
	}());


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// Load modules

	const Hoek = __webpack_require__(336);
	const Ref = __webpack_require__(339);
	const Errors = __webpack_require__(340);
	let Alternatives = null;                // Delay-loaded to prevent circular dependencies
	let Cast = null;


	// Declare internals

	const internals = {
	    Set: __webpack_require__(342)
	};


	internals.defaults = {
	    abortEarly: true,
	    convert: true,
	    allowUnknown: false,
	    skipFunctions: false,
	    stripUnknown: false,
	    language: {},
	    presence: 'optional',
	    strip: false,
	    noDefaults: false

	    // context: null
	};


	module.exports = internals.Any = class {

	    constructor() {

	        Cast = Cast || __webpack_require__(343);

	        this.isJoi = true;
	        this._type = 'any';
	        this._settings = null;
	        this._valids = new internals.Set();
	        this._invalids = new internals.Set();
	        this._tests = [];
	        this._refs = [];
	        this._flags = {
	            /*
	             presence: 'optional',                   // optional, required, forbidden, ignore
	             allowOnly: false,
	             allowUnknown: undefined,
	             default: undefined,
	             forbidden: false,
	             encoding: undefined,
	             insensitive: false,
	             trim: false,
	             case: undefined,                        // upper, lower
	             empty: undefined,
	             func: false,
	             raw: false
	             */
	        };

	        this._description = null;
	        this._unit = null;
	        this._notes = [];
	        this._tags = [];
	        this._examples = [];
	        this._meta = [];

	        this._inner = {};                           // Hash of arrays of immutable objects
	    }

	    createError(type, context, state, options) {

	        return Errors.create(type, context, state, options, this._flags);
	    }

	    createOverrideError(type, context, state, options, message, template) {

	        return Errors.create(type, context, state, options, this._flags, message, template);
	    }

	    checkOptions(options) {

	        const Schemas = __webpack_require__(357);
	        const result = Schemas.options.validate(options);
	        if (result.error) {
	            throw new Error(result.error.details[0].message);
	        }
	    }

	    clone() {

	        const obj = Object.create(Object.getPrototypeOf(this));

	        obj.isJoi = true;
	        obj._type = this._type;
	        obj._settings = internals.concatSettings(this._settings);
	        obj._baseType = this._baseType;
	        obj._valids = Hoek.clone(this._valids);
	        obj._invalids = Hoek.clone(this._invalids);
	        obj._tests = this._tests.slice();
	        obj._refs = this._refs.slice();
	        obj._flags = Hoek.clone(this._flags);

	        obj._description = this._description;
	        obj._unit = this._unit;
	        obj._notes = this._notes.slice();
	        obj._tags = this._tags.slice();
	        obj._examples = this._examples.slice();
	        obj._meta = this._meta.slice();

	        obj._inner = {};
	        const inners = Object.keys(this._inner);
	        for (let i = 0; i < inners.length; ++i) {
	            const key = inners[i];
	            obj._inner[key] = this._inner[key] ? this._inner[key].slice() : null;
	        }

	        return obj;
	    }

	    concat(schema) {

	        Hoek.assert(schema instanceof internals.Any, 'Invalid schema object');
	        Hoek.assert(this._type === 'any' || schema._type === 'any' || schema._type === this._type, 'Cannot merge type', this._type, 'with another type:', schema._type);

	        let obj = this.clone();

	        if (this._type === 'any' && schema._type !== 'any') {

	            // Reset values as if we were "this"
	            const tmpObj = schema.clone();
	            const keysToRestore = ['_settings', '_valids', '_invalids', '_tests', '_refs', '_flags', '_description', '_unit',
	                '_notes', '_tags', '_examples', '_meta', '_inner'];

	            for (let i = 0; i < keysToRestore.length; ++i) {
	                tmpObj[keysToRestore[i]] = obj[keysToRestore[i]];
	            }

	            obj = tmpObj;
	        }

	        obj._settings = obj._settings ? internals.concatSettings(obj._settings, schema._settings) : schema._settings;
	        obj._valids.merge(schema._valids, schema._invalids);
	        obj._invalids.merge(schema._invalids, schema._valids);
	        obj._tests = obj._tests.concat(schema._tests);
	        obj._refs = obj._refs.concat(schema._refs);
	        Hoek.merge(obj._flags, schema._flags);

	        obj._description = schema._description || obj._description;
	        obj._unit = schema._unit || obj._unit;
	        obj._notes = obj._notes.concat(schema._notes);
	        obj._tags = obj._tags.concat(schema._tags);
	        obj._examples = obj._examples.concat(schema._examples);
	        obj._meta = obj._meta.concat(schema._meta);

	        const inners = Object.keys(schema._inner);
	        const isObject = obj._type === 'object';
	        for (let i = 0; i < inners.length; ++i) {
	            const key = inners[i];
	            const source = schema._inner[key];
	            if (source) {
	                const target = obj._inner[key];
	                if (target) {
	                    if (isObject && key === 'children') {
	                        const keys = {};

	                        for (let j = 0; j < target.length; ++j) {
	                            keys[target[j].key] = j;
	                        }

	                        for (let j = 0; j < source.length; ++j) {
	                            const sourceKey = source[j].key;
	                            if (keys[sourceKey] >= 0) {
	                                target[keys[sourceKey]] = {
	                                    key: sourceKey,
	                                    schema: target[keys[sourceKey]].schema.concat(source[j].schema)
	                                };
	                            }
	                            else {
	                                target.push(source[j]);
	                            }
	                        }
	                    }
	                    else {
	                        obj._inner[key] = obj._inner[key].concat(source);
	                    }
	                }
	                else {
	                    obj._inner[key] = source.slice();
	                }
	            }
	        }

	        return obj;
	    }

	    _test(name, arg, func, options) {

	        const obj = this.clone();
	        obj._tests.push({ func, name, arg, options });
	        return obj;
	    }

	    options(options) {

	        Hoek.assert(!options.context, 'Cannot override context');
	        this.checkOptions(options);

	        const obj = this.clone();
	        obj._settings = internals.concatSettings(obj._settings, options);
	        return obj;
	    }

	    strict(isStrict) {

	        const obj = this.clone();
	        obj._settings = obj._settings || {};
	        obj._settings.convert = isStrict === undefined ? false : !isStrict;
	        return obj;
	    }

	    raw(isRaw) {

	        const value = isRaw === undefined ? true : isRaw;

	        if (this._flags.raw === value) {
	            return this;
	        }

	        const obj = this.clone();
	        obj._flags.raw = value;
	        return obj;
	    }

	    error(err) {

	        Hoek.assert(err && (err instanceof Error || typeof err === 'function'), 'Must provide a valid Error object or a function');

	        const obj = this.clone();
	        obj._flags.error = err;
	        return obj;
	    }

	    allow() {

	        const obj = this.clone();
	        const values = Hoek.flatten(Array.prototype.slice.call(arguments));
	        for (let i = 0; i < values.length; ++i) {
	            const value = values[i];

	            Hoek.assert(value !== undefined, 'Cannot call allow/valid/invalid with undefined');
	            obj._invalids.remove(value);
	            obj._valids.add(value, obj._refs);
	        }
	        return obj;
	    }

	    valid() {

	        const obj = this.allow.apply(this, arguments);
	        obj._flags.allowOnly = true;
	        return obj;
	    }

	    invalid(value) {

	        const obj = this.clone();
	        const values = Hoek.flatten(Array.prototype.slice.call(arguments));
	        for (let i = 0; i < values.length; ++i) {
	            value = values[i];

	            Hoek.assert(value !== undefined, 'Cannot call allow/valid/invalid with undefined');
	            obj._valids.remove(value);
	            obj._invalids.add(value, this._refs);
	        }

	        return obj;
	    }

	    required() {

	        if (this._flags.presence === 'required') {
	            return this;
	        }

	        const obj = this.clone();
	        obj._flags.presence = 'required';
	        return obj;
	    }

	    optional() {

	        if (this._flags.presence === 'optional') {
	            return this;
	        }

	        const obj = this.clone();
	        obj._flags.presence = 'optional';
	        return obj;
	    }


	    forbidden() {

	        if (this._flags.presence === 'forbidden') {
	            return this;
	        }

	        const obj = this.clone();
	        obj._flags.presence = 'forbidden';
	        return obj;
	    }


	    strip() {

	        if (this._flags.strip) {
	            return this;
	        }

	        const obj = this.clone();
	        obj._flags.strip = true;
	        return obj;
	    }

	    applyFunctionToChildren(children, fn, args, root) {

	        children = [].concat(children);

	        if (children.length !== 1 || children[0] !== '') {
	            root = root ? (root + '.') : '';

	            const extraChildren = (children[0] === '' ? children.slice(1) : children).map((child) => {

	                return root + child;
	            });

	            throw new Error('unknown key(s) ' + extraChildren.join(', '));
	        }

	        return this[fn].apply(this, args);
	    }

	    default(value, description) {

	        if (typeof value === 'function' &&
	            !Ref.isRef(value)) {

	            if (!value.description &&
	                description) {

	                value.description = description;
	            }

	            if (!this._flags.func) {
	                Hoek.assert(typeof value.description === 'string' && value.description.length > 0, 'description must be provided when default value is a function');
	            }
	        }

	        const obj = this.clone();
	        obj._flags.default = value;
	        Ref.push(obj._refs, value);
	        return obj;
	    }

	    empty(schema) {

	        const obj = this.clone();
	        obj._flags.empty = schema === undefined ? undefined : Cast.schema(schema);
	        return obj;
	    }

	    when(ref, options) {

	        Hoek.assert(options && typeof options === 'object', 'Invalid options');
	        Hoek.assert(options.then !== undefined || options.otherwise !== undefined, 'options must have at least one of "then" or "otherwise"');

	        const then = options.hasOwnProperty('then') ? this.concat(Cast.schema(options.then)) : undefined;
	        const otherwise = options.hasOwnProperty('otherwise') ? this.concat(Cast.schema(options.otherwise)) : undefined;

	        Alternatives = Alternatives || __webpack_require__(354);
	        const obj = Alternatives.when(ref, { is: options.is, then, otherwise });
	        obj._flags.presence = 'ignore';
	        obj._baseType = this;

	        return obj;
	    }

	    description(desc) {

	        Hoek.assert(desc && typeof desc === 'string', 'Description must be a non-empty string');

	        const obj = this.clone();
	        obj._description = desc;
	        return obj;
	    }

	    notes(notes) {

	        Hoek.assert(notes && (typeof notes === 'string' || Array.isArray(notes)), 'Notes must be a non-empty string or array');

	        const obj = this.clone();
	        obj._notes = obj._notes.concat(notes);
	        return obj;
	    }

	    tags(tags) {

	        Hoek.assert(tags && (typeof tags === 'string' || Array.isArray(tags)), 'Tags must be a non-empty string or array');

	        const obj = this.clone();
	        obj._tags = obj._tags.concat(tags);
	        return obj;
	    }

	    meta(meta) {

	        Hoek.assert(meta !== undefined, 'Meta cannot be undefined');

	        const obj = this.clone();
	        obj._meta = obj._meta.concat(meta);
	        return obj;
	    }

	    example(value) {

	        Hoek.assert(arguments.length, 'Missing example');
	        const result = this._validate(value, null, internals.defaults);
	        Hoek.assert(!result.errors, 'Bad example:', result.errors && Errors.process(result.errors, value));

	        const obj = this.clone();
	        obj._examples.push(value);
	        return obj;
	    }

	    unit(name) {

	        Hoek.assert(name && typeof name === 'string', 'Unit name must be a non-empty string');

	        const obj = this.clone();
	        obj._unit = name;
	        return obj;
	    }

	    _prepareEmptyValue(value) {

	        if (typeof value === 'string' && this._flags.trim) {
	            return value.trim();
	        }

	        return value;
	    }

	    _validate(value, state, options, reference) {

	        const originalValue = value;

	        // Setup state and settings

	        state = state || { key: '', path: '', parent: null, reference };

	        if (this._settings) {
	            options = internals.concatSettings(options, this._settings);
	        }

	        let errors = [];
	        const finish = () => {

	            let finalValue;

	            if (value !== undefined) {
	                finalValue = this._flags.raw ? originalValue : value;
	            }
	            else if (options.noDefaults) {
	                finalValue = value;
	            }
	            else if (Ref.isRef(this._flags.default)) {
	                finalValue = this._flags.default(state.parent, options);
	            }
	            else if (typeof this._flags.default === 'function' &&
	                !(this._flags.func && !this._flags.default.description)) {

	                let args;

	                if (state.parent !== null &&
	                    this._flags.default.length > 0) {

	                    args = [Hoek.clone(state.parent), options];
	                }

	                const defaultValue = internals._try(this._flags.default, args);
	                finalValue = defaultValue.value;
	                if (defaultValue.error) {
	                    errors.push(this.createError('any.default', defaultValue.error, state, options));
	                }
	            }
	            else {
	                finalValue = Hoek.clone(this._flags.default);
	            }

	            if (errors.length && typeof this._flags.error === 'function') {
	                const change = this._flags.error.call(this, errors);

	                if (typeof change === 'string') {
	                    errors = [this.createOverrideError('override', { reason: errors }, state, options, change)];
	                }
	                else {
	                    errors = [].concat(change)
	                        .map((err) => {

	                            return err instanceof Error ?
	                                err :
	                                this.createOverrideError(err.type || 'override', err.context, state, options, err.message, err.template);
	                        });
	                }
	            }

	            return {
	                value: this._flags.strip ? undefined : finalValue,
	                finalValue,
	                errors: errors.length ? errors : null
	            };
	        };

	        if (this._coerce) {
	            const coerced = this._coerce.call(this, value, state, options);
	            if (coerced.errors) {
	                value = coerced.value;
	                errors = errors.concat(coerced.errors);
	                return finish();                            // Coerced error always aborts early
	            }

	            value = coerced.value;
	        }

	        if (this._flags.empty && !this._flags.empty._validate(this._prepareEmptyValue(value), null, internals.defaults).errors) {
	            value = undefined;
	        }

	        // Check presence requirements

	        const presence = this._flags.presence || options.presence;
	        if (presence === 'optional') {
	            if (value === undefined) {
	                const isDeepDefault = this._flags.hasOwnProperty('default') && this._flags.default === undefined;
	                if (isDeepDefault && this._type === 'object') {
	                    value = {};
	                }
	                else {
	                    return finish();
	                }
	            }
	        }
	        else if (presence === 'required' &&
	            value === undefined) {

	            errors.push(this.createError('any.required', null, state, options));
	            return finish();
	        }
	        else if (presence === 'forbidden') {
	            if (value === undefined) {
	                return finish();
	            }

	            errors.push(this.createError('any.unknown', null, state, options));
	            return finish();
	        }

	        // Check allowed and denied values using the original value

	        if (this._valids.has(value, state, options, this._flags.insensitive)) {
	            return finish();
	        }

	        if (this._invalids.has(value, state, options, this._flags.insensitive)) {
	            errors.push(this.createError(value === '' ? 'any.empty' : 'any.invalid', null, state, options));
	            if (options.abortEarly ||
	                value === undefined) {          // No reason to keep validating missing value

	                return finish();
	            }
	        }

	        // Convert value and validate type

	        if (this._base) {
	            const base = this._base.call(this, value, state, options);
	            if (base.errors) {
	                value = base.value;
	                errors = errors.concat(base.errors);
	                return finish();                            // Base error always aborts early
	            }

	            if (base.value !== value) {
	                value = base.value;

	                // Check allowed and denied values using the converted value

	                if (this._valids.has(value, state, options, this._flags.insensitive)) {
	                    return finish();
	                }

	                if (this._invalids.has(value, state, options, this._flags.insensitive)) {
	                    errors.push(this.createError(value === '' ? 'any.empty' : 'any.invalid', null, state, options));
	                    if (options.abortEarly) {
	                        return finish();
	                    }
	                }
	            }
	        }

	        // Required values did not match

	        if (this._flags.allowOnly) {
	            errors.push(this.createError('any.allowOnly', { valids: this._valids.values({ stripUndefined: true }) }, state, options));
	            if (options.abortEarly) {
	                return finish();
	            }
	        }

	        // Helper.validate tests

	        for (let i = 0; i < this._tests.length; ++i) {
	            const test = this._tests[i];
	            const ret = test.func.call(this, value, state, options);
	            if (ret instanceof Errors.Err) {
	                errors.push(ret);
	                if (options.abortEarly) {
	                    return finish();
	                }
	            }
	            else {
	                value = ret;
	            }
	        }

	        return finish();
	    }

	    _validateWithOptions(value, options, callback) {

	        if (options) {
	            this.checkOptions(options);
	        }

	        const settings = internals.concatSettings(internals.defaults, options);
	        const result = this._validate(value, null, settings);
	        const errors = Errors.process(result.errors, value);

	        if (callback) {
	            return callback(errors, result.value);
	        }

	        return { error: errors, value: result.value };
	    }

	    validate(value, options, callback) {

	        if (typeof options === 'function') {
	            return this._validateWithOptions(value, null, options);
	        }

	        return this._validateWithOptions(value, options, callback);
	    }

	    describe() {

	        const description = {
	            type: this._type
	        };

	        const flags = Object.keys(this._flags);
	        if (flags.length) {
	            if (['empty', 'default', 'lazy', 'label'].some((flag) => this._flags.hasOwnProperty(flag))) {
	                description.flags = {};
	                for (let i = 0; i < flags.length; ++i) {
	                    const flag = flags[i];
	                    if (flag === 'empty') {
	                        description.flags[flag] = this._flags[flag].describe();
	                    }
	                    else if (flag === 'default') {
	                        if (Ref.isRef(this._flags[flag])) {
	                            description.flags[flag] = this._flags[flag].toString();
	                        }
	                        else if (typeof this._flags[flag] === 'function') {
	                            description.flags[flag] = this._flags[flag].description;
	                        }
	                        else {
	                            description.flags[flag] = this._flags[flag];
	                        }
	                    }
	                    else if (flag === 'lazy' || flag === 'label') {
	                        // We don't want it in the description
	                    }
	                    else {
	                        description.flags[flag] = this._flags[flag];
	                    }
	                }
	            }
	            else {
	                description.flags = this._flags;
	            }
	        }

	        if (this._settings) {
	            description.options = Hoek.clone(this._settings);
	        }

	        if (this._baseType) {
	            description.base = this._baseType.describe();
	        }

	        if (this._description) {
	            description.description = this._description;
	        }

	        if (this._notes.length) {
	            description.notes = this._notes;
	        }

	        if (this._tags.length) {
	            description.tags = this._tags;
	        }

	        if (this._meta.length) {
	            description.meta = this._meta;
	        }

	        if (this._examples.length) {
	            description.examples = this._examples;
	        }

	        if (this._unit) {
	            description.unit = this._unit;
	        }

	        const valids = this._valids.values();
	        if (valids.length) {
	            description.valids = valids.map((v) => {

	                return Ref.isRef(v) ? v.toString() : v;
	            });
	        }

	        const invalids = this._invalids.values();
	        if (invalids.length) {
	            description.invalids = invalids.map((v) => {

	                return Ref.isRef(v) ? v.toString() : v;
	            });
	        }

	        description.rules = [];

	        for (let i = 0; i < this._tests.length; ++i) {
	            const validator = this._tests[i];
	            const item = { name: validator.name };

	            if (validator.arg !== void 0) {
	                item.arg = Ref.isRef(validator.arg) ? validator.arg.toString() : validator.arg;
	            }

	            const options = validator.options;
	            if (options) {
	                if (options.hasRef) {
	                    item.arg = {};
	                    const keys = Object.keys(validator.arg);
	                    for (let j = 0; j < keys.length; ++j) {
	                        const key = keys[j];
	                        const value = validator.arg[key];
	                        item.arg[key] = Ref.isRef(value) ? value.toString() : value;
	                    }
	                }

	                if (typeof options.description === 'string') {
	                    item.description = options.description;
	                }
	                else if (typeof options.description === 'function') {
	                    item.description = options.description(item.arg);
	                }
	            }

	            description.rules.push(item);
	        }

	        if (!description.rules.length) {
	            delete description.rules;
	        }

	        const label = this._getLabel();
	        if (label) {
	            description.label = label;
	        }

	        return description;
	    }

	    label(name) {

	        Hoek.assert(name && typeof name === 'string', 'Label name must be a non-empty string');

	        const obj = this.clone();
	        obj._flags.label = name;
	        return obj;
	    }

	    _getLabel(def) {

	        return this._flags.label || def;
	    }

	};


	internals.Any.prototype.isImmutable = true;     // Prevents Hoek from deep cloning schema objects

	// Aliases

	internals.Any.prototype.only = internals.Any.prototype.equal = internals.Any.prototype.valid;
	internals.Any.prototype.disallow = internals.Any.prototype.not = internals.Any.prototype.invalid;
	internals.Any.prototype.exist = internals.Any.prototype.required;


	internals._try = function (fn, args) {

	    let err;
	    let result;

	    try {
	        result = fn.apply(null, args);
	    }
	    catch (e) {
	        err = e;
	    }

	    return {
	        value: result,
	        error: err
	    };
	};

	internals.concatSettings = function (target, source) {

	    // Used to avoid cloning context

	    if (!target &&
	        !source) {

	        return null;
	    }

	    const obj = {};

	    if (target) {
	        Object.assign(obj, target);
	    }

	    if (source) {
	        const sKeys = Object.keys(source);
	        for (let i = 0; i < sKeys.length; ++i) {
	            const key = sKeys[i];
	            if (key !== 'language' ||
	                !obj.hasOwnProperty(key)) {

	                obj[key] = source[key];
	            }
	            else {
	                obj[key] = Hoek.applyToDefaults(obj[key], source[key]);
	            }
	        }
	    }

	    return obj;
	};


/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// Load modules

	const Hoek = __webpack_require__(336);


	// Declare internals

	const internals = {};


	exports.create = function (key, options) {

	    Hoek.assert(typeof key === 'string', 'Invalid reference key:', key);

	    const settings = Hoek.clone(options);         // options can be reused and modified

	    const ref = function (value, validationOptions) {

	        return Hoek.reach(ref.isContext ? validationOptions.context : value, ref.key, settings);
	    };

	    ref.isContext = (key[0] === ((settings && settings.contextPrefix) || '$'));
	    ref.key = (ref.isContext ? key.slice(1) : key);
	    ref.path = ref.key.split((settings && settings.separator) || '.');
	    ref.depth = ref.path.length;
	    ref.root = ref.path[0];
	    ref.isJoi = true;

	    ref.toString = function () {

	        return (ref.isContext ? 'context:' : 'ref:') + ref.key;
	    };

	    return ref;
	};


	exports.isRef = function (ref) {

	    return typeof ref === 'function' && ref.isJoi;
	};


	exports.push = function (array, ref) {

	    if (exports.isRef(ref) &&
	        !ref.isContext) {

	        array.push(ref.root);
	    }
	};


/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// Load modules

	const Hoek = __webpack_require__(336);
	const Language = __webpack_require__(341);


	// Declare internals

	const internals = {
	    annotations: Symbol('joi-annotations')
	};

	internals.stringify = function (value, wrapArrays) {

	    const type = typeof value;

	    if (value === null) {
	        return 'null';
	    }

	    if (type === 'string') {
	        return value;
	    }

	    if (value instanceof exports.Err || type === 'function') {
	        return value.toString();
	    }

	    if (type === 'object') {
	        if (Array.isArray(value)) {
	            let partial = '';

	            for (let i = 0; i < value.length; ++i) {
	                partial = partial + (partial.length ? ', ' : '') + internals.stringify(value[i], wrapArrays);
	            }

	            return wrapArrays ? '[' + partial + ']' : partial;
	        }

	        return value.toString();
	    }

	    return JSON.stringify(value);
	};

	exports.Err = class {

	    constructor(type, context, state, options, flags, message, template) {

	        this.isJoi = true;
	        this.type = type;
	        this.context = context || {};
	        this.context.key = state.key;
	        this.path = state.path;
	        this.options = options;
	        this.flags = flags;
	        this.message = message;
	        this.template = template;
	    }

	    toString() {

	        if (this.message) {
	            return this.message;
	        }

	        let format;

	        if (this.template) {
	            format = this.template;
	        }

	        const localized = this.options.language;

	        if (this.flags.label) {
	            this.context.key = this.flags.label;
	        }
	        else if (this.context.key === '' || this.context.key === null) {
	            this.context.key = localized.root || Language.errors.root;
	        }

	        format = format || Hoek.reach(localized, this.type) || Hoek.reach(Language.errors, this.type);

	        let wrapArrays = Hoek.reach(localized, 'messages.wrapArrays');
	        if (typeof wrapArrays !== 'boolean') {
	            wrapArrays = Language.errors.messages.wrapArrays;
	        }

	        if (format === null) {
	            const childrenString = internals.stringify(this.context.reason, wrapArrays);
	            if (wrapArrays) {
	                return childrenString.slice(1, -1);
	            }
	            return childrenString;
	        }

	        const hasKey = /\{\{\!?key\}\}/.test(format);
	        const skipKey = format.length > 2 && format[0] === '!' && format[1] === '!';

	        if (skipKey) {
	            format = format.slice(2);
	        }

	        if (!hasKey && !skipKey) {
	            format = (Hoek.reach(localized, 'key') || Hoek.reach(Language.errors, 'key')) + format;
	        }

	        return format.replace(/\{\{(\!?)([^}]+)\}\}/g, ($0, isSecure, name) => {

	            const value = Hoek.reach(this.context, name);
	            const normalized = internals.stringify(value, wrapArrays);
	            return (isSecure ? Hoek.escapeHtml(normalized) : normalized);
	        });
	    }

	};


	exports.create = function (type, context, state, options, flags, message, template) {

	    return new exports.Err(type, context, state, options, flags, message, template);
	};


	exports.process = function (errors, object) {

	    if (!errors || !errors.length) {
	        return null;
	    }

	    // Construct error

	    let message = '';
	    const details = [];

	    const processErrors = function (localErrors, parent) {

	        for (let i = 0; i < localErrors.length; ++i) {
	            const item = localErrors[i];

	            if (item instanceof Error) {
	                return item;
	            }

	            if (item.flags.error && typeof item.flags.error !== 'function') {
	                return item.flags.error;
	            }

	            let itemMessage;
	            if (parent === undefined) {
	                itemMessage = item.toString();
	                message = message + (message ? '. ' : '') + itemMessage;
	            }

	            // Do not push intermediate errors, we're only interested in leafs

	            if (item.context.reason && item.context.reason.length) {
	                const override = processErrors(item.context.reason, item.path);
	                if (override) {
	                    return override;
	                }
	            }
	            else {
	                details.push({
	                    message: itemMessage || item.toString(),
	                    path: internals.getPath(item),
	                    type: item.type,
	                    context: item.context
	                });
	            }
	        }
	    };

	    const override = processErrors(errors);
	    if (override) {
	        return override;
	    }

	    const error = new Error(message);
	    error.isJoi = true;
	    error.name = 'ValidationError';
	    error.details = details;
	    error._object = object;
	    error.annotate = internals.annotate;
	    return error;
	};


	internals.getPath = function (item) {

	    return item.path || item.context.key;
	};


	// Inspired by json-stringify-safe
	internals.safeStringify = function (obj, spaces) {

	    return JSON.stringify(obj, internals.serializer(), spaces);
	};

	internals.serializer = function () {

	    const keys = [];
	    const stack = [];

	    const cycleReplacer = (key, value) => {

	        if (stack[0] === value) {
	            return '[Circular ~]';
	        }

	        return '[Circular ~.' + keys.slice(0, stack.indexOf(value)).join('.') + ']';
	    };

	    return function (key, value) {

	        if (stack.length > 0) {
	            const thisPos = stack.indexOf(this);
	            if (~thisPos) {
	                stack.length = thisPos + 1;
	                keys.length = thisPos + 1;
	                keys[thisPos] = key;
	            }
	            else {
	                stack.push(this);
	                keys.push(key);
	            }

	            if (~stack.indexOf(value)) {
	                value = cycleReplacer.call(this, key, value);
	            }
	        }
	        else {
	            stack.push(value);
	        }

	        if (value) {
	            const annotations = value[internals.annotations];
	            if (annotations) {
	                if (Array.isArray(value)) {
	                    const annotated = [];

	                    for (let i = 0; i < value.length; ++i) {
	                        if (annotations.errors[i]) {
	                            annotated.push(`_$idx$_${annotations.errors[i].sort().join(', ')}_$end$_`);
	                        }
	                        annotated.push(value[i]);
	                    }

	                    value = annotated;
	                }
	                else {
	                    const errorKeys = Object.keys(annotations.errors);
	                    for (let i = 0; i < errorKeys.length; ++i) {
	                        const errorKey = errorKeys[i];
	                        value[`${errorKey}_$key$_${annotations.errors[errorKey].sort().join(', ')}_$end$_`] = value[errorKey];
	                        value[errorKey] = undefined;
	                    }

	                    const missingKeys = Object.keys(annotations.missing);
	                    for (let i = 0; i < missingKeys.length; ++i) {
	                        const missingKey = missingKeys[i];
	                        value[`_$miss$_${missingKey}|${annotations.missing[missingKey]}_$end$_`] = '__missing__';
	                    }
	                }

	                return value;
	            }
	        }

	        if (value === Infinity || value === -Infinity || Number.isNaN(value) ||
	            typeof value === 'function' || typeof value === 'symbol') {
	            return '[' + value.toString() + ']';
	        }

	        return value;
	    };
	};


	internals.annotate = function (stripColorCodes) {

	    const redFgEscape = stripColorCodes ? '' : '\u001b[31m';
	    const redBgEscape = stripColorCodes ? '' : '\u001b[41m';
	    const endColor = stripColorCodes ? '' : '\u001b[0m';

	    if (typeof this._object !== 'object') {
	        return this.details[0].message;
	    }

	    const obj = Hoek.clone(this._object || {});

	    for (let i = this.details.length - 1; i >= 0; --i) {        // Reverse order to process deepest child first
	        const pos = i + 1;
	        const error = this.details[i];
	        const path = error.path.split('.');
	        let ref = obj;
	        for (let j = 0; ; ++j) {
	            const seg = path[j];

	            if (ref.isImmutable) {
	                ref = ref.clone();                              // joi schemas are not cloned by hoek, we have to take this extra step
	            }

	            if (j + 1 < path.length &&
	                ref[seg] &&
	                typeof ref[seg] !== 'string') {

	                ref = ref[seg];
	            }
	            else {
	                const refAnnotations = ref[internals.annotations] = ref[internals.annotations] || { errors: {}, missing: {} };
	                const value = ref[seg];

	                if (value !== undefined) {
	                    refAnnotations.errors[seg] = refAnnotations.errors[seg] || [];
	                    refAnnotations.errors[seg].push(pos);
	                }
	                else {
	                    refAnnotations.missing[seg] = pos;
	                }

	                break;
	            }
	        }
	    }

	    const replacers = {
	        key: /_\$key\$_([, \d]+)_\$end\$_\"/g,
	        missing: /\"_\$miss\$_([^\|]+)\|(\d+)_\$end\$_\"\: \"__missing__\"/g,
	        arrayIndex: /\s*\"_\$idx\$_([, \d]+)_\$end\$_\",?\n(.*)/g,
	        specials: /"\[(NaN|Symbol.*|-?Infinity|function.*|\(.*)\]"/g
	    };

	    let message = internals.safeStringify(obj, 2)
	        .replace(replacers.key, ($0, $1) => `" ${redFgEscape}[${$1}]${endColor}`)
	        .replace(replacers.missing, ($0, $1, $2) => `${redBgEscape}"${$1}"${endColor}${redFgEscape} [${$2}]: -- missing --${endColor}`)
	        .replace(replacers.arrayIndex, ($0, $1, $2) => `\n${$2} ${redFgEscape}[${$1}]${endColor}`)
	        .replace(replacers.specials, ($0, $1) => $1);

	    message = `${message}\n${redFgEscape}`;

	    for (let i = 0; i < this.details.length; ++i) {
	        const pos = i + 1;
	        message = `${message}\n[${pos}] ${this.details[i].message}`;
	    }

	    message = message + endColor;

	    return message;
	};


/***/ }),
/* 341 */
/***/ (function(module, exports) {

	'use strict';

	// Load modules


	// Declare internals

	const internals = {};


	exports.errors = {
	    root: 'value',
	    key: '"{{!key}}" ',
	    messages: {
	        wrapArrays: true
	    },
	    any: {
	        unknown: 'is not allowed',
	        invalid: 'contains an invalid value',
	        empty: 'is not allowed to be empty',
	        required: 'is required',
	        allowOnly: 'must be one of {{valids}}',
	        default: 'threw an error when running default method'
	    },
	    alternatives: {
	        base: 'not matching any of the allowed alternatives',
	        child: null
	    },
	    array: {
	        base: 'must be an array',
	        includes: 'at position {{pos}} does not match any of the allowed types',
	        includesSingle: 'single value of "{{!key}}" does not match any of the allowed types',
	        includesOne: 'at position {{pos}} fails because {{reason}}',
	        includesOneSingle: 'single value of "{{!key}}" fails because {{reason}}',
	        includesRequiredUnknowns: 'does not contain {{unknownMisses}} required value(s)',
	        includesRequiredKnowns: 'does not contain {{knownMisses}}',
	        includesRequiredBoth: 'does not contain {{knownMisses}} and {{unknownMisses}} other required value(s)',
	        excludes: 'at position {{pos}} contains an excluded value',
	        excludesSingle: 'single value of "{{!key}}" contains an excluded value',
	        min: 'must contain at least {{limit}} items',
	        max: 'must contain less than or equal to {{limit}} items',
	        length: 'must contain {{limit}} items',
	        ordered: 'at position {{pos}} fails because {{reason}}',
	        orderedLength: 'at position {{pos}} fails because array must contain at most {{limit}} items',
	        sparse: 'must not be a sparse array',
	        unique: 'position {{pos}} contains a duplicate value'
	    },
	    boolean: {
	        base: 'must be a boolean'
	    },
	    binary: {
	        base: 'must be a buffer or a string',
	        min: 'must be at least {{limit}} bytes',
	        max: 'must be less than or equal to {{limit}} bytes',
	        length: 'must be {{limit}} bytes'
	    },
	    date: {
	        base: 'must be a number of milliseconds or valid date string',
	        format: 'must be a string with one of the following formats {{format}}',
	        strict: 'must be a valid date',
	        min: 'must be larger than or equal to "{{limit}}"',
	        max: 'must be less than or equal to "{{limit}}"',
	        isoDate: 'must be a valid ISO 8601 date',
	        timestamp: {
	            javascript: 'must be a valid timestamp or number of milliseconds',
	            unix: 'must be a valid timestamp or number of seconds'
	        },
	        ref: 'references "{{ref}}" which is not a date'
	    },
	    function: {
	        base: 'must be a Function',
	        arity: 'must have an arity of {{n}}',
	        minArity: 'must have an arity greater or equal to {{n}}',
	        maxArity: 'must have an arity lesser or equal to {{n}}',
	        ref: 'must be a Joi reference'
	    },
	    lazy: {
	        base: '!!schema error: lazy schema must be set',
	        schema: '!!schema error: lazy schema function must return a schema'
	    },
	    object: {
	        base: 'must be an object',
	        child: '!!child "{{!child}}" fails because {{reason}}',
	        min: 'must have at least {{limit}} children',
	        max: 'must have less than or equal to {{limit}} children',
	        length: 'must have {{limit}} children',
	        allowUnknown: '!!"{{!child}}" is not allowed',
	        with: '!!"{{mainWithLabel}}" missing required peer "{{peerWithLabel}}"',
	        without: '!!"{{mainWithLabel}}" conflict with forbidden peer "{{peerWithLabel}}"',
	        missing: 'must contain at least one of {{peersWithLabels}}',
	        xor: 'contains a conflict between exclusive peers {{peersWithLabels}}',
	        or: 'must contain at least one of {{peersWithLabels}}',
	        and: 'contains {{presentWithLabels}} without its required peers {{missingWithLabels}}',
	        nand: '!!"{{mainWithLabel}}" must not exist simultaneously with {{peersWithLabels}}',
	        assert: '!!"{{ref}}" validation failed because "{{ref}}" failed to {{message}}',
	        rename: {
	            multiple: 'cannot rename child "{{from}}" because multiple renames are disabled and another key was already renamed to "{{to}}"',
	            override: 'cannot rename child "{{from}}" because override is disabled and target "{{to}}" exists'
	        },
	        type: 'must be an instance of "{{type}}"',
	        schema: 'must be a Joi instance'
	    },
	    number: {
	        base: 'must be a number',
	        min: 'must be larger than or equal to {{limit}}',
	        max: 'must be less than or equal to {{limit}}',
	        less: 'must be less than {{limit}}',
	        greater: 'must be greater than {{limit}}',
	        float: 'must be a float or double',
	        integer: 'must be an integer',
	        negative: 'must be a negative number',
	        positive: 'must be a positive number',
	        precision: 'must have no more than {{limit}} decimal places',
	        ref: 'references "{{ref}}" which is not a number',
	        multiple: 'must be a multiple of {{multiple}}'
	    },
	    string: {
	        base: 'must be a string',
	        min: 'length must be at least {{limit}} characters long',
	        max: 'length must be less than or equal to {{limit}} characters long',
	        length: 'length must be {{limit}} characters long',
	        alphanum: 'must only contain alpha-numeric characters',
	        token: 'must only contain alpha-numeric and underscore characters',
	        regex: {
	            base: 'with value "{{!value}}" fails to match the required pattern: {{pattern}}',
	            name: 'with value "{{!value}}" fails to match the {{name}} pattern',
	            invert: {
	                base: 'with value "{{!value}}" matches the inverted pattern: {{pattern}}',
	                name: 'with value "{{!value}}" matches the inverted {{name}} pattern'
	            }
	        },
	        email: 'must be a valid email',
	        uri: 'must be a valid uri',
	        uriRelativeOnly: 'must be a valid relative uri',
	        uriCustomScheme: 'must be a valid uri with a scheme matching the {{scheme}} pattern',
	        isoDate: 'must be a valid ISO 8601 date',
	        guid: 'must be a valid GUID',
	        hex: 'must only contain hexadecimal characters',
	        base64: 'must be a valid base64 string',
	        hostname: 'must be a valid hostname',
	        lowercase: 'must only contain lowercase characters',
	        uppercase: 'must only contain uppercase characters',
	        trim: 'must not have leading or trailing whitespace',
	        creditCard: 'must be a credit card',
	        ref: 'references "{{ref}}" which is not a number',
	        ip: 'must be a valid ip address with a {{cidr}} CIDR',
	        ipVersion: 'must be a valid ip address of one of the following versions {{version}} with a {{cidr}} CIDR'
	    }
	};


/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	const Ref = __webpack_require__(339);

	module.exports = class Set {

	    constructor() {

	        this._set = [];
	    }

	    add(value, refs) {

	        if (!Ref.isRef(value) && this.has(value, null, null, false)) {

	            return;
	        }

	        if (refs !== undefined) { // If it's a merge, we don't have any refs
	            Ref.push(refs, value);
	        }

	        this._set.push(value);
	        return this;
	    }

	    merge(add, remove) {

	        for (let i = 0; i < add._set.length; ++i) {
	            this.add(add._set[i]);
	        }

	        for (let i = 0; i < remove._set.length; ++i) {
	            this.remove(remove._set[i]);
	        }

	        return this;
	    }

	    remove(value) {

	        this._set = this._set.filter((item) => value !== item);
	        return this;
	    }

	    has(value, state, options, insensitive) {

	        for (let i = 0; i < this._set.length; ++i) {
	            let items = this._set[i];

	            if (state && Ref.isRef(items)) { // Only resolve references if there is a state, otherwise it's a merge
	                items = items(state.reference || state.parent, options);
	            }

	            if (!Array.isArray(items)) {
	                items = [items];
	            }

	            for (let j = 0; j < items.length; ++j) {
	                const item = items[j];
	                if (typeof value !== typeof item) {
	                    continue;
	                }

	                if (value === item ||
	                    (value instanceof Date && item instanceof Date && value.getTime() === item.getTime()) ||
	                    (insensitive && typeof value === 'string' && value.toLowerCase() === item.toLowerCase()) ||
	                    (Buffer.isBuffer(value) && Buffer.isBuffer(item) && value.length === item.length && value.toString('binary') === item.toString('binary'))) {

	                    return true;
	                }
	            }
	        }

	        return false;
	    }

	    values(options) {

	        if (options && options.stripUndefined) {
	            const values = [];

	            for (let i = 0; i < this._set.length; ++i) {
	                const item = this._set[i];
	                if (item !== undefined) {
	                    values.push(item);
	                }
	            }

	            return values;
	        }

	        return this._set.slice();
	    }

	    slice() {

	        const newSet = new Set();
	        newSet._set = this._set.slice();

	        return newSet;
	    }

	    concat(source) {

	        const newSet = new Set();
	        newSet._set = this._set.concat(source._set);

	        return newSet;
	    }
	};


/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// Load modules

	const Hoek = __webpack_require__(336);
	const Ref = __webpack_require__(339);

	// Type modules are delay-loaded to prevent circular dependencies


	// Declare internals

	const internals = {
	    any: null,
	    date: __webpack_require__(344),
	    string: __webpack_require__(345),
	    number: __webpack_require__(352),
	    boolean: __webpack_require__(353),
	    alt: null,
	    object: null
	};


	exports.schema = function (config) {

	    internals.any = internals.any || new (__webpack_require__(338))();
	    internals.alt = internals.alt || __webpack_require__(354);
	    internals.object = internals.object || __webpack_require__(355);

	    if (config !== undefined && config !== null && typeof config === 'object') {

	        if (config.isJoi) {
	            return config;
	        }

	        if (Array.isArray(config)) {
	            return internals.alt.try(config);
	        }

	        if (config instanceof RegExp) {
	            return internals.string.regex(config);
	        }

	        if (config instanceof Date) {
	            return internals.date.valid(config);
	        }

	        return internals.object.keys(config);
	    }

	    if (typeof config === 'string') {
	        return internals.string.valid(config);
	    }

	    if (typeof config === 'number') {
	        return internals.number.valid(config);
	    }

	    if (typeof config === 'boolean') {
	        return internals.boolean.valid(config);
	    }

	    if (Ref.isRef(config)) {
	        return internals.any.valid(config);
	    }

	    Hoek.assert(config === null, 'Invalid schema content:', config);

	    return internals.any.valid(null);
	};


	exports.ref = function (id) {

	    return Ref.isRef(id) ? id : Ref.create(id);
	};


/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// Load modules

	const Any = __webpack_require__(338);
	const Ref = __webpack_require__(339);
	const Hoek = __webpack_require__(336);


	// Declare internals

	const internals = {};

	internals.isoDate = /^(?:[-+]\d{2})?(?:\d{4}(?!\d{2}\b))(?:(-?)(?:(?:0[1-9]|1[0-2])(?:\1(?:[12]\d|0[1-9]|3[01]))?|W(?:[0-4]\d|5[0-2])(?:-?[1-7])?|(?:00[1-9]|0[1-9]\d|[12]\d{2}|3(?:[0-5]\d|6[1-6])))(?![T]$|[T][\d]+Z$)(?:[T\s](?:(?:(?:[01]\d|2[0-3])(?:(:?)[0-5]\d)?|24\:?00)(?:[.,]\d+(?!:))?)(?:\2[0-5]\d(?:[.,]\d+)?)?(?:[Z]|(?:[+-])(?:[01]\d|2[0-3])(?::?[0-5]\d)?)?)?)?$/;
	internals.invalidDate = new Date('');
	internals.isIsoDate = (() => {

	    const isoString = internals.isoDate.toString();

	    return (date) => {

	        return date && (date.toString() === isoString);
	    };
	})();

	internals.Date = class extends Any {

	    constructor() {

	        super();
	        this._type = 'date';
	    }

	    _base(value, state, options) {

	        const result = {
	            value: (options.convert && internals.Date.toDate(value, this._flags.format, this._flags.timestamp, this._flags.multiplier)) || value
	        };

	        if (result.value instanceof Date && !isNaN(result.value.getTime())) {
	            result.errors = null;
	        }
	        else if (!options.convert) {
	            result.errors = this.createError('date.strict', null, state, options);
	        }
	        else {
	            let type;
	            if (internals.isIsoDate(this._flags.format)) {
	                type = 'isoDate';
	            }
	            else if (this._flags.timestamp) {
	                type = `timestamp.${this._flags.timestamp}`;
	            }
	            else {
	                type = 'base';
	            }

	            result.errors = this.createError(`date.${type}`, null, state, options);
	        }

	        return result;
	    }

	    static toDate(value, format, timestamp, multiplier) {

	        if (value instanceof Date) {
	            return value;
	        }

	        if (typeof value === 'string' ||
	            (typeof value === 'number' && !isNaN(value) && isFinite(value))) {

	            if (typeof value === 'string' &&
	                /^[+-]?\d+(\.\d+)?$/.test(value)) {

	                value = parseFloat(value);
	            }

	            let date;
	            if (format && internals.isIsoDate(format)) {
	                date = format.test(value) ? new Date(value) : internals.invalidDate;
	            }
	            else if (timestamp && multiplier) {
	                date = new Date(value * multiplier);
	            }
	            else {
	                date = new Date(value);
	            }

	            if (!isNaN(date.getTime())) {
	                return date;
	            }
	        }

	        return null;
	    }

	    iso() {

	        if (this._flags.format === internals.isoDate) {
	            return this;
	        }

	        const obj = this.clone();
	        obj._flags.format = internals.isoDate;
	        return obj;
	    }

	    timestamp(type) {

	        type = type || 'javascript';

	        const allowed = ['javascript', 'unix'];
	        Hoek.assert(allowed.indexOf(type) !== -1, '"type" must be one of "' + allowed.join('", "') + '"');

	        if (this._flags.timestamp === type) {
	            return this;
	        }

	        const obj = this.clone();
	        obj._flags.timestamp = type;
	        obj._flags.multiplier = type === 'unix' ? 1000 : 1;
	        return obj;
	    }

	    _isIsoDate(value) {

	        return internals.isoDate.test(value);
	    }

	};

	internals.compare = function (type, compare) {

	    return function (date) {

	        const isNow = date === 'now';
	        const isRef = Ref.isRef(date);

	        if (!isNow && !isRef) {
	            date = internals.Date.toDate(date);
	        }

	        Hoek.assert(date, 'Invalid date format');

	        return this._test(type, date, function (value, state, options) {

	            let compareTo;
	            if (isNow) {
	                compareTo = Date.now();
	            }
	            else if (isRef) {
	                compareTo = internals.Date.toDate(date(state.reference || state.parent, options));

	                if (!compareTo) {
	                    return this.createError('date.ref', { ref: date.key }, state, options);
	                }

	                compareTo = compareTo.getTime();
	            }
	            else {
	                compareTo = date.getTime();
	            }

	            if (compare(value.getTime(), compareTo)) {
	                return value;
	            }

	            return this.createError('date.' + type, { limit: new Date(compareTo) }, state, options);
	        });
	    };
	};
	internals.Date.prototype.min = internals.compare('min', (value, date) => value >= date);
	internals.Date.prototype.max = internals.compare('max', (value, date) => value <= date);


	module.exports = new internals.Date();


/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// Load modules

	const Net = __webpack_require__(346);
	const Hoek = __webpack_require__(336);
	let Isemail;                            // Loaded on demand
	const Any = __webpack_require__(338);
	const Ref = __webpack_require__(339);
	const JoiDate = __webpack_require__(344);
	const Uri = __webpack_require__(347);
	const Ip = __webpack_require__(349);

	// Declare internals

	const internals = {
	    uriRegex: Uri.createUriRegex(),
	    ipRegex: Ip.createIpRegex(['ipv4', 'ipv6', 'ipvfuture'], 'optional')
	};

	internals.String = class extends Any {

	    constructor() {

	        super();
	        this._type = 'string';
	        this._invalids.add('');
	    }

	    _base(value, state, options) {

	        if (typeof value === 'string' &&
	            options.convert) {

	            if (this._flags.case) {
	                value = (this._flags.case === 'upper' ? value.toLocaleUpperCase() : value.toLocaleLowerCase());
	            }

	            if (this._flags.trim) {
	                value = value.trim();
	            }

	            if (this._inner.replacements) {

	                for (let i = 0; i < this._inner.replacements.length; ++i) {
	                    const replacement = this._inner.replacements[i];
	                    value = value.replace(replacement.pattern, replacement.replacement);
	                }
	            }

	            if (this._flags.truncate) {
	                for (let i = 0; i < this._tests.length; ++i) {
	                    const test = this._tests[i];
	                    if (test.name === 'max') {
	                        value = value.slice(0, test.arg);
	                        break;
	                    }
	                }
	            }
	        }

	        return {
	            value,
	            errors: (typeof value === 'string') ? null : this.createError('string.base', { value }, state, options)
	        };
	    }

	    insensitive() {

	        if (this._flags.insensitive) {
	            return this;
	        }

	        const obj = this.clone();
	        obj._flags.insensitive = true;
	        return obj;
	    }

	    creditCard() {

	        return this._test('creditCard', undefined, function (value, state, options) {

	            let i = value.length;
	            let sum = 0;
	            let mul = 1;

	            while (i--) {
	                const char = value.charAt(i) * mul;
	                sum = sum + (char - (char > 9) * 9);
	                mul = mul ^ 3;
	            }

	            const check = (sum % 10 === 0) && (sum > 0);
	            return check ? value : this.createError('string.creditCard', { value }, state, options);
	        });
	    }

	    regex(pattern, patternOptions) {

	        Hoek.assert(pattern instanceof RegExp, 'pattern must be a RegExp');

	        const patternObject = {
	            pattern: new RegExp(pattern.source, pattern.ignoreCase ? 'i' : undefined)         // Future version should break this and forbid unsupported regex flags
	        };

	        if (typeof patternOptions === 'string') {
	            patternObject.name = patternOptions;
	        }
	        else if (typeof patternOptions === 'object') {
	            patternObject.invert = !!patternOptions.invert;

	            if (patternOptions.name) {
	                patternObject.name = patternOptions.name;
	            }
	        }

	        const errorCode = ['string.regex', patternObject.invert ? '.invert' : '', patternObject.name ? '.name' : '.base'].join('');

	        return this._test('regex', patternObject, function (value, state, options) {

	            const patternMatch = patternObject.pattern.test(value);

	            if (patternMatch ^ patternObject.invert) {
	                return value;
	            }

	            return this.createError(errorCode, { name: patternObject.name, pattern: patternObject.pattern, value }, state, options);
	        });
	    }

	    alphanum() {

	        return this._test('alphanum', undefined, function (value, state, options) {

	            if (/^[a-zA-Z0-9]+$/.test(value)) {
	                return value;
	            }

	            return this.createError('string.alphanum', { value }, state, options);
	        });
	    }

	    token() {

	        return this._test('token', undefined, function (value, state, options) {

	            if (/^\w+$/.test(value)) {
	                return value;
	            }

	            return this.createError('string.token', { value }, state, options);
	        });
	    }

	    email(isEmailOptions) {

	        if (isEmailOptions) {
	            Hoek.assert(typeof isEmailOptions === 'object', 'email options must be an object');
	            Hoek.assert(typeof isEmailOptions.checkDNS === 'undefined', 'checkDNS option is not supported');
	            Hoek.assert(typeof isEmailOptions.tldWhitelist === 'undefined' ||
	                typeof isEmailOptions.tldWhitelist === 'object', 'tldWhitelist must be an array or object');
	            Hoek.assert(typeof isEmailOptions.minDomainAtoms === 'undefined' ||
	                Number.isSafeInteger(isEmailOptions.minDomainAtoms) && isEmailOptions.minDomainAtoms > 0,
	                'minDomainAtoms must be a positive integer');
	            Hoek.assert(typeof isEmailOptions.errorLevel === 'undefined' || typeof isEmailOptions.errorLevel === 'boolean' ||
	                (Number.isSafeInteger(isEmailOptions.errorLevel) && isEmailOptions.errorLevel >= 0),
	                'errorLevel must be a non-negative integer or boolean');
	        }

	        return this._test('email', isEmailOptions, function (value, state, options) {

	            Isemail = Isemail || __webpack_require__(350);

	            try {
	                const result = Isemail.validate(value, isEmailOptions);
	                if (result === true || result === 0) {
	                    return value;
	                }
	            }
	            catch (e) { }

	            return this.createError('string.email', { value }, state, options);
	        });
	    }

	    ip(ipOptions) {

	        let regex = internals.ipRegex;
	        ipOptions = ipOptions || {};
	        Hoek.assert(typeof ipOptions === 'object', 'options must be an object');

	        if (ipOptions.cidr) {
	            Hoek.assert(typeof ipOptions.cidr === 'string', 'cidr must be a string');
	            ipOptions.cidr = ipOptions.cidr.toLowerCase();

	            Hoek.assert(ipOptions.cidr in Ip.cidrs, 'cidr must be one of ' + Object.keys(Ip.cidrs).join(', '));

	            // If we only received a `cidr` setting, create a regex for it. But we don't need to create one if `cidr` is "optional" since that is the default
	            if (!ipOptions.version && ipOptions.cidr !== 'optional') {
	                regex = Ip.createIpRegex(['ipv4', 'ipv6', 'ipvfuture'], ipOptions.cidr);
	            }
	        }
	        else {

	            // Set our default cidr strategy
	            ipOptions.cidr = 'optional';
	        }

	        let versions;
	        if (ipOptions.version) {
	            if (!Array.isArray(ipOptions.version)) {
	                ipOptions.version = [ipOptions.version];
	            }

	            Hoek.assert(ipOptions.version.length >= 1, 'version must have at least 1 version specified');

	            versions = [];
	            for (let i = 0; i < ipOptions.version.length; ++i) {
	                let version = ipOptions.version[i];
	                Hoek.assert(typeof version === 'string', 'version at position ' + i + ' must be a string');
	                version = version.toLowerCase();
	                Hoek.assert(Ip.versions[version], 'version at position ' + i + ' must be one of ' + Object.keys(Ip.versions).join(', '));
	                versions.push(version);
	            }

	            // Make sure we have a set of versions
	            versions = Hoek.unique(versions);

	            regex = Ip.createIpRegex(versions, ipOptions.cidr);
	        }

	        return this._test('ip', ipOptions, function (value, state, options) {

	            if (regex.test(value)) {
	                return value;
	            }

	            if (versions) {
	                return this.createError('string.ipVersion', { value, cidr: ipOptions.cidr, version: versions }, state, options);
	            }

	            return this.createError('string.ip', { value, cidr: ipOptions.cidr }, state, options);
	        });
	    }

	    uri(uriOptions) {

	        let customScheme = '';
	        let allowRelative = false;
	        let relativeOnly = false;
	        let regex = internals.uriRegex;

	        if (uriOptions) {
	            Hoek.assert(typeof uriOptions === 'object', 'options must be an object');

	            if (uriOptions.scheme) {
	                Hoek.assert(uriOptions.scheme instanceof RegExp || typeof uriOptions.scheme === 'string' || Array.isArray(uriOptions.scheme), 'scheme must be a RegExp, String, or Array');

	                if (!Array.isArray(uriOptions.scheme)) {
	                    uriOptions.scheme = [uriOptions.scheme];
	                }

	                Hoek.assert(uriOptions.scheme.length >= 1, 'scheme must have at least 1 scheme specified');

	                // Flatten the array into a string to be used to match the schemes.
	                for (let i = 0; i < uriOptions.scheme.length; ++i) {
	                    const scheme = uriOptions.scheme[i];
	                    Hoek.assert(scheme instanceof RegExp || typeof scheme === 'string', 'scheme at position ' + i + ' must be a RegExp or String');

	                    // Add OR separators if a value already exists
	                    customScheme = customScheme + (customScheme ? '|' : '');

	                    // If someone wants to match HTTP or HTTPS for example then we need to support both RegExp and String so we don't escape their pattern unknowingly.
	                    if (scheme instanceof RegExp) {
	                        customScheme = customScheme + scheme.source;
	                    }
	                    else {
	                        Hoek.assert(/[a-zA-Z][a-zA-Z0-9+-\.]*/.test(scheme), 'scheme at position ' + i + ' must be a valid scheme');
	                        customScheme = customScheme + Hoek.escapeRegex(scheme);
	                    }
	                }
	            }

	            if (uriOptions.allowRelative) {
	                allowRelative = true;
	            }

	            if (uriOptions.relativeOnly) {
	                relativeOnly = true;
	            }
	        }

	        if (customScheme || allowRelative || relativeOnly) {
	            regex = Uri.createUriRegex(customScheme, allowRelative, relativeOnly);
	        }

	        return this._test('uri', uriOptions, function (value, state, options) {

	            if (regex.test(value)) {
	                return value;
	            }

	            if (relativeOnly) {
	                return this.createError('string.uriRelativeOnly', { value }, state, options);
	            }

	            if (customScheme) {
	                return this.createError('string.uriCustomScheme', { scheme: customScheme, value }, state, options);
	            }

	            return this.createError('string.uri', { value }, state, options);
	        });
	    }

	    isoDate() {

	        return this._test('isoDate', undefined, function (value, state, options) {

	            if (JoiDate._isIsoDate(value)) {
	                return value;
	            }

	            return this.createError('string.isoDate', { value }, state, options);
	        });
	    }

	    guid(guidOptions) {

	        const brackets = {
	            '{': '}', '[': ']', '(': ')', '': ''
	        };

	        const uuids = {
	            'uuidv1': '1',
	            'uuidv2': '2',
	            'uuidv3': '3',
	            'uuidv4': '4',
	            'uuidv5': '5'
	        };

	        const versions = [];

	        if (guidOptions && guidOptions.version) {
	            if (!Array.isArray(guidOptions.version)) {
	                guidOptions.version = [guidOptions.version];
	            }

	            Hoek.assert(guidOptions.version.length >= 1, 'version must have at least 1 valid version specified');

	            for (let i = 0; i < guidOptions.version.length; ++i) {
	                let version = guidOptions.version[i];
	                Hoek.assert(typeof version === 'string', 'version at position ' + i + ' must be a string');
	                version = version.toLowerCase();
	                Hoek.assert(uuids[version], 'version at position ' + i + ' must be one of ' + Object.keys(uuids).join(', '));
	                Hoek.assert(versions.indexOf(version) === -1, 'version at position ' + i + ' must not be a duplicate.');
	                versions.push(version);
	            }
	        }

	        const regex = /^([\[{\(]?)([0-9A-F]{8})([:-]?)([0-9A-F]{4})([:-]?)([0-9A-F]{4})([:-]?)([0-9A-F]{4})([:-]?)([0-9A-F]{12})([\]}\)]?)$/i;

	        return this._test('guid', guidOptions, function (value, state, options) {

	            const results = regex.exec(value);

	            if (!results) {
	                return this.createError('string.guid', { value }, state, options);
	            }

	            // Matching braces
	            if (brackets[results[1]] !== results[11]) {
	                return this.createError('string.guid', { value }, state, options);
	            }

	            // Matching separators
	            if (results[3] !== results[5] || results[3] !== results[7] || results[3] !== results[9]) {
	                return this.createError('string.guid', { value }, state, options);
	            }

	            // Specific UUID versions
	            if (versions.length) {
	                const validVersions = versions.some((uuidVersion) => {

	                    return results[6][0] === uuids[uuidVersion];
	                });

	                // Valid version and 89AB check
	                if (!(validVersions && /[89AB]/i.test(results[8][0]))) {
	                    return this.createError('string.guid', { value }, state, options);
	                }
	            }

	            return value;
	        });
	    }

	    hex() {

	        const regex = /^[a-f0-9]+$/i;

	        return this._test('hex', regex, function (value, state, options) {

	            if (regex.test(value)) {
	                return value;
	            }

	            return this.createError('string.hex', { value }, state, options);
	        });
	    }

	    base64() {

	        const regex = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;

	        return this._test('base64', regex, function (value, state, options) {

	            if (regex.test(value)) {
	                return value;
	            }

	            return this.createError('string.base64', { value }, state, options);
	        });
	    }

	    hostname() {

	        const regex = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;

	        return this._test('hostname', undefined, function (value, state, options) {

	            if ((value.length <= 255 && regex.test(value)) ||
	                Net.isIPv6(value)) {

	                return value;
	            }

	            return this.createError('string.hostname', { value }, state, options);
	        });
	    }

	    lowercase() {

	        const obj = this._test('lowercase', undefined, function (value, state, options) {

	            if (options.convert ||
	                value === value.toLocaleLowerCase()) {

	                return value;
	            }

	            return this.createError('string.lowercase', { value }, state, options);
	        });

	        obj._flags.case = 'lower';
	        return obj;
	    }

	    uppercase() {

	        const obj = this._test('uppercase', undefined, function (value, state, options) {

	            if (options.convert ||
	                value === value.toLocaleUpperCase()) {

	                return value;
	            }

	            return this.createError('string.uppercase', { value }, state, options);
	        });

	        obj._flags.case = 'upper';
	        return obj;
	    }

	    trim() {

	        const obj = this._test('trim', undefined, function (value, state, options) {

	            if (options.convert ||
	                value === value.trim()) {

	                return value;
	            }

	            return this.createError('string.trim', { value }, state, options);
	        });

	        obj._flags.trim = true;
	        return obj;
	    }

	    replace(pattern, replacement) {

	        if (typeof pattern === 'string') {
	            pattern = new RegExp(Hoek.escapeRegex(pattern), 'g');
	        }

	        Hoek.assert(pattern instanceof RegExp, 'pattern must be a RegExp');
	        Hoek.assert(typeof replacement === 'string', 'replacement must be a String');

	        // This can not be considere a test like trim, we can't "reject"
	        // anything from this rule, so just clone the current object
	        const obj = this.clone();

	        if (!obj._inner.replacements) {
	            obj._inner.replacements = [];
	        }

	        obj._inner.replacements.push({
	            pattern,
	            replacement
	        });

	        return obj;
	    }

	    truncate(enabled) {

	        const value = enabled === undefined ? true : !!enabled;

	        if (this._flags.truncate === value) {
	            return this;
	        }

	        const obj = this.clone();
	        obj._flags.truncate = value;
	        return obj;
	    }

	};

	internals.compare = function (type, compare) {

	    return function (limit, encoding) {

	        const isRef = Ref.isRef(limit);

	        Hoek.assert((Number.isSafeInteger(limit) && limit >= 0) || isRef, 'limit must be a positive integer or reference');
	        Hoek.assert(!encoding || Buffer.isEncoding(encoding), 'Invalid encoding:', encoding);

	        return this._test(type, limit, function (value, state, options) {

	            let compareTo;
	            if (isRef) {
	                compareTo = limit(state.reference || state.parent, options);

	                if (!Number.isSafeInteger(compareTo)) {
	                    return this.createError('string.ref', { ref: limit.key }, state, options);
	                }
	            }
	            else {
	                compareTo = limit;
	            }

	            if (compare(value, compareTo, encoding)) {
	                return value;
	            }

	            return this.createError('string.' + type, { limit: compareTo, value, encoding }, state, options);
	        });
	    };
	};


	internals.String.prototype.min = internals.compare('min', (value, limit, encoding) => {

	    const length = encoding ? Buffer.byteLength(value, encoding) : value.length;
	    return length >= limit;
	});


	internals.String.prototype.max = internals.compare('max', (value, limit, encoding) => {

	    const length = encoding ? Buffer.byteLength(value, encoding) : value.length;
	    return length <= limit;
	});


	internals.String.prototype.length = internals.compare('length', (value, limit, encoding) => {

	    const length = encoding ? Buffer.byteLength(value, encoding) : value.length;
	    return length === limit;
	});

	// Aliases

	internals.String.prototype.uuid = internals.String.prototype.guid;

	module.exports = new internals.String();


/***/ }),
/* 346 */
/***/ (function(module, exports) {

	module.exports = require("net");

/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// Load Modules

	const RFC3986 = __webpack_require__(348);


	// Declare internals

	const internals = {
	    Uri: {
	        createUriRegex: function (optionalScheme, allowRelative, relativeOnly) {

	            let scheme = RFC3986.scheme;
	            let prefix;

	            if (relativeOnly) {
	                prefix = '(?:' + RFC3986.relativeRef + ')';
	            }
	            else {
	                // If we were passed a scheme, use it instead of the generic one
	                if (optionalScheme) {

	                    // Have to put this in a non-capturing group to handle the OR statements
	                    scheme = '(?:' + optionalScheme + ')';
	                }

	                const withScheme = '(?:' + scheme + ':' + RFC3986.hierPart + ')';

	                prefix = allowRelative ? '(?:' + withScheme + '|' + RFC3986.relativeRef + ')' : withScheme;
	            }

	            /**
	             * URI = scheme ":" hier-part [ "?" query ] [ "#" fragment ]
	             *
	             * OR
	             *
	             * relative-ref = relative-part [ "?" query ] [ "#" fragment ]
	             */
	            return new RegExp('^' + prefix + '(?:\\?' + RFC3986.query + ')?' + '(?:#' + RFC3986.fragment + ')?$');
	        }
	    }
	};


	module.exports = internals.Uri;


/***/ }),
/* 348 */
/***/ (function(module, exports) {

	'use strict';

	// Load modules


	// Delcare internals

	const internals = {
	    rfc3986: {}
	};


	internals.generate = function () {

	    /**
	     * elements separated by forward slash ("/") are alternatives.
	     */
	    const or = '|';

	    /**
	     * DIGIT = %x30-39 ; 0-9
	     */
	    const digit = '0-9';
	    const digitOnly = '[' + digit + ']';

	    /**
	     * ALPHA = %x41-5A / %x61-7A   ; A-Z / a-z
	     */
	    const alpha = 'a-zA-Z';
	    const alphaOnly = '[' + alpha + ']';

	    /**
	     * cidr       = DIGIT                ; 0-9
	     *            / %x31-32 DIGIT         ; 10-29
	     *            / "3" %x30-32           ; 30-32
	     */
	    internals.rfc3986.cidr = digitOnly + or + '[1-2]' + digitOnly + or + '3' + '[0-2]';

	    /**
	     * HEXDIG = DIGIT / "A" / "B" / "C" / "D" / "E" / "F"
	     */
	    const hexDigit = digit + 'A-Fa-f';
	    const hexDigitOnly = '[' + hexDigit + ']';

	    /**
	     * unreserved = ALPHA / DIGIT / "-" / "." / "_" / "~"
	     */
	    const unreserved = alpha + digit + '-\\._~';

	    /**
	     * sub-delims = "!" / "$" / "&" / "'" / "(" / ")" / "*" / "+" / "," / ";" / "="
	     */
	    const subDelims = '!\\$&\'\\(\\)\\*\\+,;=';

	    /**
	     * pct-encoded = "%" HEXDIG HEXDIG
	     */
	    const pctEncoded = '%' + hexDigit;

	    /**
	     * pchar = unreserved / pct-encoded / sub-delims / ":" / "@"
	     */
	    const pchar = unreserved + pctEncoded + subDelims + ':@';
	    const pcharOnly = '[' + pchar + ']';

	    /**
	     * Rule to support zero-padded addresses.
	     */
	    const zeroPad = '0?';

	    /**
	     * dec-octet   = DIGIT                 ; 0-9
	     *            / %x31-39 DIGIT         ; 10-99
	     *            / "1" 2DIGIT            ; 100-199
	     *            / "2" %x30-34 DIGIT     ; 200-249
	     *            / "25" %x30-35          ; 250-255
	     */
	    const decOctect = '(?:' + zeroPad + zeroPad + digitOnly + or + zeroPad + '[1-9]' + digitOnly + or + '1' + digitOnly + digitOnly + or + '2' + '[0-4]' + digitOnly + or + '25' + '[0-5])';

	    /**
	     * IPv4address = dec-octet "." dec-octet "." dec-octet "." dec-octet
	     */
	    internals.rfc3986.IPv4address = '(?:' + decOctect + '\\.){3}' + decOctect;

	    /**
	     * h16 = 1*4HEXDIG ; 16 bits of address represented in hexadecimal
	     * ls32 = ( h16 ":" h16 ) / IPv4address ; least-significant 32 bits of address
	     * IPv6address =                            6( h16 ":" ) ls32
	     *             /                       "::" 5( h16 ":" ) ls32
	     *             / [               h16 ] "::" 4( h16 ":" ) ls32
	     *             / [ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
	     *             / [ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
	     *             / [ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
	     *             / [ *4( h16 ":" ) h16 ] "::"              ls32
	     *             / [ *5( h16 ":" ) h16 ] "::"              h16
	     *             / [ *6( h16 ":" ) h16 ] "::"
	     */
	    const h16 = hexDigitOnly + '{1,4}';
	    const ls32 = '(?:' + h16 + ':' + h16 + '|' + internals.rfc3986.IPv4address + ')';
	    const IPv6SixHex = '(?:' + h16 + ':){6}' + ls32;
	    const IPv6FiveHex = '::(?:' + h16 + ':){5}' + ls32;
	    const IPv6FourHex = '(?:' + h16 + ')?::(?:' + h16 + ':){4}' + ls32;
	    const IPv6ThreeHex = '(?:(?:' + h16 + ':){0,1}' + h16 + ')?::(?:' + h16 + ':){3}' + ls32;
	    const IPv6TwoHex = '(?:(?:' + h16 + ':){0,2}' + h16 + ')?::(?:' + h16 + ':){2}' + ls32;
	    const IPv6OneHex = '(?:(?:' + h16 + ':){0,3}' + h16 + ')?::' + h16 + ':' + ls32;
	    const IPv6NoneHex = '(?:(?:' + h16 + ':){0,4}' + h16 + ')?::' + ls32;
	    const IPv6NoneHex2 = '(?:(?:' + h16 + ':){0,5}' + h16 + ')?::' + h16;
	    const IPv6NoneHex3 = '(?:(?:' + h16 + ':){0,6}' + h16 + ')?::';
	    internals.rfc3986.IPv6address = '(?:' + IPv6SixHex + or + IPv6FiveHex + or + IPv6FourHex + or + IPv6ThreeHex + or + IPv6TwoHex + or + IPv6OneHex + or + IPv6NoneHex + or + IPv6NoneHex2 + or + IPv6NoneHex3 + ')';

	    /**
	     * IPvFuture = "v" 1*HEXDIG "." 1*( unreserved / sub-delims / ":" )
	     */
	    internals.rfc3986.IPvFuture = 'v' + hexDigitOnly + '+\\.[' + unreserved + subDelims + ':]+';

	    /**
	     * scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
	     */
	    internals.rfc3986.scheme = alphaOnly + '[' + alpha + digit + '+-\\.]*';

	    /**
	     * userinfo = *( unreserved / pct-encoded / sub-delims / ":" )
	     */
	    const userinfo = '[' + unreserved + pctEncoded + subDelims + ':]*';

	    /**
	     * IP-literal = "[" ( IPv6address / IPvFuture  ) "]"
	     */
	    const IPLiteral = '\\[(?:' + internals.rfc3986.IPv6address + or + internals.rfc3986.IPvFuture + ')\\]';

	    /**
	     * reg-name = *( unreserved / pct-encoded / sub-delims )
	     */
	    const regName = '[' + unreserved + pctEncoded + subDelims + ']{0,255}';

	    /**
	     * host = IP-literal / IPv4address / reg-name
	     */
	    const host = '(?:' + IPLiteral + or + internals.rfc3986.IPv4address + or + regName + ')';

	    /**
	     * port = *DIGIT
	     */
	    const port = digitOnly + '*';

	    /**
	     * authority   = [ userinfo "@" ] host [ ":" port ]
	     */
	    const authority = '(?:' + userinfo + '@)?' + host + '(?::' + port + ')?';

	    /**
	     * segment       = *pchar
	     * segment-nz    = 1*pchar
	     * path          = path-abempty    ; begins with "/" or is empty
	     *               / path-absolute   ; begins with "/" but not "//"
	     *               / path-noscheme   ; begins with a non-colon segment
	     *               / path-rootless   ; begins with a segment
	     *               / path-empty      ; zero characters
	     * path-abempty  = *( "/" segment )
	     * path-absolute = "/" [ segment-nz *( "/" segment ) ]
	     * path-rootless = segment-nz *( "/" segment )
	     */
	    const segment = pcharOnly + '*';
	    const segmentNz = pcharOnly + '+';
	    const segmentNzNc = '[' + unreserved + pctEncoded + subDelims + '@' + ']+';
	    const pathEmpty = '';
	    const pathAbEmpty = '(?:\\/' + segment + ')*';
	    const pathAbsolute = '\\/(?:' + segmentNz + pathAbEmpty + ')?';
	    const pathRootless = segmentNz + pathAbEmpty;
	    const pathNoScheme = segmentNzNc + pathAbEmpty;

	    /**
	     * hier-part = "//" authority path
	     */
	    internals.rfc3986.hierPart = '(?:' + '(?:\\/\\/' + authority + pathAbEmpty + ')' + or + pathAbsolute + or + pathRootless + ')';

	    /**
	     * relative-part = "//" authority path-abempty
	     *                 / path-absolute
	     *                 / path-noscheme
	     *                 / path-empty
	     */
	    internals.rfc3986.relativeRef = '(?:' + '(?:\\/\\/' + authority + pathAbEmpty  + ')' + or + pathAbsolute + or + pathNoScheme + or + pathEmpty + ')';

	    /**
	     * query = *( pchar / "/" / "?" )
	     */
	    internals.rfc3986.query = '[' + pchar + '\\/\\?]*(?=#|$)'; //Finish matching either at the fragment part or end of the line.

	    /**
	     * fragment = *( pchar / "/" / "?" )
	     */
	    internals.rfc3986.fragment = '[' + pchar + '\\/\\?]*';
	};


	internals.generate();

	module.exports = internals.rfc3986;


/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// Load modules

	const RFC3986 = __webpack_require__(348);


	// Declare internals

	const internals = {
	    Ip: {
	        cidrs: {
	            required: '\\/(?:' + RFC3986.cidr + ')',
	            optional: '(?:\\/(?:' + RFC3986.cidr + '))?',
	            forbidden: ''
	        },
	        versions: {
	            ipv4: RFC3986.IPv4address,
	            ipv6: RFC3986.IPv6address,
	            ipvfuture: RFC3986.IPvFuture
	        }
	    }
	};


	internals.Ip.createIpRegex = function (versions, cidr) {

	    let regex;
	    for (let i = 0; i < versions.length; ++i) {
	        const version = versions[i];
	        if (!regex) {
	            regex = '^(?:' + internals.Ip.versions[version];
	        }
	        regex = regex + '|' + internals.Ip.versions[version];
	    }

	    return new RegExp(regex + ')' + internals.Ip.cidrs[cidr] + '$');
	};

	module.exports = internals.Ip;


/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// Load modules

	const Dns = __webpack_require__(351);


	// Declare internals

	const internals = {
	    hasOwn: Object.prototype.hasOwnProperty,
	    indexOf: Array.prototype.indexOf,
	    defaultThreshold: 16,
	    maxIPv6Groups: 8,

	    categories: {
	        valid: 1,
	        dnsWarn: 7,
	        rfc5321: 15,
	        cfws: 31,
	        deprecated: 63,
	        rfc5322: 127,
	        error: 255
	    },

	    diagnoses: {

	        // Address is valid

	        valid: 0,

	        // Address is valid, but the DNS check failed

	        dnsWarnNoMXRecord: 5,
	        dnsWarnNoRecord: 6,

	        // Address is valid for SMTP but has unusual elements

	        rfc5321TLD: 9,
	        rfc5321TLDNumeric: 10,
	        rfc5321QuotedString: 11,
	        rfc5321AddressLiteral: 12,

	        // Address is valid for message, but must be modified for envelope

	        cfwsComment: 17,
	        cfwsFWS: 18,

	        // Address contains deprecated elements, but may still be valid in some contexts

	        deprecatedLocalPart: 33,
	        deprecatedFWS: 34,
	        deprecatedQTEXT: 35,
	        deprecatedQP: 36,
	        deprecatedComment: 37,
	        deprecatedCTEXT: 38,
	        deprecatedIPv6: 39,
	        deprecatedCFWSNearAt: 49,

	        // Address is only valid according to broad definition in RFC 5322, but is otherwise invalid

	        rfc5322Domain: 65,
	        rfc5322TooLong: 66,
	        rfc5322LocalTooLong: 67,
	        rfc5322DomainTooLong: 68,
	        rfc5322LabelTooLong: 69,
	        rfc5322DomainLiteral: 70,
	        rfc5322DomainLiteralOBSDText: 71,
	        rfc5322IPv6GroupCount: 72,
	        rfc5322IPv62x2xColon: 73,
	        rfc5322IPv6BadCharacter: 74,
	        rfc5322IPv6MaxGroups: 75,
	        rfc5322IPv6ColonStart: 76,
	        rfc5322IPv6ColonEnd: 77,

	        // Address is invalid for any purpose

	        errExpectingDTEXT: 129,
	        errNoLocalPart: 130,
	        errNoDomain: 131,
	        errConsecutiveDots: 132,
	        errATEXTAfterCFWS: 133,
	        errATEXTAfterQS: 134,
	        errATEXTAfterDomainLiteral: 135,
	        errExpectingQPair: 136,
	        errExpectingATEXT: 137,
	        errExpectingQTEXT: 138,
	        errExpectingCTEXT: 139,
	        errBackslashEnd: 140,
	        errDotStart: 141,
	        errDotEnd: 142,
	        errDomainHyphenStart: 143,
	        errDomainHyphenEnd: 144,
	        errUnclosedQuotedString: 145,
	        errUnclosedComment: 146,
	        errUnclosedDomainLiteral: 147,
	        errFWSCRLFx2: 148,
	        errFWSCRLFEnd: 149,
	        errCRNoLF: 150,
	        errUnknownTLD: 160,
	        errDomainTooShort: 161
	    },

	    components: {
	        localpart: 0,
	        domain: 1,
	        literal: 2,
	        contextComment: 3,
	        contextFWS: 4,
	        contextQuotedString: 5,
	        contextQuotedPair: 6
	    }
	};


	// $lab:coverage:off$
	internals.defer = typeof process !== 'undefined' && process && typeof process.nextTick === 'function' ?
	    process.nextTick.bind(process) :
	    function (callback) {

	        return setTimeout(callback, 0);
	    };
	// $lab:coverage:on$


	internals.specials = function () {

	    const specials = '()<>[]:;@\\,."';        // US-ASCII visible characters not valid for atext (http://tools.ietf.org/html/rfc5322#section-3.2.3)
	    const lookup = new Array(0x100);
	    for (let i = 0xff; i >= 0; --i) {
	        lookup[i] = false;
	    }

	    for (let i = 0; i < specials.length; ++i) {
	        lookup[specials.charCodeAt(i)] = true;
	    }

	    return function (code) {

	        return lookup[code];
	    };
	}();


	internals.regex = {
	    ipV4: /\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
	    ipV6: /^[a-fA-F\d]{0,4}$/
	};


	internals.checkIpV6 = function (items) {

	    return items.every((value) => internals.regex.ipV6.test(value));
	};


	internals.validDomain = function (tldAtom, options) {

	    if (options.tldBlacklist) {
	        if (Array.isArray(options.tldBlacklist)) {
	            return internals.indexOf.call(options.tldBlacklist, tldAtom) === -1;
	        }

	        return !internals.hasOwn.call(options.tldBlacklist, tldAtom);
	    }

	    if (Array.isArray(options.tldWhitelist)) {
	        return internals.indexOf.call(options.tldWhitelist, tldAtom) !== -1;
	    }

	    return internals.hasOwn.call(options.tldWhitelist, tldAtom);
	};


	/**
	 * Check that an email address conforms to RFCs 5321, 5322 and others
	 *
	 * We distinguish clearly between a Mailbox as defined by RFC 5321 and an
	 * addr-spec as defined by RFC 5322. Depending on the context, either can be
	 * regarded as a valid email address. The RFC 5321 Mailbox specification is
	 * more restrictive (comments, white space and obsolete forms are not allowed).
	 *
	 * @param {string} email The email address to check. See README for specifics.
	 * @param {Object} options The (optional) options:
	 *   {boolean} checkDNS If true then will check DNS for MX records. If
	 *     true this call to isEmail _will_ be asynchronous.
	 *   {*} errorLevel Determines the boundary between valid and invalid
	 *     addresses.
	 *   {*} tldBlacklist The set of domains to consider invalid.
	 *   {*} tldWhitelist The set of domains to consider valid.
	 *   {*} minDomainAtoms The minimum number of domain atoms which must be present
	 *     for the address to be valid.
	 * @param {function(number|boolean)} callback The (optional) callback handler.
	 * @return {*}
	 */

	exports.validate = internals.validate = function (email, options, callback) {

	    options = options || {};

	    if (typeof options === 'function') {
	        callback = options;
	        options = {};
	    }

	    if (typeof callback !== 'function') {
	        if (options.checkDNS) {
	            throw new TypeError('expected callback function for checkDNS option');
	        }

	        callback = null;
	    }

	    let diagnose;
	    let threshold;

	    if (typeof options.errorLevel === 'number') {
	        diagnose = true;
	        threshold = options.errorLevel;
	    }
	    else {
	        diagnose = !!options.errorLevel;
	        threshold = internals.diagnoses.valid;
	    }

	    if (options.tldWhitelist) {
	        if (typeof options.tldWhitelist === 'string') {
	            options.tldWhitelist = [options.tldWhitelist];
	        }
	        else if (typeof options.tldWhitelist !== 'object') {
	            throw new TypeError('expected array or object tldWhitelist');
	        }
	    }

	    if (options.tldBlacklist) {
	        if (typeof options.tldBlacklist === 'string') {
	            options.tldBlacklist = [options.tldBlacklist];
	        }
	        else if (typeof options.tldBlacklist !== 'object') {
	            throw new TypeError('expected array or object tldBlacklist');
	        }
	    }

	    if (options.minDomainAtoms && (options.minDomainAtoms !== ((+options.minDomainAtoms) | 0) || options.minDomainAtoms < 0)) {
	        throw new TypeError('expected positive integer minDomainAtoms');
	    }

	    let maxResult = internals.diagnoses.valid;
	    const updateResult = (value) => {

	        if (value > maxResult) {
	            maxResult = value;
	        }
	    };

	    const context = {
	        now: internals.components.localpart,
	        prev: internals.components.localpart,
	        stack: [internals.components.localpart]
	    };

	    let prevToken = '';

	    const parseData = {
	        local: '',
	        domain: ''
	    };
	    const atomData = {
	        locals: [''],
	        domains: ['']
	    };

	    let elementCount = 0;
	    let elementLength = 0;
	    let crlfCount = 0;
	    let charCode;

	    let hyphenFlag = false;
	    let assertEnd = false;

	    const emailLength = email.length;

	    let token;                                      // Token is used outside the loop, must declare similarly
	    for (let i = 0; i < emailLength; ++i) {
	        token = email[i];

	        switch (context.now) {
	            // Local-part
	            case internals.components.localpart:
	                // http://tools.ietf.org/html/rfc5322#section-3.4.1
	                //   local-part      =   dot-atom / quoted-string / obs-local-part
	                //
	                //   dot-atom        =   [CFWS] dot-atom-text [CFWS]
	                //
	                //   dot-atom-text   =   1*atext *("." 1*atext)
	                //
	                //   quoted-string   =   [CFWS]
	                //                       DQUOTE *([FWS] qcontent) [FWS] DQUOTE
	                //                       [CFWS]
	                //
	                //   obs-local-part  =   word *("." word)
	                //
	                //   word            =   atom / quoted-string
	                //
	                //   atom            =   [CFWS] 1*atext [CFWS]
	                switch (token) {
	                    // Comment
	                    case '(':
	                        if (elementLength === 0) {
	                            // Comments are OK at the beginning of an element
	                            updateResult(elementCount === 0 ? internals.diagnoses.cfwsComment : internals.diagnoses.deprecatedComment);
	                        }
	                        else {
	                            updateResult(internals.diagnoses.cfwsComment);
	                            // Cannot start a comment in an element, should be end
	                            assertEnd = true;
	                        }

	                        context.stack.push(context.now);
	                        context.now = internals.components.contextComment;
	                        break;

	                        // Next dot-atom element
	                    case '.':
	                        if (elementLength === 0) {
	                            // Another dot, already?
	                            updateResult(elementCount === 0 ? internals.diagnoses.errDotStart : internals.diagnoses.errConsecutiveDots);
	                        }
	                        else {
	                            // The entire local-part can be a quoted string for RFC 5321; if one atom is quoted it's an RFC 5322 obsolete form
	                            if (assertEnd) {
	                                updateResult(internals.diagnoses.deprecatedLocalPart);
	                            }

	                            // CFWS & quoted strings are OK again now we're at the beginning of an element (although they are obsolete forms)
	                            assertEnd = false;
	                            elementLength = 0;
	                            ++elementCount;
	                            parseData.local += token;
	                            atomData.locals[elementCount] = '';
	                        }

	                        break;

	                        // Quoted string
	                    case '"':
	                        if (elementLength === 0) {
	                            // The entire local-part can be a quoted string for RFC 5321; if one atom is quoted it's an RFC 5322 obsolete form
	                            updateResult(elementCount === 0 ? internals.diagnoses.rfc5321QuotedString : internals.diagnoses.deprecatedLocalPart);

	                            parseData.local += token;
	                            atomData.locals[elementCount] += token;
	                            ++elementLength;

	                            // Quoted string must be the entire element
	                            assertEnd = true;
	                            context.stack.push(context.now);
	                            context.now = internals.components.contextQuotedString;
	                        }
	                        else {
	                            updateResult(internals.diagnoses.errExpectingATEXT);
	                        }

	                        break;

	                        // Folding white space
	                    case '\r':
	                        if (emailLength === ++i || email[i] !== '\n') {
	                            // Fatal error
	                            updateResult(internals.diagnoses.errCRNoLF);
	                            break;
	                        }

	                        // Fallthrough

	                    case ' ':
	                    case '\t':
	                        if (elementLength === 0) {
	                            updateResult(elementCount === 0 ? internals.diagnoses.cfwsFWS : internals.diagnoses.deprecatedFWS);
	                        }
	                        else {
	                            // We can't start FWS in the middle of an element, better be end
	                            assertEnd = true;
	                        }

	                        context.stack.push(context.now);
	                        context.now = internals.components.contextFWS;
	                        prevToken = token;
	                        break;

	                    case '@':
	                        // At this point we should have a valid local-part
	                        // $lab:coverage:off$
	                        if (context.stack.length !== 1) {
	                            throw new Error('unexpected item on context stack');
	                        }
	                        // $lab:coverage:on$

	                        if (parseData.local.length === 0) {
	                            // Fatal error
	                            updateResult(internals.diagnoses.errNoLocalPart);
	                        }
	                        else if (elementLength === 0) {
	                            // Fatal error
	                            updateResult(internals.diagnoses.errDotEnd);
	                        }
	                            // http://tools.ietf.org/html/rfc5321#section-4.5.3.1.1 the maximum total length of a user name or other local-part is 64
	                            //    octets
	                        else if (parseData.local.length > 64) {
	                            updateResult(internals.diagnoses.rfc5322LocalTooLong);
	                        }
	                            // http://tools.ietf.org/html/rfc5322#section-3.4.1 comments and folding white space SHOULD NOT be used around "@" in the
	                            //    addr-spec
	                            //
	                            // http://tools.ietf.org/html/rfc2119
	                            // 4. SHOULD NOT this phrase, or the phrase "NOT RECOMMENDED" mean that there may exist valid reasons in particular
	                            //    circumstances when the particular behavior is acceptable or even useful, but the full implications should be understood
	                            //    and the case carefully weighed before implementing any behavior described with this label.
	                        else if (context.prev === internals.components.contextComment || context.prev === internals.components.contextFWS) {
	                            updateResult(internals.diagnoses.deprecatedCFWSNearAt);
	                        }

	                        // Clear everything down for the domain parsing
	                        context.now = internals.components.domain;
	                        context.stack[0] = internals.components.domain;
	                        elementCount = 0;
	                        elementLength = 0;
	                        assertEnd = false; // CFWS can only appear at the end of the element
	                        break;

	                        // ATEXT
	                    default:
	                        // http://tools.ietf.org/html/rfc5322#section-3.2.3
	                        //    atext = ALPHA / DIGIT / ; Printable US-ASCII
	                        //            "!" / "#" /     ;  characters not including
	                        //            "$" / "%" /     ;  specials.  Used for atoms.
	                        //            "&" / "'" /
	                        //            "*" / "+" /
	                        //            "-" / "/" /
	                        //            "=" / "?" /
	                        //            "^" / "_" /
	                        //            "`" / "{" /
	                        //            "|" / "}" /
	                        //            "~"
	                        if (assertEnd) {
	                            // We have encountered atext where it is no longer valid
	                            switch (context.prev) {
	                                case internals.components.contextComment:
	                                case internals.components.contextFWS:
	                                    updateResult(internals.diagnoses.errATEXTAfterCFWS);
	                                    break;

	                                case internals.components.contextQuotedString:
	                                    updateResult(internals.diagnoses.errATEXTAfterQS);
	                                    break;

	                                    // $lab:coverage:off$
	                                default:
	                                    throw new Error('more atext found where none is allowed, but unrecognized prev context: ' + context.prev);
	                                    // $lab:coverage:on$
	                            }
	                        }
	                        else {
	                            context.prev = context.now;
	                            charCode = token.charCodeAt(0);

	                            // Especially if charCode == 10
	                            if (charCode < 33 || charCode > 126 || internals.specials(charCode)) {

	                                // Fatal error
	                                updateResult(internals.diagnoses.errExpectingATEXT);
	                            }

	                            parseData.local += token;
	                            atomData.locals[elementCount] += token;
	                            ++elementLength;
	                        }
	                }

	                break;

	            case internals.components.domain:
	                // http://tools.ietf.org/html/rfc5322#section-3.4.1
	                //   domain          =   dot-atom / domain-literal / obs-domain
	                //
	                //   dot-atom        =   [CFWS] dot-atom-text [CFWS]
	                //
	                //   dot-atom-text   =   1*atext *("." 1*atext)
	                //
	                //   domain-literal  =   [CFWS] "[" *([FWS] dtext) [FWS] "]" [CFWS]
	                //
	                //   dtext           =   %d33-90 /          ; Printable US-ASCII
	                //                       %d94-126 /         ;  characters not including
	                //                       obs-dtext          ;  "[", "]", or "\"
	                //
	                //   obs-domain      =   atom *("." atom)
	                //
	                //   atom            =   [CFWS] 1*atext [CFWS]

	                // http://tools.ietf.org/html/rfc5321#section-4.1.2
	                //   Mailbox        = Local-part "@" ( Domain / address-literal )
	                //
	                //   Domain         = sub-domain *("." sub-domain)
	                //
	                //   address-literal  = "[" ( IPv4-address-literal /
	                //                    IPv6-address-literal /
	                //                    General-address-literal ) "]"
	                //                    ; See Section 4.1.3

	                // http://tools.ietf.org/html/rfc5322#section-3.4.1
	                //      Note: A liberal syntax for the domain portion of addr-spec is
	                //      given here.  However, the domain portion contains addressing
	                //      information specified by and used in other protocols (e.g.,
	                //      [RFC1034], [RFC1035], [RFC1123], [RFC5321]).  It is therefore
	                //      incumbent upon implementations to conform to the syntax of
	                //      addresses for the context in which they are used.
	                //
	                // is_email() author's note: it's not clear how to interpret this in
	                // he context of a general email address validator. The conclusion I
	                // have reached is this: "addressing information" must comply with
	                // RFC 5321 (and in turn RFC 1035), anything that is "semantically
	                // invisible" must comply only with RFC 5322.
	                switch (token) {
	                    // Comment
	                    case '(':
	                        if (elementLength === 0) {
	                            // Comments at the start of the domain are deprecated in the text, comments at the start of a subdomain are obs-domain
	                            // http://tools.ietf.org/html/rfc5322#section-3.4.1
	                            updateResult(elementCount === 0 ? internals.diagnoses.deprecatedCFWSNearAt : internals.diagnoses.deprecatedComment);
	                        }
	                        else {
	                            // We can't start a comment mid-element, better be at the end
	                            assertEnd = true;
	                            updateResult(internals.diagnoses.cfwsComment);
	                        }

	                        context.stack.push(context.now);
	                        context.now = internals.components.contextComment;
	                        break;

	                        // Next dot-atom element
	                    case '.':
	                        if (elementLength === 0) {
	                            // Another dot, already? Fatal error.
	                            updateResult(elementCount === 0 ? internals.diagnoses.errDotStart : internals.diagnoses.errConsecutiveDots);
	                        }
	                        else if (hyphenFlag) {
	                            // Previous subdomain ended in a hyphen. Fatal error.
	                            updateResult(internals.diagnoses.errDomainHyphenEnd);
	                        }
	                        else if (elementLength > 63) {
	                            // Nowhere in RFC 5321 does it say explicitly that the domain part of a Mailbox must be a valid domain according to the
	                            // DNS standards set out in RFC 1035, but this *is* implied in several places. For instance, wherever the idea of host
	                            // routing is discussed the RFC says that the domain must be looked up in the DNS. This would be nonsense unless the
	                            // domain was designed to be a valid DNS domain. Hence we must conclude that the RFC 1035 restriction on label length
	                            // also applies to RFC 5321 domains.
	                            //
	                            // http://tools.ietf.org/html/rfc1035#section-2.3.4
	                            // labels          63 octets or less

	                            updateResult(internals.diagnoses.rfc5322LabelTooLong);
	                        }

	                        // CFWS is OK again now we're at the beginning of an element (although
	                        // it may be obsolete CFWS)
	                        assertEnd = false;
	                        elementLength = 0;
	                        ++elementCount;
	                        atomData.domains[elementCount] = '';
	                        parseData.domain += token;

	                        break;

	                        // Domain literal
	                    case '[':
	                        if (parseData.domain.length === 0) {
	                            // Domain literal must be the only component
	                            assertEnd = true;
	                            ++elementLength;
	                            context.stack.push(context.now);
	                            context.now = internals.components.literal;
	                            parseData.domain += token;
	                            atomData.domains[elementCount] += token;
	                            parseData.literal = '';
	                        }
	                        else {
	                            // Fatal error
	                            updateResult(internals.diagnoses.errExpectingATEXT);
	                        }

	                        break;

	                        // Folding white space
	                    case '\r':
	                        if (emailLength === ++i || email[i] !== '\n') {
	                            // Fatal error
	                            updateResult(internals.diagnoses.errCRNoLF);
	                            break;
	                        }

	                        // Fallthrough

	                    case ' ':
	                    case '\t':
	                        if (elementLength === 0) {
	                            updateResult(elementCount === 0 ? internals.diagnoses.deprecatedCFWSNearAt : internals.diagnoses.deprecatedFWS);
	                        }
	                        else {
	                            // We can't start FWS in the middle of an element, so this better be the end
	                            updateResult(internals.diagnoses.cfwsFWS);
	                            assertEnd = true;
	                        }

	                        context.stack.push(context.now);
	                        context.now = internals.components.contextFWS;
	                        prevToken = token;
	                        break;

	                        // This must be ATEXT
	                    default:
	                        // RFC 5322 allows any atext...
	                        // http://tools.ietf.org/html/rfc5322#section-3.2.3
	                        //    atext = ALPHA / DIGIT / ; Printable US-ASCII
	                        //            "!" / "#" /     ;  characters not including
	                        //            "$" / "%" /     ;  specials.  Used for atoms.
	                        //            "&" / "'" /
	                        //            "*" / "+" /
	                        //            "-" / "/" /
	                        //            "=" / "?" /
	                        //            "^" / "_" /
	                        //            "`" / "{" /
	                        //            "|" / "}" /
	                        //            "~"

	                        // But RFC 5321 only allows letter-digit-hyphen to comply with DNS rules
	                        //   (RFCs 1034 & 1123)
	                        // http://tools.ietf.org/html/rfc5321#section-4.1.2
	                        //   sub-domain     = Let-dig [Ldh-str]
	                        //
	                        //   Let-dig        = ALPHA / DIGIT
	                        //
	                        //   Ldh-str        = *( ALPHA / DIGIT / "-" ) Let-dig
	                        //
	                        if (assertEnd) {
	                            // We have encountered ATEXT where it is no longer valid
	                            switch (context.prev) {
	                                case internals.components.contextComment:
	                                case internals.components.contextFWS:
	                                    updateResult(internals.diagnoses.errATEXTAfterCFWS);
	                                    break;

	                                case internals.components.literal:
	                                    updateResult(internals.diagnoses.errATEXTAfterDomainLiteral);
	                                    break;

	                                    // $lab:coverage:off$
	                                default:
	                                    throw new Error('more atext found where none is allowed, but unrecognized prev context: ' + context.prev);
	                                    // $lab:coverage:on$
	                            }
	                        }

	                        charCode = token.charCodeAt(0);
	                        // Assume this token isn't a hyphen unless we discover it is
	                        hyphenFlag = false;

	                        if (charCode < 33 || charCode > 126 || internals.specials(charCode)) {
	                            // Fatal error
	                            updateResult(internals.diagnoses.errExpectingATEXT);
	                        }
	                        else if (token === '-') {
	                            if (elementLength === 0) {
	                                // Hyphens cannot be at the beginning of a subdomain, fatal error
	                                updateResult(internals.diagnoses.errDomainHyphenStart);
	                            }

	                            hyphenFlag = true;
	                        }
	                            // Check if it's a neither a number nor a latin letter
	                        else if (charCode < 48 || charCode > 122 || (charCode > 57 && charCode < 65) || (charCode > 90 && charCode < 97)) {
	                            // This is not an RFC 5321 subdomain, but still OK by RFC 5322
	                            updateResult(internals.diagnoses.rfc5322Domain);
	                        }

	                        parseData.domain += token;
	                        atomData.domains[elementCount] += token;
	                        ++elementLength;
	                }

	                break;

	                // Domain literal
	            case internals.components.literal:
	                // http://tools.ietf.org/html/rfc5322#section-3.4.1
	                //   domain-literal  =   [CFWS] "[" *([FWS] dtext) [FWS] "]" [CFWS]
	                //
	                //   dtext           =   %d33-90 /          ; Printable US-ASCII
	                //                       %d94-126 /         ;  characters not including
	                //                       obs-dtext          ;  "[", "]", or "\"
	                //
	                //   obs-dtext       =   obs-NO-WS-CTL / quoted-pair
	                switch (token) {
	                    // End of domain literal
	                    case ']':
	                        if (maxResult < internals.categories.deprecated) {
	                            // Could be a valid RFC 5321 address literal, so let's check

	                            // http://tools.ietf.org/html/rfc5321#section-4.1.2
	                            //   address-literal  = "[" ( IPv4-address-literal /
	                            //                    IPv6-address-literal /
	                            //                    General-address-literal ) "]"
	                            //                    ; See Section 4.1.3
	                            //
	                            // http://tools.ietf.org/html/rfc5321#section-4.1.3
	                            //   IPv4-address-literal  = Snum 3("."  Snum)
	                            //
	                            //   IPv6-address-literal  = "IPv6:" IPv6-addr
	                            //
	                            //   General-address-literal  = Standardized-tag ":" 1*dcontent
	                            //
	                            //   Standardized-tag  = Ldh-str
	                            //                     ; Standardized-tag MUST be specified in a
	                            //                     ; Standards-Track RFC and registered with IANA
	                            //
	                            //   dcontent      = %d33-90 / ; Printable US-ASCII
	                            //                 %d94-126 ; excl. "[", "\", "]"
	                            //
	                            //   Snum          = 1*3DIGIT
	                            //                 ; representing a decimal integer
	                            //                 ; value in the range 0 through 255
	                            //
	                            //   IPv6-addr     = IPv6-full / IPv6-comp / IPv6v4-full / IPv6v4-comp
	                            //
	                            //   IPv6-hex      = 1*4HEXDIG
	                            //
	                            //   IPv6-full     = IPv6-hex 7(":" IPv6-hex)
	                            //
	                            //   IPv6-comp     = [IPv6-hex *5(":" IPv6-hex)] "::"
	                            //                 [IPv6-hex *5(":" IPv6-hex)]
	                            //                 ; The "::" represents at least 2 16-bit groups of
	                            //                 ; zeros.  No more than 6 groups in addition to the
	                            //                 ; "::" may be present.
	                            //
	                            //   IPv6v4-full   = IPv6-hex 5(":" IPv6-hex) ":" IPv4-address-literal
	                            //
	                            //   IPv6v4-comp   = [IPv6-hex *3(":" IPv6-hex)] "::"
	                            //                 [IPv6-hex *3(":" IPv6-hex) ":"]
	                            //                 IPv4-address-literal
	                            //                 ; The "::" represents at least 2 16-bit groups of
	                            //                 ; zeros.  No more than 4 groups in addition to the
	                            //                 ; "::" and IPv4-address-literal may be present.

	                            let index = -1;
	                            let addressLiteral = parseData.literal;
	                            const matchesIP = internals.regex.ipV4.exec(addressLiteral);

	                            // Maybe extract IPv4 part from the end of the address-literal
	                            if (matchesIP) {
	                                index = matchesIP.index;
	                                if (index !== 0) {
	                                    // Convert IPv4 part to IPv6 format for futher testing
	                                    addressLiteral = addressLiteral.slice(0, index) + '0:0';
	                                }
	                            }

	                            if (index === 0) {
	                                // Nothing there except a valid IPv4 address, so...
	                                updateResult(internals.diagnoses.rfc5321AddressLiteral);
	                            }
	                            else if (addressLiteral.slice(0, 5).toLowerCase() !== 'ipv6:') {
	                                updateResult(internals.diagnoses.rfc5322DomainLiteral);
	                            }
	                            else {
	                                const match = addressLiteral.slice(5);
	                                let maxGroups = internals.maxIPv6Groups;
	                                const groups = match.split(':');
	                                index = match.indexOf('::');

	                                if (!~index) {
	                                    // Need exactly the right number of groups
	                                    if (groups.length !== maxGroups) {
	                                        updateResult(internals.diagnoses.rfc5322IPv6GroupCount);
	                                    }
	                                }
	                                else if (index !== match.lastIndexOf('::')) {
	                                    updateResult(internals.diagnoses.rfc5322IPv62x2xColon);
	                                }
	                                else {
	                                    if (index === 0 || index === match.length - 2) {
	                                        // RFC 4291 allows :: at the start or end of an address with 7 other groups in addition
	                                        ++maxGroups;
	                                    }

	                                    if (groups.length > maxGroups) {
	                                        updateResult(internals.diagnoses.rfc5322IPv6MaxGroups);
	                                    }
	                                    else if (groups.length === maxGroups) {
	                                        // Eliding a single "::"
	                                        updateResult(internals.diagnoses.deprecatedIPv6);
	                                    }
	                                }

	                                // IPv6 testing strategy
	                                if (match[0] === ':' && match[1] !== ':') {
	                                    updateResult(internals.diagnoses.rfc5322IPv6ColonStart);
	                                }
	                                else if (match[match.length - 1] === ':' && match[match.length - 2] !== ':') {
	                                    updateResult(internals.diagnoses.rfc5322IPv6ColonEnd);
	                                }
	                                else if (internals.checkIpV6(groups)) {
	                                    updateResult(internals.diagnoses.rfc5321AddressLiteral);
	                                }
	                                else {
	                                    updateResult(internals.diagnoses.rfc5322IPv6BadCharacter);
	                                }
	                            }
	                        }
	                        else {
	                            updateResult(internals.diagnoses.rfc5322DomainLiteral);
	                        }

	                        parseData.domain += token;
	                        atomData.domains[elementCount] += token;
	                        ++elementLength;
	                        context.prev = context.now;
	                        context.now = context.stack.pop();
	                        break;

	                    case '\\':
	                        updateResult(internals.diagnoses.rfc5322DomainLiteralOBSDText);
	                        context.stack.push(context.now);
	                        context.now = internals.components.contextQuotedPair;
	                        break;

	                        // Folding white space
	                    case '\r':
	                        if (emailLength === ++i || email[i] !== '\n') {
	                            updateResult(internals.diagnoses.errCRNoLF);
	                            break;
	                        }

	                        // Fallthrough

	                    case ' ':
	                    case '\t':
	                        updateResult(internals.diagnoses.cfwsFWS);

	                        context.stack.push(context.now);
	                        context.now = internals.components.contextFWS;
	                        prevToken = token;
	                        break;

	                        // DTEXT
	                    default:
	                        // http://tools.ietf.org/html/rfc5322#section-3.4.1
	                        //   dtext         =   %d33-90 /  ; Printable US-ASCII
	                        //                     %d94-126 / ;  characters not including
	                        //                     obs-dtext  ;  "[", "]", or "\"
	                        //
	                        //   obs-dtext     =   obs-NO-WS-CTL / quoted-pair
	                        //
	                        //   obs-NO-WS-CTL =   %d1-8 /    ; US-ASCII control
	                        //                     %d11 /     ;  characters that do not
	                        //                     %d12 /     ;  include the carriage
	                        //                     %d14-31 /  ;  return, line feed, and
	                        //                     %d127      ;  white space characters
	                        charCode = token.charCodeAt(0);

	                        // '\r', '\n', ' ', and '\t' have already been parsed above
	                        if (charCode > 127 || charCode === 0 || token === '[') {
	                            // Fatal error
	                            updateResult(internals.diagnoses.errExpectingDTEXT);
	                            break;
	                        }
	                        else if (charCode < 33 || charCode === 127) {
	                            updateResult(internals.diagnoses.rfc5322DomainLiteralOBSDText);
	                        }

	                        parseData.literal += token;
	                        parseData.domain += token;
	                        atomData.domains[elementCount] += token;
	                        ++elementLength;
	                }

	                break;

	                // Quoted string
	            case internals.components.contextQuotedString:
	                // http://tools.ietf.org/html/rfc5322#section-3.2.4
	                //   quoted-string = [CFWS]
	                //                   DQUOTE *([FWS] qcontent) [FWS] DQUOTE
	                //                   [CFWS]
	                //
	                //   qcontent      = qtext / quoted-pair
	                switch (token) {
	                    // Quoted pair
	                    case '\\':
	                        context.stack.push(context.now);
	                        context.now = internals.components.contextQuotedPair;
	                        break;

	                        // Folding white space. Spaces are allowed as regular characters inside a quoted string - it's only FWS if we include '\t' or '\r\n'
	                    case '\r':
	                        if (emailLength === ++i || email[i] !== '\n') {
	                            // Fatal error
	                            updateResult(internals.diagnoses.errCRNoLF);
	                            break;
	                        }

	                        // Fallthrough

	                    case '\t':
	                        // http://tools.ietf.org/html/rfc5322#section-3.2.2
	                        //   Runs of FWS, comment, or CFWS that occur between lexical tokens in
	                        //   a structured header field are semantically interpreted as a single
	                        //   space character.

	                        // http://tools.ietf.org/html/rfc5322#section-3.2.4
	                        //   the CRLF in any FWS/CFWS that appears within the quoted-string [is]
	                        //   semantically "invisible" and therefore not part of the
	                        //   quoted-string

	                        parseData.local += ' ';
	                        atomData.locals[elementCount] += ' ';
	                        ++elementLength;

	                        updateResult(internals.diagnoses.cfwsFWS);
	                        context.stack.push(context.now);
	                        context.now = internals.components.contextFWS;
	                        prevToken = token;
	                        break;

	                        // End of quoted string
	                    case '"':
	                        parseData.local += token;
	                        atomData.locals[elementCount] += token;
	                        ++elementLength;
	                        context.prev = context.now;
	                        context.now = context.stack.pop();
	                        break;

	                        // QTEXT
	                    default:
	                        // http://tools.ietf.org/html/rfc5322#section-3.2.4
	                        //   qtext          =   %d33 /             ; Printable US-ASCII
	                        //                      %d35-91 /          ;  characters not including
	                        //                      %d93-126 /         ;  "\" or the quote character
	                        //                      obs-qtext
	                        //
	                        //   obs-qtext      =   obs-NO-WS-CTL
	                        //
	                        //   obs-NO-WS-CTL  =   %d1-8 /            ; US-ASCII control
	                        //                      %d11 /             ;  characters that do not
	                        //                      %d12 /             ;  include the carriage
	                        //                      %d14-31 /          ;  return, line feed, and
	                        //                      %d127              ;  white space characters
	                        charCode = token.charCodeAt(0);

	                        if (charCode > 127 || charCode === 0 || charCode === 10) {
	                            updateResult(internals.diagnoses.errExpectingQTEXT);
	                        }
	                        else if (charCode < 32 || charCode === 127) {
	                            updateResult(internals.diagnoses.deprecatedQTEXT);
	                        }

	                        parseData.local += token;
	                        atomData.locals[elementCount] += token;
	                        ++elementLength;
	                }

	                // http://tools.ietf.org/html/rfc5322#section-3.4.1
	                //   If the string can be represented as a dot-atom (that is, it contains
	                //   no characters other than atext characters or "." surrounded by atext
	                //   characters), then the dot-atom form SHOULD be used and the quoted-
	                //   string form SHOULD NOT be used.

	                break;
	                // Quoted pair
	            case internals.components.contextQuotedPair:
	                // http://tools.ietf.org/html/rfc5322#section-3.2.1
	                //   quoted-pair     =   ("\" (VCHAR / WSP)) / obs-qp
	                //
	                //   VCHAR           =  %d33-126   ; visible (printing) characters
	                //   WSP             =  SP / HTAB  ; white space
	                //
	                //   obs-qp          =   "\" (%d0 / obs-NO-WS-CTL / LF / CR)
	                //
	                //   obs-NO-WS-CTL   =   %d1-8 /   ; US-ASCII control
	                //                       %d11 /    ;  characters that do not
	                //                       %d12 /    ;  include the carriage
	                //                       %d14-31 / ;  return, line feed, and
	                //                       %d127     ;  white space characters
	                //
	                // i.e. obs-qp       =  "\" (%d0-8, %d10-31 / %d127)
	                charCode = token.charCodeAt(0);

	                if (charCode > 127) {
	                    // Fatal error
	                    updateResult(internals.diagnoses.errExpectingQPair);
	                }
	                else if ((charCode < 31 && charCode !== 9) || charCode === 127) {
	                    // ' ' and '\t' are allowed
	                    updateResult(internals.diagnoses.deprecatedQP);
	                }

	                // At this point we know where this qpair occurred so we could check to see if the character actually needed to be quoted at all.
	                // http://tools.ietf.org/html/rfc5321#section-4.1.2
	                //   the sending system SHOULD transmit the form that uses the minimum quoting possible.

	                context.prev = context.now;
	                // End of qpair
	                context.now = context.stack.pop();
	                token = '\\' + token;

	                switch (context.now) {
	                    case internals.components.contextComment:
	                        break;

	                    case internals.components.contextQuotedString:
	                        parseData.local += token;
	                        atomData.locals[elementCount] += token;

	                        // The maximum sizes specified by RFC 5321 are octet counts, so we must include the backslash
	                        elementLength += 2;
	                        break;

	                    case internals.components.literal:
	                        parseData.domain += token;
	                        atomData.domains[elementCount] += token;

	                        // The maximum sizes specified by RFC 5321 are octet counts, so we must include the backslash
	                        elementLength += 2;
	                        break;

	                        // $lab:coverage:off$
	                    default:
	                        throw new Error('quoted pair logic invoked in an invalid context: ' + context.now);
	                        // $lab:coverage:on$
	                }
	                break;

	                // Comment
	            case internals.components.contextComment:
	                // http://tools.ietf.org/html/rfc5322#section-3.2.2
	                //   comment  = "(" *([FWS] ccontent) [FWS] ")"
	                //
	                //   ccontent = ctext / quoted-pair / comment
	                switch (token) {
	                    // Nested comment
	                    case '(':
	                        // Nested comments are ok
	                        context.stack.push(context.now);
	                        context.now = internals.components.contextComment;
	                        break;

	                        // End of comment
	                    case ')':
	                        context.prev = context.now;
	                        context.now = context.stack.pop();
	                        break;

	                        // Quoted pair
	                    case '\\':
	                        context.stack.push(context.now);
	                        context.now = internals.components.contextQuotedPair;
	                        break;

	                        // Folding white space
	                    case '\r':
	                        if (emailLength === ++i || email[i] !== '\n') {
	                            // Fatal error
	                            updateResult(internals.diagnoses.errCRNoLF);
	                            break;
	                        }

	                        // Fallthrough

	                    case ' ':
	                    case '\t':
	                        updateResult(internals.diagnoses.cfwsFWS);

	                        context.stack.push(context.now);
	                        context.now = internals.components.contextFWS;
	                        prevToken = token;
	                        break;

	                        // CTEXT
	                    default:
	                        // http://tools.ietf.org/html/rfc5322#section-3.2.3
	                        //   ctext         = %d33-39 /  ; Printable US-ASCII
	                        //                   %d42-91 /  ;  characters not including
	                        //                   %d93-126 / ;  "(", ")", or "\"
	                        //                   obs-ctext
	                        //
	                        //   obs-ctext     = obs-NO-WS-CTL
	                        //
	                        //   obs-NO-WS-CTL = %d1-8 /    ; US-ASCII control
	                        //                   %d11 /     ;  characters that do not
	                        //                   %d12 /     ;  include the carriage
	                        //                   %d14-31 /  ;  return, line feed, and
	                        //                   %d127      ;  white space characters
	                        charCode = token.charCodeAt(0);

	                        if (charCode > 127 || charCode === 0 || charCode === 10) {
	                            // Fatal error
	                            updateResult(internals.diagnoses.errExpectingCTEXT);
	                            break;
	                        }
	                        else if (charCode < 32 || charCode === 127) {
	                            updateResult(internals.diagnoses.deprecatedCTEXT);
	                        }
	                }

	                break;

	                // Folding white space
	            case internals.components.contextFWS:
	                // http://tools.ietf.org/html/rfc5322#section-3.2.2
	                //   FWS     =   ([*WSP CRLF] 1*WSP) /  obs-FWS
	                //                                   ; Folding white space

	                // But note the erratum:
	                // http://www.rfc-editor.org/errata_search.php?rfc=5322&eid=1908:
	                //   In the obsolete syntax, any amount of folding white space MAY be
	                //   inserted where the obs-FWS rule is allowed.  This creates the
	                //   possibility of having two consecutive "folds" in a line, and
	                //   therefore the possibility that a line which makes up a folded header
	                //   field could be composed entirely of white space.
	                //
	                //   obs-FWS =   1*([CRLF] WSP)

	                if (prevToken === '\r') {
	                    if (token === '\r') {
	                        // Fatal error
	                        updateResult(internals.diagnoses.errFWSCRLFx2);
	                        break;
	                    }

	                    if (++crlfCount > 1) {
	                        // Multiple folds => obsolete FWS
	                        updateResult(internals.diagnoses.deprecatedFWS);
	                    }
	                    else {
	                        crlfCount = 1;
	                    }
	                }

	                switch (token) {
	                    case '\r':
	                        if (emailLength === ++i || email[i] !== '\n') {
	                            // Fatal error
	                            updateResult(internals.diagnoses.errCRNoLF);
	                        }

	                        break;

	                    case ' ':
	                    case '\t':
	                        break;

	                    default:
	                        if (prevToken === '\r') {
	                            // Fatal error
	                            updateResult(internals.diagnoses.errFWSCRLFEnd);
	                        }

	                        crlfCount = 0;

	                        // End of FWS
	                        context.prev = context.now;
	                        context.now = context.stack.pop();

	                        // Look at this token again in the parent context
	                        --i;
	                }

	                prevToken = token;
	                break;

	                // Unexpected context
	                // $lab:coverage:off$
	            default:
	                throw new Error('unknown context: ' + context.now);
	                // $lab:coverage:on$
	        } // Primary state machine

	        if (maxResult > internals.categories.rfc5322) {
	            // Fatal error, no point continuing
	            break;
	        }
	    } // Token loop

	    // Check for errors
	    if (maxResult < internals.categories.rfc5322) {
	        // Fatal errors
	        if (context.now === internals.components.contextQuotedString) {
	            updateResult(internals.diagnoses.errUnclosedQuotedString);
	        }
	        else if (context.now === internals.components.contextQuotedPair) {
	            updateResult(internals.diagnoses.errBackslashEnd);
	        }
	        else if (context.now === internals.components.contextComment) {
	            updateResult(internals.diagnoses.errUnclosedComment);
	        }
	        else if (context.now === internals.components.literal) {
	            updateResult(internals.diagnoses.errUnclosedDomainLiteral);
	        }
	        else if (token === '\r') {
	            updateResult(internals.diagnoses.errFWSCRLFEnd);
	        }
	        else if (parseData.domain.length === 0) {
	            updateResult(internals.diagnoses.errNoDomain);
	        }
	        else if (elementLength === 0) {
	            updateResult(internals.diagnoses.errDotEnd);
	        }
	        else if (hyphenFlag) {
	            updateResult(internals.diagnoses.errDomainHyphenEnd);
	        }

	            // Other errors
	        else if (parseData.domain.length > 255) {
	            // http://tools.ietf.org/html/rfc5321#section-4.5.3.1.2
	            //   The maximum total length of a domain name or number is 255 octets.
	            updateResult(internals.diagnoses.rfc5322DomainTooLong);
	        }
	        else if (parseData.local.length + parseData.domain.length + /* '@' */ 1 > 254) {
	            // http://tools.ietf.org/html/rfc5321#section-4.1.2
	            //   Forward-path   = Path
	            //
	            //   Path           = "<" [ A-d-l ":" ] Mailbox ">"
	            //
	            // http://tools.ietf.org/html/rfc5321#section-4.5.3.1.3
	            //   The maximum total length of a reverse-path or forward-path is 256 octets (including the punctuation and element separators).
	            //
	            // Thus, even without (obsolete) routing information, the Mailbox can only be 254 characters long. This is confirmed by this verified
	            // erratum to RFC 3696:
	            //
	            // http://www.rfc-editor.org/errata_search.php?rfc=3696&eid=1690
	            //   However, there is a restriction in RFC 2821 on the length of an address in MAIL and RCPT commands of 254 characters.  Since
	            //   addresses that do not fit in those fields are not normally useful, the upper limit on address lengths should normally be considered
	            //   to be 254.
	            updateResult(internals.diagnoses.rfc5322TooLong);
	        }
	        else if (elementLength > 63) {
	            // http://tools.ietf.org/html/rfc1035#section-2.3.4
	            // labels   63 octets or less
	            updateResult(internals.diagnoses.rfc5322LabelTooLong);
	        }
	        else if (options.minDomainAtoms && atomData.domains.length < options.minDomainAtoms) {
	            updateResult(internals.diagnoses.errDomainTooShort);
	        }
	        else if (options.tldWhitelist || options.tldBlacklist) {
	            const tldAtom = atomData.domains[elementCount];

	            if (!internals.validDomain(tldAtom, options)) {
	                updateResult(internals.diagnoses.errUnknownTLD);
	            }
	        }
	    } // Check for errors

	    let dnsPositive = false;
	    let finishImmediately = false;

	    const finish = () => {

	        if (!dnsPositive && maxResult < internals.categories.dnsWarn) {
	            // Per RFC 5321, domain atoms are limited to letter-digit-hyphen, so we only need to check code <= 57 to check for a digit
	            const code = atomData.domains[elementCount].charCodeAt(0);
	            if (code <= 57) {
	                updateResult(internals.diagnoses.rfc5321TLDNumeric);
	            }
	            else if (elementCount === 0) {
	                updateResult(internals.diagnoses.rfc5321TLD);
	            }
	        }

	        if (maxResult < threshold) {
	            maxResult = internals.diagnoses.valid;
	        }

	        const finishResult = diagnose ? maxResult : maxResult < internals.defaultThreshold;

	        if (callback) {
	            if (finishImmediately) {
	                callback(finishResult);
	            }
	            else {
	                internals.defer(callback.bind(null, finishResult));
	            }
	        }

	        return finishResult;
	    }; // Finish

	    if (options.checkDNS && maxResult < internals.categories.dnsWarn) {
	        // http://tools.ietf.org/html/rfc5321#section-2.3.5
	        //   Names that can be resolved to MX RRs or address (i.e., A or AAAA) RRs (as discussed in Section 5) are permitted, as are CNAME RRs whose
	        //   targets can be resolved, in turn, to MX or address RRs.
	        //
	        // http://tools.ietf.org/html/rfc5321#section-5.1
	        //   The lookup first attempts to locate an MX record associated with the name.  If a CNAME record is found, the resulting name is processed
	        //   as if it were the initial name. ... If an empty list of MXs is returned, the address is treated as if it was associated with an implicit
	        //   MX RR, with a preference of 0, pointing to that host.
	        //
	        // isEmail() author's note: We will regard the existence of a CNAME to be sufficient evidence of the domain's existence. For performance
	        // reasons we will not repeat the DNS lookup for the CNAME's target, but we will raise a warning because we didn't immediately find an MX
	        // record.
	        if (elementCount === 0) {
	            // Checking TLD DNS only works if you explicitly check from the root
	            parseData.domain += '.';
	        }

	        const dnsDomain = parseData.domain;
	        Dns.resolveMx(dnsDomain, (err, mxRecords) => {

	            // If we have a fatal error, then we must assume that there are no records
	            if (err && err.code !== Dns.NODATA) {
	                updateResult(internals.diagnoses.dnsWarnNoRecord);
	                return finish();
	            }

	            if (mxRecords && mxRecords.length) {
	                dnsPositive = true;
	                return finish();
	            }

	            let count = 3;
	            let done = false;
	            updateResult(internals.diagnoses.dnsWarnNoMXRecord);

	            const handleRecords = (ignoreError, records) => {

	                if (done) {
	                    return;
	                }

	                --count;

	                if (records && records.length) {
	                    done = true;
	                    return finish();
	                }

	                if (count === 0) {
	                    // No usable records for the domain can be found
	                    updateResult(internals.diagnoses.dnsWarnNoRecord);
	                    done = true;
	                    finish();
	                }
	            };

	            Dns.resolveCname(dnsDomain, handleRecords);
	            Dns.resolve4(dnsDomain, handleRecords);
	            Dns.resolve6(dnsDomain, handleRecords);
	        });

	        finishImmediately = true;
	    }
	    else {
	        const result = finish();
	        finishImmediately = true;
	        return result;
	    } // CheckDNS
	};


	exports.diagnoses = internals.validate.diagnoses = (function () {

	    const diag = {};
	    const keys = Object.keys(internals.diagnoses);
	    for (let i = 0; i < keys.length; ++i) {
	        const key = keys[i];
	        diag[key] = internals.diagnoses[key];
	    }

	    return diag;
	})();


/***/ }),
/* 351 */
/***/ (function(module, exports) {

	module.exports = require("dns");

/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// Load modules

	const Any = __webpack_require__(338);
	const Ref = __webpack_require__(339);
	const Hoek = __webpack_require__(336);


	// Declare internals

	const internals = {
	    precisionRx: /(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/
	};


	internals.Number = class extends Any {

	    constructor() {

	        super();
	        this._type = 'number';
	        this._invalids.add(Infinity);
	        this._invalids.add(-Infinity);
	    }

	    _base(value, state, options) {

	        const result = {
	            errors: null,
	            value
	        };

	        if (typeof value === 'string' &&
	            options.convert) {

	            const number = parseFloat(value);
	            result.value = (isNaN(number) || !isFinite(value)) ? NaN : number;
	        }

	        const isNumber = typeof result.value === 'number' && !isNaN(result.value);

	        if (options.convert && 'precision' in this._flags && isNumber) {

	            // This is conceptually equivalent to using toFixed but it should be much faster
	            const precision = Math.pow(10, this._flags.precision);
	            result.value = Math.round(result.value * precision) / precision;
	        }

	        result.errors = isNumber ? null : this.createError('number.base', null, state, options);
	        return result;
	    }

	    multiple(base) {

	        const isRef = Ref.isRef(base);

	        if (!isRef) {
	            Hoek.assert(typeof base === 'number' && isFinite(base), 'multiple must be a number');
	            Hoek.assert(base > 0, 'multiple must be greater than 0');
	        }

	        return this._test('multiple', base, function (value, state, options) {

	            const divisor = isRef ? base(state.reference || state.parent, options) : base;

	            if (isRef && (typeof divisor !== 'number' || !isFinite(divisor))) {
	                return this.createError('number.ref', { ref: base.key }, state, options);
	            }

	            if (value % divisor === 0) {
	                return value;
	            }

	            return this.createError('number.multiple', { multiple: base, value }, state, options);
	        });
	    }

	    integer() {

	        return this._test('integer', undefined, function (value, state, options) {

	            return Number.isSafeInteger(value) ? value : this.createError('number.integer', { value }, state, options);
	        });
	    }

	    negative() {

	        return this._test('negative', undefined, function (value, state, options) {

	            if (value < 0) {
	                return value;
	            }

	            return this.createError('number.negative', { value }, state, options);
	        });
	    }

	    positive() {

	        return this._test('positive', undefined, function (value, state, options) {

	            if (value > 0) {
	                return value;
	            }

	            return this.createError('number.positive', { value }, state, options);
	        });
	    }

	    precision(limit) {

	        Hoek.assert(Number.isSafeInteger(limit), 'limit must be an integer');
	        Hoek.assert(!('precision' in this._flags), 'precision already set');

	        const obj = this._test('precision', limit, function (value, state, options) {

	            const places = value.toString().match(internals.precisionRx);
	            const decimals = Math.max((places[1] ? places[1].length : 0) - (places[2] ? parseInt(places[2], 10) : 0), 0);
	            if (decimals <= limit) {
	                return value;
	            }

	            return this.createError('number.precision', { limit, value }, state, options);
	        });

	        obj._flags.precision = limit;
	        return obj;
	    }

	};


	internals.compare = function (type, compare) {

	    return function (limit) {

	        const isRef = Ref.isRef(limit);
	        const isNumber = typeof limit === 'number' && !isNaN(limit);

	        Hoek.assert(isNumber || isRef, 'limit must be a number or reference');

	        return this._test(type, limit, function (value, state, options) {

	            let compareTo;
	            if (isRef) {
	                compareTo = limit(state.reference || state.parent, options);

	                if (!(typeof compareTo === 'number' && !isNaN(compareTo))) {
	                    return this.createError('number.ref', { ref: limit.key }, state, options);
	                }
	            }
	            else {
	                compareTo = limit;
	            }

	            if (compare(value, compareTo)) {
	                return value;
	            }

	            return this.createError('number.' + type, { limit: compareTo, value }, state, options);
	        });
	    };
	};


	internals.Number.prototype.min = internals.compare('min', (value, limit) => value >= limit);
	internals.Number.prototype.max = internals.compare('max', (value, limit) => value <= limit);
	internals.Number.prototype.greater = internals.compare('greater', (value, limit) => value > limit);
	internals.Number.prototype.less = internals.compare('less', (value, limit) => value < limit);


	module.exports = new internals.Number();


/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// Load modules

	const Any = __webpack_require__(338);
	const Hoek = __webpack_require__(336);


	// Declare internals

	const internals = {
	    Set: __webpack_require__(342)
	};


	internals.Boolean = class extends Any {
	    constructor() {

	        super();
	        this._type = 'boolean';
	        this._flags.insensitive = true;
	        this._inner.truthySet = new internals.Set();
	        this._inner.falsySet = new internals.Set();
	    }

	    _base(value, state, options) {

	        const result = {
	            value
	        };

	        if (typeof value === 'string' &&
	            options.convert) {

	            const normalized = this._flags.insensitive ? value.toLowerCase() : value;
	            result.value = (normalized === 'true' ? true
	                : (normalized === 'false' ? false : value));
	        }

	        if (typeof result.value !== 'boolean') {
	            result.value = (this._inner.truthySet.has(value, null, null, this._flags.insensitive) ? true
	                : (this._inner.falsySet.has(value, null, null, this._flags.insensitive) ? false : value));
	        }

	        result.errors = (typeof result.value === 'boolean') ? null : this.createError('boolean.base', null, state, options);
	        return result;
	    }

	    truthy() {

	        const obj = this.clone();
	        const values = Hoek.flatten(Array.prototype.slice.call(arguments));
	        for (let i = 0; i < values.length; ++i) {
	            const value = values[i];

	            Hoek.assert(value !== undefined, 'Cannot call truthy with undefined');
	            obj._inner.truthySet.add(value);
	        }
	        return obj;
	    }

	    falsy() {

	        const obj = this.clone();
	        const values = Hoek.flatten(Array.prototype.slice.call(arguments));
	        for (let i = 0; i < values.length; ++i) {
	            const value = values[i];

	            Hoek.assert(value !== undefined, 'Cannot call falsy with undefined');
	            obj._inner.falsySet.add(value);
	        }
	        return obj;
	    }

	    insensitive(enabled) {

	        const insensitive = enabled === undefined ? true : !!enabled;

	        if (this._flags.insensitive === insensitive) {
	            return this;
	        }

	        const obj = this.clone();
	        obj._flags.insensitive = insensitive;
	        return obj;
	    }

	    describe() {

	        const description = Any.prototype.describe.call(this);
	        description.truthy = [true].concat(this._inner.truthySet.values());
	        description.falsy = [false].concat(this._inner.falsySet.values());
	        return description;
	    }
	};


	module.exports = new internals.Boolean();


/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// Load modules

	const Hoek = __webpack_require__(336);
	const Any = __webpack_require__(338);
	const Cast = __webpack_require__(343);
	const Ref = __webpack_require__(339);


	// Declare internals

	const internals = {};


	internals.Alternatives = class extends Any {

	    constructor() {

	        super();
	        this._type = 'alternatives';
	        this._invalids.remove(null);
	        this._inner.matches = [];
	    }

	    _base(value, state, options) {

	        let errors = [];
	        const il = this._inner.matches.length;
	        const baseType = this._baseType;

	        for (let i = 0; i < il; ++i) {
	            const item = this._inner.matches[i];
	            const schema = item.schema;
	            if (!schema) {
	                const failed = item.is._validate(item.ref(state.reference || state.parent, options), null, options, state.parent).errors;

	                if (failed) {
	                    if (item.otherwise) {
	                        return item.otherwise._validate(value, state, options);
	                    }
	                }
	                else if (item.then) {
	                    return item.then._validate(value, state, options);
	                }

	                if (i === (il - 1) && baseType) {
	                    return baseType._validate(value, state, options);
	                }

	                continue;
	            }

	            const result = schema._validate(value, state, options);
	            if (!result.errors) {     // Found a valid match
	                return result;
	            }

	            errors = errors.concat(result.errors);
	        }

	        if (errors.length) {
	            return { errors: this.createError('alternatives.child', { reason: errors }, state, options) };
	        }

	        return { errors: this.createError('alternatives.base', null, state, options) };
	    }

	    try(/* schemas */) {

	        const schemas = Hoek.flatten(Array.prototype.slice.call(arguments));
	        Hoek.assert(schemas.length, 'Cannot add other alternatives without at least one schema');

	        const obj = this.clone();

	        for (let i = 0; i < schemas.length; ++i) {
	            const cast = Cast.schema(schemas[i]);
	            if (cast._refs.length) {
	                obj._refs = obj._refs.concat(cast._refs);
	            }
	            obj._inner.matches.push({ schema: cast });
	        }

	        return obj;
	    }

	    when(ref, options) {

	        Hoek.assert(Ref.isRef(ref) || typeof ref === 'string', 'Invalid reference:', ref);
	        Hoek.assert(options, 'Missing options');
	        Hoek.assert(typeof options === 'object', 'Invalid options');
	        Hoek.assert(options.hasOwnProperty('is'), 'Missing "is" directive');
	        Hoek.assert(options.then !== undefined || options.otherwise !== undefined, 'options must have at least one of "then" or "otherwise"');

	        const obj = this.clone();
	        let is = Cast.schema(options.is);

	        if (options.is === null || !(Ref.isRef(options.is) || options.is instanceof Any)) {

	            // Only apply required if this wasn't already a schema or a ref, we'll suppose people know what they're doing
	            is = is.required();
	        }

	        const item = {
	            ref: Cast.ref(ref),
	            is,
	            then: options.then !== undefined ? Cast.schema(options.then) : undefined,
	            otherwise: options.otherwise !== undefined ? Cast.schema(options.otherwise) : undefined
	        };

	        if (obj._baseType) {

	            item.then = item.then && obj._baseType.concat(item.then);
	            item.otherwise = item.otherwise && obj._baseType.concat(item.otherwise);
	        }

	        Ref.push(obj._refs, item.ref);
	        obj._refs = obj._refs.concat(item.is._refs);

	        if (item.then && item.then._refs) {
	            obj._refs = obj._refs.concat(item.then._refs);
	        }

	        if (item.otherwise && item.otherwise._refs) {
	            obj._refs = obj._refs.concat(item.otherwise._refs);
	        }

	        obj._inner.matches.push(item);

	        return obj;
	    }

	    describe() {

	        const description = Any.prototype.describe.call(this);
	        const alternatives = [];
	        for (let i = 0; i < this._inner.matches.length; ++i) {
	            const item = this._inner.matches[i];
	            if (item.schema) {

	                // try()

	                alternatives.push(item.schema.describe());
	            }
	            else {

	                // when()

	                const when = {
	                    ref: item.ref.toString(),
	                    is: item.is.describe()
	                };

	                if (item.then) {
	                    when.then = item.then.describe();
	                }

	                if (item.otherwise) {
	                    when.otherwise = item.otherwise.describe();
	                }

	                alternatives.push(when);
	            }
	        }

	        description.alternatives = alternatives;
	        return description;
	    }

	};


	module.exports = new internals.Alternatives();


/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// Load modules

	const Hoek = __webpack_require__(336);
	const Topo = __webpack_require__(356);
	const Any = __webpack_require__(338);
	const Errors = __webpack_require__(340);
	const Cast = __webpack_require__(343);
	const Ref = __webpack_require__(339);


	// Declare internals

	const internals = {};


	internals.Object = class extends Any {

	    constructor() {

	        super();
	        this._type = 'object';
	        this._inner.children = null;
	        this._inner.renames = [];
	        this._inner.dependencies = [];
	        this._inner.patterns = [];
	    }

	    _base(value, state, options) {

	        let target = value;
	        const errors = [];
	        const finish = () => {

	            return {
	                value: target,
	                errors: errors.length ? errors : null
	            };
	        };

	        if (typeof value === 'string' &&
	            options.convert) {

	            value = internals.safeParse(value);
	        }

	        const type = this._flags.func ? 'function' : 'object';
	        if (!value ||
	            typeof value !== type ||
	            Array.isArray(value)) {

	            errors.push(this.createError(type + '.base', null, state, options));
	            return finish();
	        }

	        // Skip if there are no other rules to test

	        if (!this._inner.renames.length &&
	            !this._inner.dependencies.length &&
	            !this._inner.children &&                    // null allows any keys
	            !this._inner.patterns.length) {

	            target = value;
	            return finish();
	        }

	        // Ensure target is a local copy (parsed) or shallow copy

	        if (target === value) {
	            if (type === 'object') {
	                target = Object.create(Object.getPrototypeOf(value));
	            }
	            else {
	                target = function () {

	                    return value.apply(this, arguments);
	                };

	                target.prototype = Hoek.clone(value.prototype);
	            }

	            const valueKeys = Object.keys(value);
	            for (let i = 0; i < valueKeys.length; ++i) {
	                target[valueKeys[i]] = value[valueKeys[i]];
	            }
	        }
	        else {
	            target = value;
	        }

	        // Rename keys

	        const renamed = {};
	        for (let i = 0; i < this._inner.renames.length; ++i) {
	            const rename = this._inner.renames[i];

	            if (rename.options.ignoreUndefined && target[rename.from] === undefined) {
	                continue;
	            }

	            if (!rename.options.multiple &&
	                renamed[rename.to]) {

	                errors.push(this.createError('object.rename.multiple', { from: rename.from, to: rename.to }, state, options));
	                if (options.abortEarly) {
	                    return finish();
	                }
	            }

	            if (Object.prototype.hasOwnProperty.call(target, rename.to) &&
	                !rename.options.override &&
	                !renamed[rename.to]) {

	                errors.push(this.createError('object.rename.override', { from: rename.from, to: rename.to }, state, options));
	                if (options.abortEarly) {
	                    return finish();
	                }
	            }

	            if (target[rename.from] === undefined) {
	                delete target[rename.to];
	            }
	            else {
	                target[rename.to] = target[rename.from];
	            }

	            renamed[rename.to] = true;

	            if (!rename.options.alias) {
	                delete target[rename.from];
	            }
	        }

	        // Validate schema

	        if (!this._inner.children &&            // null allows any keys
	            !this._inner.patterns.length &&
	            !this._inner.dependencies.length) {

	            return finish();
	        }

	        const unprocessed = Hoek.mapToObject(Object.keys(target));

	        if (this._inner.children) {
	            const stripProps = [];

	            for (let i = 0; i < this._inner.children.length; ++i) {
	                const child = this._inner.children[i];
	                const key = child.key;
	                const item = target[key];

	                delete unprocessed[key];

	                const localState = { key, path: (state.path || '') + (state.path && key ? '.' : '') + key, parent: target, reference: state.reference };
	                const result = child.schema._validate(item, localState, options);
	                if (result.errors) {
	                    errors.push(this.createError('object.child', { key, child: child.schema._getLabel(key), reason: result.errors }, localState, options));

	                    if (options.abortEarly) {
	                        return finish();
	                    }
	                }
	                else {
	                    if (child.schema._flags.strip || (result.value === undefined && result.value !== item)) {
	                        stripProps.push(key);
	                        target[key] = result.finalValue;
	                    }
	                    else if (result.value !== undefined) {
	                        target[key] = result.value;
	                    }
	                }
	            }

	            for (let i = 0; i < stripProps.length; ++i) {
	                delete target[stripProps[i]];
	            }
	        }

	        // Unknown keys

	        let unprocessedKeys = Object.keys(unprocessed);
	        if (unprocessedKeys.length &&
	            this._inner.patterns.length) {

	            for (let i = 0; i < unprocessedKeys.length; ++i) {
	                const key = unprocessedKeys[i];
	                const localState = { key, path: (state.path ? state.path + '.' : '') + key, parent: target, reference: state.reference };
	                const item = target[key];

	                for (let j = 0; j < this._inner.patterns.length; ++j) {
	                    const pattern = this._inner.patterns[j];

	                    if (pattern.regex.test(key)) {
	                        delete unprocessed[key];

	                        const result = pattern.rule._validate(item, localState, options);
	                        if (result.errors) {
	                            errors.push(this.createError('object.child', { key, child: pattern.rule._getLabel(key), reason: result.errors }, localState, options));

	                            if (options.abortEarly) {
	                                return finish();
	                            }
	                        }

	                        if (result.value !== undefined) {
	                            target[key] = result.value;
	                        }
	                    }
	                }
	            }

	            unprocessedKeys = Object.keys(unprocessed);
	        }

	        if ((this._inner.children || this._inner.patterns.length) && unprocessedKeys.length) {
	            if ((options.stripUnknown && this._flags.allowUnknown !== true) ||
	                options.skipFunctions) {

	                const stripUnknown = options.stripUnknown
	                    ? (options.stripUnknown === true ? true : !!options.stripUnknown.objects)
	                    : false;


	                for (let i = 0; i < unprocessedKeys.length; ++i) {
	                    const key = unprocessedKeys[i];

	                    if (stripUnknown) {
	                        delete target[key];
	                        delete unprocessed[key];
	                    }
	                    else if (typeof target[key] === 'function') {
	                        delete unprocessed[key];
	                    }
	                }

	                unprocessedKeys = Object.keys(unprocessed);
	            }

	            if (unprocessedKeys.length &&
	                (this._flags.allowUnknown !== undefined ? !this._flags.allowUnknown : !options.allowUnknown)) {

	                for (let i = 0; i < unprocessedKeys.length; ++i) {
	                    const unprocessedKey = unprocessedKeys[i];
	                    errors.push(this.createError('object.allowUnknown', { child: unprocessedKey }, { key: unprocessedKey, path: state.path + (state.path ? '.' : '') + unprocessedKey }, options));
	                }
	            }
	        }

	        // Validate dependencies

	        for (let i = 0; i < this._inner.dependencies.length; ++i) {
	            const dep = this._inner.dependencies[i];
	            const err = internals[dep.type].call(this, dep.key !== null && target[dep.key], dep.peers, target, { key: dep.key, path: (state.path || '') + (dep.key ? '.' + dep.key : '') }, options);
	            if (err instanceof Errors.Err) {
	                errors.push(err);
	                if (options.abortEarly) {
	                    return finish();
	                }
	            }
	        }

	        return finish();
	    }

	    _func() {

	        const obj = this.clone();
	        obj._flags.func = true;
	        return obj;
	    }

	    keys(schema) {

	        Hoek.assert(schema === null || schema === undefined || typeof schema === 'object', 'Object schema must be a valid object');
	        Hoek.assert(!schema || !(schema instanceof Any), 'Object schema cannot be a joi schema');

	        const obj = this.clone();

	        if (!schema) {
	            obj._inner.children = null;
	            return obj;
	        }

	        const children = Object.keys(schema);

	        if (!children.length) {
	            obj._inner.children = [];
	            return obj;
	        }

	        const topo = new Topo();
	        if (obj._inner.children) {
	            for (let i = 0; i < obj._inner.children.length; ++i) {
	                const child = obj._inner.children[i];

	                // Only add the key if we are not going to replace it later
	                if (children.indexOf(child.key) === -1) {
	                    topo.add(child, { after: child._refs, group: child.key });
	                }
	            }
	        }

	        for (let i = 0; i < children.length; ++i) {
	            const key = children[i];
	            const child = schema[key];
	            try {
	                const cast = Cast.schema(child);
	                topo.add({ key, schema: cast }, { after: cast._refs, group: key });
	            }
	            catch (castErr) {
	                if (castErr.hasOwnProperty('path')) {
	                    castErr.path = key + '.' + castErr.path;
	                }
	                else {
	                    castErr.path = key;
	                }
	                throw castErr;
	            }
	        }

	        obj._inner.children = topo.nodes;

	        return obj;
	    }

	    unknown(allow) {

	        const value = allow !== false;

	        if (this._flags.allowUnknown === value) {
	            return this;
	        }

	        const obj = this.clone();
	        obj._flags.allowUnknown = value;
	        return obj;
	    }

	    length(limit) {

	        Hoek.assert(Number.isSafeInteger(limit) && limit >= 0, 'limit must be a positive integer');

	        return this._test('length', limit, function (value, state, options) {

	            if (Object.keys(value).length === limit) {
	                return value;
	            }

	            return this.createError('object.length', { limit }, state, options);
	        });
	    }

	    arity(n) {

	        Hoek.assert(Number.isSafeInteger(n) && n >= 0, 'n must be a positive integer');

	        return this._test('arity', n, function (value, state, options) {

	            if (value.length === n) {
	                return value;
	            }

	            return this.createError('function.arity', { n }, state, options);
	        });
	    }

	    minArity(n) {

	        Hoek.assert(Number.isSafeInteger(n) && n > 0, 'n must be a strict positive integer');

	        return this._test('minArity', n, function (value, state, options) {

	            if (value.length >= n) {
	                return value;
	            }

	            return this.createError('function.minArity', { n }, state, options);
	        });
	    }

	    maxArity(n) {

	        Hoek.assert(Number.isSafeInteger(n) && n >= 0, 'n must be a positive integer');

	        return this._test('maxArity', n, function (value, state, options) {

	            if (value.length <= n) {
	                return value;
	            }

	            return this.createError('function.maxArity', { n }, state, options);
	        });
	    }

	    min(limit) {

	        Hoek.assert(Number.isSafeInteger(limit) && limit >= 0, 'limit must be a positive integer');

	        return this._test('min', limit, function (value, state, options) {

	            if (Object.keys(value).length >= limit) {
	                return value;
	            }

	            return this.createError('object.min', { limit }, state, options);
	        });
	    }

	    max(limit) {

	        Hoek.assert(Number.isSafeInteger(limit) && limit >= 0, 'limit must be a positive integer');

	        return this._test('max', limit, function (value, state, options) {

	            if (Object.keys(value).length <= limit) {
	                return value;
	            }

	            return this.createError('object.max', { limit }, state, options);
	        });
	    }

	    pattern(pattern, schema) {

	        Hoek.assert(pattern instanceof RegExp, 'Invalid regular expression');
	        Hoek.assert(schema !== undefined, 'Invalid rule');

	        pattern = new RegExp(pattern.source, pattern.ignoreCase ? 'i' : undefined);         // Future version should break this and forbid unsupported regex flags

	        try {
	            schema = Cast.schema(schema);
	        }
	        catch (castErr) {
	            if (castErr.hasOwnProperty('path')) {
	                castErr.message = castErr.message + '(' + castErr.path + ')';
	            }

	            throw castErr;
	        }


	        const obj = this.clone();
	        obj._inner.patterns.push({ regex: pattern, rule: schema });
	        return obj;
	    }

	    schema() {

	        return this._test('schema', null, function (value, state, options) {

	            if (value instanceof Any) {
	                return value;
	            }

	            return this.createError('object.schema', null, state, options);
	        });
	    }

	    with(key, peers) {

	        return this._dependency('with', key, peers);
	    }

	    without(key, peers) {

	        return this._dependency('without', key, peers);
	    }

	    xor() {

	        const peers = Hoek.flatten(Array.prototype.slice.call(arguments));
	        return this._dependency('xor', null, peers);
	    }

	    or() {

	        const peers = Hoek.flatten(Array.prototype.slice.call(arguments));
	        return this._dependency('or', null, peers);
	    }

	    and() {

	        const peers = Hoek.flatten(Array.prototype.slice.call(arguments));
	        return this._dependency('and', null, peers);
	    }

	    nand() {

	        const peers = Hoek.flatten(Array.prototype.slice.call(arguments));
	        return this._dependency('nand', null, peers);
	    }

	    requiredKeys(children) {

	        children = Hoek.flatten(Array.prototype.slice.call(arguments));
	        return this.applyFunctionToChildren(children, 'required');
	    }

	    optionalKeys(children) {

	        children = Hoek.flatten(Array.prototype.slice.call(arguments));
	        return this.applyFunctionToChildren(children, 'optional');
	    }

	    forbiddenKeys(children) {

	        children = Hoek.flatten(Array.prototype.slice.call(arguments));
	        return this.applyFunctionToChildren(children, 'forbidden');
	    }

	    rename(from, to, options) {

	        Hoek.assert(typeof from === 'string', 'Rename missing the from argument');
	        Hoek.assert(typeof to === 'string', 'Rename missing the to argument');
	        Hoek.assert(to !== from, 'Cannot rename key to same name:', from);

	        for (let i = 0; i < this._inner.renames.length; ++i) {
	            Hoek.assert(this._inner.renames[i].from !== from, 'Cannot rename the same key multiple times');
	        }

	        const obj = this.clone();

	        obj._inner.renames.push({
	            from,
	            to,
	            options: Hoek.applyToDefaults(internals.renameDefaults, options || {})
	        });

	        return obj;
	    }

	    applyFunctionToChildren(children, fn, args, root) {

	        children = [].concat(children);
	        Hoek.assert(children.length > 0, 'expected at least one children');

	        const groupedChildren = internals.groupChildren(children);
	        let obj;

	        if ('' in groupedChildren) {
	            obj = this[fn].apply(this, args);
	            delete groupedChildren[''];
	        }
	        else {
	            obj = this.clone();
	        }

	        if (obj._inner.children) {
	            root = root ? (root + '.') : '';

	            for (let i = 0; i < obj._inner.children.length; ++i) {
	                const child = obj._inner.children[i];
	                const group = groupedChildren[child.key];

	                if (group) {
	                    obj._inner.children[i] = {
	                        key: child.key,
	                        _refs: child._refs,
	                        schema: child.schema.applyFunctionToChildren(group, fn, args, root + child.key)
	                    };

	                    delete groupedChildren[child.key];
	                }
	            }
	        }

	        const remaining = Object.keys(groupedChildren);
	        Hoek.assert(remaining.length === 0, 'unknown key(s)', remaining.join(', '));

	        return obj;
	    }

	    _dependency(type, key, peers) {

	        peers = [].concat(peers);
	        for (let i = 0; i < peers.length; ++i) {
	            Hoek.assert(typeof peers[i] === 'string', type, 'peers must be a string or array of strings');
	        }

	        const obj = this.clone();
	        obj._inner.dependencies.push({ type, key, peers });
	        return obj;
	    }

	    describe(shallow) {

	        const description = Any.prototype.describe.call(this);

	        if (description.rules) {
	            for (let i = 0; i < description.rules.length; ++i) {
	                const rule = description.rules[i];
	                // Coverage off for future-proof descriptions, only object().assert() is use right now
	                if (/* $lab:coverage:off$ */rule.arg &&
	                    typeof rule.arg === 'object' &&
	                    rule.arg.schema &&
	                    rule.arg.ref /* $lab:coverage:on$ */) {
	                    rule.arg = {
	                        schema: rule.arg.schema.describe(),
	                        ref: rule.arg.ref.toString()
	                    };
	                }
	            }
	        }

	        if (this._inner.children &&
	            !shallow) {

	            description.children = {};
	            for (let i = 0; i < this._inner.children.length; ++i) {
	                const child = this._inner.children[i];
	                description.children[child.key] = child.schema.describe();
	            }
	        }

	        if (this._inner.dependencies.length) {
	            description.dependencies = Hoek.clone(this._inner.dependencies);
	        }

	        if (this._inner.patterns.length) {
	            description.patterns = [];

	            for (let i = 0; i < this._inner.patterns.length; ++i) {
	                const pattern = this._inner.patterns[i];
	                description.patterns.push({ regex: pattern.regex.toString(), rule: pattern.rule.describe() });
	            }
	        }

	        if (this._inner.renames.length > 0) {
	            description.renames = Hoek.clone(this._inner.renames);
	        }

	        return description;
	    }

	    assert(ref, schema, message) {

	        ref = Cast.ref(ref);
	        Hoek.assert(ref.isContext || ref.depth > 1, 'Cannot use assertions for root level references - use direct key rules instead');
	        message = message || 'pass the assertion test';

	        try {
	            schema = Cast.schema(schema);
	        }
	        catch (castErr) {
	            if (castErr.hasOwnProperty('path')) {
	                castErr.message = castErr.message + '(' + castErr.path + ')';
	            }

	            throw castErr;
	        }

	        const key = ref.path[ref.path.length - 1];
	        const path = ref.path.join('.');

	        return this._test('assert', { schema, ref }, function (value, state, options) {

	            const result = schema._validate(ref(value), null, options, value);
	            if (!result.errors) {
	                return value;
	            }

	            const localState = Hoek.merge({}, state);
	            localState.key = key;
	            localState.path = path;
	            return this.createError('object.assert', { ref: localState.path, message }, localState, options);
	        });
	    }

	    type(constructor, name) {

	        Hoek.assert(typeof constructor === 'function', 'type must be a constructor function');
	        const typeData = {
	            name: name || constructor.name,
	            ctor: constructor
	        };

	        return this._test('type', typeData, function (value, state, options) {

	            if (value instanceof constructor) {
	                return value;
	            }

	            return this.createError('object.type', { type: typeData.name }, state, options);
	        });
	    }

	    ref() {

	        return this._test('ref', null, function (value, state, options) {

	            if (Ref.isRef(value)) {
	                return value;
	            }

	            return this.createError('function.ref', null, state, options);
	        });
	    }
	};

	internals.safeParse = function (value) {

	    try {
	        return JSON.parse(value);
	    }
	    catch (parseErr) {}

	    return value;
	};


	internals.renameDefaults = {
	    alias: false,                   // Keep old value in place
	    multiple: false,                // Allow renaming multiple keys into the same target
	    override: false                 // Overrides an existing key
	};


	internals.groupChildren = function (children) {

	    children.sort();

	    const grouped = {};

	    for (let i = 0; i < children.length; ++i) {
	        const child = children[i];
	        Hoek.assert(typeof child === 'string', 'children must be strings');
	        const group = child.split('.')[0];
	        const childGroup = grouped[group] = (grouped[group] || []);
	        childGroup.push(child.substring(group.length + 1));
	    }

	    return grouped;
	};


	internals.keysToLabels = function (schema, keys) {

	    const children = schema._inner.children;

	    if (!children) {
	        return keys;
	    }

	    const findLabel = function (key) {

	        const matchingChild = children.find((child) => child.key === key);
	        return matchingChild ? matchingChild.schema._getLabel(key) : key;
	    };

	    if (Array.isArray(keys)) {
	        return keys.map(findLabel);
	    }

	    return findLabel(keys);
	};


	internals.with = function (value, peers, parent, state, options) {

	    if (value === undefined) {
	        return value;
	    }

	    for (let i = 0; i < peers.length; ++i) {
	        const peer = peers[i];
	        if (!Object.prototype.hasOwnProperty.call(parent, peer) ||
	            parent[peer] === undefined) {

	            return this.createError('object.with', {
	                main: state.key,
	                mainWithLabel: internals.keysToLabels(this, state.key),
	                peer,
	                peerWithLabel: internals.keysToLabels(this, peer)
	            }, state, options);
	        }
	    }

	    return value;
	};


	internals.without = function (value, peers, parent, state, options) {

	    if (value === undefined) {
	        return value;
	    }

	    for (let i = 0; i < peers.length; ++i) {
	        const peer = peers[i];
	        if (Object.prototype.hasOwnProperty.call(parent, peer) &&
	            parent[peer] !== undefined) {

	            return this.createError('object.without', {
	                main: state.key,
	                mainWithLabel: internals.keysToLabels(this, state.key),
	                peer,
	                peerWithLabel: internals.keysToLabels(this, peer)
	            }, state, options);
	        }
	    }

	    return value;
	};


	internals.xor = function (value, peers, parent, state, options) {

	    const present = [];
	    for (let i = 0; i < peers.length; ++i) {
	        const peer = peers[i];
	        if (Object.prototype.hasOwnProperty.call(parent, peer) &&
	            parent[peer] !== undefined) {

	            present.push(peer);
	        }
	    }

	    if (present.length === 1) {
	        return value;
	    }

	    const context = { peers, peersWithLabels: internals.keysToLabels(this, peers) };

	    if (present.length === 0) {
	        return this.createError('object.missing', context, state, options);
	    }

	    return this.createError('object.xor', context, state, options);
	};


	internals.or = function (value, peers, parent, state, options) {

	    for (let i = 0; i < peers.length; ++i) {
	        const peer = peers[i];
	        if (Object.prototype.hasOwnProperty.call(parent, peer) &&
	            parent[peer] !== undefined) {
	            return value;
	        }
	    }

	    return this.createError('object.missing', {
	        peers,
	        peersWithLabels: internals.keysToLabels(this, peers)
	    }, state, options);
	};


	internals.and = function (value, peers, parent, state, options) {

	    const missing = [];
	    const present = [];
	    const count = peers.length;
	    for (let i = 0; i < count; ++i) {
	        const peer = peers[i];
	        if (!Object.prototype.hasOwnProperty.call(parent, peer) ||
	            parent[peer] === undefined) {

	            missing.push(peer);
	        }
	        else {
	            present.push(peer);
	        }
	    }

	    const aon = (missing.length === count || present.length === count);

	    if (!aon) {

	        return this.createError('object.and', {
	            present,
	            presentWithLabels: internals.keysToLabels(this, present),
	            missing,
	            missingWithLabels: internals.keysToLabels(this, missing)
	        }, state, options);
	    }
	};


	internals.nand = function (value, peers, parent, state, options) {

	    const present = [];
	    for (let i = 0; i < peers.length; ++i) {
	        const peer = peers[i];
	        if (Object.prototype.hasOwnProperty.call(parent, peer) &&
	            parent[peer] !== undefined) {

	            present.push(peer);
	        }
	    }

	    const values = Hoek.clone(peers);
	    const main = values.splice(0, 1)[0];
	    const allPresent = (present.length === peers.length);
	    return allPresent ? this.createError('object.nand', {
	        main,
	        mainWithLabel: internals.keysToLabels(this, main),
	        peers: values,
	        peersWithLabels: internals.keysToLabels(this, values)
	    }, state, options) : null;
	};


	module.exports = new internals.Object();


/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// Load modules

	const Hoek = __webpack_require__(336);


	// Declare internals

	const internals = {};


	exports = module.exports = internals.Topo = function () {

	    this._items = [];
	    this.nodes = [];
	};


	internals.Topo.prototype.add = function (nodes, options) {

	    options = options || {};

	    // Validate rules

	    const before = [].concat(options.before || []);
	    const after = [].concat(options.after || []);
	    const group = options.group || '?';
	    const sort = options.sort || 0;                   // Used for merging only

	    Hoek.assert(before.indexOf(group) === -1, 'Item cannot come before itself:', group);
	    Hoek.assert(before.indexOf('?') === -1, 'Item cannot come before unassociated items');
	    Hoek.assert(after.indexOf(group) === -1, 'Item cannot come after itself:', group);
	    Hoek.assert(after.indexOf('?') === -1, 'Item cannot come after unassociated items');

	    ([].concat(nodes)).forEach((node, i) => {

	        const item = {
	            seq: this._items.length,
	            sort: sort,
	            before: before,
	            after: after,
	            group: group,
	            node: node
	        };

	        this._items.push(item);
	    });

	    // Insert event

	    const error = this._sort();
	    Hoek.assert(!error, 'item', (group !== '?' ? 'added into group ' + group : ''), 'created a dependencies error');

	    return this.nodes;
	};


	internals.Topo.prototype.merge = function (others) {

	    others = [].concat(others);
	    for (let i = 0; i < others.length; ++i) {
	        const other = others[i];
	        if (other) {
	            for (let j = 0; j < other._items.length; ++j) {
	                const item = Hoek.shallow(other._items[j]);
	                this._items.push(item);
	            }
	        }
	    }

	    // Sort items

	    this._items.sort(internals.mergeSort);
	    for (let i = 0; i < this._items.length; ++i) {
	        this._items[i].seq = i;
	    }

	    const error = this._sort();
	    Hoek.assert(!error, 'merge created a dependencies error');

	    return this.nodes;
	};


	internals.mergeSort = function (a, b) {

	    return a.sort === b.sort ? 0 : (a.sort < b.sort ? -1 : 1);
	};


	internals.Topo.prototype._sort = function () {

	    // Construct graph

	    const graph = {};
	    const graphAfters = Object.create(null); // A prototype can bungle lookups w/ false positives
	    const groups = Object.create(null);

	    for (let i = 0; i < this._items.length; ++i) {
	        const item = this._items[i];
	        const seq = item.seq;                         // Unique across all items
	        const group = item.group;

	        // Determine Groups

	        groups[group] = groups[group] || [];
	        groups[group].push(seq);

	        // Build intermediary graph using 'before'

	        graph[seq] = item.before;

	        // Build second intermediary graph with 'after'

	        const after = item.after;
	        for (let j = 0; j < after.length; ++j) {
	            graphAfters[after[j]] = (graphAfters[after[j]] || []).concat(seq);
	        }
	    }

	    // Expand intermediary graph

	    let graphNodes = Object.keys(graph);
	    for (let i = 0; i < graphNodes.length; ++i) {
	        const node = graphNodes[i];
	        const expandedGroups = [];

	        const graphNodeItems = Object.keys(graph[node]);
	        for (let j = 0; j < graphNodeItems.length; ++j) {
	            const group = graph[node][graphNodeItems[j]];
	            groups[group] = groups[group] || [];

	            for (let k = 0; k < groups[group].length; ++k) {
	                expandedGroups.push(groups[group][k]);
	            }
	        }
	        graph[node] = expandedGroups;
	    }

	    // Merge intermediary graph using graphAfters into final graph

	    const afterNodes = Object.keys(graphAfters);
	    for (let i = 0; i < afterNodes.length; ++i) {
	        const group = afterNodes[i];

	        if (groups[group]) {
	            for (let j = 0; j < groups[group].length; ++j) {
	                const node = groups[group][j];
	                graph[node] = graph[node].concat(graphAfters[group]);
	            }
	        }
	    }

	    // Compile ancestors

	    let children;
	    const ancestors = {};
	    graphNodes = Object.keys(graph);
	    for (let i = 0; i < graphNodes.length; ++i) {
	        const node = graphNodes[i];
	        children = graph[node];

	        for (let j = 0; j < children.length; ++j) {
	            ancestors[children[j]] = (ancestors[children[j]] || []).concat(node);
	        }
	    }

	    // Topo sort

	    const visited = {};
	    const sorted = [];

	    for (let i = 0; i < this._items.length; ++i) {
	        let next = i;

	        if (ancestors[i]) {
	            next = null;
	            for (let j = 0; j < this._items.length; ++j) {
	                if (visited[j] === true) {
	                    continue;
	                }

	                if (!ancestors[j]) {
	                    ancestors[j] = [];
	                }

	                const shouldSeeCount = ancestors[j].length;
	                let seenCount = 0;
	                for (let k = 0; k < shouldSeeCount; ++k) {
	                    if (sorted.indexOf(ancestors[j][k]) >= 0) {
	                        ++seenCount;
	                    }
	                }

	                if (seenCount === shouldSeeCount) {
	                    next = j;
	                    break;
	                }
	            }
	        }

	        if (next !== null) {
	            next = next.toString();         // Normalize to string TODO: replace with seq
	            visited[next] = true;
	            sorted.push(next);
	        }
	    }

	    if (sorted.length !== this._items.length) {
	        return new Error('Invalid dependencies');
	    }

	    const seqIndex = {};
	    for (let i = 0; i < this._items.length; ++i) {
	        const item = this._items[i];
	        seqIndex[item.seq] = item;
	    }

	    const sortedNodes = [];
	    this._items = sorted.map((value) => {

	        const sortedItem = seqIndex[value];
	        sortedNodes.push(sortedItem.node);
	        return sortedItem;
	    });

	    this.nodes = sortedNodes;
	};


/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// Load modules

	const Joi = __webpack_require__(335);


	// Declare internals

	const internals = {};

	exports.options = Joi.object({
	    abortEarly: Joi.boolean(),
	    convert: Joi.boolean(),
	    allowUnknown: Joi.boolean(),
	    skipFunctions: Joi.boolean(),
	    stripUnknown: [Joi.boolean(), Joi.object({ arrays: Joi.boolean(), objects: Joi.boolean() }).or('arrays', 'objects')],
	    language: Joi.object(),
	    presence: Joi.string().only('required', 'optional', 'forbidden', 'ignore'),
	    raw: Joi.boolean(),
	    context: Joi.object(),
	    strip: Joi.boolean(),
	    noDefaults: Joi.boolean()
	}).strict();


/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// Load modules

	const Any = __webpack_require__(338);
	const Hoek = __webpack_require__(336);


	// Declare internals

	const internals = {};


	internals.Lazy = class extends Any {

	    constructor() {

	        super();
	        this._type = 'lazy';
	    }

	    _base(value, state, options) {

	        const result = { value };
	        const lazy = this._flags.lazy;

	        if (!lazy) {
	            result.errors = this.createError('lazy.base', null, state, options);
	            return result;
	        }

	        const schema = lazy();

	        if (!(schema instanceof Any)) {
	            result.errors = this.createError('lazy.schema', null, state, options);
	            return result;
	        }

	        return schema._validate(value, state, options);
	    }

	    set(fn) {

	        Hoek.assert(typeof fn === 'function', 'You must provide a function as first argument');

	        const obj = this.clone();
	        obj._flags.lazy = fn;
	        return obj;
	    }

	};

	module.exports = new internals.Lazy();


/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// Load modules

	const Any = __webpack_require__(338);
	const Cast = __webpack_require__(343);
	const Hoek = __webpack_require__(336);


	// Declare internals

	const internals = {};


	internals.fastSplice = function (arr, i) {

	    let pos = i;
	    while (pos < arr.length) {
	        arr[pos++] = arr[pos];
	    }

	    --arr.length;
	};


	internals.Array = class extends Any {

	    constructor() {

	        super();
	        this._type = 'array';
	        this._inner.items = [];
	        this._inner.ordereds = [];
	        this._inner.inclusions = [];
	        this._inner.exclusions = [];
	        this._inner.requireds = [];
	        this._flags.sparse = false;
	    }

	    _base(value, state, options) {

	        const result = {
	            value
	        };

	        if (typeof value === 'string' &&
	            options.convert) {

	            internals.safeParse(value, result);
	        }

	        let isArray = Array.isArray(result.value);
	        const wasArray = isArray;
	        if (options.convert && this._flags.single && !isArray) {
	            result.value = [result.value];
	            isArray = true;
	        }

	        if (!isArray) {
	            result.errors = this.createError('array.base', null, state, options);
	            return result;
	        }

	        if (this._inner.inclusions.length ||
	            this._inner.exclusions.length ||
	            this._inner.requireds.length ||
	            this._inner.ordereds.length ||
	            !this._flags.sparse) {

	            // Clone the array so that we don't modify the original
	            if (wasArray) {
	                result.value = result.value.slice(0);
	            }

	            result.errors = this._checkItems.call(this, result.value, wasArray, state, options);

	            if (result.errors && wasArray && options.convert && this._flags.single) {

	                // Attempt a 2nd pass by putting the array inside one.
	                const previousErrors = result.errors;

	                result.value = [result.value];
	                result.errors = this._checkItems.call(this, result.value, wasArray, state, options);

	                if (result.errors) {

	                    // Restore previous errors and value since this didn't validate either.
	                    result.errors = previousErrors;
	                    result.value = result.value[0];
	                }
	            }
	        }

	        return result;
	    }

	    _checkItems(items, wasArray, state, options) {

	        const errors = [];
	        let errored;

	        const requireds = this._inner.requireds.slice();
	        const ordereds = this._inner.ordereds.slice();
	        const inclusions = this._inner.inclusions.concat(requireds);

	        let il = items.length;
	        for (let i = 0; i < il; ++i) {
	            errored = false;
	            const item = items[i];
	            let isValid = false;
	            const key = wasArray ? i : state.key;
	            const path = wasArray ? (state.path ? state.path + '.' : '') + i : state.path;
	            const localState = { key, path, parent: state.parent, reference: state.reference };
	            let res;

	            // Sparse

	            if (!this._flags.sparse && item === undefined) {
	                errors.push(this.createError('array.sparse', null, { key: state.key, path: localState.path, pos: i }, options));

	                if (options.abortEarly) {
	                    return errors;
	                }

	                continue;
	            }

	            // Exclusions

	            for (let j = 0; j < this._inner.exclusions.length; ++j) {
	                res = this._inner.exclusions[j]._validate(item, localState, {});                // Not passing options to use defaults

	                if (!res.errors) {
	                    errors.push(this.createError(wasArray ? 'array.excludes' : 'array.excludesSingle', { pos: i, value: item }, { key: state.key, path: localState.path }, options));
	                    errored = true;

	                    if (options.abortEarly) {
	                        return errors;
	                    }

	                    break;
	                }
	            }

	            if (errored) {
	                continue;
	            }

	            // Ordered
	            if (this._inner.ordereds.length) {
	                if (ordereds.length > 0) {
	                    const ordered = ordereds.shift();
	                    res = ordered._validate(item, localState, options);
	                    if (!res.errors) {
	                        if (ordered._flags.strip) {
	                            internals.fastSplice(items, i);
	                            --i;
	                            --il;
	                        }
	                        else if (!this._flags.sparse && res.value === undefined) {
	                            errors.push(this.createError('array.sparse', null, { key: state.key, path: localState.path, pos: i }, options));

	                            if (options.abortEarly) {
	                                return errors;
	                            }

	                            continue;
	                        }
	                        else {
	                            items[i] = res.value;
	                        }
	                    }
	                    else {
	                        errors.push(this.createError('array.ordered', { pos: i, reason: res.errors, value: item }, { key: state.key, path: localState.path }, options));
	                        if (options.abortEarly) {
	                            return errors;
	                        }
	                    }
	                    continue;
	                }
	                else if (!this._inner.items.length) {
	                    errors.push(this.createError('array.orderedLength', { pos: i, limit: this._inner.ordereds.length }, { key: state.key, path: localState.path }, options));
	                    if (options.abortEarly) {
	                        return errors;
	                    }
	                    continue;
	                }
	            }

	            // Requireds

	            const requiredChecks = [];
	            let jl = requireds.length;
	            for (let j = 0; j < jl; ++j) {
	                res = requiredChecks[j] = requireds[j]._validate(item, localState, options);
	                if (!res.errors) {
	                    items[i] = res.value;
	                    isValid = true;
	                    internals.fastSplice(requireds, j);
	                    --j;
	                    --jl;

	                    if (!this._flags.sparse && res.value === undefined) {
	                        errors.push(this.createError('array.sparse', null, { key: state.key, path: localState.path, pos: i }, options));

	                        if (options.abortEarly) {
	                            return errors;
	                        }
	                    }

	                    break;
	                }
	            }

	            if (isValid) {
	                continue;
	            }

	            // Inclusions

	            const stripUnknown = options.stripUnknown
	                ? (options.stripUnknown === true ? true : !!options.stripUnknown.arrays)
	                : false;

	            jl = inclusions.length;
	            for (let j = 0; j < jl; ++j) {
	                const inclusion = inclusions[j];

	                // Avoid re-running requireds that already didn't match in the previous loop
	                const previousCheck = requireds.indexOf(inclusion);
	                if (previousCheck !== -1) {
	                    res = requiredChecks[previousCheck];
	                }
	                else {
	                    res = inclusion._validate(item, localState, options);

	                    if (!res.errors) {
	                        if (inclusion._flags.strip) {
	                            internals.fastSplice(items, i);
	                            --i;
	                            --il;
	                        }
	                        else if (!this._flags.sparse && res.value === undefined) {
	                            errors.push(this.createError('array.sparse', null, { key: state.key, path: localState.path, pos: i }, options));
	                            errored = true;
	                        }
	                        else {
	                            items[i] = res.value;
	                        }
	                        isValid = true;
	                        break;
	                    }
	                }

	                // Return the actual error if only one inclusion defined
	                if (jl === 1) {
	                    if (stripUnknown) {
	                        internals.fastSplice(items, i);
	                        --i;
	                        --il;
	                        isValid = true;
	                        break;
	                    }

	                    errors.push(this.createError(wasArray ? 'array.includesOne' : 'array.includesOneSingle', { pos: i, reason: res.errors, value: item }, { key: state.key, path: localState.path }, options));
	                    errored = true;

	                    if (options.abortEarly) {
	                        return errors;
	                    }

	                    break;
	                }
	            }

	            if (errored) {
	                continue;
	            }

	            if (this._inner.inclusions.length && !isValid) {
	                if (stripUnknown) {
	                    internals.fastSplice(items, i);
	                    --i;
	                    --il;
	                    continue;
	                }

	                errors.push(this.createError(wasArray ? 'array.includes' : 'array.includesSingle', { pos: i, value: item }, { key: state.key, path: localState.path }, options));

	                if (options.abortEarly) {
	                    return errors;
	                }
	            }
	        }

	        if (requireds.length) {
	            this._fillMissedErrors.call(this, errors, requireds, state, options);
	        }

	        if (ordereds.length) {
	            this._fillOrderedErrors.call(this, errors, ordereds, state, options);
	        }

	        return errors.length ? errors : null;
	    }

	    describe() {

	        const description = Any.prototype.describe.call(this);

	        if (this._inner.ordereds.length) {
	            description.orderedItems = [];

	            for (let i = 0; i < this._inner.ordereds.length; ++i) {
	                description.orderedItems.push(this._inner.ordereds[i].describe());
	            }
	        }

	        if (this._inner.items.length) {
	            description.items = [];

	            for (let i = 0; i < this._inner.items.length; ++i) {
	                description.items.push(this._inner.items[i].describe());
	            }
	        }

	        return description;
	    }

	    items() {

	        const obj = this.clone();

	        Hoek.flatten(Array.prototype.slice.call(arguments)).forEach((type, index) => {

	            try {
	                type = Cast.schema(type);
	            }
	            catch (castErr) {
	                if (castErr.hasOwnProperty('path')) {
	                    castErr.path = index + '.' + castErr.path;
	                }
	                else {
	                    castErr.path = index;
	                }
	                castErr.message = castErr.message + '(' + castErr.path + ')';
	                throw castErr;
	            }

	            obj._inner.items.push(type);

	            if (type._flags.presence === 'required') {
	                obj._inner.requireds.push(type);
	            }
	            else if (type._flags.presence === 'forbidden') {
	                obj._inner.exclusions.push(type.optional());
	            }
	            else {
	                obj._inner.inclusions.push(type);
	            }
	        });

	        return obj;
	    }

	    ordered() {

	        const obj = this.clone();

	        Hoek.flatten(Array.prototype.slice.call(arguments)).forEach((type, index) => {

	            try {
	                type = Cast.schema(type);
	            }
	            catch (castErr) {
	                if (castErr.hasOwnProperty('path')) {
	                    castErr.path = index + '.' + castErr.path;
	                }
	                else {
	                    castErr.path = index;
	                }
	                castErr.message = castErr.message + '(' + castErr.path + ')';
	                throw castErr;
	            }
	            obj._inner.ordereds.push(type);
	        });

	        return obj;
	    }

	    min(limit) {

	        Hoek.assert(Number.isSafeInteger(limit) && limit >= 0, 'limit must be a positive integer');

	        return this._test('min', limit, function (value, state, options) {

	            if (value.length >= limit) {
	                return value;
	            }

	            return this.createError('array.min', { limit, value }, state, options);
	        });
	    }

	    max(limit) {

	        Hoek.assert(Number.isSafeInteger(limit) && limit >= 0, 'limit must be a positive integer');

	        return this._test('max', limit, function (value, state, options) {

	            if (value.length <= limit) {
	                return value;
	            }

	            return this.createError('array.max', { limit, value }, state, options);
	        });
	    }

	    length(limit) {

	        Hoek.assert(Number.isSafeInteger(limit) && limit >= 0, 'limit must be a positive integer');

	        return this._test('length', limit, function (value, state, options) {

	            if (value.length === limit) {
	                return value;
	            }

	            return this.createError('array.length', { limit, value }, state, options);
	        });
	    }

	    unique(comparator) {

	        Hoek.assert(comparator === undefined ||
	            typeof comparator === 'function' ||
	            typeof comparator === 'string', 'comparator must be a function or a string');

	        const settings = {};

	        if (typeof comparator === 'string') {
	            settings.path = comparator;
	        }
	        else if (typeof comparator === 'function') {
	            settings.comparator = comparator;
	        }

	        return this._test('unique', settings, function (value, state, options) {

	            const found = {
	                string: {},
	                number: {},
	                undefined: {},
	                boolean: {},
	                object: new Map(),
	                function: new Map(),
	                custom: new Map()
	            };

	            const compare = settings.comparator || Hoek.deepEqual;

	            for (let i = 0; i < value.length; ++i) {
	                const item = settings.path ? Hoek.reach(value[i], settings.path) : value[i];
	                const records = settings.comparator ? found.custom : found[typeof item];

	                // All available types are supported, so it's not possible to reach 100% coverage without ignoring this line.
	                // I still want to keep the test for future js versions with new types (eg. Symbol).
	                if (/* $lab:coverage:off$ */ records /* $lab:coverage:on$ */) {
	                    if (records instanceof Map) {
	                        const entries = records.entries();
	                        let current;
	                        while (!(current = entries.next()).done) {
	                            if (compare(current.value[0], item)) {
	                                const localState = {
	                                    key: state.key,
	                                    path: (state.path ? state.path + '.' : '') + i,
	                                    parent: state.parent,
	                                    reference: state.reference
	                                };

	                                const context = {
	                                    pos: i,
	                                    value: value[i],
	                                    dupePos: current.value[1],
	                                    dupeValue: value[current.value[1]]
	                                };

	                                if (settings.path) {
	                                    context.path = settings.path;
	                                }

	                                return this.createError('array.unique', context, localState, options);
	                            }
	                        }

	                        records.set(item, i);
	                    }
	                    else {
	                        if (records[item] !== undefined) {
	                            const localState = {
	                                key: state.key,
	                                path: (state.path ? state.path + '.' : '') + i,
	                                parent: state.parent,
	                                reference: state.reference
	                            };

	                            const context = {
	                                pos: i,
	                                value: value[i],
	                                dupePos: records[item],
	                                dupeValue: value[records[item]]
	                            };

	                            if (settings.path) {
	                                context.path = settings.path;
	                            }

	                            return this.createError('array.unique', context, localState, options);
	                        }

	                        records[item] = i;
	                    }
	                }
	            }

	            return value;
	        });
	    }

	    sparse(enabled) {

	        const value = enabled === undefined ? true : !!enabled;

	        if (this._flags.sparse === value) {
	            return this;
	        }

	        const obj = this.clone();
	        obj._flags.sparse = value;
	        return obj;
	    }

	    single(enabled) {

	        const value = enabled === undefined ? true : !!enabled;

	        if (this._flags.single === value) {
	            return this;
	        }

	        const obj = this.clone();
	        obj._flags.single = value;
	        return obj;
	    }

	    _fillMissedErrors(errors, requireds, state, options) {

	        const knownMisses = [];
	        let unknownMisses = 0;
	        for (let i = 0; i < requireds.length; ++i) {
	            const label = requireds[i]._getLabel();
	            if (label) {
	                knownMisses.push(label);
	            }
	            else {
	                ++unknownMisses;
	            }
	        }

	        if (knownMisses.length) {
	            if (unknownMisses) {
	                errors.push(this.createError('array.includesRequiredBoth', { knownMisses, unknownMisses }, { key: state.key, path: state.path }, options));
	            }
	            else {
	                errors.push(this.createError('array.includesRequiredKnowns', { knownMisses }, { key: state.key, path: state.path }, options));
	            }
	        }
	        else {
	            errors.push(this.createError('array.includesRequiredUnknowns', { unknownMisses }, { key: state.key, path: state.path }, options));
	        }
	    }


	    _fillOrderedErrors(errors, ordereds, state, options) {

	        const requiredOrdereds = [];

	        for (let i = 0; i < ordereds.length; ++i) {
	            const presence = Hoek.reach(ordereds[i], '_flags.presence');
	            if (presence === 'required') {
	                requiredOrdereds.push(ordereds[i]);
	            }
	        }

	        if (requiredOrdereds.length) {
	            this._fillMissedErrors.call(this, errors, requiredOrdereds, state, options);
	        }
	    }

	};


	internals.safeParse = function (value, result) {

	    try {
	        const converted = JSON.parse(value);
	        if (Array.isArray(converted)) {
	            result.value = converted;
	        }
	    }
	    catch (e) { }
	};


	module.exports = new internals.Array();


/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// Load modules

	const Any = __webpack_require__(338);
	const Hoek = __webpack_require__(336);


	// Declare internals

	const internals = {};


	internals.Binary = class extends Any {

	    constructor() {

	        super();
	        this._type = 'binary';
	    }

	    _base(value, state, options) {

	        const result = {
	            value
	        };

	        if (typeof value === 'string' &&
	            options.convert) {

	            try {
	                result.value = new Buffer(value, this._flags.encoding);
	            }
	            catch (e) {
	            }
	        }

	        result.errors = Buffer.isBuffer(result.value) ? null : this.createError('binary.base', null, state, options);
	        return result;
	    }

	    encoding(encoding) {

	        Hoek.assert(Buffer.isEncoding(encoding), 'Invalid encoding:', encoding);

	        if (this._flags.encoding === encoding) {
	            return this;
	        }

	        const obj = this.clone();
	        obj._flags.encoding = encoding;
	        return obj;
	    }

	    min(limit) {

	        Hoek.assert(Number.isSafeInteger(limit) && limit >= 0, 'limit must be a positive integer');

	        return this._test('min', limit, function (value, state, options) {

	            if (value.length >= limit) {
	                return value;
	            }

	            return this.createError('binary.min', { limit, value }, state, options);
	        });
	    }

	    max(limit) {

	        Hoek.assert(Number.isSafeInteger(limit) && limit >= 0, 'limit must be a positive integer');

	        return this._test('max', limit, function (value, state, options) {

	            if (value.length <= limit) {
	                return value;
	            }

	            return this.createError('binary.max', { limit, value }, state, options);
	        });
	    }

	    length(limit) {

	        Hoek.assert(Number.isSafeInteger(limit) && limit >= 0, 'limit must be a positive integer');

	        return this._test('length', limit, function (value, state, options) {

	            if (value.length === limit) {
	                return value;
	            }

	            return this.createError('binary.length', { limit, value }, state, options);
	        });
	    }

	};


	module.exports = new internals.Binary();


/***/ }),
/* 361 */
/***/ (function(module, exports) {

	module.exports = {"_from":"git+https://github.com/hapijs/joi.git#v10.5.2","_id":"joi@10.5.2","_inBundle":false,"_integrity":"","_location":"/joi","_phantomChildren":{},"_requested":{"type":"git","raw":"git+https://github.com/hapijs/joi.git#v10.5.2","rawSpec":"git+https://github.com/hapijs/joi.git#v10.5.2","saveSpec":"git+https://github.com/hapijs/joi.git#v10.5.2","fetchSpec":"https://github.com/hapijs/joi.git","gitCommittish":"v10.5.2"},"_requiredBy":["#USER","/"],"_resolved":"git+https://github.com/hapijs/joi.git#5603fc73a482eb09a53a92fc8ae484d7adcea8f8","_spec":"git+https://github.com/hapijs/joi.git#v10.5.2","_where":"/home/lgsantana1/Repos/dynamodborm","bugs":{"url":"https://github.com/hapijs/joi/issues"},"bundleDependencies":false,"dependencies":{"hoek":"4.x.x","isemail":"2.x.x","items":"2.x.x","topo":"2.x.x"},"deprecated":false,"description":"Object schema validation","devDependencies":{"code":"4.x.x","hapitoc":"1.x.x","lab":"13.x.x"},"engines":{"node":">=4.0.0"},"homepage":"https://github.com/hapijs/joi","keywords":["hapi","schema","validation"],"license":"BSD-3-Clause","main":"lib/index.js","name":"joi","repository":{"type":"git","url":"git://github.com/hapijs/joi.git"},"scripts":{"test":"lab -t 100 -a code -L","test-cov-html":"lab -r html -o coverage.html -a code","test-debug":"lab -a code","toc":"hapitoc","version":"npm run toc && git add API.md README.md"},"version":"10.5.2"}

/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.applyObjectValueSchema = undefined;

	var _defineProperty2 = __webpack_require__(333);

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
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.applyAgregationRootSchema = undefined;

	var _defineProperty2 = __webpack_require__(333);

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
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(333);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _extends4 = __webpack_require__(2);

	var _extends5 = _interopRequireDefault(_extends4);

	var _commonMethods = __webpack_require__(365);

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
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _get = __webpack_require__(366);

	Object.defineProperty(exports, 'get', {
	  enumerable: true,
	  get: function get() {
	    return _get.get;
	  }
	});

	var _set = __webpack_require__(367);

	Object.defineProperty(exports, 'set', {
	  enumerable: true,
	  get: function get() {
	    return _set.set;
	  }
	});

	var _save = __webpack_require__(368);

	Object.defineProperty(exports, 'save', {
	  enumerable: true,
	  get: function get() {
	    return _save.save;
	  }
	});

	var _update = __webpack_require__(369);

	Object.defineProperty(exports, 'update', {
	  enumerable: true,
	  get: function get() {
	    return _update.update;
	  }
	});

	var _delete = __webpack_require__(370);

	Object.defineProperty(exports, 'delete', {
	  enumerable: true,
	  get: function get() {
	    return _delete.del;
	  }
	});

	var _validate = __webpack_require__(371);

	Object.defineProperty(exports, 'validate', {
	  enumerable: true,
	  get: function get() {
	    return _validate.validate;
	  }
	});

	var _getItem = __webpack_require__(372);

	Object.defineProperty(exports, 'getItem', {
	  enumerable: true,
	  get: function get() {
	    return _getItem.getItem;
	  }
	});

	var _addItem = __webpack_require__(374);

	Object.defineProperty(exports, 'addItem', {
	  enumerable: true,
	  get: function get() {
	    return _addItem.addItem;
	  }
	});

	var _removeItem = __webpack_require__(375);

	Object.defineProperty(exports, 'removeItem', {
	  enumerable: true,
	  get: function get() {
	    return _removeItem.removeItem;
	  }
	});

	var _updateItem = __webpack_require__(376);

	Object.defineProperty(exports, 'updateItem', {
	  enumerable: true,
	  get: function get() {
	    return _updateItem.updateItem;
	  }
	});

/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(333);

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
/* 367 */
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
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.save = undefined;

	var _regenerator = __webpack_require__(47);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(72);

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
/* 369 */
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
/* 370 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.del = undefined;

	var _regenerator = __webpack_require__(47);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(72);

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
/* 371 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(2);

	var _extends3 = _interopRequireDefault(_extends2);

	exports.validate = validate;

	var _DynamoDBORMError = __webpack_require__(305);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function validator(joi, values, schema, self) {
	  console.log('###args joi, values, schema, self', joi, values, schema, self);
	  return new Promise(function (resolve, reject) {
	    var a = joi(values, schema, { abortEarly: false });
	    console.log('###', a);
	    if (a.error) {
	      var validationError = new _DynamoDBORMError.DynamoDBORMError({
	        error: error,
	        method: 'validate',
	        args: [joi, values, schema, self],
	        className: 'Model'
	      }, 'ValidationError');

	      var errors = error.details.map(function (error) {
	        var identifier = error.path.filter(function (p) {
	          return isNaN(p);
	        }).join('.');
	        var message = error.message;

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
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getItem = getItem;

	var _DomainError = __webpack_require__(331);

	var _listHelpers = __webpack_require__(373);

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
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.throwIfIsInvalidList = undefined;

	var _DomainError = __webpack_require__(331);

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
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _toConsumableArray2 = __webpack_require__(50);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	exports.addItem = addItem;

	var _listHelpers = __webpack_require__(373);

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
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.removeItem = removeItem;

	var _DomainError = __webpack_require__(331);

	var _listHelpers = __webpack_require__(373);

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
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(2);

	var _extends3 = _interopRequireDefault(_extends2);

	exports.updateItem = updateItem;

	var _DomainError = __webpack_require__(331);

	var _listHelpers = __webpack_require__(373);

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
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.buildAggregationRootModels = undefined;

	var _defineProperty2 = __webpack_require__(333);

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
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _toConsumableArray2 = __webpack_require__(50);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _typeof2 = __webpack_require__(307);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _defineProperty2 = __webpack_require__(333);

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
/* 379 */
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

/***/ })
/******/ ]);