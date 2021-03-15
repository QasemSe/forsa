var gulp = require("gulp"),
    gutil = require("gulp-util"),
    config = require("./config.json")

// Global variables
global.config = config

gutil.log(gutil.colors.green("Starting Gulp!!"))

const autoPrefixTasks = require("./gulp-tasks/autoprefix")(gulp)
const cssTasks = require("./gulp-tasks/css")(gulp)
const scssTasks = require("./gulp-tasks/scss")(gulp)
const htmlBeautifyTasks = require("./gulp-tasks/beautify")(gulp)
const serverTask = require("./gulp-tasks/server")(gulp)
const uglifyTask = require("./gulp-tasks/uglify")(gulp)
const jsCopyTasks = require("./gulp-tasks/copy")(gulp)

// Watch changes on scss & html
gulp.task(
    "watch",
    gulp.parallel(
        scssTasks.watch,
        htmlBeautifyTasks.watch,
        jsCopyTasks.watch
    )
)

// Html Beautify
gulp.task(
    "html", htmlBeautifyTasks.html
)

gulp.task(
    "purge-css", cssTasks.purge_css
)

// Sass Compile
gulp.task(
    "sass-compile",
    gulp.parallel(
        scssTasks.main,
        scssTasks.pages,
        scssTasks.plugins,
        scssTasks.themes,
        scssTasks.rtl
    )
)

// CSS Distribution Task
gulp.task(
    "dist-css",
    gulp.series(
        "sass-compile",
        cssTasks.purge_css,
        autoPrefixTasks.css,
        cssTasks.css_comb,
        cssTasks.css_min,
        cssTasks.css_rtl,
        cssTasks.css_rtl_min
    )
)

// Js Distribution Task
gulp.task(
    "dist-js",
    uglifyTask.js
)

gulp.task (
    "server",
    serverTask.server
)

gulp.task("default", gulp.parallel("html", "sass-compile", "dist-css"))
