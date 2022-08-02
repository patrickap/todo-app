import axios, { AxiosResponse } from 'axios';
import urlcat from 'urlcat';
import { IO } from 'moneo-ts';
import { ErrorResponse, SuccessResponse, Todo } from '../types';

/**
 * Add todo to server.
 *
 * @param todo
 * @returns async io either axios response or throwable
 */
const addTodo = IO.async(
  async (todo: Omit<Todo, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    const url = urlcat(import.meta.env.VITE_API_BASE_URL, '/todos');
    return axios.post<
      never,
      AxiosResponse<SuccessResponse, ErrorResponse>,
      typeof todo
    >(url, todo);
  },
);

/**
 * Get todo from server.
 *
 * @param id
 * @returns async io either axios response or throwable
 */
const getTodo = IO.async(async (id: string) => {
  const url = urlcat(import.meta.env.VITE_API_BASE_URL, `/todos/${id}`);
  return axios.get<never, AxiosResponse<SuccessResponse<Todo>, ErrorResponse>>(
    url,
  );
});

/**
 * Get all todos from server.
 *
 * @returns async io either axios response or throwable
 */
const getTodos = IO.async(async () => {
  const url = urlcat(import.meta.env.VITE_API_BASE_URL, '/todos');
  return axios.get<
    never,
    AxiosResponse<SuccessResponse<Todo[]>, ErrorResponse>
  >(url);
});

/**
 * Remove todo from server.
 *
 * @param todo
 * @returns async io either axios response or throwable
 */
const removeTodo = IO.async(async ({ id }: Todo) => {
  const url = urlcat(import.meta.env.VITE_API_BASE_URL, `/todos/${id}`);
  return axios.delete<never, AxiosResponse<SuccessResponse, ErrorResponse>>(
    url,
  );
});

/**
 * Update todo on server.
 *
 * @param todo
 * @returns async io either axios response or throwable
 */
const updateTodo = IO.async(async (todo: Todo) => {
  const url = urlcat(import.meta.env.VITE_API_BASE_URL, `/todos/${todo.id}`);
  return axios.put<never, AxiosResponse<SuccessResponse, ErrorResponse>, Todo>(
    url,
    todo,
  );
});

export { addTodo, getTodo, getTodos, removeTodo, updateTodo };
