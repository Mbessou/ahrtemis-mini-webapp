const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const port = process.env.BACKEND_PORT;
const router = require('./routes/contact.routes');

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(cors());

app.use('/', router);

app.listen(port || 4000, () => {
    console.log(`Example app listening on port ${port}`);
});
