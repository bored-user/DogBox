const express = require('express'),
    mustache = require('mustache-express'),
    index = require('./routes/index'),
    browse = require('./routes/browse'),
    watch = require('./routes/watch'),
    files = require('./routes/files');

const app = express();
app.use('/', index);
app.use('/browse/shows /browse/movies /browse/musics /browse/books', browse);
app.use('/watch', watch);
app.use('/assets', files);

app.engine('mst', mustache());
app.set('view engine', 'mst');
app.set('views', `${__dirname}/views`);

global.root = __dirname;
module.exports = app;