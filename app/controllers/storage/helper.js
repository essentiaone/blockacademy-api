const Busboy = require('busboy')
/**
 * Read file.
 * @param {Object} req
 * @returns {Promise}
 * @private
 * @async
 */
module.exports = function uploader (req) {
  return new Promise(resolve => {
    let busboy = new Busboy({headers: req.headers})
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      resolve(file)
    })
    req.pipe(busboy)
  })
}
