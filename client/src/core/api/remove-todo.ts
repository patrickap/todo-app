import axios, { AxiosResponse } from 'axios';
import urlcat from 'urlcat';
import { IO } from 'moneo-ts';
import { Error, Todo } from '../../types';

/**
 * Remove todo from server.
 *
 * @param todo
 * @returns async io either axios response or throwable
 */
const removeTodo = IO.async(async ({ id }: Todo) => {
  const url = urlcat(import.meta.env.VITE_API_BASE_URL, `/todos/${id}`);
  return axios.delete<never, AxiosResponse<unknown, Error>>(url);
});

export { removeTodo };
