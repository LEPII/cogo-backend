import express from "express";
const router = express.Router()

import { findEvents, findPlace } from "../controllers/mapsController.js";

router
    .route("/findEvents")
    .post(findEvents)
router
    .route("/findPlace")
    .post(findPlace)
    
export { router }

