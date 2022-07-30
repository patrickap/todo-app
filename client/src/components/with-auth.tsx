import { ReactNode, useEffect } from 'react';
import { useAuth } from '../hooks/use-auth';
import { SignIn } from '../pages';
import { Spinner } from './spinner';

const Auth = (props: { children: ReactNode }) => {
  const { signIn } = useAuth();

  useEffect(() => {
    signIn?.mutate();
  }, []);

  return signIn?.isLoading ? (
    <div className='absolute top-0 left-0 -z-10 flex h-screen w-screen items-center justify-center text-center text-gray-300'>
      <Spinner />
    </div>
  ) : signIn?.isError ? (
    <SignIn />
  ) : signIn?.isSuccess ? (
    <>{props.children}</>
  ) : null;
};

const withAuth = (component: ReactNode) => {
  return <Auth>{component}</Auth>;
};

export { withAuth, Auth };