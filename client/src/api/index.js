import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000' })

//This will send the token to the backend and communicate with

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`) 
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPostData) => API.patch(`/posts/${id}`, updatedPostData);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const commentPost = (comment,id) => API.post(`/posts/${id}/commentPost`,{comment});
export const signin = (formData) => API.post('/users/signin', formData);
export const signup = (formData) => API.post('/users/signup', formData);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const getRepos = (tech) => API.get(`/repos?tech=${tech}`);
export const fetchAllRepos = () => API.get(`/repos`);