import mongoose  from 'mongoose'
import { dbURI } from '../config/environment.js'

export function connectToDatabase () {
  return mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
}