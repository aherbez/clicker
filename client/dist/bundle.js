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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BusinessCatalog\", function() { return BusinessCatalog; });\n/* harmony import */ var _common_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/entity */ \"./src/js/common/entity.js\");\n/* harmony import */ var _business_panel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./business_panel */ \"./src/js/business/business_panel.js\");\n\n\n\n/**\n * Renders the list of purchaseable businesses\n */\nclass BusinessCatalog extends _common_entity__WEBPACK_IMPORTED_MODULE_0__[\"Entity\"] {\n    constructor(gr) {\n        super();\n\n        this.registry = gr;\n        // this.busList = businessLookup;\n        let i=0;\n        this.registry.businessLookup.forEach((bd) => {\n            this.addBusiness(bd, i);\n            i++;\n        })\n    }\n\n    addBusiness(bd, index) {\n        let bPanel = new _business_panel__WEBPACK_IMPORTED_MODULE_1__[\"BusinessPanel\"](bd, this.registry);\n        bPanel.setPos(0, (index * (150 + 10)));\n        this.children.push(bPanel);\n    }\n\n    render(ctx) {\n    }\n}\n\n//# sourceURL=webpack:///./src/js/business/business_catalog.js?");

/***/ }),

/***/ "./src/js/business/business_data.js":
/*!******************************************!*\
  !*** ./src/js/business/business_data.js ***!
  \******************************************/
/*! exports provided: BusinessData, BusinessState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BusinessData\", function() { return BusinessData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BusinessState\", function() { return BusinessState; });\n/**\n * BusinessData - holds info on a business type as retrieved from the server\n */\nclass BusinessData {\n    constructor(data) {\n        this.id = data.id || -1;\n        this.name = data.name || 'business';\n        this.baseCost = data.cost || 1;\n        this.costMult = data.costMult || 1;\n        this.time = data.time || 10;\n        this.icon = data.icon || 'null.png';\n        this.moneyPerFill = data.funds || 1;\n    }\n}\n\n/**\n * BusinessState - holds the current state of a given business type for the player\n */\nclass BusinessState {\n    constructor() {\n        this.id = -1;\n        this.numOwned = 0;\n        this.timeToFill = 10;   // time to fill, in seconds\n        this.moneyPerFill = 10;\n        this.costOfNext = 10;\n        this.autoCollect = false;\n        this.lastCollected = -1;    // timestamp\n        this.fillAmount = 0;\n    }\n\n    setFromBusinessData(bd) {\n        this.id = bd.id;\n        this.timeToFill_MS = bd.time * 1000;\n        this.moneyPerFill = bd.moneyPerFill;\n        this.costOfNext = bd.baseCost;\n    }\n\n    addAndUpdateCost(numToBuy, baseCost, costMult) {\n        this.numOwned += numToBuy;\n        this.costOfNext = baseCost * (Math.pow(costMult, this.numOwned));\n    }\n\n    resetTimer() {\n        this.lastCollected = Date.now();\n        this.fillAmount = 0;\n    }\n\n    maybeCollect() {\n        let collected = 0;\n        if (this.fillAmount > 0.99) {\n            this.resetTimer();\n            collected = (this.moneyPerFill * this.numOwned);\n            console.log(`collected ${this.moneyPerFill} from ${this.numOwned} for a total of ${collected}`);\n        }\n        return collected;\n    }\n\n    tick(timestamp) {\n        if (this.numOwned < 1) return;\n\n        let timeSinceLast = timestamp - this.lastCollected;\n        this.fillAmount = (timeSinceLast / this.timeToFill_MS)\n        \n        let shouldAddFunds = false;\n        if (this.fillAmount > 1) {\n            if (this.autoCollect) {\n                this.resetTimer();\n                shouldAddFunds = true;\n            } else {\n                this.fillAmount = 1;\n            }\n        }\n        return shouldAddFunds;\n    }\n}\n\n//# sourceURL=webpack:///./src/js/business/business_data.js?");

/***/ }),

