import { DefaultSeo } from 'next-seo';
import Head from 'next/head';

import NEXT_SEO_CONFIG from './config';

const DefaultSEO: React.FC = () => {
  return (
    <>
      <DefaultSeo {...NEXT_SEO_CONFIG} />
      <Head>
        <meta
          property="twitter:image"
          content="https://www.vitio.xyz/logo-seo.png"
        />
      </Head>
    </>
  );
};

export default DefaultSEO;
