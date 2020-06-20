const router = require('./_router');

router.get('/assets/media/*', ({ originalUrl }, res) => res.sendFile(global.root + originalUrl));
module.exports = router;