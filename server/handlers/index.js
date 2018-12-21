module.exports = {
  ...require('./auth'),
  notFound: (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  },
  errors: (err, req, res, next) => {
    res.status(err.status || 400).json({
      err: err.message || 'Something went wrong'
    })
  },
  
}
