const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const database = require('./config/database');
const configureAuth = require('./config/auth');
const routes = require('./routes');

const app = express();

// configuration setup
dotenv.config();
database.connect();
configureAuth();

// set app middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

const port = process.env.PORT || 3300;

app.listen(port, () => {
  if (process.env.DEVELOPMENT) console.log(`App running on PORT: ${port}`);
});
