const express = require('express');

const shoesRouter = require('./routes/shoes');

const app = express();

app.use('/shoes', shoesRouter);

module.exports = app;