/***/ "./src/js/business/business_lookup.js":
/*!********************************************!*\
  !*** ./src/js/business/business_lookup.js ***!
  \********************************************/
/*! exports provided: BusinessLookup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BusinessLookup\", function() { return BusinessLookup; });\n/* harmony import */ var _business_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./business_data */ \"./src/js/business/business_data.js\");\n\n\n\nconst SERVER_URL = 'http://localhost:3000';\n\nclass BusinessLookup {\n    constructor(loadedCallback = null) {\n        // fetch list of businesses from server\n        \n        this.listings = new Map();\n\n        this.onLoad = loadedCallback;\n\n        let bl = this;\n        fetch(`${SERVER_URL}/businesses/list`).then(res => {\n            res.json().then(resJSON => {\n                console.log(resJSON);\n                bl.initFromData(resJSON.data);\n            });\n        });\n    }\n\n    initFromData(data) {\n        console.log(`Found data version: ${data.v}, initializing`);\n\n        console.log(data.businesses);\n\n        if (data.businesses) {\n            data.businesses.forEach(business => {\n                let b = new _business_data__WEBPACK_IMPORTED_MODULE_0__[\"BusinessData\"](business);\n                this.listings.set(b.id, b);\n                console.log(`loaded ${b.name}`);\n            });\n        }\n\n        if (this.onLoad) {\n            this.onLoad();\n        }\n    }\n\n    forEach(f) {\n        this.listings.forEach((bd) => {\n            f(bd);\n        });\n    }\n\n    getBusinessDataById(id) {\n        if (this.listings.has(id)) {\n            return this.listings.get(id);\n        }\n        return null;\n    }\n}\n\n//# sourceURL=webpack:///./src/js/business/business_lookup.js?");

/***/ }),

/***/ "./src/js/business/business_panel.js":
/*!*******************************************!*\
  !*** ./src/js/business/business_panel.js ***!
  \*******************************************/
