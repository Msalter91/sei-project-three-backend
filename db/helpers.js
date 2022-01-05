import mongoose  from 'mongoose'
import { dbURI } from '../config/environment.js'

export function connectToDatabase () {
  return mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
}

export function truncateDb() {
  return mongoose.connection.db.dropDatabase()
}
export function disconnectDb() {
  if (mongoose.connection.readyState !== 0) {
    return mongoose.disconnect()
  }
}