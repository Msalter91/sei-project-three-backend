import User from '../models/user.js'
import { NotFound } from '../lib/errors.js'

// Cannot use spreading to clear private props, as mongoose objects are complex
const privateDataFields = [
  ['email', ''],
  ['firstName', ''],
  ['surname', '']
]

async function display (req, res, next) { 
  // if route has parameter, target that user, else use token for userId
  const paramId = req?.params?.userId
  const loginId = req?.currentUser?._id
  const targetId = paramId || loginId

  try {
    const userToShow = await User.findById(targetId).populate('Memory')
    if (!userToShow) {
      throw new NotFound()
    }
    if (targetId !== loginId){
      privateDataFields.forEach(field =>{
        userToShow[field[0]] = field[1]
      })
    } 

    console.log('User:',loginId, 'requested user data for:', targetId, '\nsending:\n', userToShow)
    return res.status(200).json(userToShow)
  } catch (err) {
    next(err)
  }
}

// Edit a user 
async function edit (req, res, next) {
  const userId = req.params.userId || req.currentUser._id
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
  display,
  edit,
}