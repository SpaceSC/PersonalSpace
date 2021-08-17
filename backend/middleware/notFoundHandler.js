// export one function without name, no need to call it, only to require
module.exports = (req, res, next) => {
  const error = new Error(`Page not found: ${req.originalUrl}`);
  error.status = 404;
  next(error);
};
