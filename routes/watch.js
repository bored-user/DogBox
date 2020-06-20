const router = require('./_router'),
    fs = require('fs');

router.get('/watch/:type/:file*', ({ originalUrl, params: { type, file } }, res) => {
    const path = `${global.root}/assets/media/${originalUrl.replace('/watch/', '')}`;
    console.log(path);

    fs.stat(path, (err, stats) => {
        if (stats === undefined)
            res.render('errors/404');
        else if (stats.isDirectory()) {
            fs.readdir(path, (err, files) => {
                files = files.map(file => ({ name: file, path: path, type: type })).filter(file => file.name !== '.gitkeep');
                res.render('media', { files: files, type: file, accent: type === 'shows' ? 'purple' : type === 'movies' ? 'yellow' : type === 'books' ? 'lightblue' : 'lightgreen' });
            });
        } else
            res.render('watch', { uri: `/assets/media/${originalUrl.replace('/watch/', '')}`, tag: type === 'shows' || type === 'movies' ? 'video' : 'audio' })
    });
});

module.exports = router;