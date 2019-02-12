// init dependencies
const path = require('path')
const moment = require('moment')
const SimpleLogger = require('simple-node-logger')

// create new logger instance
const manager = new SimpleLogger({
  errorEventName: 'error'
})
// create adapter according to node environment
if (process.env.APP_ENV === 'production') {
  manager.createFileAppender({
    logFilePath: path.resolve(`logs/${moment().format('YYYY-MM-DD')}.log`)
  })
} else {
  manager.createConsoleAppender()
}
// create logger
const log = manager.createLogger()
// export logging function
module.exports = log
