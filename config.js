require('dotenv').config();

module.exports = {
  server: {
    mode: process.env.ENV || 'production',
    port: process.env.PORT || 9000,
    host: process.env.HOST || '127.0.0.1',
  },
};
