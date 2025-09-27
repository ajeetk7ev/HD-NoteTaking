// src/routes/noteRoutes.ts
import express from "express";
import {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
} from "../controllers/note.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

// All routes are protected
router.use(protect);

// Create a new note
router.post("/", createNote);

// Get all notes for logged-in user
router.get("/", getNotes);

// Get a single note by id
router.get("/:id", getNote);

// Update a note by id
router.put("/:id", updateNote);

// Delete a note by id
router.delete("/:id", deleteNote);

export default router;
