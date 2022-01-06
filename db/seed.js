import Country from '../models/country.js'
import Memory from '../models/memory.js'
import trip from '../models/trip.js'

import countries from './data/countries.js'
import memories from './data/memories.js'
import trips from './data/trips.js'

import { connectToDatabase, truncateDb, disconnectDb } from './helpers.js'

async function seed() {
  try {
    await connectToDatabase()
    console.log('database connected')

    await truncateDb()
    console.log('database emptied')


    //adding countries
    const countriesToCreate = await Country.create(countries)
    console.log(countriesToCreate.length)

    //adding trips 
    const tripsTCreate = await trip.create(trips)
    console.log(tripsTCreate.length)

    //adding memories 
    const memoriesToCreate = await Memory.create(memories)
    console.log(memoriesToCreate.length)

  } catch (err) {
    console.log(err)
  }
  disconnectDb()
}

seed()