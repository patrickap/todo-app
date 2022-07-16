import { useMutation, UseMutationOptions } from 'react-query';
import { MutationKey } from '../constants';
import { addTodo } from '../core/api';
import { Error, Todo } from '../types';

const useAddTodo = (
  options?: UseMutationOptions<unknown, Error, Omit<Todo, 'id' | 'status'>>,
) => {
  const mutation = useMutation<unknown, Error, Omit<Todo, 'id' | 'status'>>({
    mutationKey: [MutationKey.ADD_TODO],
    mutationFn: (todo: Omit<Todo, 'id' | 'status'>) =>
      addTodo(todo)
        .either()
        .map((either) => either.map((response) => response.data))
        .map((either) =>
          either.fold(
            (data) => Promise.resolve(data),
            (error) => Promise.reject(error),
          ),
        )
        .run(),
    ...options,
  });

  return mutation;
};

export { useAddTodo };
