const withImages = require('next-images');

const redirects = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboards',
        permanent: true
      }
    ];
  }
};

module.exports = withImages(redirects);
