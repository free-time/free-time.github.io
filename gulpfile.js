var gulp 			= require ( 'gulp' ),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	sass 				= require('gulp-sass'),
	imagemin 		= require('gulp-imagemin'),
	concat 			= require('gulp-concat'),
	uglify 			= require('gulp-uglify'),
	cp 					= require('child_process');

var messages = {
	jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/* Build the Jekyll Site */
gulp.task('jekyll-build', function (done) {
	browserSync.notify(messages.jekyllBuild);
	return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
		.on('close', done);
});

/* Rebuild Jekyll & do page reload */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
	browserSync.reload();
});

/* Wait for jekyll-build, then launch the Server */
gulp.task('browser-sync', ['jekyll-build'], function() {
	browserSync({
		server: {
			baseDir: '_site'
		}
	});
});

/* Compiled sass*/
gulp.task('sass', function () {
  return gulp.src('_sass/main.scss')
    .pipe(sass({
        includePaths: ['scss'],
        onError: browserSync.notify
    }))
    .pipe(autoprefixer({
      browsers: ['last 12 versions'],
      cascade: false
    }))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('imagemin', function(){
	gulp.src('src/image/**/*.{jpg,png,svg,jpeg}')
	.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
	.pipe(gulp.dest('assets/image'));
});

/* Compiled Javascript */
gulp.task('js', function(){
	return gulp.src('src/js/*.js')
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('_site/assets/js'))
		.pipe(browserSync.reload({stream:true}))
		.pipe(gulp.dest('assets/js'));
});

gulp.task('fonts', function(){
	return gulp.src('src/fonts/*')
		.pipe(gulp.dest('assets/fonts'))
});
gulp.task( 'watch', function(){
	gulp.watch('_sass/**/*.scss', ['sass']);
	gulp.watch('src/image/**/*.{jpg,png,svg,jpeg}', ['imagemin']);
	gulp.watch('src/js/**/*.js', ['js']);
	gulp.watch('src/fonts/', ['fonts']);
	gulp.watch(['*.html', '_layouts/*.html', '_posts/*', '_includes/*'], ['jekyll-rebuild']);
});

gulp.task( 'default', ['imagemin','browser-sync', 'watch', 'fonts'] );
