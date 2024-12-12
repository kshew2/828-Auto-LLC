import { createApi } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/cars`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if(token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

const carsApi = createApi ({
    reducerPath: 'carApi',
    baseQuery,
    tagTypes: ['Cars'],
    endpoints: (builder) => ({
        fetchAllCars: builder.query({
            query: () => "/",
            providesTags: ["Cars"]
        })
    })
})

export const {useFetchAllCarsQuery} = carsApi