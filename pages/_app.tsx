import { NextPage } from 'next';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import '../styles/globals.css';
import { StoreProvider } from '../utils/Store';
import { MyAppProps } from '../types';

const MyApp: NextPage<MyAppProps> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />{' '}
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
      </StoreProvider>
    </SessionProvider>
  );
}
const Auth: FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
    },
  });
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  return children;
};

export default MyApp;
