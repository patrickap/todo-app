import { TodoStatus } from '../constants';
import { ValueOf } from './value-of';

type Todo = {
  id: string;
  userId: string;
  createdAt: number;
  updatedAt: number;
  status: ValueOf<typeof TodoStatus>;
  title: string;
  description: string;
};

export type { Todo };
