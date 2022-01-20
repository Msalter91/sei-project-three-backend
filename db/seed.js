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
      image: 'https://res.cloudinary.com/team-mad/image/upload/v1642010300/placebook-profile-images/k0kj0qyufel6ucygpxwn.jpg',
      password: process.env.ADMIN_PASS,
      passwordConfirmation: process.env.ADMIN_PASS,
    })

    console.log('Admin user ID:', adminUser._id)

    //adding countries
    const countriesToCreate = await Country.create(countries)
    console.log('Countries created:',countriesToCreate.length)

    //adding memories 
    const memoriesWithData = memories.map(singleMemory=>({ ...singleMemory, addedBy: adminUser._id }))
    const createdMemories = await Memory.create(memoriesWithData)
    console.log('Memories created:',createdMemories.length)

    //adding trips 
    const tripsWithData = trips.map((trip, index) => {
      const memoriesIds = []
      // add memories to trips, increasing the amount of memories stored on each trip, so that we have a variety of memories per trip
      for (let tripMemoryNumber = 0; tripMemoryNumber < index; tripMemoryNumber++){
        // check that we aren't exceeding the number of memories that exist
        if (tripMemoryNumber < createdMemories.length){
          memoriesIds.push(createdMemories[tripMemoryNumber]._id)
        }
      }
      return ({ ...trip, addedBy: adminUser._id, memories: memoriesIds })
    })
    const createdTrips = await trip.create(tripsWithData)
    console.log('Trips created:', createdTrips.length)

  } catch (err) {
    console.log(err)
  }
  disconnectDb()
}

seed()