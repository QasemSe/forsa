const uglify = require("gulp-uglify")
const rename = require("gulp-rename")

module.exports = function (gulp, callback) {
    const uglifyJsTasks = function () {
        return gulp
            .src(['**/*.js', '!**/*.min.js'], {cwd: config.destination.js})
            .pipe(uglify())
            .on("error", function(err) {
                console.log("\x1b[31m", err.toString())
            })
            .pipe(rename({ suffix: ".min" }))
            .pipe(gulp.dest(config.destination.js))
    }

    // Export
    return {
        js: uglifyJsTasks
    }
}