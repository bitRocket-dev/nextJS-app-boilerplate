/** @format */

module.exports = {
  i18n: {
    locales: ['default', 'it', 'en'],
    defaultLocale: 'default',
    localeDetection: true,
  },
  railingSlash: true,
  domains: [
    {
      // Note: subdomains must be included in the domain value to be matched
      // e.g. www.example.com should be used if that is the expected hostname
      domain: 'example.com',
      defaultLocale: 'en',
    },
    {
      domain: 'example.it',
      defaultLocale: 'it',
    },
  ],
};
