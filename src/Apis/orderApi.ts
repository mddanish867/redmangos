import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://redmangoapi.azurewebsites.net/api/",
    // Authorization
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
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
    // update status
    updateOrderHeader : builder.mutation({
      query:(orderDetails)=>({
        url:"order/" + orderDetails.orderHeaderId,
        method:"PUT",
        headers:{
          "Content-type":"application/json",
        },
        body:orderDetails
      }),
      invalidatesTags:["Orders"]
    })
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrderQuery,
  useGetOrderDetailsQuery,
  useUpdateOrderHeaderMutation,
} = orderApi;
export default orderApi;