/*! exports provided: BusinessPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BusinessPanel\", function() { return BusinessPanel; });\n/* harmony import */ var _business_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./business_data */ \"./src/js/business/business_data.js\");\n/* harmony import */ var _common_entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/entity */ \"./src/js/common/entity.js\");\n/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/utils */ \"./src/js/common/utils.js\");\n/* harmony import */ var _ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/button */ \"./src/js/ui/button.js\");\n\n\n\n\n\nconst WIDTH = 380;\nconst HEIGHT = 150;\n\nclass BusinessPanel extends _common_entity__WEBPACK_IMPORTED_MODULE_1__[\"Entity\"] {\n    constructor(bd, gr) {\n        super();\n        this.data = bd;\n        this.registry = gr;\n\n        this.bounds = {\n            x: WIDTH,\n            y: HEIGHT\n        }\n\n        this.setupButtons();\n    }\n\n    setupButtons() {\n        this.buyButton = new _ui_button__WEBPACK_IMPORTED_MODULE_3__[\"Button\"]({\n            label: 'buy',\n            width: 100,\n            callback: () => {this.attemptPurchase();}\n        });\n        this.buyButton.setPos(120, 70);\n        this.children.push(this.buyButton);\n\n        this.collectButton = new _ui_button__WEBPACK_IMPORTED_MODULE_3__[\"Button\"]({\n            label: 'collect',\n            width: 100,\n            callback: () => {this.attemptCollect();}\n        });\n        this.collectButton.setPos(10,70);\n        this.collectButton.enabled = false;\n        this.children.push(this.collectButton);\n    }\n\n    onClick(pos) {\n        // only buy on click if it's the first purchase\n        // subsequent purchases require clicking on the \"buy\" button, specifically\n        const owned = this.registry.playerInventory.numOwned(this.data.id);\n        if (owned > 0) return;\n        \n        this.attemptPurchase();\n    }\n\n    attemptPurchase() {\n        this.registry.playerInventory.maybePurchaseBusiness(this.data.id);\n    }\n\n    attemptCollect() {\n        this.registry.playerInventory.maybeCollectFunds(this.data.id);\n    }\n\n    _drawName(ctx) {\n        ctx.save();\n\n        ctx.textAlign = 'center';\n        ctx.font = '40px helvetica';\n\n        ctx.translate(WIDTH/2, HEIGHT/2);\n        ctx.fillText(this.data.name, 0, 0);\n        ctx.restore();\n    }\n\n    _drawFirstCost(ctx)  {\n        const cost = this.registry.playerInventory.costOfNextBusiness(this.data.id);\n\n        ctx.save();\n        ctx.translate(WIDTH/2, HEIGHT/2 + 40);\n\n        ctx.textAlign = 'center';\n        ctx.font = '20px helvetica';\n        ctx.fillText(Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__[\"formatMoney\"])(cost), 0, 0);\n\n        ctx.restore();\n    }\n\n    _renderPurchaseOption(ctx) {\n        const canAfford = this.registry.playerInventory.canAffordBusiness(this.data.id);\n\n        ctx.save();\n        this._drawName(ctx);\n        this._drawFirstCost(ctx);\n        ctx.restore();\n    }\n\n    _renderStatus(ctx) {\n        const { playerInventory } = this.registry;\n\n        ctx.save();\n\n        const owned = playerInventory.numOwned(this.data.id);\n\n        // draw numOwned\n        {\n            let numOwnedStr = `${this.data.name}: ${owned}`;\n            ctx.save();\n            ctx.font = '20px helvetica';\n            ctx.fillText(numOwnedStr, 10, 20);\n            ctx.restore();\n        }\n\n        // render progress bar\n        ctx.save();\n        const fillAmount = playerInventory.getProgress(this.data.id);\n        ctx.fillStyle = '#00AA00';\n\n        ctx.fillRect(10, 30, (fillAmount * 100), 30);\n        ctx.strokeRect(10, 30, 100, 30);\n\n        ctx.restore();\n\n\n        ctx.restore();\n    }\n\n    updateButtons() {\n        const { playerInventory } = this.registry;\n\n        const owned = playerInventory.numOwned(this.data.id);\n        this.buyButton.visible = (owned > 0);\n        this.collectButton.visible = (owned > 0);    \n\n        this.buyButton.enabled = playerInventory.canAffordBusiness(this.data.id);\n        this.collectButton.enabled = playerInventory.canCollect(this.data.id);\n    }\n\n    render(ctx) {\n        this.updateButtons();\n\n        ctx.beginPath();\n        ctx.strokeRect(0, 0, WIDTH, HEIGHT);\n\n        const owned = this.registry.playerInventory.numOwned(this.data.id);\n        if (owned > 0) {\n            this._renderStatus(ctx);\n        } else {\n            this._renderPurchaseOption(ctx);\n        }\n    }\n}\n\n//# sourceURL=webpack:///./src/js/business/business_panel.js?");

/***/ }),

/***/ "./src/js/common/entity.js":
/*!*********************************!*\
  !*** ./src/js/common/entity.js ***!
  \*********************************/
