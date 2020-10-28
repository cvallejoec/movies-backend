require('dotenv').config();

module.exports = {
  server: {
    mode: process.env.ENV || 'production',
    port: process.env.PORT || 9000,
    host: process.env.HOST || '127.0.0.1',
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
};
