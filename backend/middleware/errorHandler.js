// export one function without name, no need to call it, only to require
module.exports = (err, req, res, next) => {
  // render the error page
  res.status(err.status || 500)
  console.error(err)
  res.json({message: 'Internal server error'})
}