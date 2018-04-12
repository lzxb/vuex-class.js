'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
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

var _extends = Object.assign || function (target) {
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

var _actionName = '_[vuex-class]_bind_class';

var isFunction = function isFunction(any) {
  return typeof any === 'function';
};

var getPrototypes = function getPrototypes(obj) {
  var prototypes = [];
  var current = obj;
  while (current !== VuexClass.prototype) {
    current = Object.getPrototypeOf(current);
    prototypes.push(current);
  }
  return prototypes;
};

var getDescriptors = function getDescriptors(prototypes) {
  var descriptors = {};
  var i = prototypes.length;
  while (i--) {
    var prototype = prototypes[i];
    _extends(descriptors, Object.getOwnPropertyDescriptors(prototype));
  }
  return descriptors;
};

var throwError = function throwError(msg) {
  throw new Error('[vuex-class] ' + msg);
};

var VuexClass = function VuexClass() {
  var _this = this;

  classCallCheck(this, VuexClass);

  var descriptors = getDescriptors(getPrototypes(this));
  this.state = {};
  this.getters = {};
  this.mutations = {};
  this.actions = {};
  var _context = null;
  Object.defineProperty(this, 'context', {
    get: function get$$1() {
      if (!_context) {
        throwError('Please call the \'new Vuex.store({ plusins: [ VuexClass.init() ] })\' method');
      }
      return _context;
    },
    set: function set$$1(context) {
      _context = context;
    }
  });
  Object.keys(descriptors).forEach(function (name) {
    if (name === 'constructor') return;
    var descriptor = descriptors[name];
    var newDescriptor = {};

    // vuex getters
    if (isFunction(descriptor.get)) {
      newDescriptor.get = function () {
        return _this.context.getters[name];
      };
      _this.getters[name] = function () {
        return descriptor.get.call(_this);
      };
    }

    // vuex mutations
    if (isFunction(descriptor.set)) {
      newDescriptor.set = function (payload) {
        return _this.context.commit(name, payload);
      };
      _this.mutations[name] = function (state, payload) {
        return descriptor.set.call(_this, payload);
      };
      if (!isFunction(descriptor.get)) {
        newDescriptor.get = function () {
          return function (payload) {
            return _this.context.commit(name, payload);
          };
        };
      }
    }

    // vuex actions
    if (isFunction(descriptor.value)) {
      newDescriptor.value = function (payload) {
        return _this.context.dispatch(name, payload);
      };
      _this.actions[name] = function (context, payload) {
        return descriptor.value.call(_this, payload);
      };
    }
    Object.defineProperty(_this, name, newDescriptor);
  });

  _extends(this.actions, defineProperty({}, _actionName, {
    root: true,
    handler: function handler(context) {
      var isBind = !!_context;
      _this.context = context;
      if (isBind) return;
      Object.defineProperty(_this, 'state', {
        get: function get$$1() {
          return _this.context.state;
        },
        set: function set$$1() {
          throwError('You should not update the module state directly');
        }
      });
    }
  }));
};


VuexClass.init = function init() {
  return function (store) {
    VuexClass.bindClass(store);
    store.subscribe(function (mutation) {
      VuexClass.bindClass(store);
    });
  };
};

VuexClass.bindClass = function bindClass(store) {
  store.dispatch(_actionName);
};

module.exports = VuexClass;