/*! exports provided: Entity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Entity\", function() { return Entity; });\n/**\n * Class for a game entity\n * (something that gets drawn to the screen, and can receive clicks)\n */\n\nclass Entity {\n    constructor() {\n        this.pos = {\n            x: 0,\n            y: 0\n        }\n        this.bounds = {\n            x: 0,\n            y: 0\n        }\n\n        this.rotation = 0;\n        this.children = [];\n        this.visible = true;\n    }\n\n    // no-op in base class\n    onClick(pos) {}\n    render(ctx) {}\n\n    setPos(x, y) {\n        this.pos.x = x;\n        this.pos.y = y;\n    }\n\n    // derives local click pos and passes event down to children\n    handleClickInternal(pos) {\n        let localPos = {\n            x: pos.x - this.pos.x,\n            y: pos.y - this.pos.y\n        }\n\n        if ((localPos.x >= 0 && localPos.x < this.bounds.x) && \n            (localPos.y > 0 && localPos.y < this.bounds.y)) {\n                this.onClick(localPos);\n        }\n        this.children.forEach(c => {\n            c.handleClickInternal(localPos);\n        })\n    }\n\n    // handles local position and passes rendering down to children\n    _render(ctx) {\n        if (!this.visible) return;\n\n        ctx.save();\n        ctx.translate(this.pos.x, this.pos.y);\n        \n        this.render(ctx);\n\n        this.children.forEach(c => {\n            c._render(ctx);\n        });\n        ctx.restore();\n    }\n\n\n}\n\n//# sourceURL=webpack:///./src/js/common/entity.js?");

/***/ }),

/***/ "./src/js/common/utils.js":
/*!********************************!*\
  !*** ./src/js/common/utils.js ***!
  \********************************/
/*! exports provided: formatMoney */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"formatMoney\", function() { return formatMoney; });\n\nconst formatMoney = (n) => {\n    let s = parseFloat(n).toFixed(2);\n    return `$${s}`;\n}\n\n//# sourceURL=webpack:///./src/js/common/utils.js?");

/***/ }),

/***/ "./src/js/game.js":
/*!************************!*\
  !*** ./src/js/game.js ***!
  \************************/
/*! exports provided: ClickerClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ClickerClient\", function() { return ClickerClient; });\n/* harmony import */ var _business_business_lookup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./business/business_lookup */ \"./src/js/business/business_lookup.js\");\n/* harmony import */ var _business_business_catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./business/business_catalog */ \"./src/js/business/business_catalog.js\");\n/* harmony import */ var _game_registry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game_registry */ \"./src/js/game_registry.js\");\n/* harmony import */ var _player_player_inventory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player/player_inventory */ \"./src/js/player/player_inventory.js\");\n/* harmony import */ var _ui_game_screen__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui/game_screen */ \"./src/js/ui/game_screen.js\");\n\n\n\n\n\n\n\n/**\n * ClickerClient: main game class\n */\n\nconst TICK_TIME_MS = 500;\n\nclass ClickerClient {\n\n    constructor(stageId) {\n        let mainScreen = null;\n        \n        this.initTimers();\n        this.initCanvas(stageId);\n\n        this.gameRegistry = new _game_registry__WEBPACK_IMPORTED_MODULE_2__[\"GameRegistry\"]();\n\n        this.businessLookup = new _business_business_lookup__WEBPACK_IMPORTED_MODULE_0__[\"BusinessLookup\"](this.startGame.bind(this));        \n        this.gameRegistry.businessLookup = this.businessLookup;\n\n        this.children = [];\n\n        document.onmousedown = this.mouseDown.bind(this);\n\n        this.update();\n    }\n\n    initCanvas(stageId) {\n        this.canvasEl = document.getElementById(stageId);\n        this.ctx = this.canvasEl.getContext('2d');\n\n        this.bounds = {\n            width: this.canvasEl.clientWidth,\n            height: this.canvasEl.clientHeight,\n        }\n\n        this.pos = {\n            x: this.canvasEl.offsetLeft,\n            y: this.canvasEl.offsetTop\n        };\n    }\n\n    mouseDown(evt) {\n        /*\n        console.log(evt);\n        console.log({\n            x: evt.clientX - this.pos.x,\n            y: evt.clientY - this.pos.y\n        });\n        */\n\n        let localPos = {\n            x: evt.clientX - this.pos.x,\n            y: evt.clientY - this.pos.y            \n        }\n        this.children.forEach(c => {\n            c.handleClickInternal(localPos);\n        })\n\n    }\n\n    initTimers() {\n        this.lastTime = Date.now();\n        this.tickTimer = 0;\n\n    }\n\n    initBusinessCatalog() {\n        this.businessCatalog = new _business_business_catalog__WEBPACK_IMPORTED_MODULE_1__[\"BusinessCatalog\"](this.busList);\n        this.businessCatalog.setPos(10, 10);\n        this.children.push(this.businessCatalog);\n    }\n\n    startGame() {\n        this.playerInventory = new _player_player_inventory__WEBPACK_IMPORTED_MODULE_3__[\"PlayerInventory\"](this.gameRegistry);\n        this.gameRegistry.playerInventory = this.playerInventory;\n\n        this.mainScreen = new _ui_game_screen__WEBPACK_IMPORTED_MODULE_4__[\"GameScreen\"](this.gameRegistry);\n        this.children.push(this.mainScreen);\n    }\n\n    /**\n     * function to handle ticking various update-able objects\n     * (separate from rendering)\n     */\n    tick() {\n        // update\n        this.playerInventory.tick();\n    }\n\n    /**\n     * render loop\n     */\n    render(dt) {\n        let ctx = this.ctx;\n        let { width, height } = this.bounds;        \n\n        ctx.clearRect(0, 0, width, height);\n        ctx.save();\n\n        if (this.mainScreen) {\n            this.mainScreen._render(ctx);\n        } else {\n            ctx.save();\n            ctx.translate(width/2, height/2);\n            ctx.fillText('loading', 0, 0);\n\n            ctx.restore();\n        }\n\n        ctx.restore();\n    }\n\n    update() {\n        let curr = Date.now();\n        let deltaTime = curr - this.lastTime;\n        this.lastTime = curr;\n\n        // draw animation as often as possible\n        this.render(deltaTime);\n\n        // only tick if necessary\n        this.tickTimer += deltaTime;\n        if (this.tickTimer > TICK_TIME_MS) {\n            this.tick();\n            this.tickTimer = 0;\n        }\n\n        requestAnimationFrame(this.update.bind(this));\n    }\n\n}\n\n//# sourceURL=webpack:///./src/js/game.js?");

