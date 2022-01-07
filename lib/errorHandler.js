export default function errorHandler (err, req, res, next) {
  if (err.name === 'CastError' || err.name === 'NotFound') {
    return res.status(404).json({ message: 'Cannot find that' })
  }

  if (
    err.name === 'Unauthorized' ||
    err.name === 'JsonWebTokenError' ||
    err.name === 'TokenExpiredError'
  ){
    return res.status(401).json({ message: 'Unauthorized' })
  }

  if (err.name === 'ValidationError') {
    const customErrors = {} 

    for (const key in err.errors) {
      customErrors[key] = err.errors[key].message
    }
    return res.status(422).json({ 
      message: 'Invalid data', 
      errors: customErrors, 
    })
  }
  next(err)
}
