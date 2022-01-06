import mongoose from 'mongoose'

const memorySchema = new mongoose.Schema({
  memooryName: { type: String, required: true, maxlength: 30 },
  locationName: { type: String, required: true, maxlength: 30 },
  imageUrl: { type: String },
  notes: { type: String, maxlength: 200 },
  geoCode: { type: Object, required: true  },
  visitDate: { type: Date },
  pairedTrip: { type: mongoose.Schema.ObjectId, ref: 'Trip' },
  timestamps: true,
})

export default mongoose.model('Memory', memorySchema)