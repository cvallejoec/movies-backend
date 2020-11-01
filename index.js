const app = require('./api/index');
const config = require('./config');
require('dotenv').config();

const PORT = process.env.PORT || 9001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
