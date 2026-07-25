import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://notes-backend-oa2b.onrender.com';

const api = axios.create({
  baseURL: API_URL
});

export const getNotes = () => api.get('/api/notes');
export const createNote = (note) => api.post('/api/notes', note);
export const updateNote = (id, note) => api.put(`/api/notes/${id}`, note);
export const deleteNote = (id) => api.delete(`/api/notes/${id}`);

export default api;