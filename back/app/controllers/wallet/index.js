const ABI = require('./token.json')
const axios = require('axios')
const ROOT_PATH = process.cwd()
const log = require('./../../logger')
const config = require(ROOT_PATH + '/config/config.json')
const Web3 = require('web3')
const web3 = new Web3(config.ethUrl)

module.exports = function Wallet () {
  /**
   * Get balance by address.
   * @param {string} address
   * @returns {number} balance
   * @async
   */
  async function getBalance(address) {
    // const contract = new web3.eth.Contract(ABI, config.tokenAddress)
    log.info(address)
    address = address.slice(2)
    address = '000000000000000000000000' + address
    const response = await axios.post(config.ethUrl, {
      'jsonrpc': '2.0',
      'method': 'eth_call',
      'params': [{
          'to': config.tokenAddress,
          data: '0x70a08231' + address
        },
        'latest'
      ],
      'id':1,
    },                 {
      headers: {
         'Content-Type': 'application/json',
        }
    })
    log.info(response.data)
    // let response = await contract.methods.balanceOf(address).call()

    return response.data.result
  }

  /**
   * Send signed transaction.
   * @param data - transaction data
   * @returns {Promise<void>} transaction hash
   * @async
   */
  function sendTransaction(data) {
    return new Promise((resolve, reject) => {
      web3.eth.sendSignedTransaction(data)
      .on('transactionHash', (result) => {
        return resolve(result)
      })
      .on('error', (error) => {
        return reject(error)
      })
    })
  }
  /**
   * Get count of transaction (nonce) for address.
   * @param address
   * @returns {Promise<number>} number of transactions
   */
  async function getTransactionCount(address) {
    let response = await axios.post(config.ethUrl, {
      'jsonrpc': '2.0',
      'method': 'eth_getTransactionCount',
      'params': [
        address,
        'latest'
      ],
      'id':1,
    },                 {
      headers: {
         'Content-Type': 'application/json',
        }
    })
    return response.data
    // return web3.eth.getTransactionCount(address, 'pending')
  }

  return {
    getBalance: getBalance,
    getTransactionCount: getTransactionCount,
    sendTransaction: sendTransaction
  }
}
