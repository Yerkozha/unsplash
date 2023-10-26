import instance from '../api';
import { AxiosResponse } from 'axios'


export interface Cities {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: Array<{
        [key: string]: string
    }>
}

export interface PrayTime { 
    success: true;
    longitude: number;
    city_name: string;
    result: Array<{
        [key: string]: string
    }>;
    year: number;
    latitude: number;
    timezone: string;
}

export const prayTime = {

    getCities( query? ): Promise<AxiosResponse<Array<Cities>>> {
        
        return instance.get<Array<Cities>>( 'item/?' + (query ? query : '') )
    },

    getPrayTime( coordinate ): Promise<AxiosResponse<PrayTime>>{

        return instance.put<PrayTime>( 'item/' , coordinate )
    }

}