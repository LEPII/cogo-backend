import express from 'express';
import { createTripInvite, getUserTripInvites } from '../controllers/tripInviteController.js';

const router = express.Router()

router
    .route('/')
    .get(getUserTripInvites)
    .post(createTripInvite)
// .post(createTripInvite)
// .patch(updateTrip)
// .delete(deleteTrip)

export { router }