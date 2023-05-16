import { DefaultSeoProps } from 'next-seo';

const NEXT_SEO_CONFIG = {
  titleTemplate:
    '%s - Fraud Busters | Machine Learning-Powered Payment Fraud Detection',
  defaultTitle:
    'Fraud Busters | Machine Learning-Powered Payment Fraud Detection',
  description: ` Explore Fraud Busters, a cutting-edge machine learning project designed to identify and combat payment fraud. Learn how our advanced algorithms and techniques help businesses detect fraudulent transactions and protect against financial losses.`,
  canonical: `https://www.fraud-busters.xyz`,
  openGraph: {
    type: 'website',
    title: 'Fraud Busters | Machine Learning-Powered Payment Fraud Detection',
    images: [
      {
        url: '/logo.png',
        width: 640,
        height: 640,
        alt: 'fraud-busters-logo',
      },
      {
        url: 'https://www.fraud-busters.xyz/logo.png',
        width: 640,
        height: 640,
        alt: 'fraud-busters-logo',
      },
    ],
    url: 'https://www.fraud-busters.xyz',
    locale: 'en_US',
    siteName: 'Fraud Busters',
  },
} as DefaultSeoProps;

export default NEXT_SEO_CONFIG;
