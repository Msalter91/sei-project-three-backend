import Country from '../models/country.js'
import Memory from '../models/memory.js'
import trip from '../models/trip.js'
import User from '../models/user.js'

import countries from './data/countries.js'
import memories from './data/memories.js'
import trips from './data/trips.js'

import { connectToDatabase, truncateDb, disconnectDb } from './helpers.js'
import dotenv from 'dotenv'
dotenv.config()

async function seed() {
  try {
    await connectToDatabase()
    console.log('database connected')

    await truncateDb()
    console.log('database emptied')

    console.log('creating admin user')
    console.log('Admin Pass:', process.env.ADMIN_PASS)
    const adminUser = await User.create({
      displayName: 'admin',
      email: 'admin@mail.com',
      image: 'http://clipart-library.com/image_gallery/407868.png',
      password: process.env.ADMIN_PASS,
      passwordConfirmation: process.env.ADMIN_PASS,
    })

    console.log('Admin user ID:', adminUser._id)

    //adding countries
    const countriesToCreate = await Country.create(countries)
    console.log(countriesToCreate.length)

    //adding trips 
    const tripsToCreate = await trip.create(trips)
    console.log(tripsToCreate.length)

    //adding memories 
    const memoriesToCreate = await Memory.create(memories)
    console.log(memoriesToCreate.length)

  } catch (err) {
    console.log(err)
  }
  disconnectDb()
}

seed()