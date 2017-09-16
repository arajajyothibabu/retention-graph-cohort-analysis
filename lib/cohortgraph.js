(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CohortGraph"] = factory();
	else
		root["CohortGraph"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by jyothi on 16/6/17.
 */
var VALUE_KEYS = exports.VALUE_KEYS = {
  VALUE: "value",
  PERCENT: "percent"
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by jyothi on 16/6/17.
 */
var DEFAULT_CELL_COLOR = exports.DEFAULT_CELL_COLOR = "#F5F5F5";
var DEFAULT_KEY_CELL_COLOR = exports.DEFAULT_KEY_CELL_COLOR = "#EEE";
var DEFAULT_HEADER_CELL_COLOR = exports.DEFAULT_HEADER_CELL_COLOR = "#DDD";

var DEFAULT_BORDER = exports.DEFAULT_BORDER = "1px solid #CCC";

var TableStyles = exports.TableStyles = {
    display: 'table',
    width: "100%",
    borderCollapse: 'collapse',
    textAlign: 'center',
    borderLeft: DEFAULT_BORDER
};

var TableRowStyles = exports.TableRowStyles = {
    display: 'table-row'
};

var TableHeaderStyles = exports.TableHeaderStyles = {
    display: 'table-header-group',
    backgroundColor: DEFAULT_HEADER_CELL_COLOR,
    fontWeight: 'bold',
    padding: '5px 10px',
    borderBottom: DEFAULT_BORDER,
    borderTop: DEFAULT_BORDER
};

var TableBodyStyles = exports.TableBodyStyles = {
    display: 'table-row-group'
};

var TableCellStyles = exports.TableCellStyles = {
    display: 'table-cell',
    backgroundColor: DEFAULT_HEADER_CELL_COLOR,
    padding: '5px 10px',
    borderBottom: '1px solid #DDD',
    borderRight: DEFAULT_BORDER
};

var HeaderValueStyles = exports.HeaderValueStyles = {
    fontSize: '12px'
};

var HeaderLabelStyles = exports.HeaderLabelStyles = {
    fontSize: '16px',
    padding: '0',
    margin: '0'
};

/*Styles*/

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by jyothi on 16/6/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _styles = __webpack_require__(1);

var _DataStore = __webpack_require__(3);

var _DataStore2 = _interopRequireDefault(_DataStore);

var _Elements = __webpack_require__(4);

var _constants = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CohortGraph = function () {
    function CohortGraph(element, data, options) {
        _classCallCheck(this, CohortGraph);

        this.root = element;
        this.options = options; //TODO: handle default options
        this.dataStore = new _DataStore2.default({});
        this.currentType = "";
        this.valueType = _constants.VALUE_KEYS.VALUE;
        this.init(data);
    }

    _createClass(CohortGraph, [{
        key: 'init',
        value: function init(data) {
            var keys = Object.keys(data);
            if (keys.length > 0) {
                this.currentType = Object.keys(data)[0]; //taking first key as type by default TODO: give it as option
                this.dataStore = new _DataStore2.default(data || {});
                this.render();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var root = this.root,
                options = this.options,
                dataStore = this.dataStore,
                currentType = this.currentType,
                valueType = this.valueType;

            var headerData = dataStore.getHeader(currentType);
            var rowsData = dataStore.getRows(currentType);
            root.appendChild((0, _Elements.Table)({ header: headerData, body: rowsData }, valueType));
        }
    }]);

    return CohortGraph;
}();

exports.default = CohortGraph;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _styles = __webpack_require__(1);

var _constants = __webpack_require__(0);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Created by jyothi on 16/6/17.
                                                                                                                                                           */


var VALUE = _constants.VALUE_KEYS.VALUE,
    PERCENT = _constants.VALUE_KEYS.PERCENT;

var DataStore =

/**
 *
 * @param data {Object}
 * @param options {Object}
 * options = {
 *  shadeColor: {string} HEX
 *  headerColor
 * }
 */
function DataStore(data, options) {
    _classCallCheck(this, DataStore);

    _initialiseProps.call(this);

    this.isValid = true;
    this._checkValidity(data);
    this.rawStore = data;
    this.store = {};
    this.headers = {};
    if (this.isValid) {
        this._buildStore(data);
        this._buildHeaders();
    } else {
        throw new Error("Invalid Data for cohort graph..!");
    }
}

/**
 *
 * @param data
 * @private
 */


/**
 *
 * @param data
 * @private
 */


/**
 * builds header for table
 * @private
 */


/**
 * Sum of Array Elements
 * @param arr
 * @private
 */


/**
 *
 * @param arr
 * @param index
 * @returns {number}
 * @private
 */


/**
 *
 * @param arr
 * @param index
 * @returns {number}
 * @private
 */


/**
 *
 * @param type
 * @returns {*}
 */


/**
 *
 * @param type
 */


/**
 *
 * @param type
 * @param row
 * @param col
 * @returns {*}
 */


/**
 *
 * @param type
 * @param col
 * @returns {*}
 */


/**
 *
 * @param type
 * @returns {*}
 */


/**
 *
 * @param type
 * @returns {*}
 */


/**
 * Cell Shade color based on percentage
 * @param percent
 * @param color
 * @returns {string}
 */


/**
 *
 * @param total
 * @param value
 * @returns {number}
 */


/**
 *
 * @param color
 * @returns {boolean}
 */
;

var _initialiseProps = function _initialiseProps() {
    var _this = this;

    this._checkValidity = function (data) {
        if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && !Array.isArray(data)) {
            for (var key in data) {
                if (data.hasOwnProperty(key) && _typeof(data[key]) === 'object' && !Array.isArray(data[key])) {
                    for (var anotherKey in data[key]) {
                        if (data[key].hasOwnProperty(anotherKey) && !Array.isArray(data[key][anotherKey])) {
                            _this.isValid = false;
                            return;
                        }
                    }
                } else {
                    _this.isValid = false;
                    return;
                }
            }
        } else {
            _this.isValid = false;
        }
    };

    this._buildStore = function (data) {
        var _loop = function _loop(key) {
            if (data.hasOwnProperty(key)) {
                _this.store[key] = [];

                var _loop2 = function _loop2(anotherKey) {
                    if (data[key].hasOwnProperty(anotherKey)) {
                        var cellData = {};
                        cellData.type = key;
                        cellData[VALUE] = anotherKey;
                        cellData.valueFor = anotherKey;
                        cellData.total = data[key][anotherKey][0];
                        cellData[PERCENT] = 100;
                        cellData.color = _styles.DEFAULT_KEY_CELL_COLOR;
                        cellData.isLabel = true;
                        _this.store[key].push([cellData].concat(_toConsumableArray(data[key][anotherKey].map(function (value, index) {
                            var _ref;

                            var percent = _this._getPercentage(cellData.total, value);
                            return _ref = {
                                type: key
                            }, _defineProperty(_ref, VALUE, value), _defineProperty(_ref, 'valueFor', anotherKey), _defineProperty(_ref, 'total', cellData.total), _defineProperty(_ref, 'isTotal', index === 0), _defineProperty(_ref, PERCENT, percent), _defineProperty(_ref, 'color', index === 0 ? _styles.DEFAULT_CELL_COLOR : _this._shadeCellWithColor(percent)), _ref;
                        }))));
                    }
                };

                for (var anotherKey in data[key]) {
                    _loop2(anotherKey);
                }
            }
        };

        for (var key in data) {
            _loop(key);
        }
    };

    this._buildHeaders = function () {
        var _loop3 = function _loop3(key) {
            if (_this.store.hasOwnProperty(key)) {
                var labelPrefix = _this._turnCamelCase(key.slice(0, -1));
                _this.headers[key] = [];
                _this.headers[key].push({ //first cell
                    value: "", //TODO:
                    color: _styles.DEFAULT_HEADER_CELL_COLOR,
                    isLabel: true,
                    label: _this._turnCamelCase(key)
                });
                var cellData = {};
                cellData.isHeader = true;
                cellData.index = 0;
                cellData.type = key;
                cellData[VALUE] = _this._sumOfColumnWithIndex(_this.store[key], 1);
                cellData.valueFor = key;
                cellData.total = cellData.value;
                cellData[PERCENT] = 100;
                cellData.isTotal = true;
                cellData.color = _styles.DEFAULT_HEADER_CELL_COLOR;
                cellData.label = labelPrefix + ' ' + 0;
                _this.headers[key].push(cellData); //second cell
                var largeRow = _this.store[key][0];
                var totalRows = _this.store[key].length;
                largeRow.forEach(function (el, index) {
                    var _this$headers$key$pus;

                    if (index < 2) return;
                    var value = _this._sumOfColumnWithIndex(_this.store[key], index);
                    var percent = _this._getPercentage(_this._sumOfFirstColumnUpToIndex(_this.store[key], totalRows), value);
                    _this.headers[key].push((_this$headers$key$pus = {
                        isHeader: true,
                        index: index,
                        type: key
                    }, _defineProperty(_this$headers$key$pus, VALUE, value), _defineProperty(_this$headers$key$pus, 'valueFor', largeRow[0]), _defineProperty(_this$headers$key$pus, 'total', cellData.total), _defineProperty(_this$headers$key$pus, PERCENT, percent), _defineProperty(_this$headers$key$pus, 'color', _this._shadeCellWithColor(percent)), _defineProperty(_this$headers$key$pus, 'label', labelPrefix + ' ' + (index - 1)), _this$headers$key$pus));
                });
            }
        };

        //TODO: can also take custom headers
        for (var key in _this.store) {
            _loop3(key);
        }
    };

    this._sumOfArrayElements = function (arr) {
        return arr.reduce(function (a, b) {
            return a + b;
        });
    };

    this._sumOfColumnWithIndex = function (arr, index) {
        var sum = 0;
        arr.forEach(function (el) {
            try {
                sum += el[index].value;
            } catch (e) {
                sum += 0;
            }
        });
        return sum;
    };

    this._sumOfFirstColumnUpToIndex = function (arr, index) {
        var sum = 0;
        for (var i = 0; i <= index; i++) {
            try {
                sum += arr[i][1].value;
            } catch (e) {
                break;
            }
        }
        return sum;
    };

    this.getTypeData = function (type) {
        if (_this.store.hasOwnProperty(type)) {
            return _this.store[type]; //returns [][]
        } else {
            throw new Error('No Data Found for type => ' + type);
        }
    };

    this.getHighestRowSize = function (type) {
        if (_this.store.hasOwnProperty(type)) {
            return _this.store[type][0].length; //returns [][]
        } else {
            throw new Error('No Columns Found for type => ' + type);
        }
    };

    this.getCellData = function (type, row, col) {
        if (_this.store.hasOwnProperty(type)) {
            try {
                return _this.store[type][row][col];
            } catch (e) {
                throw new Error('No Data Found for cell with type => ' + type + ', row => ' + row + ', col => ' + col);
            }
        } else {
            throw new Error('No Data Found for cell with type => ' + type + ', row => ' + row + ', col => ' + col);
        }
    };

    this.getHeaderCellData = function (type, col) {
        if (_this.headers.hasOwnProperty(type)) {
            try {
                return _this.headers[type][col];
            } catch (e) {
                throw new Error('No Data Found for cell with type => ' + type + ', col => ' + col);
            }
        } else {
            throw new Error('No Data Found for cell with type => ' + type + ', col => ' + col);
        }
    };

    this.getHeader = function (type) {
        if (_this.headers.hasOwnProperty(type)) {
            return _this.headers[type]; //returns [][]
        } else {
            throw new Error('No Headers Found for type => ' + type);
        }
    };

    this.getRows = function (type) {
        if (_this.store.hasOwnProperty(type)) {
            return _this.store[type]; //returns [][]
        } else {
            throw new Error('No Headers Found for type => ' + type);
        }
    };

    this._shadeCellWithColor = function (percent) {
        var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "#3f83a3";

        var rate = 1.0 - Math.ceil(percent / 10) / 10;
        var f = parseInt(color.slice(1), 16),
            t = rate < 0 ? 0 : 255,
            p = rate < 0 ? rate * -1 : rate,
            R = f >> 16,
            G = f >> 8 & 0x00FF,
            B = f & 0x0000FF;
        return '#' + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
    };

    this._getPercentage = function (total, value) {
        return total ? Math.round(value / total * 100 * 100) / 100 : total;
    };

    this._isValidHex = function (color) {
        return (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)
        );
    };

    this._turnCamelCase = function (text) {
        var defaultReturnValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        if (typeof text === 'string') {
            return text.toLowerCase().replace(/\b\w/g, function (replaced) {
                return replaced.toUpperCase();
            });
        }
    };
};

exports.default = DataStore;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Container = exports.Table = exports.Body = exports.Header = exports.Tr = exports.Td = exports.Th = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by jyothi on 16/6/17.
                                                                                                                                                                                                                                                                   */


var _styles = __webpack_require__(1);

var _constants = __webpack_require__(0);

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var VALUE = _constants.VALUE_KEYS.VALUE,
    PERCENT = _constants.VALUE_KEYS.PERCENT;


var renderValue = function renderValue(props, valueType) {
    var isTotal = props.isTotal,
        isLabel = props.isLabel;

    return isTotal || isLabel ? props[VALUE] : valueType === PERCENT ? props[PERCENT] + ' %' : props[VALUE];
};

var appendStyles = function appendStyles(element, newStyles) {
    for (var style in newStyles) {
        if (newStyles.hasOwnProperty(style)) {
            element.style[style] = newStyles[style];
        }
    }
};

var Th = exports.Th = function Th(props, valueType) {
    var div = document.createElement("div");
    var p = document.createElement("p");
    var span = document.createElement("span");
    p.style = _extends({}, p.style, _styles.HeaderLabelStyles);
    p.innerHTML = props.label;
    appendStyles(span, _styles.HeaderValueStyles);
    span.innerHTML = renderValue(props, valueType);
    appendStyles(div, _extends({}, _styles.TableCellStyles, { backgroundColor: props.color }));
    div.appendChild(p);
    div.appendChild(span);
    return div;
};

var Td = exports.Td = function Td(props, valueType) {
    var div = document.createElement("div");
    appendStyles(div, _extends({}, _styles.TableCellStyles, { backgroundColor: props.color }));
    div.setAttribute("title", 'Out of ' + props.total + ' on ' + props.valueFor);
    div.innerHTML = renderValue(props, valueType);
    return div;
};

var Tr = exports.Tr = function Tr(props, valueType) {
    var div = document.createElement("div");
    appendStyles(div, _styles.TableRowStyles);
    props.forEach(function (cellData) {
        div.appendChild(Td(cellData, valueType));
    });
    return div;
};

var Header = exports.Header = function Header(props, valueType) {
    var header = document.createElement("div");
    appendStyles(header, _styles.TableHeaderStyles);
    props.forEach(function (headerCellData) {
        header.appendChild(Th(headerCellData, valueType));
    });
    return header;
};

var Body = exports.Body = function Body(props, valueType) {
    var body = document.createElement("div");
    appendStyles(body, _styles.TableBodyStyles);
    props.forEach(function (rowData) {
        body.appendChild(Tr(rowData, valueType));
    });
    return body;
};

var Table = exports.Table = function Table(props, valueType) {
    var table = document.createElement("div");
    appendStyles(table, _styles.TableStyles);
    table.appendChild(Header(props.header, valueType));
    table.appendChild(Body(props.body, valueType));
    return table;
};

var Container = exports.Container = function Container(props, valueType) {
    //TODO: wrapper container with controls
    _objectDestructuringEmpty(props);

    var container = document.createElement("div");
    container.setAttribute('style', null);

    var header = document.createElement("div");
    header.setAttribute('style', null);
    header.appendChild(title);

    var title = document.createElement("p");
    title.setAttribute('style', null);
    title.setAttribute('title', props.title);

    var controls = document.createElement("div");
    header.setAttribute('style', null);
    header.appendChild(title);

    if (props.enableDateRange) {
        var dateRange = document.createElement("a");
        dateRange.setAttribute('type', "text");
        dateRange.setAttribute('id', "retention-date-range");
        dateRange.setAttribute('style', null);

        var anchorWrapper = document.createElement("a");
        anchorWrapper.setAttribute('style', null);
        anchorWrapper.appendChild(dateRange);
    }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by jyothi on 20/6/17.
 */

module.exports = __webpack_require__(2).default;

/***/ })
/******/ ]);
});