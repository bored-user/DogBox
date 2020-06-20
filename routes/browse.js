const router = require('./_router'),
    fs = require('fs');

router.get('/browse/:type*', ({ originalUrl, params: { type } }, res) => {
    const path = `${global.root}/assets/media/${originalUrl.replace('/browse/', '')}`,
        accent = originalUrl.includes('/browse/shows') ? 'purple' : originalUrl.includes('/browse/movies') ? 'yellow' : originalUrl.includes('/browse/books') ? 'lightblue' : 'lightgreen'

    fs.readdir(path, (err, result) => {
        if (result === undefined || err) {
            res.render('errors/401');
            return;
        }

        const files = [];
        result.indexOf('.gitkeep') > -1 ? result.splice(result.indexOf('.gitkeep'), 1) : null;

        try {
            for (file of result) {
                const stats = fs.statSync(`${path}/${file}`);
                if (stats === undefined || err) {
                    throw new Error();
                }

                files.push({ path: stats.isDirectory() ? `${originalUrl}/${file}` : `${originalUrl.replace('/browse/', '/watch/')}/${file}`, name: file });
            };
        } catch (e) {
            res.render('errors/404');
        }

        res.render('media', { files: files, type: type, accent: accent });
    });
});

module.exports = router;