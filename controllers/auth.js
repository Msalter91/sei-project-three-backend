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
    const createdUser = await User.create({ ...req.body, image: 'https://i.imgur.com/vX6eUuR.png' })
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
    const userToShow = await (await User.findById(userId)).populate('Memory')
    if (!userToShow) {
      throw new NotFound()
    }
    return res.status(200).json(userToShow)
  } catch (err) {
    next(err)
  }
}

// Edit a user 
async function edit (req, res, next) {
  const { userId } = req.params
  try {
    const userToEdit = await User.findById(userId)
    if (!userToEdit) {
      throw new NotFound()
    }

    Object.assign(userToEdit, req.body)
    await userToEdit.save()
    return res.status(202).json(userToEdit)
  } catch (err) {
    next(err)
  }
}

export default {
  register,
  login,
  display,
  edit,
}