import express from 'express';

const router = express.Router()

router
    .route('/')
    .get(getExperience)

export { router }