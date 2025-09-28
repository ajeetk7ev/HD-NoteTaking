// src/controllers/noteController.ts
import { Request, Response } from "express";
import Note from "../models/Note";

interface AuthRequest extends Request {
  user?: any;
}

// Create a note
export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content } = req.body;
    if (!title || !content)
      return res.status(400).json({ success: false, message: "Title and content required" });

    const note = await Note.create({
      userId: req.user._id,
      title,
      content,
    });

    res.status(201).json({ success: true, message: "Note created", note });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create note", error });
  }
};

// Get all notes of logged-in user
export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    const notes = await Note.find({ userId: req.user._id }).select("-__v").sort({ createdAt: -1 });
    res.status(200).json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch notes", error });
  }
};

// Get single note by id
export const getNote = async (req: AuthRequest, res: Response) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user._id }).select("-__v");
    if (!note) return res.status(404).json({ success: false, message: "Note not found" });
    res.status(200).json({ success: true, note });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch note", error });
  }
};


// Update note
export const updateNote = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content } = req.body;
    if(!title || !content){
        return res.status(400).json({ success: false, message: "Title and content required" });
    }
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title, content },
      { new: true }
    ).select("-__v");
    if (!note) return res.status(404).json({ success: false, message: "Note not found" });
    res.status(200).json({ success: true, message: "Note updated", note });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update note", error });
  }
};

// Delete note
export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!note) return res.status(404).json({ success: false, message: "Note not found" });
    res.status(200).json({ success: true, message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete note", error });
  }
};
