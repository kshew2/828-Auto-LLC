import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL';
import axiosInstance from '../../../utils/axiosInstance';

const baseQuery = fetchBaseQuery({
    baseUrl: `${axiosInstance.defaults.baseURL}/api/cars`,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const carsApi = createApi({
    reducerPath: 'carsApi',
    baseQuery,
    tagTypes: ['Cars'],
    endpoints: (builder) => ({
        fetchAllCars: builder.query({
            query: () => "/",
            providesTags: ["Cars"]
        }),
        fetchLatestCars: builder.query({
            query: () => "/latest",
            providesTags: ["Cars"]
        }),
        fetchCarById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Cars", id }],
        }),
        addCar: builder.mutation({
            query: (newCar) => ({
                url: "/add-car",
                method: "POST",
                body: newCar,
            }),
            invalidatesTags: ["Cars"],
        }),
        updateCar: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Cars", id }],
        }),
        deleteCar: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Cars", id }],
        }),
    }),
});

export const {
    useFetchAllCarsQuery,
    useFetchCarByIdQuery,
    useAddCarMutation,
    useUpdateCarMutation,
    useDeleteCarMutation,
} = carsApi;

export default carsApi;