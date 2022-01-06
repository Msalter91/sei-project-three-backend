import express from 'express'

import countries from '../controllers/countries.js'
import memories from '../controllers/memories.js'
import trips from '../controllers/trips.js'
import user from '../controllers/auth.js'


const router = express.Router()


// Countries
router.route('/countries')
  .get(countries.index)

// Trips
router.route('/trips')
  .post(trips.create)
  .get(trips.index)

router.route('/trips/:tripId')
  .delete(trips.delete)
  .get(trips.show)
  .put(trips.edit)

// Memories 
router.route('/memories')
  .post(memories.create)
  .get(memories.index)

router.route('/memories/:memoryId')
  .delete(memories.delete)
  .get(memories.show)
  .put(memories.edit)

//Users
router.route('/register')
  .post(user.register)

export default router