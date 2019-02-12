module.exports.catch = (app) => {
  // catch 404 errors
  app.use((req, res) => {
    res.status(404).send('Not Found')
  })
  // catch 500 errors
  app.use((err, req, res, next) => {
    if (err) {
      console.log(err)
      res.status(500).send('Internal Server Error')
    }
    next()
  })
}
