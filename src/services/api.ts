import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ip_emulador_ou_do_smartphone_fisico:3333',
});

// baseURL: 'http://192.168.0.15:3333',

export default api;
