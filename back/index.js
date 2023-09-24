const express = require('express');
const app = express();
const port = process.env.BACKEND_PORT;
const router = require('./routes/contact.routes');

app.use('/', router);

app.listen(port || 4000, () => {
  console.log(`Example app listening on port ${port}`);
});
