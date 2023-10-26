import axios, { AxiosInstance, AxiosResponse } from 'axios';

const BASE_URL = 'https://api.unsplash.com/'
const ACCESS_TOKEN = "?client_id=ATm8K-NEvptrHvLoF9L7_96C0lC6J5McUd8VwlJC0jg"

export const withToken: AxiosInstance = axios.create({
    baseURL: BASE_URL,
})

export interface Photos {
    urls: {
        [key: string]: string
    },
    user: {
        [key: string]: unknown;
        name: string;   
        profile_image: { 
            [key: string]: string;
            small: string;
        }
    };
    instagram_username: string;
    links: {
        [key: string]: string
    };
    [key: string]: unknown
}

type SearchResult = {
    results: Array<Photos>
}

export const unsplashAPI = {

    getPhotos(): Promise<AxiosResponse<Array<Photos>>> {
        return withToken.get<Array<Photos>>( 'photos/' + ACCESS_TOKEN )
    },

    searchPhoto( keywords ): Promise<AxiosResponse<SearchResult>> {
        return withToken.get<SearchResult>( '/search/photos' + ACCESS_TOKEN + '&query=' + keywords )
    }

}

