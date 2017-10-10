const gulp = require('gulp');
/* const babel = require('gulp-babel'); */
const gulpsync = require('gulp-sync')(gulp);
const clean = require("gulp-clean");

//Clean
gulp.task("clean", () => {
  return gulp.src("result", { read: false })
    .pipe(clean({ force: true }));
});
//  Copy
gulp.task("copy:html", () => {
  return gulp.src("./**/*.html")
    .pipe(gulp.dest("result"));
});
gulp.task("copy:templates", () => {
  return gulp.src("views/templates/**/*.handlebars")
    .pipe(gulp.dest("result/views/templates"));
});
gulp.task("copy:lib", () => {
  return gulp.src("lib/**/*")
    .pipe(gulp.dest("result/lib"));
});
gulp.task("copy:assets", () => {
  return gulp.src(["assets/**/*", "!assets/scripts/**"])
    .pipe(gulp.dest("result/assets"));
});
gulp.task("copy", gulpsync.sync(["copy:html", "copy:templates", "copy:lib", "copy:assets"]));


// compile
gulp.task("compile:js", () => {
  return gulp.src(["*/**/*.js", '!node_modules/**', '!*/node_modules/**', '!result/**'])

    // .pipe(babel({
    //   "presets": ['es2015'], //modules: false
    //   // plugins: ['transform-runtime']
    //   //    plugins: ["transform-runtime"]
    // }))

    .pipe(gulp.dest("result"));
});
gulp.task("compile", gulpsync.sync(["compile:js"]));

// minify
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin'),
  //uglify = require('gulp-uglify'),
  pump = require('pump');
const uglify = require('gulp-uglify-es').default;

gulp.task('mincss', function () {
  gulp.src('assets/css/*.css')
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('result/assets/css'))
  // .pipe(plugins.uglify().on('error', pipes.showErrors))
});
gulp.task('imagemin', () =>
  gulp.src('assets/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('result/assets/images'))
);
gulp.task('compress:js', function (cb) {
  pump([
    gulp.src(['result/**/*.js', '!result/lib/node_modules/systemjs-plugin-babel/**'])
      // uglify(),//lib/node_modules/systemjs-plugin-babel
      .pipe(uglify(/* options */)),
    gulp.dest('result')
  ],
    cb
  );
});
gulp.task("minify", ["mincss", "imagemin", "compress:js"]);

//  Final
gulp.task("build", gulpsync.sync(["clean", "compile", "copy", "minify"]));

//Watch
gulp.task('watch', function () {
  // Watch .js files
  gulp.watch('*/**/*.js', ['js']);

});
gulp.task('default', ['watch']);

