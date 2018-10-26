
## 此项目除了正常的bug修复，不再进行功能更新
如果对状态管理感兴趣，可以看下 [Tms](https://github.com/FollowmeTech/tms)，文档更齐全

## vuex-class.js
[![Coverage Status](https://coveralls.io/repos/github/lzxb/vuex-class.js/badge.svg?branch=master)](https://coveralls.io/github/lzxb/vuex-class.js?branch=master)
[![Build Status](https://travis-ci.org/lzxb/vuex-class.js.svg?branch=master)](https://travis-ci.org/lzxb/vuex-class.js)
[![npm](https://img.shields.io/npm/v/vuex-class.js.svg)](https://www.npmjs.com/package/vuex-class.js) 
[![npm](https://img.shields.io/npm/dm/vuex-class.js.svg)](https://www.npmjs.com/package/vuex-class.js)
[![npm](https://img.shields.io/npm/dt/vuex-class.js.svg)](https://www.npmjs.com/package/vuex-class.js)

Use es6 class to write the vuex module, making the code easier to maintain and expand.


### Installing
```bash
npm install vuex-class.js --save
```


### Document
- [English](./README.md)
- [中文](./ZH-CN-README.md)


### Example
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import VuexClass from 'vuex-class.js'

Vue
  .use(VuexClass)
  .use(Vuex)

class One extends VuexClass {
  constructor () {
    super()
    this.strict = process.env.NODE_ENV !== 'production'
    this.state = {
      count: 0
    }
    // Note: the sub module has no plugins option
    this.plugins = [
      VuexClass.init()
    ]
    this.modules = {
      two: new Two()
    }
  }
  // mutations
  set setCount (count) {
    this.state.count = count
  }
  // getters
  get countText () {
    return `text:${this.state.count}`
  }
  // actions
  clickCount () {
    setTimeout(() => {
      // Two methods to submit mutation
      // 1、Direct assignment
      // this.setCount = 1000
      // 2、Call method, note: if there is a get setCount attribute on class, this method does not exist.
      // this.setCount(1000)
    })
  }
}

class Two extends VuexClass {
  constructor () {
    super()
    this.state = {
      isBtn: false
    }
    this.modules = {
      three: new Three()
    }
    this.namespaced = true
  }
  set switchBtn (payload) {
    this.state.isBtn = !this.state.isBtn
  }
  get text () {
    return this.state.isBtn ? 'true' : 'false'
  }
}

class Three extends VuexClass {
  constructor () {
    super()
    this.state = {}
    this.namespaced = true
    // ...
  }
}

const one = new One()
const store = new Vuex.Store(one)

console.log(one.countText) // 'text:0'
console.log(one.modules.two.text) // 'false'

one.setCount = 666
one.modules.two.switchBtn()
console.log(one.countText) // 'text:666'
console.log(one.modules.two.text) // 'true'

const vm = new Vue({
  store,
  vuexClass: one,
  mapVuexClasses: { // Join the class in the component
    one: '',
    two: 'two',
    three: 'two/three'
  }
})

console.log(vm.one === one) // true
console.log(vm.two === one.modules.two) // true
console.log(vm.three === one.modules.two.modules.three) // true

```


### API
- `VuexClass.init()`   
  When the store instance is created, the call

  ```javascript

    const store = new Vuex.Store({
      // ...
      plugins: [
        VuexClass.init()
      ]
    })

  ```

- `VuexClass.bindClass(new Vuex.Store())`  
  When replacing the root state of store, we need to re bind class.
  ```javascript

    const store = new Vuex.Store({
      // ...
      state: {
        // ...
      },
      plugins: [
        VuexClass.init()
      ]
    })
    store.replaceState({
      // ...
    })
  store.replaceState()
  VuexClass.bindClass(store)

  ```

- `VuexClass.mapVuexClasses(new VuexClass(), { ... })`  
  The 0.0.6 version is added to find the module and its sub modules, and return the relevant class.     
  ```javascript
    const classes = VuexClass.mapVuexClasses(one, {
      one: '',
      two: 'two',
      three: 'two/three'
    })

    console.log(classes.one === one) // true
    console.log(classes.two === one.modules.two) // true
    console.log(classes.three === one.modules.two.modules.three) // true
  ```

### License
MIT
