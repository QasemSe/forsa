var autoprefixer = require("gulp-autoprefixer")

module.exports = function (gulp, callback) {
    const autoPrefixCssTask = function () {
        return gulp
            .src(["**/*.css", "!**/*.min.css"], {cwd: config.destination.path})
            .pipe(
                autoprefixer({
                    cascade: false
                })
            )
            .pipe(gulp.dest(config.destination.path))
    }

    return {
        css: autoPrefixCssTask
    }
}
