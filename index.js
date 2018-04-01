require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const documents = require('./routes/documents');
const users = require('./routes/users');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

app.use(bodyParser.json());

app.use('/documents', documents);
app.use('/users', users);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
