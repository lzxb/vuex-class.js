import Vue from 'vue'
import Vuex from 'vuex'
import VuexClass from '../../dist/vuex-class.esm'

Vue
  .use(Vuex)

window.describe('vuex class', () => {
  window.it('new vuexClass', () => {
    class Test extends VuexClass {
      constructor (props) {
        super()
        this.namespaced = true
        this.state = {
          count: 0
        }
      }
      set plus (payload) {
        this.state.count++
      }
      get plugText () {
        return `text:${this.state.count}`
      }
      submitPlus () {
        this.plus()
      }
    }
    const store = new Vuex.Store({
      strict: process.env.NODE_ENV !== 'production',
      plugins: [
        VuexClass.init()
      ],
      modules: {
        test: {
          modules: {
            test: new Test()
          }
        }
      }
    })
    console.log(store)
  })
})
