import Vue from 'vue'
import Vuex from 'vuex'
import istanbul from 'istanbul-lib-coverage'
import VuexClass from '../../src/index'

Vue
  .use(Vuex)

const { describe, it, expect } = window

describe('vuex class', () => {
  it('vuex class update', () => {
    const mutations = []
    class MyVuexClass extends VuexClass {
      constructor () {
        super()
        this.strict = true
        this.plugins = [
          VuexClass.init(),
          (store) => {
            store.subscribe((mutation) => {
              mutations.push(mutation)
            })
          }
        ]
        this.state = {
          count: 0,
          value: ''
        }
      }
      set plus (payload) {
        this.state.count++
      }
      set setCount (count) {
        this.state.count = count
      }
      get value () {
        return this.state.value
      }
      set value (value) {
        this.state.value = value
      }
      get text () {
        return `text:${this.state.count}`
      }
      clickPlus () {
        this.plus()
      }
      setValue (value) {
        this.value = value
      }
    }
    const myVuexClass = new MyVuexClass()
    const store = new Vuex.Store(myVuexClass)

    // count
    expect(store.state.count).equals(0)
    expect(store.getters.text).equals('text:0')
    expect(myVuexClass.state.count).equals(0)
    expect(myVuexClass.text).equals('text:0')
    expect(myVuexClass.state).equals(store.state)

    myVuexClass.clickPlus()
    expect(store.state.count).equals(1)
    expect(store.getters.text).equals('text:1')
    expect(myVuexClass.state.count).equals(1)
    expect(myVuexClass.text).equals('text:1')
    expect(myVuexClass.state).equals(store.state)

    myVuexClass.plus = 9999
    expect(store.state.count).equals(2)
    expect(store.getters.text).equals('text:2')
    expect(myVuexClass.state.count).equals(2)
    expect(myVuexClass.text).equals('text:2')
    expect(myVuexClass.state).equals(store.state)

    myVuexClass.setCount = 1000
    expect(store.state.count).equals(1000)
    expect(store.getters.text).equals('text:1000')
    expect(myVuexClass.state.count).equals(1000)
    expect(myVuexClass.text).equals('text:1000')
    expect(myVuexClass.state).equals(store.state)

    // value
    expect(store.state.value).equals('')
    expect(store.getters.value).equals('')
    expect(myVuexClass.state.value).equals('')
    expect(myVuexClass.value).equals('')

    myVuexClass.value = 'value'
    expect(store.state.value).equals('value')
    expect(store.getters.value).equals('value')
    expect(myVuexClass.state.value).equals('value')
    expect(myVuexClass.value).equals('value')

    myVuexClass.setValue('setValue')
    expect(store.state.value).equals('setValue')
    expect(store.getters.value).equals('setValue')
    expect(myVuexClass.state.value).equals('setValue')
    expect(myVuexClass.value).equals('setValue')

    expect(mutations).to.deep.equal([
      {
        'type': 'plus',
        payload: undefined
      },
      {
        'type': 'plus',
        'payload': 9999
      },
      {
        'type': 'setCount',
        'payload': 1000
      },
      {
        'type': 'value',
        'payload': 'value'
      },
      {
        'type': 'value',
        'payload': 'setValue'
      }
    ])
  })

  it('vuex update', () => {
    const mutations = []
    class MyVuexClass extends VuexClass {
      constructor () {
        super()
        this.strict = true
        this.plugins = [
          VuexClass.init(),
          (store) => {
            store.subscribe((mutation) => {
              mutations.push(mutation)
            })
          }
        ]
        this.state = {
          count: 0,
          value: ''
        }
      }
      set plus (payload) {
        this.state.count++
      }
      set setCount (count) {
        this.state.count = count
      }
      get value () {
        return this.state.value
      }
      set value (value) {
        this.state.value = value
      }
      get text () {
        return `text:${this.state.count}`
      }
      clickPlus () {
        this.plus()
      }
      setValue (value) {
        this.value = value
      }
    }
    const myVuexClass = new MyVuexClass()
    const store = new Vuex.Store(myVuexClass)

    // count
    expect(store.state.count).equals(0)
    expect(store.getters.text).equals('text:0')
    expect(myVuexClass.state.count).equals(0)
    expect(myVuexClass.text).equals('text:0')
    expect(myVuexClass.state).equals(store.state)

    store.dispatch('clickPlus')
    expect(store.state.count).equals(1)
    expect(store.getters.text).equals('text:1')
    expect(myVuexClass.state.count).equals(1)
    expect(myVuexClass.text).equals('text:1')
    expect(myVuexClass.state).equals(store.state)

    store.commit('plus', 9999)
    expect(store.state.count).equals(2)
    expect(store.getters.text).equals('text:2')
    expect(myVuexClass.state.count).equals(2)
    expect(myVuexClass.text).equals('text:2')
    expect(myVuexClass.state).equals(store.state)

    store.commit('setCount', 1000)
    expect(store.state.count).equals(1000)
    expect(store.getters.text).equals('text:1000')
    expect(myVuexClass.state.count).equals(1000)
    expect(myVuexClass.text).equals('text:1000')
    expect(myVuexClass.state).equals(store.state)

    // value
    expect(store.state.value).equals('')
    expect(store.getters.value).equals('')
    expect(myVuexClass.state.value).equals('')
    expect(myVuexClass.value).equals('')

    store.commit('value', 'value')
    expect(store.state.value).equals('value')
    expect(store.getters.value).equals('value')
    expect(myVuexClass.state.value).equals('value')
    expect(myVuexClass.value).equals('value')

    store.dispatch('setValue', 'setValue')
    expect(store.state.value).equals('setValue')
    expect(store.getters.value).equals('setValue')
    expect(myVuexClass.state.value).equals('setValue')
    expect(myVuexClass.value).equals('setValue')

    expect(mutations).to.deep.equal([
      {
        'type': 'plus',
        payload: undefined
      },
      {
        'type': 'plus',
        'payload': 9999
      },
      {
        'type': 'setCount',
        'payload': 1000
      },
      {
        'type': 'value',
        'payload': 'value'
      },
      {
        'type': 'value',
        'payload': 'setValue'
      }
    ])
  })

  it('vuex replaceState', () => {
    const mutations = []
    class MyVuexClass extends VuexClass {
      constructor () {
        super()
        this.strict = true
        this.plugins = [
          VuexClass.init(),
          (store) => {
            store.subscribe((mutation) => {
              mutations.push(mutation)
            })
          }
        ]
        this.state = {
          count: 0,
          value: ''
        }
      }
      set plus (payload) {
        this.state.count++
      }
      set setCount (count) {
        this.state.count = count
      }
      get value () {
        return this.state.value
      }
      set value (value) {
        this.state.value = value
      }
      get text () {
        return `text:${this.state.count}`
      }
      clickPlus () {
        this.plus()
      }
      setValue (value) {
        this.value = value
      }
    }
    const myVuexClass = new MyVuexClass()
    const store = new Vuex.Store(myVuexClass)

    store.replaceState({
      count: 0,
      value: ''
    })
    VuexClass.bindClass(store)
    // count
    expect(store.state.count).equals(0)
    expect(store.getters.text).equals('text:0')
    expect(myVuexClass.state.count).equals(0)
    expect(myVuexClass.text).equals('text:0')
    expect(myVuexClass.state).equals(store.state)

    store.dispatch('clickPlus')
    expect(store.state.count).equals(1)
    expect(store.getters.text).equals('text:1')
    expect(myVuexClass.state.count).equals(1)
    expect(myVuexClass.text).equals('text:1')
    expect(myVuexClass.state).equals(store.state)

    store.commit('plus', 9999)
    expect(store.state.count).equals(2)
    expect(store.getters.text).equals('text:2')
    expect(myVuexClass.state.count).equals(2)
    expect(myVuexClass.text).equals('text:2')
    expect(myVuexClass.state).equals(store.state)

    store.commit('setCount', 1000)
    expect(store.state.count).equals(1000)
    expect(store.getters.text).equals('text:1000')
    expect(myVuexClass.state.count).equals(1000)
    expect(myVuexClass.text).equals('text:1000')
    expect(myVuexClass.state).equals(store.state)

    // value
    expect(store.state.value).equals('')
    expect(store.getters.value).equals('')
    expect(myVuexClass.state.value).equals('')
    expect(myVuexClass.value).equals('')

    store.commit('value', 'value')
    expect(store.state.value).equals('value')
    expect(store.getters.value).equals('value')
    expect(myVuexClass.state.value).equals('value')
    expect(myVuexClass.value).equals('value')

    store.dispatch('setValue', 'setValue')
    expect(store.state.value).equals('setValue')
    expect(store.getters.value).equals('setValue')
    expect(myVuexClass.state.value).equals('setValue')
    expect(myVuexClass.value).equals('setValue')

    expect(mutations).to.deep.equal([
      {
        'type': 'plus',
        payload: undefined
      },
      {
        'type': 'plus',
        'payload': 9999
      },
      {
        'type': 'setCount',
        'payload': 1000
      },
      {
        'type': 'value',
        'payload': 'value'
      },
      {
        'type': 'value',
        'payload': 'setValue'
      }
    ])
  })

  it('errors', () => {
    class MyVuexClass extends VuexClass {
      constructor () {
        super()
        this.state = {
          count: 0
        }
        this.plugins = [VuexClass.init()]
      }
    }
    const myVuexClass = new MyVuexClass()
    let errors = []
    try {
      console.log(myVuexClass.context)
    } catch (e) {
      errors.push(e.toString())
    }
    const store = new Vuex.Store(myVuexClass)
    try {
      myVuexClass.state = {}
    } catch (e) {
      errors.push(e.toString())
    }

    expect(errors).to.deep.equal([
      `Error: [vuex-class] Please call the 'new Vuex.store({ plusins: [ VuexClass.init() ] })' method`,
      `Error: [vuex-class] You should not update the module state directly`
    ])
    expect(store.state.count).equals(0)

    const map = istanbul.createCoverageMap({})

    const coverage = window.__coverage__
    if (coverage) {
      map.merge(coverage)
    }
    window.cy
      .writeFile('.nyc_output/out.json', JSON.stringify(map), { log: false })
  })
})
