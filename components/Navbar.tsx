import { FC, useState } from 'react';
import { useLogout } from '../hooks';
import { toast } from 'react-hot-toast';

export const Navbar: FC = () => {
  const logout = useLogout();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  return (
    <nav className="px-10 h-16 top-0 py-10 left-0 w-full">
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
  );
};
