import { create } from 'zustand'
import { axiosInstance } from '../utils/axios'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store/useAuthStore'

export const useNoteStore = create((set, get) => ({
    notes: [],

    // Fetch notes
    getNotes: async () => {
        try {
            const res = await axiosInstance.get('/note');
            set({ notes: res.data.data || [] });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch notes");
        }
    },

    // Create note (local update NOT done here)
    createNote: async (data) => {
        try {
            await axiosInstance.post('/create/note', data)
            toast.success("Note created successfully")
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    },

    // Update note
    updateNote: async (id, data) => {
        try {
            await axiosInstance.put(`/note/${id}`, data)
            toast.success("Note updated successfully")
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    },

    // Delete note
    deleteNote: async (id) => {
        try {
            await axiosInstance.delete(`/note/${id}`)
            toast.success("Note deleted successfully")
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    },

    // SOCKET SUBSCRIBE (Listen ONCE only)
    subscribeToNotes: () => {
        const socket = useAuthStore.getState().socket

        // NEW NOTE
        socket.on("newNote", (newNote) => {
            set({ notes: [...get().notes, newNote] })
        })

        // UPDATE NOTE
        socket.on("updateNote", (updated) => {
            set({
                notes: get().notes.map(n =>
                    n._id === updated._id
                        ? { ...n, title: updated.title, note: updated.note }
                        : n
                )
            });
        });


        // DELETE NOTE
        socket.on("deleteNote", (id) => {
            set({
                notes: get().notes.filter(n => n._id !== id)
            })
        })
    },

    unsubscribeFromNotes: () => {
        const socket = useAuthStore.getState().socket
        socket.off("newNote")
        socket.off("updateNote")
        socket.off("deleteNote")
    }
}))
