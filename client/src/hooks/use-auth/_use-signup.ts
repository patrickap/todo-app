import { UseMutationOptions, useMutation } from 'react-query';
import { signUp } from '../../api';
import { MutationKey } from '../../constants';
import { SuccessResponse, ErrorResponse, User } from '../../types';

const _useSignUp = (
  options?: UseMutationOptions<
    SuccessResponse,
    ErrorResponse,
    Pick<User, 'username' | 'password'>
  >,
) => {
  const mutation = useMutation<
    SuccessResponse,
    ErrorResponse,
    Pick<User, 'username' | 'password'>
  >({
    ...options,
    mutationKey: [MutationKey.SIGN_UP],
    mutationFn: (user) => signUp.map((r) => r.data).run(user),
  });

  return mutation;
};

export { _useSignUp };
