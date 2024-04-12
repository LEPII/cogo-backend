import express from "express";
const router = express.Router()

import { findEvents, findPlace } from "../controllers/mapsController.js";

router
    .route("/findEvents")
    .get(findEvents)
router
    .route("/findPlace")
    .get(findPlace)
    
export { router }

