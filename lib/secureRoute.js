import jwt from 'jsonwebtoken'

import { Unauthorized } from './errors.js'
import { jwtSecret } from '../config/environment.js'
import User from '../models/user.js'

export async function secureRoute(req, _res, next) {
  try {
    if (!req.headers.authorization){
      throw new Unauthorized
    }

    // strip Bearer AND ONE SPACE from auth key, leaving only JWT
    const token = req.headers.authorization.replace('Bearer ', '')
    const payload = jwt.verify(token, jwtSecret)
    
    const user = await User.findById(payload.sub)
    if (!user) throw new Unauthorized

    req.currentUser = user

    next()
  } catch (err){
    next(err)
  }
}