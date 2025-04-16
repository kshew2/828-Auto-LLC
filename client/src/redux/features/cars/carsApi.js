import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL';
import { auth } from '../../../firebase/firebase.config';

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/cars`,
    prepareHeaders: async (headers) => {
        const token = auth.currentUser && await auth.currentUser.getIdToken(true);
        if (token) {
            console.log('Attaching token to headers:', token); // Log the token
            headers.set('Authorization', `Bearer ${token}`);
        } else {
            console.warn('No token available. Authorization header not set.');
        }
        console.log('Headers before returning:', headers); // Log all headers
        return headers;
    },
});

const carsApi = createApi({
    reducerPath: 'carsApi',
    baseQuery,
    tagTypes: ['Cars'],
    endpoints: (builder) => ({
        fetchAllCars: builder.query({
            query: () => "/",
            providesTags: ["Cars"],
        }),
        fetchLatestCars: builder.query({
            query: () => "/latest",
            providesTags: ["Cars"],
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
                // When sending FormData, do not define the Content-Type header.
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