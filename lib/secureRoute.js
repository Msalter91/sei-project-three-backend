import { Unauthorized } from './errors.js'

export async function secureRoute(req, _res, next) {
  try {
    if (!req.headers.authorization){
      throw new Unauthorized
    }

    next()
  } catch (err){
    next(err)
  }
}