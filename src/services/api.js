import axios from 'axios';

const api = axios.create({
  baseURL: 'https://artestate-studio.azurewebsites.net/galeria'
});

export default api;
