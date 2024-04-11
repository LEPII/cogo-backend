import express from 'express';
import { getFriendInvites, createFriendInvite, acceptFriendInvite } from '../controllers/friendInviteController.js';

const router = express.Router()

router
    .route("/")
    .get(getFriendInvites)
    .post(createFriendInvite)

router.route("/accept")
    .post(acceptFriendInvite)

export { router }