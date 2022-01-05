import mongoose from 'mongoose'

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String },
})

export default mongoose.model('Country', countrySchema)
