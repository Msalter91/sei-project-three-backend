import mongoose from 'mongoose'

const memorySchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  location: { type: String, required: true, maxlength: 30 },
  image: { type: String },
  notes: { type: String, maxlength: 200 },
  lat: { type: Number, required: true  },
  long: { type: Number, required: true },
  visitDate: { type: String },
  pairedTrip: { type: mongoose.Schema.ObjectId, ref: 'Trip' },
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }, 
},
{ timestamps: { createdAt: 'created_at' } }
)

export default mongoose.model('Memory', memorySchema)