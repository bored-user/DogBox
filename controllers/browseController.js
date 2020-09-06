module.exports = ({ originalUrl, params: { type } }, res) => {
    const fs = require('fs'),
        path = `${global.root}/assets/media/${originalUrl.replace('/browse/', '')}`,
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
                if (file.includes('.vtt')) continue;

                const stats = fs.statSync(`${path}/${file}`);
                if (stats === undefined || err) {
                    throw new Error();
                }

                if (stats.isDirectory()) {
                    const contents = fs.readdirSync(`${path}/${file}`),
                        png = contents.indexOf('cover.png'),
                        jpg = contents.indexOf('cover.jpg');

                    files.push({
                        path: `${originalUrl}/${file}`,
                        name: `> ${file}`,
                        cover: png > -1 ? `/assets/media/${originalUrl.replace('/browse/', '')}/${file}/cover.png` : jpg > -1 ? `/assets/media/${originalUrl.replace('/browse/', '')}/${file}/cover.jpg` : false
                    });
                } else {
                    const path = `/assets/media/${originalUrl.replace('/browse/', '')}/${file.split('.')[0]}.vtt`;
                    files.push({
                        path: `${originalUrl.replace('/browse/', '/watch/')}/${file}`,
                        name: file,
                        sub: fs.existsSync(global.root + path) ? path : false
                    });
                }
            };
        } catch (e) {
            res.render('errors/404');
            return;
        }

        res.render('browse', { files: files, type: type, accent: accent });
    });
}
