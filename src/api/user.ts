import { ISignin } from "@/interfaces/signin";
import { IUser } from "@/interfaces/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "users",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    // fetchFn: async (...args) => {
    //     return fetch(...args);
    // }
  }),
  endpoints: (builder) => ({
    getUser: builder.query<IUser[], void>({
      query: () => `/user`,
      providesTags: ["User"],
    }),
    getUserById: builder.query<IUser, number | string>({
      query: (id) => `/user/${id}`,
      providesTags: ["User"],
    }),
    removeUser: builder.mutation<void, string | number>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["User"],
    }),
    addUser: builder.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/signup`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    signinUser: builder.mutation<
      {
        success: boolean;
        accessToken: string;
        user: {
          _id: string;
          role: {
            _id: string;
            role_name: string;
          };
        };
      },
      ISignin
    >({
      query: (credentials) => ({
        url: `/signin`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    signout: builder.mutation<IUser, void>({
      query: () => ({
        url: "/signout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    signupUser: builder.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/signupUser`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<any, any>({
      query: (user) => ({
        url: `/user/${user._id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    updateUserRole: builder.mutation<any, any>({
      query: (user) => ({
        url: `/userrole/${user._id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/user/changePassword/${user._id}`,
        method: "PATCH",
        body: { ...user, _id: undefined },
      }),
      invalidatesTags: ["User"],
    }),
    getDeletedUser: builder.query<any, void>({
      query: () => "/user-daleted",
      providesTags: ["User"],
    }),
    restoreUser: builder.mutation<IUser, number | string>({
      query: (id) => ({
        url: `/user/restore/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    PermanentDeleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/user/hard-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    changeStatusToInactive: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}/inactive`,
        method: 'PUT',
      }),
      invalidatesTags: ["User"],
    }),
    changeStatusToActive: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}/active`,
        method: 'PUT',
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useRemoveUserMutation,
  useSigninUserMutation,
  useSignupUserMutation,
  useSignoutMutation,
  useUpdateUserRoleMutation,
  useChangePasswordMutation,
  useGetDeletedUserQuery,
  useRestoreUserMutation,
  usePermanentDeleteUserMutation,
  useChangeStatusToInactiveMutation,
  useChangeStatusToActiveMutation,
} = userApi;
export const userReducer = userApi.reducer;
export default userApi;
