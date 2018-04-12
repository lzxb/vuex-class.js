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
  .use(Vuex)

class MyStoreRoot extends VuexClass {
  constructor () {
    super()
    this.strict = process.env.NODE_ENV !== 'production'
    this.state = {
      count: 0
    }
    // Note: the submodule does not have the bugins option
    this.plugins = [
      VuexClass.init()
    ]
    this.modules = {
      chlid: new Chlid()
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

class Chlid extends VuexClass {
  constructor () {
    super()
    this.state = {
      isBtn: false
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

const myStoreRoot = new MyStoreRoot()
const store = new Vuex.Store(myStoreRoot)

console.log(myStoreRoot.countText) // text:0
console.log(myStoreRoot.modules.chlid.text) // false

myStoreRoot.setCount = 666
myStoreRoot.modules.chlid.switchBtn()
console.log(myStoreRoot.countText) // text:666
console.log(myStoreRoot.modules.chlid.text) // true

```


### API
- `VuexClass.init`   
  When the store instance is created, the call

  ```javascript

    const store = new Vuex.Store({
      // ...
      plugins: [
        VuexClass.init()
      ]
    })

  ```

- `VuexClass.bindClass`   
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


### License
MIT
