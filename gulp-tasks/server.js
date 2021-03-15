var gulp = require('gulp');
var liveServer = require('gulp-live-server');


module.exports = function (gulp, callback) {
    const liveServerTask = function () {
        //1. serve with default settings
        var server = liveServer.static(); //equals to gls.static('public', 3000);
        server.start();

        //2. serve at custom port
        var server = liveServer.static('dist', 8888);
        server.start();
    }

    return {
        server: liveServerTask
    }
}