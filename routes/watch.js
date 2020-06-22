const router = require('./_router'),
    fs = require('fs');

router.get('/watch/:type/:file*', ({ originalUrl, params: { type, file }, query }, res) => {
    originalUrl = originalUrl.split('?')[0];
    const path = `${global.root}/assets/media/${originalUrl.replace('/watch/', '')}`;
    console.log(path);

    fs.stat(path, (err, stats) => {
        if (stats === undefined || err)
            res.render('errors/404');
        else if (stats.isDirectory()) {
            fs.readdir(path, (err, files) => {
                files = files.map(file => ({ name: file, path: path, type: type })).filter(file => file.name !== '.gitkeep');
                res.render('browse', { files: files, type: file, accent: type === 'shows' ? 'purple' : type === 'movies' ? 'yellow' : type === 'books' ? 'lightblue' : 'lightgreen' });
            });
        } else
            res.render('watch', { sub: query.sub || false, uri: `/assets/media/${originalUrl.replace('/watch/', '')}`, tag: type === 'shows' || type === 'movies' ? 'video' : 'audio' })
    });
});

module.exports = router;
