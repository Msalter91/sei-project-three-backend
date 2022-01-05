import express from 'express'
import countries from '../controllers/countries.js'


const router = express.Router()

router.route('/countries')
  .get(countries.index)

export default router