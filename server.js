const app = require('./app');

require('dotenv').config();
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => console.log(`Server running on port ${server.address().port}`));