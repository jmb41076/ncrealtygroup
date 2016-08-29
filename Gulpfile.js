'use strict';

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const serveFolder = `public`;

gulp.task('sass',()=>{
   console.log(`running sass...`);    
    
  return gulp.src('src/sass/**/*.scss') 
    .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({browsers:['last 2 version']}))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest(`${serveFolder}/css`))
    .pipe(browserSync.stream());
        
});

gulp.task('sass:watch',['sass'], ()=>{
   return gulp.watch('src/images/**/*',['sass']);
});

gulp.task('images', () => {
  return gulp.src('src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(`${serveFolder}/images`))
    .pipe(browserSync.stream());
});

gulp.task('images:watch',['images'], ()=>{
   return gulp.watch('src/images/**/*',['images']);
});

gulp.task('html', () => {
  return gulp.src('src/pages/**/*')
    .pipe(gulp.dest(`${serveFolder}`))
    .pipe(browserSync.stream());
});

gulp.task('html:watch',['html'],()=>{
    gulp.watch('src/pages/**/*',['html']);
});


gulp.task('js',() => {
    return gulp.src('src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify('main.js'))
    .pipe(gulp.dest(`${serveFolder}/js`))
    .pipe(browserSync.stream());
});

gulp.task('js:watch',['js'], ()=>{
   return gulp.watch('src/js/**/*.js',['js']);
});

// BrowserSync
gulp.task('serve', ['build'], () => {
  browserSync.init({
    server: {
      baseDir: `./${serveFolder}`
    }
  });
});

gulp.task('build',['sass:watch','html:watch','images:watch','js:watch'],() =>{
    console.log( `Default gulp task`);
});

gulp.task('default',['build']);
