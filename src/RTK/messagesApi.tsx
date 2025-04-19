import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Message {
  id: string;
  message: string;
}

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://biznesport-backend.onrender.com/",
  }),
  tagTypes: ["Messages"],

  endpoints: (builder) => ({
    getAllMessages: builder.query<Message[], void>({
      query: () => "messages",
      transformResponse: (response: any) => {
        return response.data.map((message: any) => ({
          ...message,
          id: message._id,
        }));
      },

      providesTags: ["Messages"],
    }),
    createMessage: builder.mutation<Message, Partial<Message>>({
      query: (newMessage) => ({
        url: "messages",
        method: "POST",
        body: newMessage,
      }),
      transformResponse: (response: any) => ({
        ...response.data,
        id: response.data._id,
      }),

      invalidatesTags: ["Messages"],
    }),
    updateMessage: builder.mutation<Message, { id: string; message: string }>({
      query: ({ id, message }) => ({
        url: `messages/${id}`,
        method: "POST",
        body: { message },
      }),
      transformResponse: (response: any) => ({
        ...response.data,
        id: response.data._id,
      }),

      invalidatesTags: ["Messages"],
    }),
    deleteMessage: builder.mutation<void, string>({
      query: (id) => ({
        url: `messages/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Messages"],
    }),
  }),
});

export const {
  useGetAllMessagesQuery,
  useCreateMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = messagesApi;
