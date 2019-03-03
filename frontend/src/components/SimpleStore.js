import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        privateKey: null,
        balance: 0,
        fileName: null
    },
    mutations: {
        ADD_BALANCE(state, balance) {
          state.balance = balance
        }
    },
    actions: {
        getBalance({commit}, address) {
            axios.post('http://localhost:3000/getBalance',
                { "address": address },
                { headers: {
                    'Content-Type':'application/json'}
                    }
            )
            .then(function (response) {
                commit("ADD_BALANCE", response.data.result)
            }).catch(function (exception) {
                console.log(exception)
            })
        }
    }

    })
export { store }