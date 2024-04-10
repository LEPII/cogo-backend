import express from 'express';
import { getUserInfo } from '../controllers/userController';

const router = express.Router()

router
    .route("/")
    .get(getUserInfo)
    .post(createUser)
    .patch(updateUser)
    .delete(deleteUser)

export { router }