/***/ }),

/***/ "./src/js/game_registry.js":
/*!*********************************!*\
  !*** ./src/js/game_registry.js ***!
  \*********************************/
/*! exports provided: GameRegistry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameRegistry\", function() { return GameRegistry; });\nclass GameRegistry {\n    constructor() {\n        // instance of PlayerInventory\n        this.playerInventory = null;\n        \n        // BusinessLookup instance\n        this.businessLookup = null;\n    }\n}\n\n//# sourceURL=webpack:///./src/js/game_registry.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/js/game.js\");\n\n\nlet client = new _game__WEBPACK_IMPORTED_MODULE_0__[\"ClickerClient\"]('stage');\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/player/player_inventory.js":
/*!*******************************************!*\
  !*** ./src/js/player/player_inventory.js ***!
  \*******************************************/
/*! exports provided: PlayerInventory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PlayerInventory\", function() { return PlayerInventory; });\n/* harmony import */ var _business_business_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../business/business_data */ \"./src/js/business/business_data.js\");\n\n\nconst STARTING_FUNDS = 100;\n\nclass PlayerInventory {\n    constructor(registry) {\n        this.registry = registry;\n\n        this.money = STARTING_FUNDS;\n        this.businessStates = new Map();\n\n        this.initBusinesses();\n    }\n\n    initBusinesses() {\n        this.registry.businessLookup.forEach(businessData => {\n            let businessState = new _business_business_data__WEBPACK_IMPORTED_MODULE_0__[\"BusinessState\"]();\n            businessState.setFromBusinessData(businessData);\n            this.businessStates.set(businessData.id, businessState);\n        });\n    }\n\n    get currCash() {\n        return this.money;\n    }\n\n    chargePlayer(cost) {\n        if (cost < 0) return;\n        this.money -= cost;\n    }\n\n    addFunds(funds) {\n        if (funds < 0) return;\n        this.money += funds;\n    }\n\n    canAfford(cost) {\n        return (cost <= this.money);\n    }\n\n    costOfNextBusiness(bID) {\n        if (this.businessStates.has(bID)) {\n            return this.businessStates.get(bID).costOfNext;\n        }\n        return 0;\n    }\n\n    costOfNextBusinesses(bID, numToBuy) {\n        // TODO: flesh this out for buying N at once\n        return this.costOfNextBusiness(bID);\n    }\n\n    canAffordBusiness(bID) {\n        return this.canAfford(this.costOfNextBusiness(bID));\n    }\n\n    maybePurchaseBusiness(bID) {\n        const cost = this.costOfNextBusiness(bID);\n\n        if (this.canAfford(cost)) {\n            this.chargePlayer(cost);\n            this.purchaseBusiness(bID);\n        }\n    }\n\n    purchaseBusiness(bID, numToBuy = 1) {\n        console.log(`BUYING ONE OF TYPE: ${bID}`);\n\n        const businessData = this.registry.businessLookup.getBusinessDataById(bID);\n\n        const bState = this.businessStates.get(bID);\n        bState.addAndUpdateCost(numToBuy, businessData.baseCost, businessData.costMult);\n        \n        // if this is the first one we've bought, set last collected to now\n        // (to prevent bars being automatically filled)\n        if (bState.numOwned === 1) {\n            bState.lastCollected = Date.now();\n        }\n\n        this.debugPrintInv();\n    }\n\n    debugPrintInv() {\n        this.businessStates.forEach(bState => {\n            console.log(`type: ${bState.id} numOwned: ${bState.numOwned}`);\n        })\n    }\n\n    // purchase managers and other upgrades\n    purchaseUpgrade(uID) {\n\n    }\n\n    numOwned(bID) {\n        if (this.businessStates.has(bID)) {\n            return this.businessStates.get(bID).numOwned;\n        }\n        return 0;\n    }\n\n    getProgress(bID) {\n        if (this.businessStates.has(bID)) {\n            return this.businessStates.get(bID).fillAmount;\n        }\n        return 0;\n    }\n\n    canCollect(bID) {\n        if (this.businessStates.has(bID)) {\n            return this.businessStates.get(bID).fillAmount > 0.99;\n        }\n        return false;\n    }\n\n    maybeCollectFunds(bID) {\n        if (this.canCollect(bID)) {\n            const moneyCollected = this.businessStates.get(bID).maybeCollect();\n            this.addFunds(moneyCollected);\n        }\n    }\n\n    // update state of each business\n    tick() {\n        const ts = Date.now();\n        this.businessStates.forEach(bState => {\n            bState.tick(ts);\n        });\n\n        // this.money += (1 + Math.random());\n    }\n}\n\n//# sourceURL=webpack:///./src/js/player/player_inventory.js?");

