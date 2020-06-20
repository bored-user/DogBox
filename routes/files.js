const router = require('./_router');

router.get('/assets/media/:type/:file', ({ params: { type, file } }, res) => res.sendFile(`${global.root}/assets/media/${type}/${file}`));
module.exports = router;