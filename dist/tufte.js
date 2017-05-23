(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3"));
	else if(typeof define === 'function' && define.amd)
		define("tufte", ["d3"], factory);
	else if(typeof exports === 'object')
		exports["tufte"] = factory(require("d3"));
	else
		root["tufte"] = factory(root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YAxisPatch = exports.XAxisPatch = undefined;

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

var _utils = __webpack_require__(4);

var utils = _interopRequireWildcard(_utils);

var _annotation = __webpack_require__(14);

var _annotation2 = _interopRequireDefault(_annotation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var XAxisPatch = exports.XAxisPatch = function XAxisPatch(svg, bounds, data, config) {
  _classCallCheck(this, XAxisPatch);

  var cfg = Object.assign({ scaleType: 'linear' }, config);

  var xAxisDiv = svg.append('g').attr('class', 'axis axis--x').attr('transform', 'translate(0, ' + bounds.y + ')');

  if (cfg.axisLabel) {
    new _annotation2.default(svg, { x: bounds.x + bounds.width, y: bounds.y + 40 }, cfg.axisLabel); // eslint-disable-line no-new
  }

  var xScale = utils.getScale(cfg.scaleType, data.map(function (d) {
    return d.x;
  }), [bounds.x, bounds.width + bounds.x]);

  var xAxis = d3.axisBottom(xScale).ticks(5);
  xAxisDiv.transition().duration(200).call(xAxis);
};

var YAxisPatch = exports.YAxisPatch = function YAxisPatch(svg, bounds, data, config) {
  _classCallCheck(this, YAxisPatch);

  var cfg = Object.assign({ scaleType: 'linear' }, config);

  var yAxisDiv = svg.append('g').attr('class', 'axis axis--y').attr('transform', 'translate(' + bounds.x + ', 0)');

  if (cfg.axisLabel) {
    new _annotation2.default(svg, { x: 10, y: bounds.y }, cfg.axisLabel, { horizontal: false }); // eslint-disable-line no-new
  }

  var yScale = utils.getScale(cfg.scaleType, data.map(function (d) {
    return d.y;
  }), [bounds.y + bounds.height, bounds.y]);

  var yAxis = d3.axisLeft(yScale).ticks(5);
  yAxisDiv.transition().duration(200).call(yAxis);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

var _utils = __webpack_require__(4);

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LinePatch = function LinePatch(svg, bounds, data, config) {
  _classCallCheck(this, LinePatch);

  var cfg = Object.assign({
    smooth: false,
    scaleType: {
      x: 'linear',
      y: 'linear'
    }
  }, config);

  var xScale = utils.getScale(cfg.scaleType.x, data.map(function (d) {
    return d.x;
  }), [0, bounds.width]);
  var yScale = utils.getScale(cfg.scaleType.y, data.map(function (d) {
    return d.y;
  }), [bounds.height, 0]);

  var line = d3.line().x(function (d) {
    return xScale(d.x) + bounds.x;
  }).y(function (d) {
    return yScale(d.y) + bounds.y;
  });

  if (cfg.smooth) {
    line = line.curve(d3.curveBasis);
  }

  svg.append('g').append('path').attr('class', 'line').datum(data).transition().duration(200).attr('d', line);
};

exports.default = LinePatch;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _d2 = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d2);

var _utils = __webpack_require__(4);

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScatterPatch = function ScatterPatch(svg, bounds, data, config) {
  _classCallCheck(this, ScatterPatch);

  var cfg = Object.assign({
    r: '2px',
    scaleType: {
      x: 'linear',
      y: 'linear'
    }
  }, config);

  var xScale = utils.getScale(cfg.scaleType.x, data.map(function (d) {
    return d.x;
  }), [0, bounds.width]);
  var yScale = utils.getScale(cfg.scaleType.y, data.map(function (d) {
    return d.y;
  }), [bounds.height, 0]);

  var patchGroup = svg.append('g');

  var circles = patchGroup.selectAll('.point').data(data);

  circles.enter().append('circle').merge(circles).attr('class', 'point').transition(200).ease(d3.easeQuadOut).attr('cx', function (d) {
    return xScale(d.x) + bounds.x;
  }).attr('cy', function (d) {
    return yScale(d.y) + bounds.y;
  }).attr('r', cfg.r).attr('data-x', function (d) {
    return d.x;
  }).attr('data-y', function (d) {
    return d.y;
  });

  // Add tooltip to circles
  if (cfg.tooltip) {
    patchGroup.selectAll('circle').on('mouseover', function () {
      var elem = d3.select(this);
      cfg.tooltip.show(parseFloat(elem.attr('data-x')).toFixed(2) + ', ' + parseFloat(elem.attr('data-y')).toFixed(2));
    }).on('mouseout', function () {
      return cfg.tooltip.hide();
    }).on('mousemove', function () {
      var _d3$mouse = d3.mouse(svg.node()),
          _d3$mouse2 = _slicedToArray(_d3$mouse, 2),
          x = _d3$mouse2[0],
          y = _d3$mouse2[1];

      var bb = svg.node().getBoundingClientRect();
      cfg.tooltip.move(x + bb.left, y + bb.top);
    });
  }
};

exports.default = ScatterPatch;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseConfig = parseConfig;
exports.marginalize = marginalize;
exports.getScale = getScale;

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Parse config to setup a few general things
 */
function parseConfig(target, data, config) {
  var selection = d3.select(target).attr('class', 'tufte-plot');

  var selectionBB = selection.node().getBoundingClientRect();
  var selectionHeight = selectionBB.height === 0 ? 400 : selectionBB.height;
  var selectionWidth = selectionBB.width;

  if (config && config.width) {
    selectionWidth = config.width;
  }

  // Heuristic to check whether we can make the dotline plot
  var dotLinePlot = selectionWidth / data.length > 15;

  return Object.assign({
    height: selectionHeight,
    width: selectionWidth,
    margin: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 20
    },
    dotLinePlot: dotLinePlot,
    axisBand: {
      x: config && config.axisLabel && config.axisLabel.x ? 50 : 30,
      y: dotLinePlot ? 0 : config && config.axisLabel && config.axisLabel.y ? 50 : 30
    },
    axisMargin: 20,
    axisLabel: {
      x: null,
      y: null
    },
    scaleType: {
      x: 'linear',
      y: 'linear'
    },
    tooltip: true
  }, config);
}

/**
 * Return marginalized histogram data across x and y
 */
function marginalize(data) {
  var x = data.map(function (d) {
    return d.x;
  });
  var y = data.map(function (d) {
    return d.y;
  });

  var countsX = d3.histogram().thresholds(d3.thresholdSturges(x))(x).map(function (bin) {
    return bin.length;
  });
  var countsY = d3.histogram().thresholds(d3.thresholdSturges(y))(y).map(function (bin) {
    return bin.length;
  });

  return [countsX.map(function (c, idx) {
    return {
      x: idx,
      y: c
    };
  }), countsY.map(function (c, idx) {
    return {
      x: c,
      y: idx
    };
  })];
}

/**
 * Get scale depending on the type and range, using the single data series
 */
function getScale(type, dataSeries, range) {
  return {
    'linear': d3.scaleLinear,
    'log': d3.scaleLog
  }[type]().domain(d3.extent(dataSeries)).range(range);
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tooltip = function () {
  function Tooltip(target) {
    _classCallCheck(this, Tooltip);

    this.div = d3.select(target).append('div').attr('class', 'tufte-tooltip').style('display', 'none');
    this.offset = 15;
    this.div.text('undefined');
  }

  _createClass(Tooltip, [{
    key: 'show',
    value: function show(data) {
      this.div.text(data);
      this.div.style('display', null);
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.div.style('display', 'none');
    }
  }, {
    key: 'move',
    value: function move(x, y) {
      this.div.style('top', y + this.offset + 'px').style('left', x + this.offset + 'px');
    }
  }, {
    key: 'width',
    get: function get() {
      return Math.max(this.selection.node().getBoundingClientRect().width, 50);
    }
  }]);

  return Tooltip;
}();

exports.default = Tooltip;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

var _utils = __webpack_require__(4);

var utils = _interopRequireWildcard(_utils);

var _line = __webpack_require__(2);

var _line2 = _interopRequireDefault(_line);

var _scatter = __webpack_require__(3);

var _scatter2 = _interopRequireDefault(_scatter);

var _axis = __webpack_require__(1);

var _tooltip = __webpack_require__(5);

var _tooltip2 = _interopRequireDefault(_tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LinePlot = function LinePlot(target, data, config) {
  _classCallCheck(this, LinePlot);

  var cfg = utils.parseConfig(target, data, config);

  var selection = d3.select(target).attr('class', 'tufte-line-plot');

  var uheight = cfg.height - cfg.margin.top - cfg.margin.bottom;
  var uwidth = cfg.width - cfg.margin.left - cfg.margin.right;

  var svg = selection.append('svg').attr('width', cfg.width).attr('height', cfg.height);

  // Setup layout
  var drawingBound = {
    height: uheight - cfg.axisBand.x - cfg.axisMargin,
    width: uwidth - cfg.axisBand.y - cfg.axisMargin,
    x: cfg.margin.left + cfg.axisBand.y + cfg.axisMargin,
    y: cfg.margin.top
  };

  var xAxisBounds = {
    height: cfg.axisBand.x,
    width: uwidth - cfg.axisBand.y - cfg.axisMargin,
    x: cfg.margin.left + cfg.axisBand.y + cfg.axisMargin,
    y: cfg.margin.top + uheight - cfg.axisBand.x
  };

  // Plot axes
  new _axis.XAxisPatch(svg, xAxisBounds, data, { // eslint-disable-line no-new
    scaleType: cfg.scaleType.x,
    axisLabel: cfg.axisLabel.x
  });
  if (!cfg.dotLinePlot) {
    var yAxisBounds = {
      height: uheight - cfg.axisBand.x - cfg.axisMargin,
      width: cfg.axisBand.y,
      x: cfg.margin.left + cfg.axisBand.y,
      y: cfg.margin.top
    };
    new _axis.YAxisPatch(svg, yAxisBounds, data, { // eslint-disable-line no-new
      scaleType: cfg.scaleType.y,
      axisLabel: cfg.axisLabel.y
    });
  }

  // Plot line
  new _line2.default(svg, drawingBound, data, { // eslint-disable-line no-new
    smooth: cfg.smooth,
    scaleType: cfg.scaleType
  });

  // Scatter points with tooltip only if data is less
  if (cfg.dotLinePlot) {
    var tooltip = cfg.tooltip === true ? new _tooltip2.default(target) : null;
    new _scatter2.default(svg, drawingBound, data, { // eslint-disable-line no-new
      tooltip: tooltip,
      r: '6px',
      scaleType: cfg.scaleType
    });
  }
};

exports.default = LinePlot;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _d2 = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d2);

var _utils = __webpack_require__(4);

var utils = _interopRequireWildcard(_utils);

var _scatter = __webpack_require__(3);

var _scatter2 = _interopRequireDefault(_scatter);

var _line = __webpack_require__(2);

var _line2 = _interopRequireDefault(_line);

var _axis = __webpack_require__(1);

var _tooltip = __webpack_require__(5);

var _tooltip2 = _interopRequireDefault(_tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LinePlot = function LinePlot(target, data, config) {
  _classCallCheck(this, LinePlot);

  var cfg = utils.parseConfig(target, data, config);

  var selection = d3.select(target).attr('class', 'tufte-scatter-plot');

  var uheight = cfg.height - cfg.margin.top - cfg.margin.bottom;
  var uwidth = cfg.width - cfg.margin.left - cfg.margin.right;

  var svg = selection.append('svg').attr('width', cfg.width).attr('height', cfg.height);

  // Setup layout
  var marginalBand = cfg.marginal ? 50 : 0;

  var drawingBound = {
    height: uheight - cfg.axisBand.x - cfg.axisMargin - marginalBand,
    width: uwidth - cfg.axisBand.y - cfg.axisMargin - marginalBand,
    x: cfg.margin.left + cfg.axisBand.y + cfg.axisMargin + marginalBand,
    y: cfg.margin.top
  };

  var xAxisBounds = {
    height: cfg.axisBand.x,
    width: uwidth - cfg.axisBand.y - cfg.axisMargin - marginalBand,
    x: cfg.margin.left + cfg.axisBand.y + cfg.axisMargin + marginalBand,
    y: cfg.margin.top + uheight - cfg.axisBand.x
  };

  var yAxisBounds = {
    height: uheight - cfg.axisBand.x - cfg.axisMargin - marginalBand,
    width: cfg.axisBand.y,
    x: cfg.margin.left + cfg.axisBand.y,
    y: cfg.margin.top
  };

  if (marginalBand > 0) {
    var xMarginalBounds = {
      height: marginalBand,
      width: drawingBound.width,
      x: drawingBound.x,
      y: cfg.margin.top + drawingBound.height + cfg.axisMargin
    };

    var yMarginalBounds = {
      height: drawingBound.height,
      width: marginalBand,
      x: cfg.margin.left + cfg.axisBand.y,
      y: cfg.margin.top
    };

    var _utils$marginalize = utils.marginalize(data),
        _utils$marginalize2 = _slicedToArray(_utils$marginalize, 2),
        xMarginalizedData = _utils$marginalize2[0],
        yMarginalizedData = _utils$marginalize2[1];

    new _line2.default(svg, xMarginalBounds, xMarginalizedData, { smooth: true, scaleType: cfg.scaleType }); // eslint-disable-line no-new
    new _line2.default(svg, yMarginalBounds, yMarginalizedData, { smooth: true, scaleType: cfg.scaleType }); // eslint-disable-line no-new
  }

  // Plot axes
  new _axis.XAxisPatch(svg, xAxisBounds, data, { // eslint-disable-line no-new
    scaleType: cfg.scaleType.x,
    axisLabel: cfg.axisLabel.x
  });
  new _axis.YAxisPatch(svg, yAxisBounds, data, { // eslint-disable-line no-new
    scaleType: cfg.scaleType.y,
    axisLabel: cfg.axisLabel.y
  });

  // Scatter points with tooltip only if data is less
  var tooltip = new _tooltip2.default(target);
  new _scatter2.default(svg, drawingBound, data, { tooltip: tooltip, scaleType: cfg.scaleType }); // eslint-disable-line no-new
};

exports.default = LinePlot;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(12)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScatterPlot = exports.LinePlot = undefined;

var _line = __webpack_require__(6);

Object.defineProperty(exports, 'LinePlot', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_line).default;
  }
});

var _scatter = __webpack_require__(7);

Object.defineProperty(exports, 'ScatterPlot', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_scatter).default;
  }
});

__webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(undefined);
// imports


// module
exports.push([module.i, ".axis .domain,\n.axis .tick line {\n  display: none; }\n\n.tufte-plot,\ntufte-tooltip {\n  font-family: et-book, Palatino, \"Palatino Linotype\", \"Palatino LT STD\", \"Book Antiqua\", Georgia, serif; }\n\n.tufte-tooltip {\n  background: #31363b;\n  border-color: #31363b;\n  border-radius: 2px;\n  border-style: solid;\n  border-width: 1px;\n  box-shadow: 8px 8px 20px 0 #aaa;\n  color: #fff;\n  font-family: 'Source Sans Pro';\n  font-size: 13px;\n  padding: 3px 10px;\n  position: fixed; }\n\n.tufte-line-plot .line {\n  fill: none;\n  stroke: #000; }\n\n.tufte-line-plot .point {\n  fill: #000;\n  stroke: #fff;\n  stroke-width: 6px; }\n\n.tufte-scatter-plot .point {\n  fill: #000;\n  stroke: transparent;\n  stroke-width: 5px; }\n\n.tufte-scatter-plot .line {\n  fill: none;\n  stroke: #aaa; }\n", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(13);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list, options);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list, options) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove, transformResult;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    transformResult = options.transform(obj.css);
	    
	    if (transformResult) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = transformResult;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css. 
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 13 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnnotationPatch = function AnnotationPatch(svg, bounds, text, config) {
  _classCallCheck(this, AnnotationPatch);

  var cfg = Object.assign({ horizontal: true }, config);

  var textDiv = svg.append('text').attr('class', 'annotation').text(text).attr('transform', 'translate(' + bounds.x + ', ' + bounds.y + ')').style('text-anchor', 'end');

  if (!cfg.horizontal) {
    textDiv.attr('dy', '1em').attr('transform', textDiv.attr('transform') + ' rotate(-90)');
  }
};

exports.default = AnnotationPatch;

/***/ })
/******/ ]);
});