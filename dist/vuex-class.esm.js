const _actionName = '_[vuex-class]_init';

const isFunction = (any) => {
  return typeof any === 'function'
};

const getPrototypes = (obj) => {
  const prototypes = [];
  let current = obj;
  while (current !== VuexClass.prototype) {
    current = Object.getPrototypeOf(current);
    prototypes.push(current);
  }
  return prototypes
};

const getDescriptors = (prototypes) => {
  const descriptors = {};
  let i = prototypes.length;
  while (i--) {
    const prototype = prototypes[i];
    Object.assign(descriptors, Object.getOwnPropertyDescriptors(prototype));
  }
  return descriptors
};

class VuexClass {
  constructor () {
    const descriptors = getDescriptors(getPrototypes(this));

    this.context = null;
    this.state = {};
    this.getters = {};
    this.mutations = {};
    this.actions = {};
    Object.keys(descriptors).forEach(name => {
      if (name === 'constructor') return
      const descriptor = descriptors[name];
      const newDescriptor = {};

      // vuex getters
      if (isFunction(descriptor.get)) {
        newDescriptor.get = () => {
          return this.context.getters[name]
        };
        this.getters[name] = () => {
          return descriptor.get.call(this)
        };
      }

      // vuex mutations
      if (isFunction(descriptor.set)) {
        newDescriptor.set = (payload) => {
          return this.context.commit(name, payload)
        };
        this.mutations[name] = (state, payload) => {
          return descriptor.set.call(this, payload)
        };
        if (!isFunction(descriptor.get)) {
          newDescriptor.get = () => {
            return (payload) => {
              return this.context.commit(name, payload)
            }
          };
        }
      }

      // vuex actions
      if (isFunction(descriptor.value)) {
        newDescriptor.value = (payload) => {
          return this.context.dispatch(name, payload)
        };
        this.actions[name] = (context, payload) => {
          return descriptor.value.call(this, payload)
        };
      }
      Object.defineProperty(this, name, newDescriptor);
    });

    this.actions[_actionName] = (context) => {
      if (this.context) return
      this.context = context;
    };
    Object.assign(this.actions, {
      [_actionName]: {
        root: true,
        handler: (context) => {
          this.context = context;
        }
      }
    });
  }
}

VuexClass.init = function init () {
  return store => {
    store.dispatch(_actionName);
  }
};

export default VuexClass;
