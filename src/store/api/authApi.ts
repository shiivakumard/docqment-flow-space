
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/auth',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: AuthResponse) => {
        // Store token in localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        return response;
      },
    }),
    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: (userData) => ({
        url: '/signup',
        method: 'POST',
        body: userData,
      }),
      transformResponse: (response: AuthResponse) => {
        // Store token in localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        return response;
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        } catch (error) {
          console.error('Logout error:', error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation } = authApi;
