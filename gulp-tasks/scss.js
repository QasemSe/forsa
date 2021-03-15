var gulp = require("gulp")
var sass = require("gulp-sass")

const cssTasks = require("../gulp-tasks/css")(gulp)
const autoPrefixTasks = require("../gulp-tasks/autoprefix")(gulp)

module.exports = function (gulp, callback) {
    const scssMainTask = function () {
        return gulp
            .src(
                ["theme.scss"], { cwd: config.source.sass }
            )
            .pipe(sass().on("error", sass.logError))
            .pipe(gulp.dest(config.destination.css))
    }

    const scssPagesTask = function () {
        return gulp
            .src(config.source.sass + "/pages/**/*.scss")
            .pipe(sass().on("error", sass.logError))
            .pipe(gulp.dest(config.destination.css + "/pages/"))
    }

    const scssPluginsTask = function () {
        return gulp
            .src(config.source.sass + "/plugins/**/*.scss")
            .pipe(sass().on("error", sass.logError))
            .pipe(gulp.dest(config.destination.css + "/plugins/"))
    }

    const scssThemesTask = function () {
        return gulp
            .src(config.source.sass + "/themes/**/*.scss")
            .pipe(sass().on("error", sass.logError))
            .pipe(gulp.dest(config.destination.css + "/themes/"))
    }

    const scssRtlTask = function() {
        return gulp
            .src(config.source.sass + "/custom-rtl.scss")
            .pipe(sass().on("error", sass.logError))
            .pipe(gulp.dest(config.destination.css_rtl))
    }

    const scssWatchTask = function () {
        return gulp.watch(
            config.source.sass + "/**/*.scss",
            gulp.series(
                gulp.parallel(
                    scssMainTask,
                    scssPagesTask,
                    scssPluginsTask,
                    scssThemesTask,
                    scssRtlTask
                ),
                cssTasks.css_comb,
                cssTasks.purge_css,
                autoPrefixTasks.css
            )
        )
    }

    // ---- Export --------------------------
    return {
        main: scssMainTask,
        pages: scssPagesTask,
        plugins: scssPluginsTask,
        themes: scssThemesTask,
        watch: scssWatchTask,
        rtl: scssRtlTask
    }
}