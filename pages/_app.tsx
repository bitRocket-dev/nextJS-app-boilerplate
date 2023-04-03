/** @format */
/* eslint-disable import/no-unresolved */

import '@/styles/globals.css';
import { useEffect, useState } from 'react';

import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import { SwitchTheme } from '../common/components-shared/SwitchTheme';
import { ThemeProvider } from '../common/theme/Provider';
import { utilityGetTheme } from '../common/utils/utilityGetTheme';

const App = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const storageTheme = utilityGetTheme() || 'dark';
    setTheme(storageTheme);
  }, []);

  return (
    <ThemeProvider themeSelected={theme}>
      <SwitchTheme theme={theme} setTheme={setTheme} />
      <Component {...pageProps} />;
    </ThemeProvider>
  );
};

export default appWithTranslation(App);
