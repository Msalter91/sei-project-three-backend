import mongoose from 'mongoose'

const tripSchema = new mongoose.Schema({
  title: { type: String, maxlength: 50 },
  notes: { type: String, maxlength: 300 },
  countryVisited: { type: String },
  dateStarted: { type: String },
  dateFinished: { type: String },
  memories: [{ type: mongoose.Schema.ObjectId, ref: 'Memory' }],
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }, 
})

// todo add virtuals centerPoint, isPlanned, summaryImage 

export default mongoose.model('Trip', tripSchema)