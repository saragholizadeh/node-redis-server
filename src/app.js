const express = require('express');
const interceptor = require('./common/middleware/interceptor');
const loadModules = require('./modules/loader');
const errorHandler = require("./common/errors/all-errors");

const app = express();
app.use(express.json());
app.use(interceptor);

loadModules(app, __dirname + '/modules');

app.use(errorHandler);

module.exports = app;
