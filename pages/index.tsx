import type { NextPage } from 'next';

import { useAuth } from '../hooks';
import { Login, Main } from '../components';

const Home: NextPage = () => {
  const { auth } = useAuth();

  return (
    <div className="min-h-screen min-w-full">
      {auth.accessToken ? <Main /> : <Login />}
    </div>
  );
};

export default Home;
