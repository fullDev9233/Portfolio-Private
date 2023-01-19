import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API || 'http://localhost:4000/api/v1',
});

export default http;
