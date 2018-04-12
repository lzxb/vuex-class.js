const _actionName = '_[vuex-class]_bind_class'

const isFunction = (any) => {
  return typeof any === 'function'
}

const getPrototypes = (obj) => {
  const prototypes = []
  let current = obj
  while (current !== VuexClass.prototype) {
    current = Object.getPrototypeOf(current)
    prototypes.push(current)
  }
  return prototypes
}

const getDescriptors = (prototypes) => {
  const descriptors = {}
  let i = prototypes.length
  while (i--) {
    const prototype = prototypes[i]
    Object.assign(descriptors, Object.getOwnPropertyDescriptors(prototype))
  }
  return descriptors
}

const throwError = (msg) => {
  throw new Error(`[vuex-class] ${msg}`)
}

export default class VuexClass {
  constructor () {
    const descriptors = getDescriptors(getPrototypes(this))
    this.state = {}
    this.getters = {}
    this.mutations = {}
    this.actions = {}
    let _context = null
    Object.defineProperty(this, 'context', {
      get () {
        if (!_context) {
          throwError(`Please call the 'new Vuex.store({ plusins: [ VuexClass.init() ] })' method`)
        }
        return _context
      },
      set (context) {
        _context = context
      }
    })
    Object.keys(descriptors).forEach(name => {
      if (name === 'constructor') return
      const descriptor = descriptors[name]
      const newDescriptor = {}

      // vuex getters
      if (isFunction(descriptor.get)) {
        newDescriptor.get = () => {
          return this.context.getters[name]
        }
        this.getters[name] = () => {
          return descriptor.get.call(this)
        }
      }

      // vuex mutations
      if (isFunction(descriptor.set)) {
        newDescriptor.set = (payload) => {
          return this.context.commit(name, payload)
        }
        this.mutations[name] = (state, payload) => {
          return descriptor.set.call(this, payload)
        }
        if (!isFunction(descriptor.get)) {
          newDescriptor.get = () => {
            return (payload) => {
              return this.context.commit(name, payload)
            }
          }
        }
      }

      // vuex actions
      if (isFunction(descriptor.value)) {
        newDescriptor.value = (payload) => {
          return this.context.dispatch(name, payload)
        }
        this.actions[name] = (context, payload) => {
          return descriptor.value.call(this, payload)
        }
      }
      Object.defineProperty(this, name, newDescriptor)
    })

    Object.assign(this.actions, {
      [_actionName]: {
        root: true,
        handler: (context) => {
          const isBind = !!_context
          this.context = context
          if (isBind) return
          Object.defineProperty(this, 'state', {
            get: () => {
              return this.context.state
            },
            set () {
              throwError('You should not update the module state directly')
            }
          })
        }
      }
    })
  }
}

VuexClass.init = function init () {
  return (store) => {
    VuexClass.bindClass(store)
    store.subscribe(mutation => {
      VuexClass.bindClass(store)
    })
  }
}

VuexClass.bindClass = function bindClass (store) {
  store.dispatch(_actionName)
}
