import { Unauthorized } from './errors.js'

export async function secureRoute(req, _res, next) {
  try {
    if (!req.header.authorization){
      throw new Unauthorized
    }
  } catch (err){
    next(err)
  }
}