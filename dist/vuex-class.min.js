(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VuexClass = factory());
}(this, (function () { 'use strict';

	class VuexClass {}

	return VuexClass;

})));
