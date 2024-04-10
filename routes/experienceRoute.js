import express from 'express';
import { createExperience, getAllExperiences } from '../controllers/experienceController.js';

const router = express.Router()

router
    .route('/')
    .get(getAllExperiences)
    .post(createExperience)

export { router }