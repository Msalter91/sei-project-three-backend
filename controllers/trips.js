import trip from '../models/trip.js'

// add a trip 

async function tripCreate (req, res) {
  try {
    const createdTrip = await trip.create({
      ...req.body })
    return res.status(201).json(createdTrip)
  } catch (err) {
    console.log(err)
  }
}

// Delete a trip

async function tripDelete (req, res) {
  const { tripId } = req.params 
  try {
    const tripToDelete = await trip.findById(tripId)
    if (!tripToDelete) {
      throw new Error
    }
    await tripToDelete.remove()
    return res.status(204)
  } catch (err) {
    console.log(err)
  }
}

async function tripShow (req, res) {
  const { tripId } = req.params 
  try {
    const tripToShow = await trip.findById(tripId)
    if (!tripToShow) {
      return res.status(404)
    }
    return res.status(200).json(tripToShow)
  } catch (err) {
    console.log(err)
  }
}

async function tripEdit (req, res) {
  const { tripId } = req.params
  try {
    const tripToEdit = await trip.findById(tripId)
    if (!tripToEdit) {
      return res.status(404)
    }
    Object.assign(tripToEdit, req.body)
    await tripToEdit.save()
    return res.status(202).json(tripToEdit)
  } catch (err) {
    console.log(err)
  }
}

export default {
  create: tripCreate, 
  delete: tripDelete,
  show: tripShow,
  edit: tripEdit,
}