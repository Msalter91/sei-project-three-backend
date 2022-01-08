import User from '../models/user.js'

import jwt from 'jsonwebtoken'
import { jwtSecret } from '../config/environment.js'
import { Unauthorized, NotFound } from '../lib/errors.js'

async function register(req, res, next) {
  try { 
    if ((req.body.displayName).toLowerCase().includes('admin')){
      throw new Unauthorized
    }
    
    console.log('registering user:', req.body.displayName)
    const createdUser = await User.create(req.body)
    return res.status(201).json({
      message: `Welcome ${createdUser.displayName}`,
    })
  } catch (err) {
    next(err)
  }
}

async function login (req, res, next) {
  try {
    if (!req.body.password) throw new Unauthorized()

    const user = await User.findOne( {
      email: req.body.email })
    if (!user || !user.validatePassword(req.body.password)) {
      throw new Unauthorized()
    }

    const token = jwt.sign(
      { sub: user._id },
      jwtSecret,
      { expiresIn: '24 hours' } 
    )

    return res.status(202).json( { message: 'welcome back', token })
  } catch (err) {
    next(err)
  }
}

async function display (req, res, next) {
  const { userId } = req.params 
  try {
    const userToShow = await User.findById(userId)
    if (!userToShow) {
      throw new NotFound()
    }
    return res.status(200).json(userToShow)
  } catch (err) {
    next(err)
  }
}

export default {
  register,
  login,
  display,
}