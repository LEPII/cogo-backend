import express from 'express';
import { getFriendInvites, createFriendInvite } from '../controllers/friendInviteController.js';

const router = express.Router()

router
    .route("/")
    .get(getFriendInvites)
    .post(createFriendInvite)

export { router }