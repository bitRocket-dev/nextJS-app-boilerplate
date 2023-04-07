/** @format */
/* eslint-disable import/no-unresolved */

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import { ThemeProvider } from '../common/theme/Provider';

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider>
    <Component {...pageProps} />;
  </ThemeProvider>
);

export default appWithTranslation(App);
