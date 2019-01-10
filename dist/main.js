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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// const msPac = require('./msPac');\n\nclass Game {\n    constructor(ctx) {\n        this.ctx = ctx;\n        // this.msPac = new msPac(this.ctx);\n    }\n    \n\n    draw(ctx) {\n        ctx.beginPath()\n        ctx.fillStyle = \"#000000\";\n        ctx.fillRect(0,0, 800, 600);\n    }\n\n\n}\n\n// const boardHeight = 1000;\n// const boardWidth = 600;\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/gameView.js":
/*!*************************!*\
  !*** ./src/gameView.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\")\nconst MsPac = __webpack_require__(/*! ./msPac */ \"./src/msPac.js\");\n\nclass GameView {\n    constructor(game, ctx) {\n        this.game = game;\n        this.ctx = ctx;\n        this.msPac = new MsPac(ctx);\n\n        this.keyBinds = this.keyBinds.bind(this);\n    }\n\n    keyBinds() {\n        //keyCodes obtained here: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode#Value_of_keyCode\n        document.addEventListener(\"keydown\", (e) => {\n\n            if (e.code === \"KeyD\") {\n                this.msPac.moveRight();\n            } \n            if (e.code === \"KeyA\") {\n                this.msPac.moveLeft();\n            } \n            if (e.code === \"KeyW\") {\n                this.msPac.moveUp();\n            } \n            if (e.code === \"KeyS\") {\n                this.msPac.moveDown();\n            }\n        })\n\n        document.addEventListener(\"keyup\", (e) => {\n            this.msPac.moveStop();\n        })\n    }\n    play() {\n        this.keyBinds();\n        requestAnimationFrame(this.animate.bind(this));\n    }\n\n    animate() {\n        this.game.draw(this.ctx);\n        this.msPac.draw(this.ctx);\n        requestAnimationFrame(this.animate.bind(this));\n    }\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/gameView.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./gameView */ \"./src/gameView.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    const canvasEl = document.getElementsByTagName(\"canvas\")[0];\n    canvasEl.width = 800;\n    canvasEl.height = 600;\n\n    const ctx = canvasEl.getContext(\"2d\");\n    const game = new Game(ctx);\n    new GameView(game, ctx).play();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/msPac.js":
/*!**********************!*\
  !*** ./src/msPac.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass MsPac {\n    constructor(ctx) {\n        this.ctx = ctx;\n        this.radius = 20;\n        this.posX = 100;\n        this.posY = 75;\n        this.speed = 10;\n        this.velX = 0;\n        this.velY = 0;\n\n        this.newPos = function() {\n            this.posX += this.velX;\n            this.posY += this.velY;\n        }\n    }\n\n    draw(ctx) {\n        this.newPos();\n        ctx.fillStyle = \"yellow\";\n        ctx.beginPath();\n        ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);\n        ctx.fill();\n        ctx.stroke()\n    }\n\n    moveLeft() {\n        this.velX = this.velX - 1;\n    }\n\n    moveRight() {\n        this.velX = this.velX + 1;\n    }\n\n    moveUp() {\n        this.velY = this.velY - 1;\n    }\n\n    moveDown() {\n        this.velY = this.velY + 1;\n    }\n\n    moveStop() {\n        this.velX = 0;\n        this.velY = 0;\n    }\n}\n\nmodule.exports = MsPac;\n\n//# sourceURL=webpack:///./src/msPac.js?");

/***/ })

/******/ });