var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");
var kit = require("gulp-kit");
var gcmq = require("gulp-group-css-media-queries");
var autoprefixer = require("gulp-autoprefixer");
var del = require("del");

sass.compiler = require("node-sass");
gulp.task("clean", function() {
  return del(["dest/**", "!dest", "!dest/img"]);
});
gulp.task("sass", function() {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gcmq())
    .pipe(gulp.dest("./dest/css"))
    .pipe(browserSync.stream());
});
gulp.task("kit", async function() {
  gulp
    .src(["./src/kit/*.kit", "src/kit/block/_*.kit"])
  .pipe(kit())
  .pipe(gulp.dest("./dest"))
 
});

gulp.task("serve", function() {
  browserSync.init({
    browser: "Google Chrome Canary",
    notify: false,
    server: "dest/"
  });
    gulp.watch("./src/scss/**/*.scss", gulp.series("sass"));
  gulp.watch(["./src/kit/*.kit","src/kit/block/_*.kit"], gulp.series("kit"));
  gulp.watch("./dest/*.html").on("change", browserSync.reload);
   
});

gulp.task("default", gulp.parallel("sass", "kit", "serve"));
