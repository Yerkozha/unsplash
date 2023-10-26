import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://zk.kz/api/'
// https://zk.kz/api/
// 'https://test.zk.kz/api/'
// 'http://localhost:8080/api/'

 const withOutToken: AxiosInstance = axios.create({
    baseURL: BASE_URL,
})


export const withToken: AxiosInstance = axios.create({
    baseURL: BASE_URL,
})


export default withOutToken