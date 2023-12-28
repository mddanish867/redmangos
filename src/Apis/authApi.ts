import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://redmangoapi.azurewebsites.net/api/"
    }),
    endpoints:(builder)=>({      
        //Post API call 
        registerUser: builder.mutation({
            query:(userData)=>({
                url:`auth/register`,
                method:"POST",
                headers:{
                    "Content-type":"application/json",
                },
                body:userData
            }),
        }),        

        // Post Api calls
        loginUser: builder.mutation({
            query: (userCredentials)=>({
                url:`auth/login`,
                method:"POST",
                headers:{
                    "Content-type":"application/json",
                },
                body:userCredentials
            }),
        }),
    }),
});

export const {useRegisterUserMutation,useLoginUserMutation} = authApi;
export default authApi;