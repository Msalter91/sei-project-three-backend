import { NotFound } from '../lib/errors.js'
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

async function tripIndex (req, res, next) {
  try { 
    const trips = await trip.find()
    return res.status(200).json(trips) 
  } catch (err) {
    next(err)
  }
}

// Delete a trip

async function tripDelete (req, res, next) {
  const { tripId } = req.params 
  try {
    const tripToDelete = await trip.findById(tripId)
    if (!tripToDelete) {
      throw new NotFound()
    }
    await tripToDelete.remove()
    return res.status(204)
  } catch (err) {
    next(err)
  }
}

// Show a single trip 
async function tripShow (req, res, next) {
  const { tripId } = req.params 
  try {
    const tripToShow = await trip.findById(tripId)
    if (!tripToShow) {
      throw new NotFound()
    }
    return res.status(200).json(tripToShow)
  } catch (err) {
    next(err)
  }
}

async function tripEdit (req, res, next) {
  const { tripId } = req.params
  try {
    const tripToEdit = await trip.findById(tripId)
    if (!tripToEdit) {
      throw new NotFound()
    }
    Object.assign(tripToEdit, req.body)
    await tripToEdit.save()
    return res.status(202).json(tripToEdit)
  } catch (err) {
    next(err)
  }
}

export default {
  index: tripIndex,
  create: tripCreate, 
  delete: tripDelete,
  show: tripShow,
  edit: tripEdit,
}