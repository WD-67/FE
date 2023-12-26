
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct } from '../interfaces/product';
const productApi = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API
    }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        // actions
        // GET 
        getProducts: builder.query<IProduct, void>({
            query: () => `/products`,
            providesTags: ["Products"]

            
        }),
        getProductById: builder.query<IProduct, number | string>({
            query: (id) => `/products/${id}`,
            providesTags: ["Products"]  
        }),

        addProduct: builder.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: `/products`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ["Products"]
        
        }),
        updateProduct: builder.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: `/products/${product._id}`,
                method: "PUT",
                body: product
            }),
            invalidatesTags: ["Products"]

        }),
        removeProduct: builder.mutation<IProduct, number | string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE"
            })
        }),
        getDeletedProducts: builder.query<any, void>({
            query: () => '/products-daleted',
        }),
    

        // RESTORE a product
        restoreProduct: builder.mutation<IProduct, number | string>({
            query: (id) => ({
                url: `/products/restore/${id}`,
                method: "PATCH"
            })
        }),
        // DESTROY a product
        PermanentDeleteProduct: builder.mutation<void, string>({
            query: (id) => ({
                url: `/products/hard-delete/${id}`,
                method: 'DELETE',
            }),
        }),
        searchProducts: builder.query<IProduct[], string>({
            query: (name) => `/products/search/${name}`,
          }),

    })
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useRemoveProductMutation,
    useGetDeletedProductsQuery, // new hook for getting deleted products
    useRestoreProductMutation ,// new hook for restoring a product
    usePermanentDeleteProductMutation,
    useSearchProductsQuery,

} = productApi;

export const productReducer = productApi.reducer;

export default productApi;