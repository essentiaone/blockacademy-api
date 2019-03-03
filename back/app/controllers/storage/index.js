const ipfsAPI = require('ipfs-http-client')
const ROOT_PATH = process.cwd()
const config = require(ROOT_PATH + '/config/config.json')
console.log(config)
const ipfs = ipfsAPI({host: config.ipfsHost, port: config.ipfsPort, protocol: config.ipfsProtocol})
const uploader = require('./helper')

module.exports = function IPFS() {
  /**
   * upload file to IPFS.
   * @param req
   * @returns {array} path and hash of file
   */
  async function uploadFile(req) {
    let file = await uploader(req)
    let data = await ipfs.add(file)
    return data
  }

  /**
   * Download file from IPFS
   * @param hash
   * @returns {buffer} file
   */
  async function downloadFile(hash) {
    let file = await ipfs.cat(hash)
    return file
  }
  return {
    downloadFile: downloadFile,
    uploadFile: uploadFile
  }
}
