import Memory from '../models/memory.js'
import { NotFound } from '../lib/errors.js'



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

// Delete a Memory
async function memoryDelete (req, res, next) {
  const { memoryId } = req.params 
  try {
    const memoryToDelete = await Memory.findById(memoryId)
    if (!memoryToDelete) {
      throw new NotFound()
    }
    await memoryToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

// Show a single memory 
async function memoryShow (req, res, next) {
  const { memoryId } = req.params 
  try {
    const memoryToShow = await Memory.findById(memoryId)
    if (!memoryToShow) {
      throw new NotFound()
    }
    return res.status(200).json(memoryToShow)
  } catch (err) {
    next(err)
  }
}





export default {
  create: memoryCreate,
  index: memoryIndex,
  delete: memoryDelete,
  show: memoryShow,
}