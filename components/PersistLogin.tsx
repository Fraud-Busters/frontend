import { useState, useEffect, FC } from 'react';
import { useAuth, useRefreshToken } from '../hooks';
import { Spinner } from './Spinner';

export const PersistLogin: FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen min-w-full grid place-items-center">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </>
  );
};
