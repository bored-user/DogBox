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

        const files = [],
            gitkeep = result.indexOf('.gitkeep'),
            png = result.indexOf('cover.png'),
            jpg = result.indexOf('cover.jpg');

        gitkeep > -1 ? result.splice(gitkeep, 1) : null;
        png > -1 ? result.splice(png, 1) : null;
        jpg > -1 ? result.splice(jpg, 1) : null;

        try {
            for (file of result) {
                if (file.includes('vtt'))   continue;

                const stats = fs.statSync(`${path}/${file}`);
                if (stats === undefined || err) {
                    throw new Error();
                }

                if (stats.isDirectory()) {
                    const temp = {
                        path: `${originalUrl}/${file}`,
                        name: `> ${file}`
                    }

                    if (fs.existsSync(`${path}/${file}/cover.jpg`)) {
                        files.push(Object.assign(temp, { cover: `/assets/media/${originalUrl.replace('/browse/', '')}/${file}/cover.jpg`}));
                    } else if (fs.existsSync(`${path}/${file}/cover.png`)) {
                        files.push(Object.assign(temp, { cover: `/assets/media/${originalUrl.replace('/browse/', '')}/${file}/cover.png`}));
                    } else {
                        files.push(Object.assign(temp, { cover: false}));
                    }
                } else {
                    let sub = false,
                        path = `/assets/media/${originalUrl.replace('/browse/', '')}/${file.split('.')[0]}.vtt`;

                    if (fs.existsSync(global.root + path))
                        sub = path;

                    files.push({ path: `${originalUrl.replace('/browse/', '/watch/')}/${file}`, name: file, sub: sub });
                }
            };
        } catch (e) {
            res.render('errors/404');
        }

        res.render('browse', { files: files, type: type, accent: accent });
    });
});

module.exports = router;
