var gulp = require('gulp'),
 uglify = require('gulp-uglify'),
 rename = require('gulp-rename'),
 browserSync = require('browser-sync'),
 eslint = require('gulp-eslint'),
 sass = require('gulp-sass'),
 autoprefixer = require('gulp-autoprefixer'),
 cssnano = require('gulp-cssnano'),
 prettyError = require('gulp-prettyerror');

  const  input = '../project2/js/scripts.js',
  output = './js';

gulp.task('scripts', function() {
  gulp.src('./js/*.js') 
  .pipe(uglify()) 
  .pipe(rename({ extname: '.min.js' })) 
  .pipe(gulp.dest('./build/js'))
});


gulp.task('lint', function() {
  return gulp.src(['**/*.js','!node_modules/**'])
      .pipe(eslint())
      .pipe(eslint.format()) 
      .pipe(eslint.failAfterError());
});

gulp.task('watch', function() {
  gulp.watch('js/*.js', ['lint' ,'scripts']);
  gulp.watch('sass/*.scss', ['sass']);
  gulp.watch('js/*.js', ['scripts']);
});

gulp.task('say_hello', function(){
      console.log('Hello Hamdy!');
      gulp.watch('js/*.js', ['scripts']);
});

gulp.task('sass', function() {
  gulp.src('./sass/style.scss')
    .pipe(prettyError()) // Error handling 
     .pipe(sass())
     .pipe(autoprefixer({
        browsers: ['last 2 versions']
     }))
     .pipe(gulp.dest('./build/css'))
     .pipe(cssnano())
     .pipe(rename('style.min.css'))
     .pipe(gulp.dest('./build/css'));
});


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
      });
        gulp.watch(['*.html','build/css/*.css', 'build/js/*.js']).on('change', browserSync.reload);
    });
gulp.task('default', ['watch', 'browser-sync','scripts'] );

