import Country from '../models/country.js'
import countires from './data/countires.js'
import { connectToDatabase, truncateDb, disconnectDb } from './helpers.js'

async function seed() {
  try {
    await connectToDatabase()
    console.log('database connected')

    await truncateDb()
    console.log('database emptied')

    const countriesToCreate = await Country.create(countires)
    console.log(countriesToCreate.length)

  } catch (err) {
    console.log(err)
  }
  disconnectDb()
}

seed()