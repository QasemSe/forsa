var gulp = require("gulp")
var htmlbeautify = require("gulp-html-beautify")
const cssTasks = require("../gulp-tasks/css")(gulp)


module.exports = function (gulp, callback) {
    const beautifyHtmlTask = function () {
        return gulp
            .src(config.source.html + "/**/*.html")
            .pipe(htmlbeautify({ indentSize: 2 }))
            .pipe(gulp.dest(config.destination.html))
    }

    const htmlWatchTask = function () {
        return gulp.watch(
            config.source.html + "/**/*.html",
            gulp.series(
                gulp.parallel (
                    beautifyHtmlTask
                ),
                cssTasks.purge_css
            )
        )
    }


    // Export ---------------
    return {
        html: beautifyHtmlTask,
        watch: htmlWatchTask
    }
}