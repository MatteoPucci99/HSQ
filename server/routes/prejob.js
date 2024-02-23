import express from "express";
import { createPrejob, getAllPrejobs } from "../controllers/prejob.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Definizione delle routes
router.post("/savedPrejobs", auth, createPrejob);
router.get("/savedPrejobs", auth, getAllPrejobs);

export default router;
