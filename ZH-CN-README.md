## vuex-class.js
[![Coverage Status](https://coveralls.io/repos/github/lzxb/vuex-class.js/badge.svg?branch=master)](https://coveralls.io/github/lzxb/vuex-class.js?branch=master)
[![Build Status](https://travis-ci.org/lzxb/vuex-class.js.svg?branch=master)](https://travis-ci.org/lzxb/vuex-class.js)
[![npm](https://img.shields.io/npm/v/vuex-class.js.svg)](https://www.npmjs.com/package/vuex-class.js) 
[![npm](https://img.shields.io/npm/dm/vuex-class.js.svg)](https://www.npmjs.com/package/vuex-class.js)
[![npm](https://img.shields.io/npm/dt/vuex-class.js.svg)](https://www.npmjs.com/package/vuex-class.js)

使用ES6 class来编写vuex模块，使得代码更易于维护和拓展

### 安装
```bash
npm install vuex-class.js --save
```


### 文档
- [English](./README.md)
- [中文](./ZH-CN-README.md)


### 使用
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
    // 注意：子模块是没有 plugins 选项的
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
      // 两种提交 mutation 的方法
      // 1、直接赋值
      // this.setCount = 1000
      // 2、调用方法，注意：如果 class 上面有了 get setCount 属性的话，则不会存在此方法
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
  创建store实例的时候调用

  ```javascript

    const store = new Vuex.Store({
      // ...
      plugins: [
        VuexClass.init()
      ]
    })

  ```

- `VuexClass.bindClass`  
  替换 store 的根状态时，需要重新绑定 class
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
