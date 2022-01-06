import mongoose from 'mongoose'

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String },
  countrycode: { type: String, required: true },
  summary: { type: String, required: true },
  language: { type: String, required: true },
  currency: { type: String, required: true },
})

export default mongoose.model('Country', countrySchema)
