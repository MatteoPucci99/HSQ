import express from "express";
import { createPrejob, getAllPrejobs } from "../controllers/prejob.js";

const router = express.Router();

// Definizione delle routes
router.post("/savedPrejobs", createPrejob);
router.get("/savedPrejobs", getAllPrejobs);

export default router;
