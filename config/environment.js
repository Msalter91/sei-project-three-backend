
import dotenv from 'dotenv'
dotenv.config()

export const dbName = 'placebook-db'
export const dbURI = process.env.DB_URI || `mongodb://127.0.0.1/${dbName}`
console.log(dbURI)
export const port = process.env.PORT || 4000
export const jwtSecret = process.env.JWT_SECRET || 'elephantbongotriumph'
export const adminPW = process.env.ADMIN_PASS || 'testytestytest'

