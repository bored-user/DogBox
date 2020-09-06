const express = require('express'),
    mustache = require('mustache-express'),
    router = require('./routes/index');

const app = express();
app.use('/', router);
app.engine('mst', mustache());
app.set('view engine', 'mst');
app.set('views', `${__dirname}/views`);

global.root = __dirname;
module.exports = app;
