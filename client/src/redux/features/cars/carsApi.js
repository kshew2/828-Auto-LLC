import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
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
        }),
        fetchCarById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (results, error, id) => [{type: "Cars", id}],
        }),
        addCar: builder.mutation({
            query: (newCar) => ({
                url: `/add-car`,
                method: "POST",
                body: newCar
            }),
            invalidatesTags: ["Cars"]
        }),
        updateCar: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Cars"]
        }),
        deleteCar: builder.mutation({
            query: (id) => ({
            url: `/${id}`,
            method: "DELETE"
        }),
        invalidateTags: ["Cars"]
        })
    })
})

export const {useFetchAllCarsQuery, useFetchCarByIdQuery, useAddCarMutation, useUpdateCarMutation, useDeleteCarMutation} = carsApi
export default carsApi;