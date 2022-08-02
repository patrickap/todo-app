import { createContext, ReactNode, useState } from 'react';
import {
  _useRefresh,
  _useSignIn,
  _useSignOut,
  _useSignUp,
} from '../hooks/use-auth';
import { AccessTokenPayload } from '../types/access-token';
import { decodeJWT } from '../utils';

// provider for react-query useMutation hooks to share state between components
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [timeoutId, setTimeoutId] = useState<number>();

  const signUp = _useSignUp();
  const signIn = _useSignIn({
    onMutate: () => clearTimeout(timeoutId),
    onSuccess: ({ data }) => {
      const accessToken = data?.accessToken!;
      const accessTokenPayload = decodeJWT<AccessTokenPayload>(accessToken);
      const accessTokenExpiresOn = accessTokenPayload.exp! * 1000;
      const expirationDelta = accessTokenExpiresOn - Date.now();
      const timeout = expirationDelta > 0 ? expirationDelta - 60 * 1000 : 0;

      // auto refresh token before expiration
      setTimeoutId(
        setTimeout(() => {
          refresh.mutate();
        }, timeout),
      );
    },
  });
  const signOut = _useSignOut({
    onSuccess: () => clearTimeout(timeoutId),
  });
  const refresh = _useRefresh({
    onError: () => clearTimeout(timeoutId),
    onSuccess: () => signIn.mutate(),
  });

  const accessToken = signIn.data?.data?.accessToken;
  const { id, username } = decodeJWT<AccessTokenPayload>(accessToken!);

  const user = {
    id,
    username,
    accessToken,
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        refresh,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
const AuthContext = createContext<{
  signUp?: ReturnType<typeof _useSignUp>;
  signIn?: ReturnType<typeof _useSignIn>;
  signOut?: ReturnType<typeof _useSignOut>;
  refresh?: ReturnType<typeof _useRefresh>;
  user?: { id?: string; username?: string; accessToken?: string };
}>({});

export { AuthContext, AuthProvider };
