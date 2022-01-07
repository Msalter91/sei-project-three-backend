import { Unauthorized } from '../lib/errors.js'

export function checkAccessRights(object, user) {
  if (
    !(object.addedBy.equals(user._id) || 
      user.displayName === 'admin')
  ){
    throw new Unauthorized()
  }
  return true
}