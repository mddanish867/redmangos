import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const menuItemApi = createApi({
    reducerPath:"menuItemApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://redmangoapi.azurewebsites.net/api/"
    }),
    tagTypes:["MenuItems"],
    endpoints:(builder)=>({
        getMenuItem: builder.query({
            query:()=>({
                url:"menuItem",
            }),
            providesTags:["MenuItems"],
        }),
        getMenuItemById: builder.query({
            query:(id)=>({
                url:`menuItem/${id}`,
            }),
            providesTags:["MenuItems"],
        }),
    }),
});

export const {useGetMenuItemQuery, useGetMenuItemByIdQuery} = menuItemApi;
export default menuItemApi;