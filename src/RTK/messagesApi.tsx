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
  endpoints: (builder) => ({
    getAllMessages: builder.query<Message[], void>({
      query: () => "messages",
      transformResponse: (response: any) => response.data,
    }),
    createMessage: builder.mutation<Message, Partial<Message>>({
      query: (newMessage) => ({
        url: "messages",
        method: "POST",
        body: newMessage,
      }),
    }),
    updateMessage: builder.mutation<
      Message,
      { id: string; updatedMessage: Partial<Message> }
    >({
      query: ({ id, updatedMessage }) => ({
        url: `messages/${id}`,
        method: "POST",
        body: updatedMessage,
      }),
    }),
    deleteMessage: builder.mutation<void, string>({
      query: (id) => ({
        url: `messages/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllMessagesQuery,
  useCreateMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = messagesApi;
