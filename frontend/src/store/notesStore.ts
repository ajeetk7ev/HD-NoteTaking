// src/store/notesStore.ts
import { create } from "zustand";
import axios from "axios";
import { API_URL } from "@/constants/api";
import { getFromLocalStorage } from "@/utils/localstorage";
import toast from "react-hot-toast";
export interface Note {
  _id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const token = getFromLocalStorage("token");

interface NotesStore {
  notes: Note[];
  notesLoading:boolean;
  getAllNotesLoading: boolean;
  getAllNotes: () => void;
  addNote: (title:string, content:string) => Promise<any>;
  updateNote: (id:string, title:string, content:string) => Promise<any>;
  deleteNote: (id: string) => Promise<any>;
}

export const useNotesStore = create<NotesStore>((set) => ({
    notes: [],
    notesLoading:false,
    getAllNotesLoading:false,
    getAllNotes: async () => {
        console.log("Token is", token);
        set({getAllNotesLoading:true});
        try {
            const res = await axios.get(`${API_URL}/notes`,{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })

            if(res.data.success){
                set({notes:res.data.notes});
            }
        } catch (error) {
            console.log(error);
        } finally {
            set({getAllNotesLoading:false});
        }
    },

    addNote: async (title:string, content:string) => {
        set({notesLoading:true});
        try {
            console.log("Adding note ", title, content);
            const res = await axios.post(`${API_URL}/notes`, {title, content}, {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            });

            if(res.data.success){
                set((state) => ({
                    notes: [res.data.note, ...state.notes]
                }));
                toast.success(res.data.message || "Note added successfully");
                return {success:true, message:res.data.message || "Note added successfully"};
            }
        } catch (error:any) {
            console.log(error);
            toast.error(error.response?.data.message || error.message || "Failed to add note");
            return {success:false, message:"Failed to add note", error:error.response?.data.message || error.message};
        } finally {
            set({notesLoading:false});
        }

    },

    updateNote: async (id:string, title:string, content:string) => {
        set({notesLoading:true});
        try {
            const res = await axios.put(`${API_URL}/notes/${id}`, {title, content}, {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            });
            if(res.data.success){
                set((state) => ({
                    notes: state.notes.map((note) => note._id === id ? res.data.note : note)
                }));
                toast.success(res.data.message || "Note updated successfully");
                return {success:true, message:res.data.message || "Note updated successfully"};
            }
        } catch (error:any) {
            console.log(error);
            toast.error(error.response?.data.message || error.message || "Failed to update note");
            return {success:false, message:"Failed to update note", error:error.response?.data.message || error.message};
        } finally {
            set({notesLoading:false});
        }
    },

    deleteNote: async (id: string) => {
        set({notesLoading:true});
        try {
            const res = await axios.delete(`${API_URL}/notes/${id}`, {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            });
            if(res.data.success){
                set((state) => ({
                    notes: state.notes.filter((note) => note._id !== id)
                }));
                toast.success(res.data.message || "Note deleted successfully");
                return {success:true, message:res.data.message || "Note deleted successfully"};
            }
        } catch (error:any) {
            console.log(error);
            toast.error(error.response?.data.message || error.message || "Failed to delete note");
            return {success:false, message:"Failed to delete note", error:error.response?.data.message || error.message};
        } finally {
            set({notesLoading:false});
        }
    }
}));
