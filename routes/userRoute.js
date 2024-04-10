import express from 'express';
import { createUser, getUserInfo } from '../controllers/userController.js';

const router = express.Router()

router
    .route("/")
    .get(getUserInfo)
    .post(createUser)
// .patch(updateUser)
// .delete(deleteUser)

export { router }