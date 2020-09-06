module.exports = ({ originalUrl }, res) => res.sendFile(global.root + originalUrl);
