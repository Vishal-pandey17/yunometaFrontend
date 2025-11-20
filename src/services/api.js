import axios from 'axios';


const API_URL = 'https://yunometa-backend.vercel.app/api/tasks';

export const getAllTasks = async (status = 'All', page = 1, limit = 10) => {
    const res = await axios.get(API_URL, {
        params: {status, page, limit}
    });
    return res.data;
}

export const getTask = async(id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
}

export const createTask = async(taskData) => {
    const res = await axios.post(API_URL, taskData);
    return res.data;
}

export const updateTask = async (id, taskData) => {
    const res = await axios.put(`${API_URL}/${id}`, taskData);
    return res.data;
}

export const deleteTask = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  };