import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Iimagetintuc } from '@/interfaces/imagetintuc';
const imagetintucApi = createApi({
    reducerPath: 'imagetintuc',
    tagTypes: ['Imagetintuc'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api'
    }),
    endpoints: (builder) => ({
        getImagetintuc: builder.query<Iimagetintuc[], void>({
            query: () => `/imagetintuc`,
            providesTags: ['Imagetintuc']
        }),
        getImagetintucById: builder.query<Iimagetintuc, number | string>({
            query: (id) => `/imagetintuc/${id}`,
            providesTags: ['Imagetintuc']
        }),
        addImagetintuc: builder.mutation<Iimagetintuc, Iimagetintuc>({
            query: (imagetintuc) => ({
                url: `/imagetintuc`,
                method: "POST",
                body: imagetintuc
            }),
            invalidatesTags: ['Imagetintuc']
        }),
        updateImagetintuc: builder.mutation<Iimagetintuc,Iimagetintuc>({
            query: (imagetintuc) => ({
                url: `/imagetintuc/${imagetintuc._id}`,
                method: "PUT",
                body: imagetintuc
            }),
            invalidatesTags: ['Imagetintuc']
        }),
        removeImagetintuc: builder.mutation<Iimagetintuc, number | string>({
            query: (id) => ({
                url: `/imagetintuc/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Imagetintuc']
        }),
    })
});

export const {
    useGetImagetintucQuery,
    useGetImagetintucByIdQuery,
    useAddImagetintucMutation,
    useUpdateImagetintucMutation,
    useRemoveImagetintucMutation
} = imagetintucApi;

export const ImagetintucReducer = imagetintucApi.reducer;

export default imagetintucApi;