require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./models');
const handle = require('./handlers');
const routes = require('./routes');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.json({
  hello: 'world'
}));
app.use('/api/auth', routes.auth);
app.use('/api/polls', routes.poll);

// ERRORS
app.use(handle.notFound);
app.use(handle.errors);

app.listen(port, console.log(`Server is running on port ${port}`));