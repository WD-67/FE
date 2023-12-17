import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPayment } from "../types";
import axios from "axios";

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
        newPayment: builder.mutation<{ data: IPayment }, IPayment>({
            query: (data) => ({ url: "/api/payments", method: "POST", body: data}),
        }),
    }),
});

export const { useGetAllPaymentQuery, useNewPaymentMutation } = paymentApi;
export default paymentApi;

export const createPaymentUrl = (data: any) => {
    return axios({
        url: "http://localhost:8080/api/vnpay/create-url",
        method: "POST",
        data,
    });
};
