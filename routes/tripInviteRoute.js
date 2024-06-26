import express from 'express';
import { acceptTripInvite, createTripInvite, getUserTripInvites } from '../controllers/tripInviteController.js';

const router = express.Router()

router
    .route('/')
    .get(getUserTripInvites)
    .post(createTripInvite)

router.route('/accept')
    .post(acceptTripInvite)

export { router }