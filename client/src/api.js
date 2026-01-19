// import axios from 'axios';

// const getBaseURL = () => {
//   const host = window.location.hostname;
//   return host.includes('github.dev') 
//     ? `https://${host.replace('-5173', '-5000')}/api` 
//     : 'http://localhost:5000/api';
// };

// export default axios.create({ baseURL: getBaseURL() });

// import axios from 'axios';

// const API = axios.create({
//   // 1. Your specific Backend URL (make sure 8800 matches your Ports tab)
//   baseURL: "https://improved-happiness-wrvjq459gpxgfg7rx-5000.app.github.dev", 
  
//   // 2. CRITICAL: Allows cookies/sessions to be sent with requests
//   withCredentials: true, 
// });

// export default API;
import axios from 'axios';

const API = axios.create({
  // ✅ CORRECT: Ends with '.dev' (NO '/api' at the end)
  baseURL: "https://improved-happiness-wrvjq459gpxgfg7rx-5000.app.github.dev", 
  
  withCredentials: true,
});

export default API;