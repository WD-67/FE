import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPayment } from "../types";

const paymentApi = createApi({
    reducerPath: "paymentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080",
    }),
    tagTypes: ["Sales"],
    endpoints: (builder) => ({
        getAllPayment: builder.query<{ data: IPayment[] }, void>({
            query: () => ({ url: "/api/payments" }),
        }),
       
    }),
});

export const {useGetAllPaymentQuery} = paymentApi;
export default paymentApi;

