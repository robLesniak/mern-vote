module.exports = {
  ...require('./auth'),
  notFound: (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  },
  errors: (err, req, res, next) => {
    res.status(err.status || 500).json({
      err: err.message || 'Something went wrong'
    })
  },
  
}
