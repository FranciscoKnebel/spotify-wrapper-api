(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["spotifyWrapper"] = factory();
	else
		root["spotifyWrapper"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var HEADERS = exports.HEADERS = {
	headers: {
		Authorization: 'Bearer ' + "BQBokid1kIrGkUDfzKaYyK-9P-T2WEVqGfhr4F5RVL7qQ1M46E_oirrlWfP6KEDVCXQZpAntflm1QWSQLvocz7boDB9QnPS5GroFUhBapwzQ2BKH3gfm46Vnuf09JlNxJCVkeIa5v3A6kp5n2vSAgg"
	}
};

var API_URL = exports.API_URL = 'https://api.spotify.com/v1';

exports.default = { HEADERS: HEADERS, API_URL: API_URL };

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var toJSON = exports.toJSON = function toJSON(data) {
  return data.json();
};

exports.default = toJSON;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _search = __webpack_require__(3);

var _album = __webpack_require__(4);

module.exports = {
	search: _search.search,
	searchArtists: _search.searchArtists,
	searchAlbums: _search.searchAlbums,
	searchTracks: _search.searchTracks,
	searchPlaylists: _search.searchPlaylists,
	getAlbum: _album.getAlbum,
	getAlbums: _album.getAlbums,
	getAlbumTracks: _album.getAlbumTracks
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchPlaylists = exports.searchTracks = exports.searchAlbums = exports.searchArtists = exports.search = undefined;

var _config = __webpack_require__(0);

var _utils = __webpack_require__(1);

var search = exports.search = function search(query, type) {
  return fetch(_config.API_URL + '/search?q=' + query + '&type=' + type, _config.HEADERS).then(_utils.toJSON);
};

var searchArtists = exports.searchArtists = function searchArtists(query) {
  return search(query, 'artist');
};
var searchAlbums = exports.searchAlbums = function searchAlbums(query) {
  return search(query, 'album');
};
var searchTracks = exports.searchTracks = function searchTracks(query) {
  return search(query, 'track');
};
var searchPlaylists = exports.searchPlaylists = function searchPlaylists(query) {
  return search(query, 'playlist');
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlbumTracks = exports.getAlbums = exports.getAlbum = undefined;

var _config = __webpack_require__(0);

var _utils = __webpack_require__(1);

var getAlbum = exports.getAlbum = function getAlbum(id) {
  return fetch(_config.API_URL + '/albums/' + id, _config.HEADERS).then(_utils.toJSON);
};

var getAlbums = exports.getAlbums = function getAlbums(ids) {
  return fetch(_config.API_URL + '/albums/?ids=' + ids, _config.HEADERS).then(_utils.toJSON);
};

var getAlbumTracks = exports.getAlbumTracks = function getAlbumTracks(id) {
  return fetch(_config.API_URL + '/albums/' + id + '/tracks', _config.HEADERS).then(_utils.toJSON);
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=spotify-wrapper.umd.js.map