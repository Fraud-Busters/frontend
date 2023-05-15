import { FC, useState } from 'react';
import axios from '../api/axios';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../hooks';

export const Login: FC = () => {
  const { setAuth } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast
      .promise(
        axios.post(
          '/auth/login',
          {
            username,
            password,
          },
          {
            withCredentials: true,
          }
        ),
        {
          loading: 'Loading...',
          success: (res) => {
            const { data } = res.data;
            setAuth({
              accessToken: data.accessToken,
              user: data.user,
            });
            return 'Login Successfully';
          },
          error: (err) => {
            let msg = 'Something went wrong';
            if (err instanceof AxiosError) {
              const code: string = err.response?.data.error.code;

              const codes: { [key: string]: string } = {
                'auth/username-not-found': 'Invalid username',
                'auth/invalid-password': 'Invalid password',
              };

              msg = codes[code] ?? msg;

              console.log(err.response?.data);
            }

            return msg;
          },
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex w-full min-h-screen flex-col justify-center items-center">
      <header>
        <h1 className="text-4xl text-center">Welcome to Fraud Busters!</h1>
        <h2 className="text-center text-2xl mt-5">Login</h2>
      </header>

      <main className="w-full grid place-items-center">
        <form
          onSubmit={handleSubmit}
          className="flex form-control mt-2 flex-col justify-center md:w-1/4 max-w-md"
        >
          <div>
            <label className="label" htmlFor="username">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="DharmaIsOP"
              className="input input-bordered w-full input-primary"
              id="username"
              name="username"
              autoComplete="on"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="my-4">
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="DharmaIsOP"
              className="input input-bordered w-full input-primary"
              id="password"
              name="password"
              autoComplete="on"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className={`btn-primary btn ${loading ? 'loading' : ''}`}
            type="submit"
            disabled={loading}
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
};
