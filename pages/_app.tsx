import { PersistLogin } from '../components';
import { AuthProvider } from '../contexts';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <PersistLogin>
        <Toaster position="top-center" reverseOrder={false} />
        <Component {...pageProps} />
      </PersistLogin>
    </AuthProvider>
  );
}

export default MyApp;
