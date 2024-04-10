import express from 'express';
import { getAllActivities, getSomeActivities } from '../controllers/activityController.js';

const router = express.Router()

router.route("/")
    .get(getAllActivities)

router.route("/some")
    .get(getSomeActivities)

export { router }