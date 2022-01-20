import { deleteMemoryById } from './memories.js'

export default async function deleteTripAndMemoriesByTripObject(trip) {
  trip.memories.length && console.log('deleting memories:',trip.memories.join(''))
  await Promise.all(
    trip.memories.forEach(memory => {
      deleteMemoryById(
        memory._id || memory
      )
    })
  )
  console.log('deleting trip:', trip._id)
  await trip.remove()
}