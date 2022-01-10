import Country from '../models/country.js'

import { NotFound } from '../lib/errors.js'

// Add a country 

async function countryIndex (req, res) {
  try {
    const countries = await Country.find()
    return res.status(200).json(countries)
  } catch (err) {
    console.log(err)
  }
}

async function countryShow (req, res, next) {
  const { countryId } = req.params 
  try {
    const countryToShow = await Country.findById(countryId)
    if (!countryToShow) {
      throw new NotFound()
    }
    return res.status(200).json(countryToShow)
  } catch (err) {
    next(err)
  }
}



export default {
  index: countryIndex,
  show: countryShow,
}