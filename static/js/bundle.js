(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // node_modules/ev-emitter/ev-emitter.js
  var require_ev_emitter = __commonJS({
    "node_modules/ev-emitter/ev-emitter.js"(exports, module) {
      (function(global2, factory) {
        if (typeof define == "function" && define.amd) {
          define(factory);
        } else if (typeof module == "object" && module.exports) {
          module.exports = factory();
        } else {
          global2.EvEmitter = factory();
        }
      })(typeof window != "undefined" ? window : exports, function() {
        "use strict";
        function EvEmitter() {
        }
        var proto = EvEmitter.prototype;
        proto.on = function(eventName, listener) {
          if (!eventName || !listener) {
            return;
          }
          var events = this._events = this._events || {};
          var listeners = events[eventName] = events[eventName] || [];
          if (listeners.indexOf(listener) == -1) {
            listeners.push(listener);
          }
          return this;
        };
        proto.once = function(eventName, listener) {
          if (!eventName || !listener) {
            return;
          }
          this.on(eventName, listener);
          var onceEvents = this._onceEvents = this._onceEvents || {};
          var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
          onceListeners[listener] = true;
          return this;
        };
        proto.off = function(eventName, listener) {
          var listeners = this._events && this._events[eventName];
          if (!listeners || !listeners.length) {
            return;
          }
          var index = listeners.indexOf(listener);
          if (index != -1) {
            listeners.splice(index, 1);
          }
          return this;
        };
        proto.emitEvent = function(eventName, args) {
          var listeners = this._events && this._events[eventName];
          if (!listeners || !listeners.length) {
            return;
          }
          listeners = listeners.slice(0);
          args = args || [];
          var onceListeners = this._onceEvents && this._onceEvents[eventName];
          for (var i = 0; i < listeners.length; i++) {
            var listener = listeners[i];
            var isOnce = onceListeners && onceListeners[listener];
            if (isOnce) {
              this.off(eventName, listener);
              delete onceListeners[listener];
            }
            listener.apply(this, args);
          }
          return this;
        };
        proto.allOff = function() {
          delete this._events;
          delete this._onceEvents;
        };
        return EvEmitter;
      });
    }
  });

  // node_modules/get-size/get-size.js
  var require_get_size = __commonJS({
    "node_modules/get-size/get-size.js"(exports, module) {
      (function(window2, factory) {
        if (typeof define == "function" && define.amd) {
          define(factory);
        } else if (typeof module == "object" && module.exports) {
          module.exports = factory();
        } else {
          window2.getSize = factory();
        }
      })(window, function factory() {
        "use strict";
        function getStyleSize(value) {
          var num = parseFloat(value);
          var isValid = value.indexOf("%") == -1 && !isNaN(num);
          return isValid && num;
        }
        function noop() {
        }
        var logError = typeof console == "undefined" ? noop : function(message) {
          console.error(message);
        };
        var measurements = [
          "paddingLeft",
          "paddingRight",
          "paddingTop",
          "paddingBottom",
          "marginLeft",
          "marginRight",
          "marginTop",
          "marginBottom",
          "borderLeftWidth",
          "borderRightWidth",
          "borderTopWidth",
          "borderBottomWidth"
        ];
        var measurementsLength = measurements.length;
        function getZeroSize() {
          var size = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
          };
          for (var i = 0; i < measurementsLength; i++) {
            var measurement = measurements[i];
            size[measurement] = 0;
          }
          return size;
        }
        function getStyle(elem) {
          var style = getComputedStyle(elem);
          if (!style) {
            logError("Style returned " + style + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1");
          }
          return style;
        }
        var isSetup = false;
        var isBoxSizeOuter;
        function setup() {
          if (isSetup) {
            return;
          }
          isSetup = true;
          var div = document.createElement("div");
          div.style.width = "200px";
          div.style.padding = "1px 2px 3px 4px";
          div.style.borderStyle = "solid";
          div.style.borderWidth = "1px 2px 3px 4px";
          div.style.boxSizing = "border-box";
          var body = document.body || document.documentElement;
          body.appendChild(div);
          var style = getStyle(div);
          isBoxSizeOuter = Math.round(getStyleSize(style.width)) == 200;
          getSize.isBoxSizeOuter = isBoxSizeOuter;
          body.removeChild(div);
        }
        function getSize(elem) {
          setup();
          if (typeof elem == "string") {
            elem = document.querySelector(elem);
          }
          if (!elem || typeof elem != "object" || !elem.nodeType) {
            return;
          }
          var style = getStyle(elem);
          if (style.display == "none") {
            return getZeroSize();
          }
          var size = {};
          size.width = elem.offsetWidth;
          size.height = elem.offsetHeight;
          var isBorderBox = size.isBorderBox = style.boxSizing == "border-box";
          for (var i = 0; i < measurementsLength; i++) {
            var measurement = measurements[i];
            var value = style[measurement];
            var num = parseFloat(value);
            size[measurement] = !isNaN(num) ? num : 0;
          }
          var paddingWidth = size.paddingLeft + size.paddingRight;
          var paddingHeight = size.paddingTop + size.paddingBottom;
          var marginWidth = size.marginLeft + size.marginRight;
          var marginHeight = size.marginTop + size.marginBottom;
          var borderWidth = size.borderLeftWidth + size.borderRightWidth;
          var borderHeight = size.borderTopWidth + size.borderBottomWidth;
          var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;
          var styleWidth = getStyleSize(style.width);
          if (styleWidth !== false) {
            size.width = styleWidth + // add padding and border unless it's already including it
            (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
          }
          var styleHeight = getStyleSize(style.height);
          if (styleHeight !== false) {
            size.height = styleHeight + // add padding and border unless it's already including it
            (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
          }
          size.innerWidth = size.width - (paddingWidth + borderWidth);
          size.innerHeight = size.height - (paddingHeight + borderHeight);
          size.outerWidth = size.width + marginWidth;
          size.outerHeight = size.height + marginHeight;
          return size;
        }
        return getSize;
      });
    }
  });

  // node_modules/desandro-matches-selector/matches-selector.js
  var require_matches_selector = __commonJS({
    "node_modules/desandro-matches-selector/matches-selector.js"(exports, module) {
      (function(window2, factory) {
        "use strict";
        if (typeof define == "function" && define.amd) {
          define(factory);
        } else if (typeof module == "object" && module.exports) {
          module.exports = factory();
        } else {
          window2.matchesSelector = factory();
        }
      })(window, function factory() {
        "use strict";
        var matchesMethod = function() {
          var ElemProto = window.Element.prototype;
          if (ElemProto.matches) {
            return "matches";
          }
          if (ElemProto.matchesSelector) {
            return "matchesSelector";
          }
          var prefixes = ["webkit", "moz", "ms", "o"];
          for (var i = 0; i < prefixes.length; i++) {
            var prefix = prefixes[i];
            var method = prefix + "MatchesSelector";
            if (ElemProto[method]) {
              return method;
            }
          }
        }();
        return function matchesSelector(elem, selector) {
          return elem[matchesMethod](selector);
        };
      });
    }
  });

  // node_modules/fizzy-ui-utils/utils.js
  var require_utils = __commonJS({
    "node_modules/fizzy-ui-utils/utils.js"(exports, module) {
      (function(window2, factory) {
        if (typeof define == "function" && define.amd) {
          define([
            "desandro-matches-selector/matches-selector"
          ], function(matchesSelector) {
            return factory(window2, matchesSelector);
          });
        } else if (typeof module == "object" && module.exports) {
          module.exports = factory(
            window2,
            require_matches_selector()
          );
        } else {
          window2.fizzyUIUtils = factory(
            window2,
            window2.matchesSelector
          );
        }
      })(window, function factory(window2, matchesSelector) {
        "use strict";
        var utils = {};
        utils.extend = function(a, b) {
          for (var prop in b) {
            a[prop] = b[prop];
          }
          return a;
        };
        utils.modulo = function(num, div) {
          return (num % div + div) % div;
        };
        var arraySlice = Array.prototype.slice;
        utils.makeArray = function(obj) {
          if (Array.isArray(obj)) {
            return obj;
          }
          if (obj === null || obj === void 0) {
            return [];
          }
          var isArrayLike = typeof obj == "object" && typeof obj.length == "number";
          if (isArrayLike) {
            return arraySlice.call(obj);
          }
          return [obj];
        };
        utils.removeFrom = function(ary, obj) {
          var index = ary.indexOf(obj);
          if (index != -1) {
            ary.splice(index, 1);
          }
        };
        utils.getParent = function(elem, selector) {
          while (elem.parentNode && elem != document.body) {
            elem = elem.parentNode;
            if (matchesSelector(elem, selector)) {
              return elem;
            }
          }
        };
        utils.getQueryElement = function(elem) {
          if (typeof elem == "string") {
            return document.querySelector(elem);
          }
          return elem;
        };
        utils.handleEvent = function(event) {
          var method = "on" + event.type;
          if (this[method]) {
            this[method](event);
          }
        };
        utils.filterFindElements = function(elems, selector) {
          elems = utils.makeArray(elems);
          var ffElems = [];
          elems.forEach(function(elem) {
            if (!(elem instanceof HTMLElement)) {
              return;
            }
            if (!selector) {
              ffElems.push(elem);
              return;
            }
            if (matchesSelector(elem, selector)) {
              ffElems.push(elem);
            }
            var childElems = elem.querySelectorAll(selector);
            for (var i = 0; i < childElems.length; i++) {
              ffElems.push(childElems[i]);
            }
          });
          return ffElems;
        };
        utils.debounceMethod = function(_class, methodName, threshold) {
          threshold = threshold || 100;
          var method = _class.prototype[methodName];
          var timeoutName = methodName + "Timeout";
          _class.prototype[methodName] = function() {
            var timeout = this[timeoutName];
            clearTimeout(timeout);
            var args = arguments;
            var _this = this;
            this[timeoutName] = setTimeout(function() {
              method.apply(_this, args);
              delete _this[timeoutName];
            }, threshold);
          };
        };
        utils.docReady = function(callback) {
          var readyState = document.readyState;
          if (readyState == "complete" || readyState == "interactive") {
            setTimeout(callback);
          } else {
            document.addEventListener("DOMContentLoaded", callback);
          }
        };
        utils.toDashed = function(str) {
          return str.replace(/(.)([A-Z])/g, function(match, $1, $2) {
            return $1 + "-" + $2;
          }).toLowerCase();
        };
        var console2 = window2.console;
        utils.htmlInit = function(WidgetClass, namespace) {
          utils.docReady(function() {
            var dashedNamespace = utils.toDashed(namespace);
            var dataAttr = "data-" + dashedNamespace;
            var dataAttrElems = document.querySelectorAll("[" + dataAttr + "]");
            var jsDashElems = document.querySelectorAll(".js-" + dashedNamespace);
            var elems = utils.makeArray(dataAttrElems).concat(utils.makeArray(jsDashElems));
            var dataOptionsAttr = dataAttr + "-options";
            var jQuery = window2.jQuery;
            elems.forEach(function(elem) {
              var attr = elem.getAttribute(dataAttr) || elem.getAttribute(dataOptionsAttr);
              var options;
              try {
                options = attr && JSON.parse(attr);
              } catch (error) {
                if (console2) {
                  console2.error("Error parsing " + dataAttr + " on " + elem.className + ": " + error);
                }
                return;
              }
              var instance = new WidgetClass(elem, options);
              if (jQuery) {
                jQuery.data(elem, namespace, instance);
              }
            });
          });
        };
        return utils;
      });
    }
  });

  // node_modules/outlayer/item.js
  var require_item = __commonJS({
    "node_modules/outlayer/item.js"(exports, module) {
      (function(window2, factory) {
        if (typeof define == "function" && define.amd) {
          define(
            [
              "ev-emitter/ev-emitter",
              "get-size/get-size"
            ],
            factory
          );
        } else if (typeof module == "object" && module.exports) {
          module.exports = factory(
            require_ev_emitter(),
            require_get_size()
          );
        } else {
          window2.Outlayer = {};
          window2.Outlayer.Item = factory(
            window2.EvEmitter,
            window2.getSize
          );
        }
      })(window, function factory(EvEmitter, getSize) {
        "use strict";
        function isEmptyObj(obj) {
          for (var prop in obj) {
            return false;
          }
          prop = null;
          return true;
        }
        var docElemStyle = document.documentElement.style;
        var transitionProperty = typeof docElemStyle.transition == "string" ? "transition" : "WebkitTransition";
        var transformProperty = typeof docElemStyle.transform == "string" ? "transform" : "WebkitTransform";
        var transitionEndEvent = {
          WebkitTransition: "webkitTransitionEnd",
          transition: "transitionend"
        }[transitionProperty];
        var vendorProperties = {
          transform: transformProperty,
          transition: transitionProperty,
          transitionDuration: transitionProperty + "Duration",
          transitionProperty: transitionProperty + "Property",
          transitionDelay: transitionProperty + "Delay"
        };
        function Item(element, layout) {
          if (!element) {
            return;
          }
          this.element = element;
          this.layout = layout;
          this.position = {
            x: 0,
            y: 0
          };
          this._create();
        }
        var proto = Item.prototype = Object.create(EvEmitter.prototype);
        proto.constructor = Item;
        proto._create = function() {
          this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
          };
          this.css({
            position: "absolute"
          });
        };
        proto.handleEvent = function(event) {
          var method = "on" + event.type;
          if (this[method]) {
            this[method](event);
          }
        };
        proto.getSize = function() {
          this.size = getSize(this.element);
        };
        proto.css = function(style) {
          var elemStyle = this.element.style;
          for (var prop in style) {
            var supportedProp = vendorProperties[prop] || prop;
            elemStyle[supportedProp] = style[prop];
          }
        };
        proto.getPosition = function() {
          var style = getComputedStyle(this.element);
          var isOriginLeft = this.layout._getOption("originLeft");
          var isOriginTop = this.layout._getOption("originTop");
          var xValue = style[isOriginLeft ? "left" : "right"];
          var yValue = style[isOriginTop ? "top" : "bottom"];
          var x = parseFloat(xValue);
          var y = parseFloat(yValue);
          var layoutSize = this.layout.size;
          if (xValue.indexOf("%") != -1) {
            x = x / 100 * layoutSize.width;
          }
          if (yValue.indexOf("%") != -1) {
            y = y / 100 * layoutSize.height;
          }
          x = isNaN(x) ? 0 : x;
          y = isNaN(y) ? 0 : y;
          x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
          y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;
          this.position.x = x;
          this.position.y = y;
        };
        proto.layoutPosition = function() {
          var layoutSize = this.layout.size;
          var style = {};
          var isOriginLeft = this.layout._getOption("originLeft");
          var isOriginTop = this.layout._getOption("originTop");
          var xPadding = isOriginLeft ? "paddingLeft" : "paddingRight";
          var xProperty = isOriginLeft ? "left" : "right";
          var xResetProperty = isOriginLeft ? "right" : "left";
          var x = this.position.x + layoutSize[xPadding];
          style[xProperty] = this.getXValue(x);
          style[xResetProperty] = "";
          var yPadding = isOriginTop ? "paddingTop" : "paddingBottom";
          var yProperty = isOriginTop ? "top" : "bottom";
          var yResetProperty = isOriginTop ? "bottom" : "top";
          var y = this.position.y + layoutSize[yPadding];
          style[yProperty] = this.getYValue(y);
          style[yResetProperty] = "";
          this.css(style);
          this.emitEvent("layout", [this]);
        };
        proto.getXValue = function(x) {
          var isHorizontal = this.layout._getOption("horizontal");
          return this.layout.options.percentPosition && !isHorizontal ? x / this.layout.size.width * 100 + "%" : x + "px";
        };
        proto.getYValue = function(y) {
          var isHorizontal = this.layout._getOption("horizontal");
          return this.layout.options.percentPosition && isHorizontal ? y / this.layout.size.height * 100 + "%" : y + "px";
        };
        proto._transitionTo = function(x, y) {
          this.getPosition();
          var curX = this.position.x;
          var curY = this.position.y;
          var didNotMove = x == this.position.x && y == this.position.y;
          this.setPosition(x, y);
          if (didNotMove && !this.isTransitioning) {
            this.layoutPosition();
            return;
          }
          var transX = x - curX;
          var transY = y - curY;
          var transitionStyle = {};
          transitionStyle.transform = this.getTranslate(transX, transY);
          this.transition({
            to: transitionStyle,
            onTransitionEnd: {
              transform: this.layoutPosition
            },
            isCleaning: true
          });
        };
        proto.getTranslate = function(x, y) {
          var isOriginLeft = this.layout._getOption("originLeft");
          var isOriginTop = this.layout._getOption("originTop");
          x = isOriginLeft ? x : -x;
          y = isOriginTop ? y : -y;
          return "translate3d(" + x + "px, " + y + "px, 0)";
        };
        proto.goTo = function(x, y) {
          this.setPosition(x, y);
          this.layoutPosition();
        };
        proto.moveTo = proto._transitionTo;
        proto.setPosition = function(x, y) {
          this.position.x = parseFloat(x);
          this.position.y = parseFloat(y);
        };
        proto._nonTransition = function(args) {
          this.css(args.to);
          if (args.isCleaning) {
            this._removeStyles(args.to);
          }
          for (var prop in args.onTransitionEnd) {
            args.onTransitionEnd[prop].call(this);
          }
        };
        proto.transition = function(args) {
          if (!parseFloat(this.layout.options.transitionDuration)) {
            this._nonTransition(args);
            return;
          }
          var _transition = this._transn;
          for (var prop in args.onTransitionEnd) {
            _transition.onEnd[prop] = args.onTransitionEnd[prop];
          }
          for (prop in args.to) {
            _transition.ingProperties[prop] = true;
            if (args.isCleaning) {
              _transition.clean[prop] = true;
            }
          }
          if (args.from) {
            this.css(args.from);
            var h = this.element.offsetHeight;
            h = null;
          }
          this.enableTransition(args.to);
          this.css(args.to);
          this.isTransitioning = true;
        };
        function toDashedAll(str) {
          return str.replace(/([A-Z])/g, function($1) {
            return "-" + $1.toLowerCase();
          });
        }
        var transitionProps = "opacity," + toDashedAll(transformProperty);
        proto.enableTransition = function() {
          if (this.isTransitioning) {
            return;
          }
          var duration = this.layout.options.transitionDuration;
          duration = typeof duration == "number" ? duration + "ms" : duration;
          this.css({
            transitionProperty: transitionProps,
            transitionDuration: duration,
            transitionDelay: this.staggerDelay || 0
          });
          this.element.addEventListener(transitionEndEvent, this, false);
        };
        proto.onwebkitTransitionEnd = function(event) {
          this.ontransitionend(event);
        };
        proto.onotransitionend = function(event) {
          this.ontransitionend(event);
        };
        var dashedVendorProperties = {
          "-webkit-transform": "transform"
        };
        proto.ontransitionend = function(event) {
          if (event.target !== this.element) {
            return;
          }
          var _transition = this._transn;
          var propertyName = dashedVendorProperties[event.propertyName] || event.propertyName;
          delete _transition.ingProperties[propertyName];
          if (isEmptyObj(_transition.ingProperties)) {
            this.disableTransition();
          }
          if (propertyName in _transition.clean) {
            this.element.style[event.propertyName] = "";
            delete _transition.clean[propertyName];
          }
          if (propertyName in _transition.onEnd) {
            var onTransitionEnd = _transition.onEnd[propertyName];
            onTransitionEnd.call(this);
            delete _transition.onEnd[propertyName];
          }
          this.emitEvent("transitionEnd", [this]);
        };
        proto.disableTransition = function() {
          this.removeTransitionStyles();
          this.element.removeEventListener(transitionEndEvent, this, false);
          this.isTransitioning = false;
        };
        proto._removeStyles = function(style) {
          var cleanStyle = {};
          for (var prop in style) {
            cleanStyle[prop] = "";
          }
          this.css(cleanStyle);
        };
        var cleanTransitionStyle = {
          transitionProperty: "",
          transitionDuration: "",
          transitionDelay: ""
        };
        proto.removeTransitionStyles = function() {
          this.css(cleanTransitionStyle);
        };
        proto.stagger = function(delay) {
          delay = isNaN(delay) ? 0 : delay;
          this.staggerDelay = delay + "ms";
        };
        proto.removeElem = function() {
          this.element.parentNode.removeChild(this.element);
          this.css({ display: "" });
          this.emitEvent("remove", [this]);
        };
        proto.remove = function() {
          if (!transitionProperty || !parseFloat(this.layout.options.transitionDuration)) {
            this.removeElem();
            return;
          }
          this.once("transitionEnd", function() {
            this.removeElem();
          });
          this.hide();
        };
        proto.reveal = function() {
          delete this.isHidden;
          this.css({ display: "" });
          var options = this.layout.options;
          var onTransitionEnd = {};
          var transitionEndProperty = this.getHideRevealTransitionEndProperty("visibleStyle");
          onTransitionEnd[transitionEndProperty] = this.onRevealTransitionEnd;
          this.transition({
            from: options.hiddenStyle,
            to: options.visibleStyle,
            isCleaning: true,
            onTransitionEnd
          });
        };
        proto.onRevealTransitionEnd = function() {
          if (!this.isHidden) {
            this.emitEvent("reveal");
          }
        };
        proto.getHideRevealTransitionEndProperty = function(styleProperty) {
          var optionStyle = this.layout.options[styleProperty];
          if (optionStyle.opacity) {
            return "opacity";
          }
          for (var prop in optionStyle) {
            return prop;
          }
        };
        proto.hide = function() {
          this.isHidden = true;
          this.css({ display: "" });
          var options = this.layout.options;
          var onTransitionEnd = {};
          var transitionEndProperty = this.getHideRevealTransitionEndProperty("hiddenStyle");
          onTransitionEnd[transitionEndProperty] = this.onHideTransitionEnd;
          this.transition({
            from: options.visibleStyle,
            to: options.hiddenStyle,
            // keep hidden stuff hidden
            isCleaning: true,
            onTransitionEnd
          });
        };
        proto.onHideTransitionEnd = function() {
          if (this.isHidden) {
            this.css({ display: "none" });
            this.emitEvent("hide");
          }
        };
        proto.destroy = function() {
          this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
          });
        };
        return Item;
      });
    }
  });

  // node_modules/outlayer/outlayer.js
  var require_outlayer = __commonJS({
    "node_modules/outlayer/outlayer.js"(exports, module) {
      (function(window2, factory) {
        "use strict";
        if (typeof define == "function" && define.amd) {
          define(
            [
              "ev-emitter/ev-emitter",
              "get-size/get-size",
              "fizzy-ui-utils/utils",
              "./item"
            ],
            function(EvEmitter, getSize, utils, Item) {
              return factory(window2, EvEmitter, getSize, utils, Item);
            }
          );
        } else if (typeof module == "object" && module.exports) {
          module.exports = factory(
            window2,
            require_ev_emitter(),
            require_get_size(),
            require_utils(),
            require_item()
          );
        } else {
          window2.Outlayer = factory(
            window2,
            window2.EvEmitter,
            window2.getSize,
            window2.fizzyUIUtils,
            window2.Outlayer.Item
          );
        }
      })(window, function factory(window2, EvEmitter, getSize, utils, Item) {
        "use strict";
        var console2 = window2.console;
        var jQuery = window2.jQuery;
        var noop = function() {
        };
        var GUID = 0;
        var instances = {};
        function Outlayer(element, options) {
          var queryElement = utils.getQueryElement(element);
          if (!queryElement) {
            if (console2) {
              console2.error("Bad element for " + this.constructor.namespace + ": " + (queryElement || element));
            }
            return;
          }
          this.element = queryElement;
          if (jQuery) {
            this.$element = jQuery(this.element);
          }
          this.options = utils.extend({}, this.constructor.defaults);
          this.option(options);
          var id = ++GUID;
          this.element.outlayerGUID = id;
          instances[id] = this;
          this._create();
          var isInitLayout = this._getOption("initLayout");
          if (isInitLayout) {
            this.layout();
          }
        }
        Outlayer.namespace = "outlayer";
        Outlayer.Item = Item;
        Outlayer.defaults = {
          containerStyle: {
            position: "relative"
          },
          initLayout: true,
          originLeft: true,
          originTop: true,
          resize: true,
          resizeContainer: true,
          // item options
          transitionDuration: "0.4s",
          hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
          },
          visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
          }
        };
        var proto = Outlayer.prototype;
        utils.extend(proto, EvEmitter.prototype);
        proto.option = function(opts) {
          utils.extend(this.options, opts);
        };
        proto._getOption = function(option) {
          var oldOption = this.constructor.compatOptions[option];
          return oldOption && this.options[oldOption] !== void 0 ? this.options[oldOption] : this.options[option];
        };
        Outlayer.compatOptions = {
          // currentName: oldName
          initLayout: "isInitLayout",
          horizontal: "isHorizontal",
          layoutInstant: "isLayoutInstant",
          originLeft: "isOriginLeft",
          originTop: "isOriginTop",
          resize: "isResizeBound",
          resizeContainer: "isResizingContainer"
        };
        proto._create = function() {
          this.reloadItems();
          this.stamps = [];
          this.stamp(this.options.stamp);
          utils.extend(this.element.style, this.options.containerStyle);
          var canBindResize = this._getOption("resize");
          if (canBindResize) {
            this.bindResize();
          }
        };
        proto.reloadItems = function() {
          this.items = this._itemize(this.element.children);
        };
        proto._itemize = function(elems) {
          var itemElems = this._filterFindItemElements(elems);
          var Item2 = this.constructor.Item;
          var items = [];
          for (var i = 0; i < itemElems.length; i++) {
            var elem = itemElems[i];
            var item = new Item2(elem, this);
            items.push(item);
          }
          return items;
        };
        proto._filterFindItemElements = function(elems) {
          return utils.filterFindElements(elems, this.options.itemSelector);
        };
        proto.getItemElements = function() {
          return this.items.map(function(item) {
            return item.element;
          });
        };
        proto.layout = function() {
          this._resetLayout();
          this._manageStamps();
          var layoutInstant = this._getOption("layoutInstant");
          var isInstant = layoutInstant !== void 0 ? layoutInstant : !this._isLayoutInited;
          this.layoutItems(this.items, isInstant);
          this._isLayoutInited = true;
        };
        proto._init = proto.layout;
        proto._resetLayout = function() {
          this.getSize();
        };
        proto.getSize = function() {
          this.size = getSize(this.element);
        };
        proto._getMeasurement = function(measurement, size) {
          var option = this.options[measurement];
          var elem;
          if (!option) {
            this[measurement] = 0;
          } else {
            if (typeof option == "string") {
              elem = this.element.querySelector(option);
            } else if (option instanceof HTMLElement) {
              elem = option;
            }
            this[measurement] = elem ? getSize(elem)[size] : option;
          }
        };
        proto.layoutItems = function(items, isInstant) {
          items = this._getItemsForLayout(items);
          this._layoutItems(items, isInstant);
          this._postLayout();
        };
        proto._getItemsForLayout = function(items) {
          return items.filter(function(item) {
            return !item.isIgnored;
          });
        };
        proto._layoutItems = function(items, isInstant) {
          this._emitCompleteOnItems("layout", items);
          if (!items || !items.length) {
            return;
          }
          var queue = [];
          items.forEach(function(item) {
            var position = this._getItemLayoutPosition(item);
            position.item = item;
            position.isInstant = isInstant || item.isLayoutInstant;
            queue.push(position);
          }, this);
          this._processLayoutQueue(queue);
        };
        proto._getItemLayoutPosition = function() {
          return {
            x: 0,
            y: 0
          };
        };
        proto._processLayoutQueue = function(queue) {
          this.updateStagger();
          queue.forEach(function(obj, i) {
            this._positionItem(obj.item, obj.x, obj.y, obj.isInstant, i);
          }, this);
        };
        proto.updateStagger = function() {
          var stagger = this.options.stagger;
          if (stagger === null || stagger === void 0) {
            this.stagger = 0;
            return;
          }
          this.stagger = getMilliseconds(stagger);
          return this.stagger;
        };
        proto._positionItem = function(item, x, y, isInstant, i) {
          if (isInstant) {
            item.goTo(x, y);
          } else {
            item.stagger(i * this.stagger);
            item.moveTo(x, y);
          }
        };
        proto._postLayout = function() {
          this.resizeContainer();
        };
        proto.resizeContainer = function() {
          var isResizingContainer = this._getOption("resizeContainer");
          if (!isResizingContainer) {
            return;
          }
          var size = this._getContainerSize();
          if (size) {
            this._setContainerMeasure(size.width, true);
            this._setContainerMeasure(size.height, false);
          }
        };
        proto._getContainerSize = noop;
        proto._setContainerMeasure = function(measure, isWidth) {
          if (measure === void 0) {
            return;
          }
          var elemSize = this.size;
          if (elemSize.isBorderBox) {
            measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight + elemSize.borderLeftWidth + elemSize.borderRightWidth : elemSize.paddingBottom + elemSize.paddingTop + elemSize.borderTopWidth + elemSize.borderBottomWidth;
          }
          measure = Math.max(measure, 0);
          this.element.style[isWidth ? "width" : "height"] = measure + "px";
        };
        proto._emitCompleteOnItems = function(eventName, items) {
          var _this = this;
          function onComplete() {
            _this.dispatchEvent(eventName + "Complete", null, [items]);
          }
          var count = items.length;
          if (!items || !count) {
            onComplete();
            return;
          }
          var doneCount = 0;
          function tick() {
            doneCount++;
            if (doneCount == count) {
              onComplete();
            }
          }
          items.forEach(function(item) {
            item.once(eventName, tick);
          });
        };
        proto.dispatchEvent = function(type, event, args) {
          var emitArgs = event ? [event].concat(args) : args;
          this.emitEvent(type, emitArgs);
          if (jQuery) {
            this.$element = this.$element || jQuery(this.element);
            if (event) {
              var $event = jQuery.Event(event);
              $event.type = type;
              this.$element.trigger($event, args);
            } else {
              this.$element.trigger(type, args);
            }
          }
        };
        proto.ignore = function(elem) {
          var item = this.getItem(elem);
          if (item) {
            item.isIgnored = true;
          }
        };
        proto.unignore = function(elem) {
          var item = this.getItem(elem);
          if (item) {
            delete item.isIgnored;
          }
        };
        proto.stamp = function(elems) {
          elems = this._find(elems);
          if (!elems) {
            return;
          }
          this.stamps = this.stamps.concat(elems);
          elems.forEach(this.ignore, this);
        };
        proto.unstamp = function(elems) {
          elems = this._find(elems);
          if (!elems) {
            return;
          }
          elems.forEach(function(elem) {
            utils.removeFrom(this.stamps, elem);
            this.unignore(elem);
          }, this);
        };
        proto._find = function(elems) {
          if (!elems) {
            return;
          }
          if (typeof elems == "string") {
            elems = this.element.querySelectorAll(elems);
          }
          elems = utils.makeArray(elems);
          return elems;
        };
        proto._manageStamps = function() {
          if (!this.stamps || !this.stamps.length) {
            return;
          }
          this._getBoundingRect();
          this.stamps.forEach(this._manageStamp, this);
        };
        proto._getBoundingRect = function() {
          var boundingRect = this.element.getBoundingClientRect();
          var size = this.size;
          this._boundingRect = {
            left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
            top: boundingRect.top + size.paddingTop + size.borderTopWidth,
            right: boundingRect.right - (size.paddingRight + size.borderRightWidth),
            bottom: boundingRect.bottom - (size.paddingBottom + size.borderBottomWidth)
          };
        };
        proto._manageStamp = noop;
        proto._getElementOffset = function(elem) {
          var boundingRect = elem.getBoundingClientRect();
          var thisRect = this._boundingRect;
          var size = getSize(elem);
          var offset = {
            left: boundingRect.left - thisRect.left - size.marginLeft,
            top: boundingRect.top - thisRect.top - size.marginTop,
            right: thisRect.right - boundingRect.right - size.marginRight,
            bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
          };
          return offset;
        };
        proto.handleEvent = utils.handleEvent;
        proto.bindResize = function() {
          window2.addEventListener("resize", this);
          this.isResizeBound = true;
        };
        proto.unbindResize = function() {
          window2.removeEventListener("resize", this);
          this.isResizeBound = false;
        };
        proto.onresize = function() {
          this.resize();
        };
        utils.debounceMethod(Outlayer, "onresize", 100);
        proto.resize = function() {
          if (!this.isResizeBound || !this.needsResizeLayout()) {
            return;
          }
          this.layout();
        };
        proto.needsResizeLayout = function() {
          var size = getSize(this.element);
          var hasSizes = this.size && size;
          return hasSizes && size.innerWidth !== this.size.innerWidth;
        };
        proto.addItems = function(elems) {
          var items = this._itemize(elems);
          if (items.length) {
            this.items = this.items.concat(items);
          }
          return items;
        };
        proto.appended = function(elems) {
          var items = this.addItems(elems);
          if (!items.length) {
            return;
          }
          this.layoutItems(items, true);
          this.reveal(items);
        };
        proto.prepended = function(elems) {
          var items = this._itemize(elems);
          if (!items.length) {
            return;
          }
          var previousItems = this.items.slice(0);
          this.items = items.concat(previousItems);
          this._resetLayout();
          this._manageStamps();
          this.layoutItems(items, true);
          this.reveal(items);
          this.layoutItems(previousItems);
        };
        proto.reveal = function(items) {
          this._emitCompleteOnItems("reveal", items);
          if (!items || !items.length) {
            return;
          }
          var stagger = this.updateStagger();
          items.forEach(function(item, i) {
            item.stagger(i * stagger);
            item.reveal();
          });
        };
        proto.hide = function(items) {
          this._emitCompleteOnItems("hide", items);
          if (!items || !items.length) {
            return;
          }
          var stagger = this.updateStagger();
          items.forEach(function(item, i) {
            item.stagger(i * stagger);
            item.hide();
          });
        };
        proto.revealItemElements = function(elems) {
          var items = this.getItems(elems);
          this.reveal(items);
        };
        proto.hideItemElements = function(elems) {
          var items = this.getItems(elems);
          this.hide(items);
        };
        proto.getItem = function(elem) {
          for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.element == elem) {
              return item;
            }
          }
        };
        proto.getItems = function(elems) {
          elems = utils.makeArray(elems);
          var items = [];
          elems.forEach(function(elem) {
            var item = this.getItem(elem);
            if (item) {
              items.push(item);
            }
          }, this);
          return items;
        };
        proto.remove = function(elems) {
          var removeItems = this.getItems(elems);
          this._emitCompleteOnItems("remove", removeItems);
          if (!removeItems || !removeItems.length) {
            return;
          }
          removeItems.forEach(function(item) {
            item.remove();
            utils.removeFrom(this.items, item);
          }, this);
        };
        proto.destroy = function() {
          var style = this.element.style;
          style.height = "";
          style.position = "";
          style.width = "";
          this.items.forEach(function(item) {
            item.destroy();
          });
          this.unbindResize();
          var id = this.element.outlayerGUID;
          delete instances[id];
          delete this.element.outlayerGUID;
          if (jQuery) {
            jQuery.removeData(this.element, this.constructor.namespace);
          }
        };
        Outlayer.data = function(elem) {
          elem = utils.getQueryElement(elem);
          var id = elem && elem.outlayerGUID;
          return id && instances[id];
        };
        Outlayer.create = function(namespace, options) {
          var Layout = subclass(Outlayer);
          Layout.defaults = utils.extend({}, Outlayer.defaults);
          utils.extend(Layout.defaults, options);
          Layout.compatOptions = utils.extend({}, Outlayer.compatOptions);
          Layout.namespace = namespace;
          Layout.data = Outlayer.data;
          Layout.Item = subclass(Item);
          utils.htmlInit(Layout, namespace);
          if (jQuery && jQuery.bridget) {
            jQuery.bridget(namespace, Layout);
          }
          return Layout;
        };
        function subclass(Parent) {
          function SubClass() {
            Parent.apply(this, arguments);
          }
          SubClass.prototype = Object.create(Parent.prototype);
          SubClass.prototype.constructor = SubClass;
          return SubClass;
        }
        var msUnits = {
          ms: 1,
          s: 1e3
        };
        function getMilliseconds(time) {
          if (typeof time == "number") {
            return time;
          }
          var matches = time.match(/(^\d*\.?\d*)(\w*)/);
          var num = matches && matches[1];
          var unit = matches && matches[2];
          if (!num.length) {
            return 0;
          }
          num = parseFloat(num);
          var mult = msUnits[unit] || 1;
          return num * mult;
        }
        Outlayer.Item = Item;
        return Outlayer;
      });
    }
  });

  // node_modules/masonry-layout/masonry.js
  var require_masonry = __commonJS({
    "node_modules/masonry-layout/masonry.js"(exports, module) {
      (function(window2, factory) {
        if (typeof define == "function" && define.amd) {
          define(
            [
              "outlayer/outlayer",
              "get-size/get-size"
            ],
            factory
          );
        } else if (typeof module == "object" && module.exports) {
          module.exports = factory(
            require_outlayer(),
            require_get_size()
          );
        } else {
          window2.Masonry = factory(
            window2.Outlayer,
            window2.getSize
          );
        }
      })(window, function factory(Outlayer, getSize) {
        "use strict";
        var Masonry3 = Outlayer.create("masonry");
        Masonry3.compatOptions.fitWidth = "isFitWidth";
        var proto = Masonry3.prototype;
        proto._resetLayout = function() {
          this.getSize();
          this._getMeasurement("columnWidth", "outerWidth");
          this._getMeasurement("gutter", "outerWidth");
          this.measureColumns();
          this.colYs = [];
          for (var i = 0; i < this.cols; i++) {
            this.colYs.push(0);
          }
          this.maxY = 0;
          this.horizontalColIndex = 0;
        };
        proto.measureColumns = function() {
          this.getContainerWidth();
          if (!this.columnWidth) {
            var firstItem = this.items[0];
            var firstItemElem = firstItem && firstItem.element;
            this.columnWidth = firstItemElem && getSize(firstItemElem).outerWidth || // if first elem has no width, default to size of container
            this.containerWidth;
          }
          var columnWidth = this.columnWidth += this.gutter;
          var containerWidth = this.containerWidth + this.gutter;
          var cols = containerWidth / columnWidth;
          var excess = columnWidth - containerWidth % columnWidth;
          var mathMethod = excess && excess < 1 ? "round" : "floor";
          cols = Math[mathMethod](cols);
          this.cols = Math.max(cols, 1);
        };
        proto.getContainerWidth = function() {
          var isFitWidth = this._getOption("fitWidth");
          var container = isFitWidth ? this.element.parentNode : this.element;
          var size = getSize(container);
          this.containerWidth = size && size.innerWidth;
        };
        proto._getItemLayoutPosition = function(item) {
          item.getSize();
          var remainder = item.size.outerWidth % this.columnWidth;
          var mathMethod = remainder && remainder < 1 ? "round" : "ceil";
          var colSpan = Math[mathMethod](item.size.outerWidth / this.columnWidth);
          colSpan = Math.min(colSpan, this.cols);
          var colPosMethod = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition";
          var colPosition = this[colPosMethod](colSpan, item);
          var position = {
            x: this.columnWidth * colPosition.col,
            y: colPosition.y
          };
          var setHeight = colPosition.y + item.size.outerHeight;
          var setMax = colSpan + colPosition.col;
          for (var i = colPosition.col; i < setMax; i++) {
            this.colYs[i] = setHeight;
          }
          return position;
        };
        proto._getTopColPosition = function(colSpan) {
          var colGroup = this._getTopColGroup(colSpan);
          var minimumY = Math.min.apply(Math, colGroup);
          return {
            col: colGroup.indexOf(minimumY),
            y: minimumY
          };
        };
        proto._getTopColGroup = function(colSpan) {
          if (colSpan < 2) {
            return this.colYs;
          }
          var colGroup = [];
          var groupCount = this.cols + 1 - colSpan;
          for (var i = 0; i < groupCount; i++) {
            colGroup[i] = this._getColGroupY(i, colSpan);
          }
          return colGroup;
        };
        proto._getColGroupY = function(col, colSpan) {
          if (colSpan < 2) {
            return this.colYs[col];
          }
          var groupColYs = this.colYs.slice(col, col + colSpan);
          return Math.max.apply(Math, groupColYs);
        };
        proto._getHorizontalColPosition = function(colSpan, item) {
          var col = this.horizontalColIndex % this.cols;
          var isOver = colSpan > 1 && col + colSpan > this.cols;
          col = isOver ? 0 : col;
          var hasSize = item.size.outerWidth && item.size.outerHeight;
          this.horizontalColIndex = hasSize ? col + colSpan : this.horizontalColIndex;
          return {
            col,
            y: this._getColGroupY(col, colSpan)
          };
        };
        proto._manageStamp = function(stamp) {
          var stampSize = getSize(stamp);
          var offset = this._getElementOffset(stamp);
          var isOriginLeft = this._getOption("originLeft");
          var firstX = isOriginLeft ? offset.left : offset.right;
          var lastX = firstX + stampSize.outerWidth;
          var firstCol = Math.floor(firstX / this.columnWidth);
          firstCol = Math.max(0, firstCol);
          var lastCol = Math.floor(lastX / this.columnWidth);
          lastCol -= lastX % this.columnWidth ? 0 : 1;
          lastCol = Math.min(this.cols - 1, lastCol);
          var isOriginTop = this._getOption("originTop");
          var stampMaxY = (isOriginTop ? offset.top : offset.bottom) + stampSize.outerHeight;
          for (var i = firstCol; i <= lastCol; i++) {
            this.colYs[i] = Math.max(stampMaxY, this.colYs[i]);
          }
        };
        proto._getContainerSize = function() {
          this.maxY = Math.max.apply(Math, this.colYs);
          var size = {
            height: this.maxY
          };
          if (this._getOption("fitWidth")) {
            size.width = this._getContainerFitWidth();
          }
          return size;
        };
        proto._getContainerFitWidth = function() {
          var unusedCols = 0;
          var i = this.cols;
          while (--i) {
            if (this.colYs[i] !== 0) {
              break;
            }
            unusedCols++;
          }
          return (this.cols - unusedCols) * this.columnWidth - this.gutter;
        };
        proto.needsResizeLayout = function() {
          var previousWidth = this.containerWidth;
          this.getContainerWidth();
          return previousWidth != this.containerWidth;
        };
        return Masonry3;
      });
    }
  });

  // node_modules/lodash._reinterpolate/index.js
  var require_lodash = __commonJS({
    "node_modules/lodash._reinterpolate/index.js"(exports, module) {
      var reInterpolate = /<%=([\s\S]+?)%>/g;
      module.exports = reInterpolate;
    }
  });

  // node_modules/lodash.templatesettings/index.js
  var require_lodash2 = __commonJS({
    "node_modules/lodash.templatesettings/index.js"(exports, module) {
      var reInterpolate = require_lodash();
      var INFINITY = 1 / 0;
      var nullTag = "[object Null]";
      var symbolTag = "[object Symbol]";
      var undefinedTag = "[object Undefined]";
      var reUnescapedHtml = /[&<>"']/g;
      var reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
      var reEscape = /<%-([\s\S]+?)%>/g;
      var reEvaluate = /<%([\s\S]+?)%>/g;
      var htmlEscapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      function arrayMap(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index < length) {
          result[index] = iteratee(array[index], index, array);
        }
        return result;
      }
      function basePropertyOf(object) {
        return function(key) {
          return object == null ? void 0 : object[key];
        };
      }
      var escapeHtmlChar = basePropertyOf(htmlEscapes);
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var nativeObjectToString = objectProto.toString;
      var Symbol2 = root.Symbol;
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
      var symbolToString = symbolProto ? symbolProto.toString : void 0;
      var templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        "escape": reEscape,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        "evaluate": reEvaluate,
        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        "interpolate": reInterpolate,
        /**
         * Used to reference the data object in the template text.
         *
         * @memberOf _.templateSettings
         * @type {string}
         */
        "variable": "",
        /**
         * Used to import variables into the compiled template.
         *
         * @memberOf _.templateSettings
         * @type {Object}
         */
        "imports": {
          /**
           * A reference to the `lodash` function.
           *
           * @memberOf _.templateSettings.imports
           * @type {Function}
           */
          "_": { "escape": escape }
        }
      };
      function baseGetTag(value) {
        if (value == null) {
          return value === void 0 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
      }
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isArray(value)) {
          return arrayMap(value, baseToString) + "";
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
          value[symToStringTag] = void 0;
          var unmasked = true;
        } catch (e) {
        }
        var result = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag] = tag;
          } else {
            delete value[symToStringTag];
          }
        }
        return result;
      }
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      var isArray = Array.isArray;
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
      }
      function toString(value) {
        return value == null ? "" : baseToString(value);
      }
      function escape(string) {
        string = toString(string);
        return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
      }
      module.exports = templateSettings;
    }
  });

  // node_modules/lodash.template/index.js
  var require_lodash3 = __commonJS({
    "node_modules/lodash.template/index.js"(exports, module) {
      var reInterpolate = require_lodash();
      var templateSettings = require_lodash2();
      var HOT_COUNT = 800;
      var HOT_SPAN = 16;
      var INFINITY = 1 / 0;
      var MAX_SAFE_INTEGER = 9007199254740991;
      var argsTag = "[object Arguments]";
      var arrayTag = "[object Array]";
      var asyncTag = "[object AsyncFunction]";
      var boolTag = "[object Boolean]";
      var dateTag = "[object Date]";
      var domExcTag = "[object DOMException]";
      var errorTag = "[object Error]";
      var funcTag = "[object Function]";
      var genTag = "[object GeneratorFunction]";
      var mapTag = "[object Map]";
      var numberTag = "[object Number]";
      var nullTag = "[object Null]";
      var objectTag = "[object Object]";
      var proxyTag = "[object Proxy]";
      var regexpTag = "[object RegExp]";
      var setTag = "[object Set]";
      var stringTag = "[object String]";
      var symbolTag = "[object Symbol]";
      var undefinedTag = "[object Undefined]";
      var weakMapTag = "[object WeakMap]";
      var arrayBufferTag = "[object ArrayBuffer]";
      var dataViewTag = "[object DataView]";
      var float32Tag = "[object Float32Array]";
      var float64Tag = "[object Float64Array]";
      var int8Tag = "[object Int8Array]";
      var int16Tag = "[object Int16Array]";
      var int32Tag = "[object Int32Array]";
      var uint8Tag = "[object Uint8Array]";
      var uint8ClampedTag = "[object Uint8ClampedArray]";
      var uint16Tag = "[object Uint16Array]";
      var uint32Tag = "[object Uint32Array]";
      var reEmptyStringLeading = /\b__p \+= '';/g;
      var reEmptyStringMiddle = /\b(__p \+=) '' \+/g;
      var reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
      var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      var reNoMatch = /($^)/;
      var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      var stringEscapes = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      };
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var freeProcess = moduleExports && freeGlobal.process;
      var nodeUtil = function() {
        try {
          var types = freeModule && freeModule.require && freeModule.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      }();
      var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      function apply(func, thisArg, args) {
        switch (args.length) {
          case 0:
            return func.call(thisArg);
          case 1:
            return func.call(thisArg, args[0]);
          case 2:
            return func.call(thisArg, args[0], args[1]);
          case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
        }
        return func.apply(thisArg, args);
      }
      function arrayMap(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index < length) {
          result[index] = iteratee(array[index], index, array);
        }
        return result;
      }
      function baseTimes(n, iteratee) {
        var index = -1, result = Array(n);
        while (++index < n) {
          result[index] = iteratee(index);
        }
        return result;
      }
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      function baseValues(object, props) {
        return arrayMap(props, function(key) {
          return object[key];
        });
      }
      function escapeStringChar(chr) {
        return "\\" + stringEscapes[chr];
      }
      function getValue(object, key) {
        return object == null ? void 0 : object[key];
      }
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      var funcProto = Function.prototype;
      var objectProto = Object.prototype;
      var coreJsData = root["__core-js_shared__"];
      var funcToString = funcProto.toString;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var maskSrcKey = function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      }();
      var nativeObjectToString = objectProto.toString;
      var objectCtorString = funcToString.call(Object);
      var reIsNative = RegExp(
        "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      );
      var Buffer2 = moduleExports ? root.Buffer : void 0;
      var Symbol2 = root.Symbol;
      var getPrototype = overArg(Object.getPrototypeOf, Object);
      var propertyIsEnumerable = objectProto.propertyIsEnumerable;
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      var defineProperty = function() {
        try {
          var func = getNative(Object, "defineProperty");
          func({}, "", {});
          return func;
        } catch (e) {
        }
      }();
      var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
      var nativeKeys = overArg(Object.keys, Object);
      var nativeMax = Math.max;
      var nativeNow = Date.now;
      var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
      var symbolToString = symbolProto ? symbolProto.toString : void 0;
      function arrayLikeKeys(value, inherited) {
        var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
        for (var key in value) {
          if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
          (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
          isIndex(key, length)))) {
            result.push(key);
          }
        }
        return result;
      }
      function assignValue(object, key, value) {
        var objValue = object[key];
        if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      function baseAssignValue(object, key, value) {
        if (key == "__proto__" && defineProperty) {
          defineProperty(object, key, {
            "configurable": true,
            "enumerable": true,
            "value": value,
            "writable": true
          });
        } else {
          object[key] = value;
        }
      }
      function baseGetTag(value) {
        if (value == null) {
          return value === void 0 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
      }
      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag;
      }
      function baseIsNative(value) {
        if (!isObject(value) || isMasked(value)) {
          return false;
        }
        var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
      }
      function baseKeys(object) {
        if (!isPrototype(object)) {
          return nativeKeys(object);
        }
        var result = [];
        for (var key in Object(object)) {
          if (hasOwnProperty.call(object, key) && key != "constructor") {
            result.push(key);
          }
        }
        return result;
      }
      function baseKeysIn(object) {
        if (!isObject(object)) {
          return nativeKeysIn(object);
        }
        var isProto = isPrototype(object), result = [];
        for (var key in object) {
          if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
            result.push(key);
          }
        }
        return result;
      }
      function baseRest(func, start) {
        return setToString(overRest(func, start, identity), func + "");
      }
      var baseSetToString = !defineProperty ? identity : function(func, string) {
        return defineProperty(func, "toString", {
          "configurable": true,
          "enumerable": false,
          "value": constant(string),
          "writable": true
        });
      };
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isArray(value)) {
          return arrayMap(value, baseToString) + "";
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      function copyObject(source, props, object, customizer) {
        var isNew = !object;
        object || (object = {});
        var index = -1, length = props.length;
        while (++index < length) {
          var key = props[index];
          var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
          if (newValue === void 0) {
            newValue = source[key];
          }
          if (isNew) {
            baseAssignValue(object, key, newValue);
          } else {
            assignValue(object, key, newValue);
          }
        }
        return object;
      }
      function createAssigner(assigner) {
        return baseRest(function(object, sources) {
          var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
          customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            customizer = length < 3 ? void 0 : customizer;
            length = 1;
          }
          object = Object(object);
          while (++index < length) {
            var source = sources[index];
            if (source) {
              assigner(object, source, index, customizer);
            }
          }
          return object;
        });
      }
      function customDefaultsAssignIn(objValue, srcValue, key, object) {
        if (objValue === void 0 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
          return srcValue;
        }
        return objValue;
      }
      function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : void 0;
      }
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
          value[symToStringTag] = void 0;
          var unmasked = true;
        } catch (e) {
        }
        var result = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag] = tag;
          } else {
            delete value[symToStringTag];
          }
        }
        return result;
      }
      function isIndex(value, length) {
        var type = typeof value;
        length = length == null ? MAX_SAFE_INTEGER : length;
        return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
      }
      function isIterateeCall(value, index, object) {
        if (!isObject(object)) {
          return false;
        }
        var type = typeof index;
        if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
          return eq(object[index], value);
        }
        return false;
      }
      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      function isPrototype(value) {
        var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
        return value === proto;
      }
      function nativeKeysIn(object) {
        var result = [];
        if (object != null) {
          for (var key in Object(object)) {
            result.push(key);
          }
        }
        return result;
      }
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      function overRest(func, start, transform) {
        start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
        return function() {
          var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
          while (++index < length) {
            array[index] = args[start + index];
          }
          index = -1;
          var otherArgs = Array(start + 1);
          while (++index < start) {
            otherArgs[index] = args[index];
          }
          otherArgs[start] = transform(array);
          return apply(func, this, otherArgs);
        };
      }
      var setToString = shortOut(baseSetToString);
      function shortOut(func) {
        var count = 0, lastCalled = 0;
        return function() {
          var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
          lastCalled = stamp;
          if (remaining > 0) {
            if (++count >= HOT_COUNT) {
              return arguments[0];
            }
          } else {
            count = 0;
          }
          return func.apply(void 0, arguments);
        };
      }
      function toSource(func) {
        if (func != null) {
          try {
            return funcToString.call(func);
          } catch (e) {
          }
          try {
            return func + "";
          } catch (e) {
          }
        }
        return "";
      }
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      var isArguments = baseIsArguments(/* @__PURE__ */ function() {
        return arguments;
      }()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
      };
      var isArray = Array.isArray;
      function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction(value);
      }
      var isBuffer = nativeIsBuffer || stubFalse;
      function isError(value) {
        if (!isObjectLike(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
      }
      function isFunction(value) {
        if (!isObject(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }
      function isObject(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      function isPlainObject(value) {
        if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
          return false;
        }
        var proto = getPrototype(value);
        if (proto === null) {
          return true;
        }
        var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
        return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
      }
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
      }
      var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
      function toString(value) {
        return value == null ? "" : baseToString(value);
      }
      var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
        copyObject(source, keysIn(source), object, customizer);
      });
      function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      function keysIn(object) {
        return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
      }
      function template(string, options, guard) {
        var settings = templateSettings.imports._.templateSettings || templateSettings;
        if (guard && isIterateeCall(string, options, guard)) {
          options = void 0;
        }
        string = toString(string);
        options = assignInWith({}, options, settings, customDefaultsAssignIn);
        var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
        var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
        var reDelimiters = RegExp(
          (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
          "g"
        );
        var sourceURL = hasOwnProperty.call(options, "sourceURL") ? "//# sourceURL=" + (options.sourceURL + "").replace(/[\r\n]/g, " ") + "\n" : "";
        string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
          interpolateValue || (interpolateValue = esTemplateValue);
          source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
          if (escapeValue) {
            isEscaping = true;
            source += "' +\n__e(" + escapeValue + ") +\n'";
          }
          if (evaluateValue) {
            isEvaluating = true;
            source += "';\n" + evaluateValue + ";\n__p += '";
          }
          if (interpolateValue) {
            source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
          }
          index = offset + match.length;
          return match;
        });
        source += "';\n";
        var variable = hasOwnProperty.call(options, "variable") && options.variable;
        if (!variable) {
          source = "with (obj) {\n" + source + "\n}\n";
        }
        source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
        source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
        var result = attempt(function() {
          return Function(importsKeys, sourceURL + "return " + source).apply(void 0, importsValues);
        });
        result.source = source;
        if (isError(result)) {
          throw result;
        }
        return result;
      }
      var attempt = baseRest(function(func, args) {
        try {
          return apply(func, void 0, args);
        } catch (e) {
          return isError(e) ? e : new Error(e);
        }
      });
      function constant(value) {
        return function() {
          return value;
        };
      }
      function identity(value) {
        return value;
      }
      function stubFalse() {
        return false;
      }
      module.exports = template;
    }
  });

  // src/components/Example.ts
  var Example = class extends HTMLElement {
    constructor() {
      super();
    }
    static get observedAttributes() {
      return ["data-test"];
    }
    connectedCallback() {
      console.log("### connected callback called");
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.innerHTML = "\n      <div>This is a shadow root content</div>\n      ".concat(this.innerHTML, "\n    ");
    }
    disconnectedCallback() {
      console.log("### disconected callback called");
    }
    attributeChangedCallback(name, oldValue, newValue) {
      console.log("Attribute ".concat(name, " has changed."));
    }
  };
  customElements.define("example-cp", Example);

  // src/components/FlashFloating.ts
  var FlashFloating = class extends HTMLElement {
    constructor() {
      super();
    }
    static get observedAttributes() {
      return ["data-payload"];
    }
    set payload(value) {
      if (value.length > 0) {
        this.setAttribute("data-payload", JSON.stringify(value));
      }
    }
    get payload() {
      const data = this.getAttribute("data-payload");
      if (!data)
        return null;
      return JSON.parse(data);
    }
    attributeChangedCallback(name, oldValue, newValue) {
      clearTimeout(window.flashTimeout);
      this.render();
    }
    connectedCallback() {
      if (this.payload) {
        this.render();
      }
    }
    render() {
      if (!this.payload)
        return false;
      const messages = this.payload.reduce((prev, curr, index) => {
        const category = curr[0];
        const text = curr[1];
        const template = '\n        <div \n          role="alert" \n          class="alert alert-'.concat(category, ' mb-3 d-flex gap-2 position-fixed start-50 translate-middle-x floating-message" \n          style="max-width: 600px; transition: all .4s ease-out; bottom: ').concat(index * 60, 'px !important"\n        >\n          ').concat(category === "success" ? '<i class="bi bi-check-circle-fill"></i>' : category === "info" ? '<i class="bi bi-info-circle-fill"></i>' : '<i class="bi bi-exclamation-octagon-fill ml-3"></i>', "\n          ").concat(text && text, "\n        </div>\n      ");
        return prev + template;
      }, "");
      this.innerHTML = messages;
      window.flashTimeout = setTimeout(() => {
        const messages2 = this.querySelector(".floating-message");
        if (messages2) {
          messages2.style.cssText = messages2.style.cssText + " transform: translate(-50%, 100px) !important;";
        }
      }, 3e3);
    }
  };
  customElements.define("flash-floating", FlashFloating);

  // src/components/FlashInline.ts
  var FlashInline = class extends HTMLElement {
    constructor() {
      super();
    }
    set payload(value) {
      if (value.length > 0) {
        this.setAttribute("data-payload", JSON.stringify(value));
      }
    }
    get payload() {
      const data = this.getAttribute("data-payload");
      if (!data)
        return null;
      return JSON.parse(data);
    }
    connectedCallback() {
      if (this.payload) {
        this.render();
      }
    }
    render() {
      if (!this.payload)
        return false;
      const messages = this.payload.reduce((prev, curr, index) => {
        const category = curr[0];
        const text = curr[1];
        const template = '\n        <div class="alert alert-'.concat(category, ' mt-2 mb-3 d-flex gap-2" role="alert">\n          ').concat(category === "success" ? '<i class="bi bi-check-circle-fill"></i>' : category === "info" ? '<i class="bi bi-info-circle-fill"></i>' : '<i class="bi bi-exclamation-octagon-fill ml-3"></i>', "\n          ").concat(text && text, "\n        </div>\n      ");
        return prev + template;
      }, "");
      this.innerHTML = messages;
    }
  };
  customElements.define("flash-inline", FlashInline);

  // src/components/GenericFilter.ts
  var import_masonry_layout = __toESM(require_masonry(), 1);
  var GenericFilter = class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.init();
    }
    init() {
      var _a;
      if (!this.queryInput || ((_a = this.matchElements) == null ? void 0 : _a.length) == 0) {
        throw new Error("Layout is missing gf-* attributes");
      }
      this.queryInput.addEventListener("input", this.handleChange.bind(this));
    }
    get queryInput() {
      return document.querySelector("[gf-input]");
    }
    get matchElements() {
      return document.querySelectorAll("[gf-match]");
    }
    get matchArray() {
      if (!this.matchElements)
        return null;
      return Array.from(this.matchElements);
    }
    handleChange(e) {
      if (!this.queryInput || !this.matchArray)
        return;
      const regex = new RegExp("(".concat(this.queryInput.value, ")"), "i");
      this.matchArray.map((item) => {
        item.classList.remove("d-none");
        const content = item.querySelector("[gf-content]");
        const originalText = item.getAttribute("gf-match");
        const match = regex.exec(originalText.toLowerCase());
        if (!match || !content) {
          item.classList.add("d-none");
        } else {
          content.innerHTML = originalText.replace(regex, "<strong>$&</strong>");
        }
      });
      this.reinitMasonry();
    }
    reinitMasonry() {
      const containers = document.querySelectorAll("[gf-masonry]");
      if (containers.length == 0)
        return;
      Array.from(containers).map((container) => {
        new import_masonry_layout.default(container, {
          percentPosition: true
        });
      });
    }
  };
  customElements.define("generic-filter", GenericFilter);

  // src/components/MenuItems.ts
  var import_masonry_layout2 = __toESM(require_masonry(), 1);
  var MenuItems = class extends HTMLElement {
    constructor() {
      super();
    }
    get containers() {
      return document.querySelectorAll("[gf-masonry]");
    }
    connectedCallback() {
      this.init();
    }
    init() {
      if (!this.containers || this.containers.length == 0)
        return;
      Array.from(this.containers).map((container) => {
        setTimeout(function() {
          new import_masonry_layout2.default(container, {
            percentPosition: true
          });
        }, 300);
      });
    }
  };
  customElements.define("menu-items", MenuItems);

  // src/components/NavBar.ts
  var NavBar = class extends HTMLElement {
    constructor() {
      super();
    }
    get user() {
      return this.getAttribute("data-user");
    }
    get page() {
      return this.getAttribute("data-page");
    }
    connectedCallback() {
      this.render();
    }
    render() {
      const template = '\n      <nav class="navbar navbar-expand-lg bg-body-tertiary">\n        <div class="container p-lg-0">\n          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">\n            <span class="navbar-toggler-icon"></span>\n          </button>\n          <div class="collapse navbar-collapse mt-3 mt-lg-0" id="navbarSupportedContent">\n            <ul class="navbar-nav me-auto mb-2 mb-lg-0">\n              '.concat(this.user && '\n                <li class="nav-item">\n                  <a class="nav-link {% if url_for(request.endpoint) == \'/dashboard/\'  %} active {% endif %}" aria-current="page" href="/dashboard">Your Business</a>\n                </li>\n                <li class="nav-item dropdown">\n                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">\n                    Manage\n                  </a>\n                  <ul class="dropdown-menu">\n                    <li><a class="dropdown-item" href="/business/edit">Business Information</a></li>\n                    <li><a class="dropdown-item" href="/category">Categories</a></li>\n                    <li><hr class="dropdown-divider"></li>\n                    <li><a class="dropdown-item" href="/item/new">Add New Item</a></li>\n                  </ul>\n                </li>\n              ', '\n            </ul>\n            <ul class="navbar-nav mr-auto mb-2 mb-lg-0 d-flex justify-content-lg-end">\n              ').concat(this.user ? '\n                  <li class="nav-item">\n                    <a class="nav-link" href="/auth/logout">Logout</a>\n                  </li>\n                  ' : '\n                  <li class="nav-item">\n                    <a class="nav-link" href="/auth/login">Login</a>\n                  </li>\n                  ', "\n            </ul>\n          </div>\n        </div>\n      </nav>\n    ");
      this.innerHTML = template;
    }
  };
  customElements.define("nav-bar", NavBar);

  // src/helpers.ts
  var import_lodash = __toESM(require_lodash3(), 1);
  function compileCustomSlots(instance, template) {
    const children = Array.from(instance.children);
    const data = children.reduce((prev, curr) => {
      const slot = curr.getAttribute("slot");
      if (!slot)
        return __spreadProps(__spreadValues({}, prev), { "default": curr.outerHTML });
      return __spreadProps(__spreadValues({}, prev), { [slot]: curr.outerHTML });
    }, {});
    const compiled = (0, import_lodash.default)(template);
    return compiled({ data });
  }

  // src/components/shared/Button.ts
  var stringtemplate = "\n  <%= data.icon %>\n  <%= data.default %>\n";
  var Button = class extends HTMLButtonElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.render();
      this.registerListeners();
    }
    render() {
      const variant = this.getAttribute("variant");
      const size = this.getAttribute("size");
      let classes = ["btn"];
      if (variant) {
        classes.push("btn-".concat(variant));
      }
      if (size) {
        classes.push("btn-".concat(size));
      }
      this.classList.add(...classes);
      if (this.children.length > 0) {
        this.innerHTML = compileCustomSlots(this, stringtemplate);
      }
    }
    registerListeners() {
      const link = this.getAttribute("link");
      if (link) {
        this.addEventListener("click", (e) => {
          e.preventDefault();
          window.location.href = link;
        });
      }
    }
  };
  customElements.define("btn-cp", Button, { extends: "button" });

  // src/components/shared/ButtonGoBack.ts
  var ButtonGoBack = class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.render();
      this.registerListeners();
    }
    render() {
      const template = '\n      <button is="btn-cp" style="color: var(--link-color)">\n        '.concat(this.innerHTML, "\n      </buton>\n    ");
      this.innerHTML = template;
    }
    registerListeners() {
      this.addEventListener("click", (event) => {
        history.back();
      });
    }
  };
  customElements.define("btn-back", ButtonGoBack);

  // src/components/dashboard/MenuActions.ts
  var MenuActions = class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.render();
    }
    render() {
      const template = '\n      <div class="d-flex justify-content-center justify-content-lg-between align-items-center flex-wrap my-3">\n        <div class="form-floating ml-md-auto w-100" style="max-width: 450px">\n          <input type="text" class="form-control" id="filter" placeholder="Filter..." gf-input />\n          <label for="filter">Filter</label>\n        </div>\n        <div>\n          <button is="btn-cp" class="me-2 mt-3 mt-lg-0" link="/category" variant="outline-primary">Categories</button>\n          <button is="btn-cp" class="me-2 mt-3 mt-lg-0" link="/category/new" variant="outline-primary">Add Category</button>\n          <button is="btn-cp" class="mt-3 mt-lg-0" link="/item/new" variant="outline-primary">Add New</button>\n        </div>\n      </div>\n    ';
      this.innerHTML = template;
    }
  };
  customElements.define("menu-actions", MenuActions);

  // src/components/dashboard/MenuItem.ts
  var MenuItem = class extends HTMLElement {
    constructor() {
      super();
      __publicField(this, "data", null);
    }
    connectedCallback() {
      this.classList.add("col-12", "col-md-6", "col-lg-4", "col-xl-3", "p-2");
      const payload = this.querySelector("payload");
      if (payload) {
        this.data = JSON.parse(payload.textContent);
      } else {
        throw new Error("payload element not provided, can't get item data");
      }
      this.render();
    }
    render() {
      var _a, _b, _c, _d, _e, _f;
      const template = '\n      <div class="rounded content-block">\n        '.concat(((_a = this.data) == null ? void 0 : _a.image) ? '<img class="w-100" style="object-fit: cover;" src="/static/media/'.concat(this.data.image, '" />') : '<img class="w-100" style="object-fit: cover;" src="/static/images/no-image.png" />', '\n        <div>\n          <div class="d-flex align-items-center gap-2 p-3">\n            <h4 gf-content>').concat((_b = this.data) == null ? void 0 : _b.title, '</h4>\n            <span class="ms-auto">').concat((_c = this.data) == null ? void 0 : _c.price.toFixed(2), "</span>\n          </div>\n          ").concat(((_d = this.data) == null ? void 0 : _d.description) && '\n            <p class="px-3 pb-3">\n              '.concat(this.data.description, "\n            </p>\n          "), '\n        </div>\n        <div class="px-3 pb-3 d-flex justify-content-end gap-2">\n          <form action="/item/delete/').concat((_e = this.data) == null ? void 0 : _e.id, '" method="post">\n            <button is="btn-cp" type="submit" variant="primary">\n              <i class="bi bi-trash"></i>\n            </button>\n          </form>\n          <button is="btn-cp" link="/item/edit/').concat((_f = this.data) == null ? void 0 : _f.id, '" variant="primary">\n            <i class="bi bi-pencil-square"></i>\n          </button>\n        </div>\n      </div>\n    ');
      this.innerHTML = template;
    }
  };
  customElements.define("menu-item", MenuItem);
})();
/*! Bundled license information:

get-size/get-size.js:
  (*!
   * getSize v2.0.3
   * measure size of elements
   * MIT license
   *)

outlayer/outlayer.js:
  (*!
   * Outlayer v2.1.1
   * the brains and guts of a layout library
   * MIT license
   *)

masonry-layout/masonry.js:
  (*!
   * Masonry v4.2.2
   * Cascading grid layout library
   * https://masonry.desandro.com
   * MIT License
   * by David DeSandro
   *)
*/
