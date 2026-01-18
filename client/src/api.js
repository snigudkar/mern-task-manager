import axios from 'axios';

const getBaseURL = () => {
  const host = window.location.hostname;
  return host.includes('github.dev') 
    ? `https://${host.replace('-5173', '-5000')}/api` 
    : 'http://localhost:5000/api';
};

export default axios.create({ baseURL: getBaseURL() });

