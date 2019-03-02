const { Router } = require('express')
const Wallet = require('../controllers/wallet')
const IPFS = require('../controllers/storage')
const router = Router()
const wallet = Wallet()
const ipfs = IPFS()

router.post('/getBalance', async (req, res, next) => {
  try {
    if (!req.body.address)
      throw Error('Address is important')
    let balance = await wallet.getBalance(req.body.address)
    res.send({ result: balance })
  } catch (e) {
    res.status(400).send({
      error: e.message
    })
  }
})

router.post('/sendTransaction', async (req, res, next) => {
  try {
    if (!req.body.data)
      throw Error('Data is important')
    let info = await wallet.sendTransaction(req.body.data)
    res.send({ result: info })
  } catch (e) {
    res.status(400).send({
      error: e.message
    })
  }
})
router.post('/getTransactionCount', async (req, res, next) => {
  try {
    if (!req.body.address)
      throw Error('Address is important')
    let transactionCount = await wallet.getTransactionCount(req.body.address)
    res.send({ result: transactionCount })
  } catch (e) {
    res.status(400).send({
      error: e.message
    })
  }
})

router.post('/uploadFile', async (req, res, next) => {
  try {
    let blockInfo = await ipfs.uploadFile(req)
    res.send({ result: blockInfo })
  } catch (e) {
    res.status(400).send({
      error: e.message
    })
  }
})

router.post('/downloadFile', async (req, res, next) => {
  try {
    let blockInfo = await ipfs.downloadFile(req.body.hash)
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded')
    res.setHeader('Content-Disposition', 'attachment; filename=', req.body.filename)
    res.send(blockInfo)
  } catch (e) {
    res.status(400).send({
      error: e.message
    })
  }
})

module.exports = router
