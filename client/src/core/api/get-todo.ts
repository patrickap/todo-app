import axios from 'axios';
import urlcat from 'urlcat';
import { IO } from 'moneo-ts';
import { Todo } from '../../types';

/**
 * Get todo from server.
 *
 * @param id
 * @returns async io either axios response or throwable
 */
const getTodo = (id: string) =>
  IO.async(async () => {
    const url = urlcat(import.meta.env.VITE_API_BASE_URL, `/todo/${id}`);
    return axios.get<Todo>(url);
  }).either();

export { getTodo };