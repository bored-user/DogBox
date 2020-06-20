const router = require('./_router'),
    fs = require('fs');

router.get('/browse/:type', ({ params: { type } }, res) => {
    fs.readdir(`${global.root}/assets/media/${type}/`, (err, files) => {
        files = files.map(file => ({ name: file, path: `${global.root}/assets/media/${type}/${file}`, type: type })).filter(file => file.name !== '.gitkeep');
        res.render(`media`, { files: files, type: type, accent: type === "shows" ? "purple" : type === "movies" ? "bisque" : type === "books" ? "lightblue" : "lightgreen" });
    });
});

module.exports = router;