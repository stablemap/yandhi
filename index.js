const express = require('express');
const bodyParser = require('body-parser')

const shoesRouter = require('./routes/shoes');

const app = express();

app.use(bodyParser.json());

app.use('/shoes', shoesRouter);

module.exports = app;
