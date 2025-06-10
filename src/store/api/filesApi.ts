
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size: number;
  modifiedAt: Date;
  extension?: string;
  isStarred?: boolean;
}

export const filesApi = createApi({
  reducerPath: 'filesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/files',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['File'],
  endpoints: (builder) => ({
    getFiles: builder.query<FileItem[], void>({
      query: () => '/list',
      providesTags: ['File'],
    }),
    getRecentFiles: builder.query<FileItem[], void>({
      query: () => '/recent',
      providesTags: ['File'],
    }),
    getStarredFiles: builder.query<FileItem[], void>({
      query: () => '/starred',
      providesTags: ['File'],
    }),
    getTrashedFiles: builder.query<FileItem[], void>({
      query: () => '/trash',
      providesTags: ['File'],
    }),
    uploadFile: builder.mutation<FileItem, FormData>({
      query: (formData) => ({
        url: '/upload',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['File'],
    }),
    deleteFile: builder.mutation<void, string>({
      query: (fileId) => ({
        url: `/${fileId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['File'],
    }),
    starFile: builder.mutation<void, string>({
      query: (fileId) => ({
        url: `/${fileId}/star`,
        method: 'PATCH',
      }),
      invalidatesTags: ['File'],
    }),
  }),
});

export const {
  useGetFilesQuery,
  useGetRecentFilesQuery,
  useGetStarredFilesQuery,
  useGetTrashedFilesQuery,
  useUploadFileMutation,
  useDeleteFileMutation,
  useStarFileMutation,
} = filesApi;
