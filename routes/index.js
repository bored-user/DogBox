const express = require('express'),
    router = express.Router();

// Importing controllers
const index = require('../controllers/indexController'),
    browse = require('../controllers/browseController'),
    watch = require('../controllers/watchController'),
    files = require('../controllers/filesController');

router.get('/', index);
router.get('/browse/:type*', browse);
router.get('/watch/:type/:file*', watch);
router.get('/assets/media/*', files);

module.exports = router;
