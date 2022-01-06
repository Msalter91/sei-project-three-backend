import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'


const userSchema = new mongoose.Schema({
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String },
  surname: { type: String },
  password: { type: String, required: true },
  image: { type: String, required: true, default: 'URL for blank display pic goes here' },
})

userSchema
  .virtual('passwordConfirmation')
  .set(function (passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation
  })

userSchema.set('toJSON', {
  transform(_doc, json) {
    delete json.password
    return json
  },
})

userSchema
  .pre('validate', function(next) {
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'does not match')
    }
    next()
  })

userSchema.pre('validate', function (next) {
  if (this.isModified('password') && 
      this.password !== this._passwordConfirmation) {
    this.invalidate('passwordConfirmation', 'Passwords don\'t match ')
  }
  next()
})

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  }
  next()
})

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('User', userSchema)