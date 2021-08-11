// export one function without name, no need to call it, only to require
module.exports = (err, req, res, next) => {
  // render the error page
  if(err.status){
    if(process.env.NODE_ENV !== 'test') console.log(err) // don't log when testing
    return res.status(err.status).json({message: err.message})
  }
  console.error(err)
  res.status(500).json({message: 'Internal server error'})
  
}