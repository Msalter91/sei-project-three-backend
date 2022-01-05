import Country from '../models/country.js'

// Add a country 

async function countryIndex (req, res) {
  try {
    const countries = await Country.find()
    return res.status(200).json(countries)
  } catch (err) {
    console.log(err)
  }
}


export default {
  index: countryIndex,
}