/***/ }),

/***/ "./src/js/ui/button.js":
/*!*****************************!*\
  !*** ./src/js/ui/button.js ***!
  \*****************************/
/*! exports provided: Button */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Button\", function() { return Button; });\n/* harmony import */ var _common_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/entity */ \"./src/js/common/entity.js\");\n\n\nclass Button extends _common_entity__WEBPACK_IMPORTED_MODULE_0__[\"Entity\"] {\n    constructor(params) {\n        super();\n        this.bounds.x = params.width || 50;\n        this.bounds.y = params.height || 50;\n        this.callback = params.callback || null;\n        this.label = params.label || 'foo';\n        this.radius = params.radius || 5;\n        this.backColor = params.fill || '#AFA';\n        this.disabledColor = params.disabledColor || '#AAA';\n        this.strokeColor = params.stroke || '#000';\n\n        this.enabled = true;\n    }\n\n    onClick(pos) {\n        if (!this.enabled || !this.visible) return;\n\n        if (this.callback) {\n            console.log(`clicked on button`);\n            this.callback();\n        }\n    }\n\n    render(ctx) {\n        let r = this.radius;\n        let w = this.bounds.x;\n        let h = this.bounds.y;\n\n        ctx.fillStyle = (this.enabled) ? this.backColor : this.disabledColor;\n        ctx.strokeStyle = this.strokeColor;\n\n        ctx.beginPath();\n        \n        ctx.moveTo(r, 0);\n        ctx.lineTo(w-r, 0);\n        ctx.lineTo(w, r);\n        ctx.lineTo(w, h-r);\n        ctx.lineTo(w-r,h);\n        ctx.lineTo(r,h);\n        ctx.lineTo(0, h-r);\n        ctx.lineTo(0,r);\n        ctx.lineTo(r,0);\n\n        ctx.fill();\n        ctx.stroke();\n\n        ctx.fillStyle = this.strokeColor;\n\n        ctx.save();\n        ctx.textAlign = 'center';\n        ctx.translate(w/2, h/2);\n        ctx.font = '20px helvetica';\n        ctx.fillText(this.label, 0, 0);\n        ctx.restore();\n    }\n}\n\n//# sourceURL=webpack:///./src/js/ui/button.js?");

