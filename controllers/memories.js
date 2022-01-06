import Memory from '../models/memory.js'



// create a memory 
async function memoryCreate (req, res, next) {
  try {
    const createdMemory = await Memory.create({ ...req.body })
    return res.status(201).json(createdMemory)
  } catch (err) {
    next(err)
  }
}

// index of Memories 
async function memoryIndex (req, res, next) {
  try {
    const memories = await Memory.find()
    return res.status(200).json(memories)
  } catch (err) {
    next(err)
  }
}

export default {
  create: memoryCreate,
  index: memoryIndex,
}