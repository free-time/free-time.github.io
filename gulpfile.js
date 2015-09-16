var gulp = require ( 'gulp' );
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var notify = require( 'gulp-notify' );

gulp.task( 'scripts', function(){
	gulp.src( './assets/js/*.js' )
	.pipe( concat( 'main.js' ) )
	.pipe(uglify())
	.pipe( gulp.dest('./app/js/') )
	.pipe( notify( 'Minificado com sucesso!!!' ) );
});

gulp.task( 'imagemin', function(){
	gulp.src('assets/image/**/*.{jpg,png,svg}')
	.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
	.pipe(gulp.dest('app/image'))
	.pipe( notify( 'Imagens compreessas com sucesso!!!' ) );
});

gulp.task( 'watch', function(){
	gulp.watch( '_site/assets/js/*.js', ['scripts'] );
	gulp.watch( 'assets/image/**/*.{jpg,png,svg}', ['imagemin'] );
});

gulp.task( 'default', ['watch'] );