import axios from 'axios';
import { apiClient } from '../service/api-config';

const api = {
    getPosts: () => apiClient.get('/api/board'),
    createPost: (data) => apiClient.post("/api/board", data),
    deletePost: (id) => apiClient.delete(`/api/board/${id}`),
    updatePost : (post) => apiClient.put ("/api/board", post),
    deletePostsBulk: (ids) => apiClient.delete('/api/board', { data: { ids } }),

};

export default api;
