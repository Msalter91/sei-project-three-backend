import mongoose from 'mongoose'

const tripSchema = new mongoose.Schema({
  title: { type: String, maxlength: 50,required: true },
  notes: { type: String, maxlength: 300 },
  countryVisited: { type: String, required: true },
  dateStarted: { type: Date },
  dateFinished: { type: Date },
  // todo add 
  // memories: [{ type: mongoose.Schema.ObjectId, ref: 'memory' }],
})

// todo add virtuals centerPoint, isPlanned, summaryImage 

export default mongoose.model('Trip', tripSchema)