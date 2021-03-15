var csscomb = require("gulp-csscomb")
var cssmin = require("gulp-cssmin")
var rename = require("gulp-rename")
var rtlcss = require("gulp-rtlcss")
var purgecss = require("gulp-purgecss")

module.exports = function(gulp, callback) {
    const cssCombTask = function () {
        return gulp
            .src(['**/*.css', '!**/*.min.css'], { cwd: config.destination.path })
            .pipe(csscomb())
            .pipe(gulp.dest(config.destination.path))
    }

    const cssMinTask = function () {
        return gulp
            .src(['**/*.css', '!**/*.min.css'], { cwd: config.destination.css })
            .pipe(cssmin())
            .pipe(rename({ suffix: ".min" }))
            .pipe(gulp.dest(config.destination.css))
    }

    const cssMinRtlTask = function() {
        return gulp
            .src(["**/*.css", "!**/*.min.css"], { cwd: config.destination.css_rtl })
            .pipe(cssmin())
            .pipe(rename({ suffix: ".min" }))
            .pipe(gulp.dest(config.destination.css_rtl))
    }

    const cssRtlTask = function () {
        return gulp
            .src([
                config.destination.css + "/**/*.css",
                config.destination.css + "!/**/*.min.css"
            ])
            .pipe(rtlcss())
            .pipe(gulp.dest(config.destination.css_rtl))
    }

    const purgeCssTask = function () {
        return gulp
            .src(config.destination.css + "/**/*.css")
            .pipe(
                purgecss(
                {
                    content: [config.destination.html + "/ltr/index.html"],
                    safelist: ['stay', 'swiper-slide-active', 'navbar-dark']
                }
            ))
            .pipe(gulp.dest(config.destination.css))
    }


    // Exports ---------------------
    return {
        css_comb: cssCombTask,
        css_min: cssMinTask,
        css_rtl_min: cssMinRtlTask,
        css_rtl: cssRtlTask,
        purge_css: purgeCssTask
    }
}
