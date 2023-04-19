import axios from 'axios';

export const getTasksRequest = async () => 
  await axios.get('http://localhost:3001/tasks');

export const createTaskRequest = async (task) => 
  await axios.post('http://localhost:3001/tasks', task);

export const deleteTaskRequest = async (id) => 
  await axios.delete(`http://localhost:3001/tasks/${id}`);

export const getTaskRequest = async (id) => 
  await axios.get(`http://localhost:3001/tasks/${id}`);

export const updateTaskRequest = async (id, newFields) =>
  await axios.put(`http://localhost:3001/tasks/${id}`, newFields);

export const toggleTaskDoneRequest = async (id, done) =>
  await axios.put(`http://localhost:3001/tasks/${id}`, {
    done,
  });