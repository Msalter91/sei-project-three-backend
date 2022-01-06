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

export default {
  create: memoryCreate,
}