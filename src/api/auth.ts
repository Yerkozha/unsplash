import { UserInfoType } from '~/store/modules/auth-reducer'
import instance, { withToken } from '../api'
import axios, { AxiosResponse } from 'axios'

const API_KEY = '$2y$10$B4DH53cKDDefisnTENUaOT5QGHwxQcOGXrqzhLYYugHqCs1atJ2';

export type BookType = {
    status: number;
    message: string;
    hadiths: {
        current_page: number;
        data: Array<unknown>
    }
}



// @ts-ignore


export const authAPI = {
    login( creadentials ){
        return instance.post('auth/token/login', creadentials)
    },
    logout(){
        return withToken.post('auth/token/logout')
    },
    getUserInfo(): Promise<AxiosResponse<Array<UserInfoType>>>{
        return withToken.get<Array<UserInfoType>>('users/')
    },
    registration( registrCred ){
        return instance.post('users/', registrCred)
    },
    
}


// getHadith():any{
//     //
//     // return axios({
//     //     url: 'https://www.hadithapi.com/api/hadiths/?apiKey=' + API_KEY,
//     //     method: 'get',
//     //     headers: {
//     //         'Access-Control-Allow-Origin': '*',
//     //         'Content-Type': 'application/json'
//     //     },
//     //     proxy: {
//     //         protocol: 'https',
//     //         host: 'www.hadithapi.com',
//     //         port: 4000,
//     //     }
//     // })
//     // return axios.get<BookType>('https://www.hadithapi.com/api/hadiths/?apiKey=' + API_KEY, {
//     //     headers: {
//     //         'Access-Control-Allow-Origin': '*',
//     //         'Content-Type': 'application/json',
//     //     }
//     // } )
    
    
//     return instance.get('')
// },