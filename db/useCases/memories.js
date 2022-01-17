import memory from '../../models/memory.js'

export async function deleteMemoryById(memoryId) {
  const memoryToDelete = await memory.findById(memoryId)
  await memoryToDelete.remove()
}

export default {
  deleteById: deleteMemoryById,
}