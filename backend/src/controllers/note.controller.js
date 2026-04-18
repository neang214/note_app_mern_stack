import Note from '../models/note.model.js'
import { io, getReceiverSocketId } from '../lib/socket.js'

export const createNote = async (req, res) => {
    const { title, note } = req.body;
    const userId = req.user._id;

    try {
        if (!title || !note) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newNote = await Note.create({ userId, title, note });
        const plainNote = newNote.toObject();

        res.status(201).json({ message: "Note created successfully", note: plainNote });

        const receiverSocketId = getReceiverSocketId(userId);
        if (receiverSocketId) io.to(receiverSocketId).emit("newNote", plainNote);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getNote = async (req, res) => {
    const userId = req.user._id;
    try {
        const notes = await Note.find({ userId });
        return res.status(200).json({ data: notes });
    } catch (error) {
        console.log("Error in getNote controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateNote = async (req, res) => {
    const { title, note } = req.body;
    const { id } = req.params;
    const userId = req.user._id;

    try {
        const findNote = await Note.findById(id);
        if (!findNote) return res.status(400).json({ message: "Update failed" });

        await Note.findByIdAndUpdate(id, { $set: { title, note } });
        res.status(200).json({ message: "Updated successfully" });

        const receiverSocketId = getReceiverSocketId(userId);
        if (receiverSocketId) io.to(receiverSocketId).emit("updateNote", { _id: id, title, note });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteNote = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    try {
        const note = await Note.findById(id);
        if (!note) return res.status(404).json({ message: "Data not found" });

        await Note.findByIdAndDelete(id);
        const receiverSocketId = getReceiverSocketId(userId);
        if (receiverSocketId) io.to(receiverSocketId).emit("deleteNote", id);

        res.status(200).json({ message: "Note deleted successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
