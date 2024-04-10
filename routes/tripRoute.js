import express from 'express';
import { createTrip, getUserTrips } from '../controllers/tripController.js';

const router = express.Router()

router
    .route('/')
    .get(getUserTrips)
    .post(createTrip)
// .post(createTripInvite)
// .patch(updateTrip)
// .delete(deleteTrip)

export { router }