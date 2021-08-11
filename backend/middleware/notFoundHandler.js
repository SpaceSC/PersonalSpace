// export one function without name, no need to call it, only to require
module.exports = (req, res, next) => {
  // render the error page
  next(res.status(404).json({message: 'Page not found'}));
}