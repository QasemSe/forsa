module.exports = function (gulp, callback) {
    const jsCopyTask = function () {
        return gulp
            .src(config.source.js + "/**/*.js")
            .pipe(gulp.dest(config.destination.js))
    }

    const jsWatchTask = function () {
        return gulp.watch(
            config.source.js + "/**/*.js",
            gulp.series(
                jsCopyTask
            )
        )
    }

    // Export
    return {
        js: jsCopyTask,
        watch: jsWatchTask
    }
}