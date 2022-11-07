import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://192.168.15.3:3333' // 'http://127.0.0.1:3333'
});