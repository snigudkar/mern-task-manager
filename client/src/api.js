import axios from 'axios';

const API = axios.create({
  // ✅ CORRECT: Ends with '.dev' (NO '/api' at the end)
  baseURL: "https://curly-system-v6v4pp5j9gxw369xq-5000.app.github.dev", 
  
  withCredentials: true,
});

export default API;