/***/ }),

/***/ "./src/js/ui/game_screen.js":
/*!**********************************!*\
  !*** ./src/js/ui/game_screen.js ***!
  \**********************************/
/*! exports provided: GameScreen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameScreen\", function() { return GameScreen; });\n/* harmony import */ var _common_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/entity */ \"./src/js/common/entity.js\");\n/* harmony import */ var _game_registry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game_registry */ \"./src/js/game_registry.js\");\n/* harmony import */ var _ui_money_display__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/money_display */ \"./src/js/ui/money_display.js\");\n/* harmony import */ var _business_business_catalog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../business/business_catalog */ \"./src/js/business/business_catalog.js\");\n\n\n\n\n\nclass GameScreen extends _common_entity__WEBPACK_IMPORTED_MODULE_0__[\"Entity\"] {\n    constructor(gr) {\n        super();\n        this.registry = gr;\n\n        this.init();\n    }\n\n    init() {\n        this.businessCatalog = new _business_business_catalog__WEBPACK_IMPORTED_MODULE_3__[\"BusinessCatalog\"](this.registry);\n        this.businessCatalog.setPos(10, 60);\n        this.children.push(this.businessCatalog);\n\n        this.cashDisplay = new _ui_money_display__WEBPACK_IMPORTED_MODULE_2__[\"MoneyDisplay\"](this.registry);\n        this.cashDisplay.setPos(10, 50);\n        this.children.push(this.cashDisplay);\n    }\n}\n\n//# sourceURL=webpack:///./src/js/ui/game_screen.js?");

/***/ }),

/***/ "./src/js/ui/money_display.js":
/*!************************************!*\
  !*** ./src/js/ui/money_display.js ***!
  \************************************/
/*! exports provided: MoneyDisplay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MoneyDisplay\", function() { return MoneyDisplay; });\n/* harmony import */ var _common_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/entity */ \"./src/js/common/entity.js\");\n/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/utils */ \"./src/js/common/utils.js\");\n\n\n\nclass MoneyDisplay extends _common_entity__WEBPACK_IMPORTED_MODULE_0__[\"Entity\"] {\n    constructor(gr) {\n        super();\n\n        this.gameRegistry = gr; \n    }\n\n    render(ctx) {\n        ctx.font = '50px helvetica';\n        let playerCashStr = Object(_common_utils__WEBPACK_IMPORTED_MODULE_1__[\"formatMoney\"])(this.gameRegistry.playerInventory.currCash);\n        \n        ctx.fillText(playerCashStr, 0, 0);\n\n    }\n}\n\n//# sourceURL=webpack:///./src/js/ui/money_display.js?");

/***/ })

/******/ });