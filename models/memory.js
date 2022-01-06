import mongoose from 'mongoose'

const memorySchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  location: { type: String, required: true, maxlength: 30 },
  image: { type: String },
  notes: { type: String, maxlength: 200 },
  lat: { type: String, required: true  },
  long: { type: String, required: true },
  visitDate: { type: String },
  pairedTrip: { type: mongoose.Schema.ObjectId, ref: 'Trip' },
},
{ timestamps: { createdAt: 'created_at' } }
)

export default mongoose.model('Memory', memorySchema)