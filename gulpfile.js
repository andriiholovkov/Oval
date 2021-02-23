const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const include = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const concat = require('gulp-concat');
const imagemin = require("gulp-imagemin");
const sync = require('browser-sync').create();

function html() {
  return src('app/**html')
  .pipe(include({
    prefix: '@@'
  }))
  .pipe(htmlmin({
    collapseWhitespace: true
  }))
  .pipe(dest('dist'))
}

function scss() {
  return src('app/scss/**.scss')
  .pipe(sass())
  .pipe(autoprefixer({
    overrideBrowserslist: ["last 2 version"],
    cascade: false,
  }))
  .pipe(csso())
  .pipe(concat('index.css'))
  .pipe(dest('dist'))
}

function images() {
  return src("app/img/**/*")
    .pipe(imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest("dist/img"));
}

function svg() {
  return src("app/svg/**/*")
    .pipe(dest("dist/svg"));
}

function clear() {
  return del('dist')
}

function start() {
  sync.init({
    server: './dist'
  })

  watch('app/**.html', series(html)).on('change', sync.reload),
  watch('app/scss/**.scss', series(scss)).on('change', sync.reload)
}

exports.build = series(clear, scss, html, images, svg)
exports.start = series(clear, scss, html, images, svg, start)
exports.clear = clear;
