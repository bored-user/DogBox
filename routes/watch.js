const router = require('./_router'),
    fs = require('fs');

router.get('/watch/:type/:file', ({ params: { type, file } }, res) => {
    fs.stat(`${global.root}/assets/media/${type}/${file}`, (err, stats) => {
        if (stats.isDirectory()) {
            fs.readdir(`${global.root}/assets/media/${type}/${file}`, (err, files) => {
                files = files.map(file => ({ name: file, path: `${global.root}/assets/media/${type}/${file}`, type: type })).filter(file => file.name !== '.gitkeep');
                res.render(`media`, { files: files, type: file, accent: type === "shows" ? "purple" : type === "movies" ? "bisque" : type === "books" ? "lightblue" : "lightgreen" });
            });
        } else
            res.render('watch', { uri: `../../../assets/media/${type}/${file}`, tag: type === "shows" || type === "movies" ? "video" : "audio" })
    });
});
module.exports = router;