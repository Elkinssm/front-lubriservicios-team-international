import axios from 'axios';

axios.defaults.baseURL = '';

axios.interceptors.request.use(
  (config) => {
    const token_app = window.localStorage.getItem('token_app');
    if (token_app) {
      config.headers.Authorization = `Bearer ${token_app}`;
      return config;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
const requestGeneric = {
  get: (url) => axios.get(url),
  post: (url, body) => axios.post(url, body),
  put: (url, body) => axios.put(url, body),
  patch: (url, body) => axios.patch(url, body),
  delete: (url) => axios.delete(url),
};

export default requestGeneric;
