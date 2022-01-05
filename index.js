import express from 'express'

import { connectToDatabase } from './db/helpers.js'
import { port } from './config/environment.js'

const app = express()

app.use(express.json())

async function startServer() {
  try {
    await connectToDatabase()
    console.log('🌍 database has connected')
    app.listen(port, () => console.log(`Up and running on port ${port}`) )
  } catch (err) {
    console.log('something went wrong', err)
  }
}

startServer()