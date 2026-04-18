import { create } from 'zustand'
import { axiosInstance } from '../utils/axios'
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'

const BASE_URL = 'http://localhost:8000'

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check')
            set({ authUser: res.data })
            get().connectSocket()
        } catch (error) {
            console.log(" Error in Checkauth:" + error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signUp: async (data) => {
        try {
            const res = await axiosInstance.post('/auth/sign-up', data)
            set({ authUser: res.data })
            toast.success("Account create succesfully");
            get().connectSocket()
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Something went wrong")
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    logIn: async (data) => {
        try {
            const res = await axiosInstance.post('/auth/login', data)
            set({ authUser: res.data })
            toast.success("Account login succesfully")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Something went wrong")
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    logOut: async () => {
        try {
            await axiosInstance.post('/auth/logout')
            set({ authUser: null })
            toast.success('Account logged out successfully')
            get().disconnectSocket()
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Something went wrong")
        }
    },

    connectSocket: () => {
        const { authUser } = get()
        if (!authUser || get().socket?.connected) return
        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id
            }
        })
        socket.connect()
        set({ socket: socket})
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },

}))