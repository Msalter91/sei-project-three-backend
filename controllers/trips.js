import deleteTripAndMemoriesByTripObject from '../db/useCases/trips.js'
import { NotFound } from '../lib/errors.js'
import trip from '../models/trip.js'
import { checkAccessRights } from './authHelpers.js'

// add a trip 

async function tripCreate (req, res, next) {
  try {
    req.body.addedBy = req.currentUser
    req.body.title = `${req.currentUser.displayName}'s Adventure`
    const createdTrip = await trip.create({
      ...req.body })
    return res.status(201).json(createdTrip)
  } catch (err) {
    next(err)
  }
}

async function tripIndex (req, res, next) {
  try { 
    const trips = await trip.find().populate( 'memories').populate('addedBy')
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

    checkAccessRights(tripToDelete, req.currentUser)
    deleteTripAndMemoriesByTripObject(tripToDelete)
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

// Show a single trip 
async function tripShow (req, res, next) {
  const { tripId } = req.params 
  try {
    const tripToShow = await trip.findById(tripId).populate('memories')
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

    checkAccessRights(tripToEdit, req.currentUser)

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