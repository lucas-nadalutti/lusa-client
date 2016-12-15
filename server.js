var connect = require('connect');
var serveStatic = require('serve-static');

PORT = 8000

connect().use(serveStatic(__dirname)).listen(PORT, function(){
    console.log('Server running on ' + PORT);
});