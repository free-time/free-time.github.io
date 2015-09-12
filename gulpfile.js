var gulp = require ( 'gulp' );
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var notify = require( 'gulp-notify' );

gulp.task( 'scripts', function(){
	gulp.src( './assets/js/*.js' )
	.pipe( concat( 'main.js' ) )
	.pipe( gulp.dest('./app/js/') )
	.pipe( notify( 'Minificado com sucesso!!!' ) );
});


gulp.task( 'watch', function(){
	gulp.watch( '_site/assets/js/*.js', ['scripts'] );
});

gulp.task( 'default', ['watch'] );