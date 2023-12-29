import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://redmangoapi.azurewebsites.net/api/",
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderDetails) => ({
        url: "order",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: orderDetails,
      }),
      invalidatesTags: ["Orders"],
    }),
    // Get all order API
    getAllOrder: builder.query({
      query: (userId) => ({
        url: "order",
        params: {
          userId: userId,
        },
      }),
      providesTags: ["Orders"],
    }),
    // Egt Order details by Id
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `order/${id}`,
      }),
      providesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrderQuery,
  useGetOrderDetailsQuery,
} = orderApi;
export default orderApi;
