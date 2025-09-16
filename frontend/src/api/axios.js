import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/';

export const getSchools = () => axios.get(`${API_URL}schools/`);
export const getTeachers = () => axios.get(`${API_URL}teachers/`);
export const getStudents = () => axios.get(`${API_URL}students/`);
export const getSubjects = () => axios.get(`${API_URL}subjects/`);
export const createTeacher = (data) => axios.post(`${API_URL}teachers/`, data);
export const createStudent = (data) => axios.post(`${API_URL}students/`, data);
export const createSubject = (data) => axios.post(`${API_URL}subjects/`, data);