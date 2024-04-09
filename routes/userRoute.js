import express from 'express';

const router = express.Router()

router
    .route("/")
    .get(getUserInfo)
    .post(createUser)
    .patch(updateUser)
    .delete(deleteUser)

export { router }