var 	gulp 					= require('gulp'),
		browserSync 			= require('browser-sync'),
		sass 					= require('gulp-sass'),
		autoprefixer 			= require('gulp-autoprefixer'),
		uglify 					= require('gulp-uglify'),
		imagemin				= require('gulp-imagemin'),
		concat 					= require('gulp-concat'),
		minifyHTML 				= require('gulp-minify-html');

gulp.task('browser-sync', function(){
	browserSync.init({
		server: {
			baseDir: "./app"
		}
	});
});

gulp.task('sass', function(){
	gulp.src('source/sass/**/*.sass')
		.pipe(sass({
			includePaths: ['sass'],
			onError: browserSync.notify
		}))
		.pipe(autoprefixer({
			browsers: ['last 12 versions'],
			cascade: true
		}))
		.pipe(sass(({outputStyle: 'compressed'})))
		.pipe(gulp.dest('./app/css'))
		.pipe(browserSync.stream());
});

gulp.task('js', function(){
	gulp.src('source/js/**/*.js')
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./app/js'))
		.pipe(browserSync.stream());
});

gulp.task('imagemin', function(){
	gulp.src('source/img/**/*')
		.pipe(imagemin({
			progressive: true,
			interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
		}))
		.pipe(gulp.dest('./app/images'))
		.pipe(browserSync.stream());
});

gulp.task('minify-html', function(){
	gulp.src('source/*.html')
		.pipe(minifyHTML({empty: true}))
		.pipe(gulp.dest('./app'))
		.pipe(browserSync.stream());
});

gulp.task('watch', function() {
	gulp.watch('source/sass/**/*.sass', ['sass'] 		);
	gulp.watch('source/js/**/*.js', 	['js'] 			);
	gulp.watch('source/img/**/*', 		['imagemin']	);
	gulp.watch('source/fonts/**/*', 	['fonts']		);
	gulp.watch('source/*.html', 		['minify-html']	);
});

gulp.task('default', [ 'browser-sync', 'watch', 'imagemin', 'minify-html', 'js', 'sass' ]);