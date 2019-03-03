import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const ethUtil = require('ethereumjs-util')
import ethTx from 'ethereumjs-tx'
import BigNumber from 'bignumber.js'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        privateKey: null,
        address: null,
        balance: 0,
        fileName: null,
        filePath: null,
    },
    mutations: {
        ADD_BALANCE(state, balance) {
          state.balance = balance
        },
        SET_ADDRESS(state, address) {
            state.address = address
        },
        SET_TX_COUNT(state, count) {
            state.txCount = count
        },
        SET_FILE_PATH(state, path) {
            state.filePath = path
        },
        SET_FILE_NAME(state, name) {
            state.fileName = name
        }
    },
    actions: {
        async setFileName({ commit }, fileName) {
            commit('SET_FILE_NAME', fileName)
        },
        async getBalance({commit, state}, address) {
            let resposnse = await axios.post('http://localhost:3000/getBalance',
                { "address": address || state.address },
                {
                     headers: {
                        'Content-Type':'application/json'
                    }
                }
            )
            let balance = parseInt(resposnse.data.result)
            let ethBalance = new BigNumber(balance).multipliedBy(Math.pow(10, -18))
            commit('ADD_BALANCE', ethBalance)
        },
        generateAddress ({ commit, state }, privateKey) {
            privateKey = privateKey ? Buffer.from(privateKey, 'hex') : Buffer.from(state.privateKey, 'hex')
            let addressBuffer = ethUtil.privateToAddress(privateKey)
            let hexAddress = addressBuffer.toString('hex')
            let checksumAddress = ethUtil.toChecksumAddress(hexAddress)
            let address = ethUtil.addHexPrefix(checksumAddress)
            commit('SET_ADDRESS', address)
            return address
        },
        async getTransactionCount({ commit, state }, address) {
            let response = await axios.post('http://localhost:3000/getTransactionCount',
                { "address": address || state.address },
                {
                    headers: {
                        'Content-Type':'application/json'
                    }
                }
            )
            commit('SET_TX_COUNT', response.data.result.result)
            return response.data.result.result
        },
        async generateTransaction({ state }) {
            let txCount = await this.dispatch('getTransactionCount')
            let txRawData = await this.dispatch('composeData', txCount)
            let txString = await this.dispatch('getSignedTxData', txRawData)
            await this.dispatch('sendTransaction', txString)
        },
        composeData ({state}, count) {
            let data = {}
            data.nonce = state.txCount
            data.gasPrice = '0x' + new BigNumber(15000000000).toString(16)
            data.gasLimit = '0x' + new BigNumber(500000).toString(16)
            data.value = '0x' + new BigNumber(1).multipliedBy(Math.pow(10, 18)).toString(16)
            data.to = '0xcCC8a2766A8bE10342Bbe7d8f39AaB54f0C6EAb6'
            return data
        },
        getSignedTxData({ state }, rawTx) {
            let eTx = new ethTx(rawTx)
    
            eTx.sign(new Buffer(state.privateKey.toString('hex'), 'hex'))
            rawTx.rawTx = JSON.stringify(rawTx)
            return '0x' + eTx.serialize().toString('hex')
        },
        async sendTransaction({state}, data) {
            let response = await axios.post('http://localhost:3000/sendTransaction', 
            {data: data},
            {
                headers: {
                    'Content-type': 'application/json'
                }
            })
            console.log(response)
        },
        async uploadFile({ commit, state }, file) {
            let response = await axios.post('http://localhost:3000/uploadFile',
            file,
            {
                headers: {
                    'Content-type': `multipart/form-data`
                }
            }
            )
            commit('SET_FILE_PATH', response.data.result[0].path)
            return response.data.result[0].path
        },
        async downloadFile({ commit, state }) {
            let response = await axios.post('http://localhost:3000/downloadFile', {
                hash: state.filePath,
            }, {
                headers: {
                    'Content-type': 'application/json'
                }
            })
            return response.data
        }
    }

    })
export { store }