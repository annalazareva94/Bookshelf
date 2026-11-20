//Axios — это JavaScript-library, we use it for HTTP-requests
// (GET, POST, PUT, DELETE etc.) from browser or from server with Node.js
import axios from 'axios';

const api = axios.create({
  // the address at which the FastAPI backend runs locally
  baseURL: '/api',
  // permission to send cookies and authorization headers
  withCredentials: true,
});

export default api;
