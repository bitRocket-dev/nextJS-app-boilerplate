/** @format */
import { NextPageContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticPaths = () => ({
  paths: [
    { params: { name: 'sviluppatori' }, locale: 'it' },
    { params: { name: 'developers' }, locale: 'en' },
  ],
  fallback: false,
});

export async function getStaticProps({ locale }: NextPageContext) {
  if (!locale) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default () => {
  const { t } = useTranslation('common');

  return <h1>{t('title')}</h1>;
};
