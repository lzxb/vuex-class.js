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

const { describe, it, expect } = window

describe('example', () => {
  it('run done', () => {
    expect(one.countText).equals('text:666')
    expect(one.modules.two.text).equals('true')
  })
})
