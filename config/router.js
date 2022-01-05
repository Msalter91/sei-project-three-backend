import express from 'express'
import countries from '../controllers/countries.js'
import trips from '../controllers/trips.js'


const router = express.Router()


// Countries
router.route('/countries')
  .get(countries.index)

// Trips
router.route('/trips')
  .post(trips.create)

router.route('/trips/:tripId')
  .delete(trips.delete)
  .get(trips.show)
  .put(trips.edit)


export default router