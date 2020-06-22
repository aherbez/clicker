/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/business/business_catalog.js":
/*!*********************************************!*\
  !*** ./src/js/business/business_catalog.js ***!
  \*********************************************/
/*! exports provided: BusinessCatalog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BusinessCatalog\", function() { return BusinessCatalog; });\n/* harmony import */ var _common_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/entity */ \"./src/js/common/entity.js\");\n\n\nclass BusinessCatalog extends _common_entity__WEBPACK_IMPORTED_MODULE_0__[\"Entity\"] {\n    constructor(businessLookup) {\n        super();\n\n        console.log(`New business panel`);\n\n        this.pos.x = 100;\n        this.pos.y = 100;\n\n        this.busList = businessLookup;\n\n    }\n\n    render(ctx) {\n        ctx.fillRect(0,0, 100, 100);\n    }\n}\n\n//# sourceURL=webpack:///./src/js/business/business_catalog.js?");

/***/ }),

/***/ "./src/js/business/business_data.js":
/*!******************************************!*\
  !*** ./src/js/business/business_data.js ***!
  \******************************************/
/*! exports provided: BusinessData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BusinessData\", function() { return BusinessData; });\nclass BusinessData {\n    constructor(data) {\n        this.id = data.id || -1;\n        this.name = data.name || 'business';\n        this.cost = data.cost || 1;\n        this.costMult = data.costMult || 1;\n        this.time = data.time || 10;\n        this.icon = data.icon || 'null.png';\n    }\n}\n\n//# sourceURL=webpack:///./src/js/business/business_data.js?");

/***/ }),

/***/ "./src/js/business/business_lookup.js":
/*!********************************************!*\
  !*** ./src/js/business/business_lookup.js ***!
  \********************************************/
/*! exports provided: BusinessLookup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BusinessLookup\", function() { return BusinessLookup; });\n/* harmony import */ var _business_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./business_data */ \"./src/js/business/business_data.js\");\n\n\n\nconst SERVER_URL = 'http://localhost:3000';\n\nclass BusinessLookup {\n    constructor(loadedCallback = null) {\n        // fetch list of businesses from server\n        \n        this.listings = new Map();\n\n        this.onLoad = loadedCallback;\n\n        let bl = this;\n        fetch(`${SERVER_URL}/businesses/list`).then(res => {\n            res.json().then(resJSON => {\n                console.log(resJSON);\n                bl.initFromData(resJSON.data);\n            });\n        });\n    }\n\n    initFromData(data) {\n        console.log(`Found data version: ${data.v}, initializing`);\n\n        console.log(data.businesses);\n\n        if (data.businesses) {\n            data.businesses.forEach(business => {\n                let b = new _business_data__WEBPACK_IMPORTED_MODULE_0__[\"BusinessData\"](business);\n                this.listings.set(b.id, b);\n                console.log(`loaded ${b.name}`);\n            });\n        }\n\n        if (this.onLoad) {\n            this.onLoad();\n        }\n    }\n\n    getBusinessById(id) {\n        if (this.listings.has(id)) {\n            return this.listings.get(id);\n        }\n        return null;\n    }\n}\n\n//# sourceURL=webpack:///./src/js/business/business_lookup.js?");

/***/ }),

/***/ "./src/js/common/entity.js":
/*!*********************************!*\
  !*** ./src/js/common/entity.js ***!
  \*********************************/
/*! exports provided: Entity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Entity\", function() { return Entity; });\n/**\n * Class for a game entity\n * (something that gets drawn to the screen, and can receive clicks)\n */\n\nclass Entity {\n    constructor() {\n        this.pos = {\n            x: 0,\n            y: 0\n        }\n        this.rotation = 0;\n        this.children = [];\n    }\n\n    // no-op in base class\n    onClick(pos) {}\n    render(ctx) {}\n\n    // derives local click pos and passes event down to children\n    _handleClick(pos) {\n        let localPos = {\n            x: pos.x - this.x,\n            y: pos.y - this.y\n        }\n        this.onClick(localPos);\n\n        this.children.forEach(c => {\n            c._handleClick(localPos);\n        })\n    }\n\n    // handles local position and passes rendering down to children\n    _render(ctx) {\n        ctx.save();\n        ctx.translate(this.pos.x, this.pos.y);\n\n        this.render(ctx);\n\n        this.children.forEach(c => {\n            c._render(ctx);\n        });\n        ctx.restore();\n    }\n\n\n}\n\n//# sourceURL=webpack:///./src/js/common/entity.js?");

/***/ }),

/***/ "./src/js/game.js":
/*!************************!*\
  !*** ./src/js/game.js ***!
  \************************/
/*! exports provided: ClickerClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ClickerClient\", function() { return ClickerClient; });\n/* harmony import */ var _business_business_lookup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./business/business_lookup */ \"./src/js/business/business_lookup.js\");\n/* harmony import */ var _business_business_catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./business/business_catalog */ \"./src/js/business/business_catalog.js\");\n\n\n\n/**\n * ClickerClient: main game class\n */\n\nconst TICK_TIME_MS = 500;\n\nclass ClickerClient {\n\n    constructor(stageId) {\n        let businessCatalog = null;\n        this.initTimers();\n        this.initCanvas(stageId);\n\n        this.busList = new _business_business_lookup__WEBPACK_IMPORTED_MODULE_0__[\"BusinessLookup\"](this.initBusinessCatalog.bind(this));\n\n        this.children = [];\n\n        this.update();\n    }\n\n    initCanvas(stageId) {\n        this.canvasEl = document.getElementById(stageId);\n        this.ctx = this.canvasEl.getContext('2d');\n\n        this.bounds = {\n            width: this.canvasEl.clientWidth,\n            height: this.canvasEl.clientHeight,\n        }\n    }\n\n    initTimers() {\n        this.lastTime = Date.now();\n        this.tickTimer = 0;\n\n    }\n\n    initBusinessCatalog() {\n        this.businessCatalog = new _business_business_catalog__WEBPACK_IMPORTED_MODULE_1__[\"BusinessCatalog\"](this.busList);\n        this.children.push(this.businessCatalog);\n    }\n\n    /**\n     * function to handle ticking various update-able objects\n     * (separate from rendering)\n     */\n    tick() {\n        // update \n    }\n\n    /**\n     * render loop\n     */\n    render(dt) {\n        let ctx = this.ctx;\n        let { width, height } = this.bounds;        \n\n        ctx.clearRect(0, 0, width, height);\n        ctx.save();\n\n        if (this.businessCatalog) {\n            this.businessCatalog._render(ctx);\n        } else {\n            ctx.save();\n            ctx.translate(width/2, height/2);\n            ctx.fillText('loading', 0, 0);\n\n            ctx.restore();\n        }\n\n        ctx.restore();\n    }\n\n    update() {\n        let curr = Date.now();\n        let deltaTime = curr - this.lastTime;\n        this.lastTime = curr;\n\n        // draw animation as often as possible\n        this.render(deltaTime);\n\n        // only tick if necessary\n        this.tickTimer += deltaTime;\n        if (this.tickTimer > TICK_TIME_MS) {\n            this.tick();\n            this.tickTimer = 0;\n        }\n\n        requestAnimationFrame(this.update.bind(this));\n    }\n\n}\n\n//# sourceURL=webpack:///./src/js/game.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/js/game.js\");\n\n\nlet client = new _game__WEBPACK_IMPORTED_MODULE_0__[\"ClickerClient\"]('stage');\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });