const app = require('./api/index');
const config = require('./config');

app.listen(config.server.port, config.server.host, () => {
  console.log(
    `Server running on http://${config.server.host}:${config.server.port}`
  );
});
