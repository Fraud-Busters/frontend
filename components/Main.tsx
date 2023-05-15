import { FC, useState } from 'react';
import { useAuth, useLogout } from '../hooks';
import { toast } from 'react-hot-toast';
import axios from '../api/axios';

export const Main: FC = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  return (
    <>
      <nav className="px-10 h-16 fixed top-0 py-10 left-0 w-full">
        <ul className="flex justify-between h-full items-center">
          <li>FB</li>
          <li>
            <button
              className={`btn btn-accent ${
                isLoggingOut ? 'btn-disabled cursor-not-allowed' : ''
              }`}
              disabled={isLoggingOut}
              onClick={() => {
                setIsLoggingOut(true);
                toast
                  .promise(logout(), {
                    loading: 'Logging out...',
                    success: 'Logged out successfully',
                    error: 'Logging out failed',
                  })
                  .finally(() => {
                    setIsLoggingOut(false);
                  });
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <div className="flex w-full min-h-screen flex-col justify-center items-center">
        <header>
          <h1 className="text-4xl text-center">Welcome to Fraud Busters!</h1>
          <h2 className="text-center text-2xl mt-5">You are logged in</h2>
          <h2 className="text-center text-2xl mt-5">
            Your username is {auth?.user?.username}
          </h2>
        </header>
      </div>
    </>
  );
};
