var gulp = require("gulp"),
    config = require('./build-config.json'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    cssBase64 = require('gulp-css-base64'),

    minifyHTML = require('gulp-minify-html'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    htmlreplace = require('gulp-html-replace'),
    less = require("gulp-less"),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');


var buildPath = config.buildPath,
	lessSrc = config.lessSrc;
	

gulp.task('htmlreplace',  function() {
  gulp.src('public/index.html')
    .pipe(htmlreplace({
        'css': 'css/main.min.css',
        'js': 'js/all.min.js'
    }))
    .pipe(gulp.dest(buildPath))
    .pipe(minifyHTML({quotes: true, empty:true, spare: true }))
    .pipe(gulp.dest(buildPath));
});

// gulp.task('html', ["htmlreplace"], function() {
//   return gulp.src('public/views/**/*.html')
//     .pipe(minifyHTML({quotes: true, empty:true, spare: true }))
//     .pipe(gulp.dest(buildPath+"views"));
// });

gulp.task('less', function () {
    return gulp.src(lessSrc) // path to your file
    // .pipe(sourcemaps.init())
    .pipe(less())
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/.temp/'));
});

// not working with dynamic content
gulp.task('uncss', ["less"], function() {
    gulp.src('public/.temp/main.css')
        .pipe(uncss({
            html: ['public/index.html']
        }))
        .pipe(gulp.dest('public/css'));
});

gulp.task('lint',["concatjs"], function() {
  return gulp.src("public/js/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


gulp.task('concatjs', function() {
    return gulp.src(config.jsSrc)    
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest(buildPath+'js/'))
        .pipe(gulp.dest(buildPath+'js/'))
        .pipe(uglify())
        .pipe(gulp.dest(buildPath+'js/'))
});


// gulp.task('ngmin', ["concatjs"], function () {
//     gulp.src(buildPath+'js/all.js')
//         .pipe(ngmin())
//         .pipe(gulp.dest(buildPath+'js/all-min.js'));
// });

// gulp.task('compressjs', function() {
//   gulp.src(buildPath+'js/all.js')
//     .pipe(uglify())
//     .pipe(gulp.dest(buildPath+'js/'));
// });


gulp.task('cssBase64', ["less"], function () {
    return gulp.src('public/.temp/main.css')
        .pipe(cssBase64())
        .pipe(gulp.dest('public/css/'));
});


gulp.task('cssmin', ["less"], function () {
         gulp.src('public/css/main.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(buildPath+'css'));
});

gulp.task("watch", function(){
	gulp.watch("public/less/**/*.less", ["cssBase64"]);
    gulp.watch(config.jsSrc, ["concatjs"]);
});

gulp.task('move', ["imagemin"], function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(config.filesToMove, { base: 'public/' })
  .pipe(gulp.dest(buildPath));
});

gulp.task('imagemin', function () {
    return gulp.src('public/images/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(buildPath+"images/"));
});

// gulp.task('templateCache', ["html"], function () {
//     return gulp.src(buildPath+'views/partials/*.html')
//         .pipe(templateCache({module: "techmApp"}))
//         .pipe(gulp.dest('app/vendor/'));
// });

gulp.task("default", [ "less", "cssBase64", "cssmin", "lint", "htmlreplace", "concatjs", "move"]);