
import express from "express";
const router = express.Router()

import { generateText, generateSuggestion } from "../controllers/suggestionsController.js";

router
    .route("/")
    .get(generateSuggestion)
export { router }