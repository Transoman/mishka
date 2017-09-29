var gulp 				 = require('gulp'),
		sass 				 = require('gulp-sass'),
		concat 			 = require('gulp-concat'),
		spritesmith  = require('gulp.spritesmith'),
		autoprefixer = require('autoprefixer'),
		cssmin 			 = require('gulp-cssmin'),
		rename 			 = require('gulp-rename'),
		postcss 		 = require('gulp-postcss'),
		mqpacker 		 = require('css-mqpacker'),
		imagemin 		 = require('gulp-imagemin'),
		svgstore 		 = require('gulp-svgstore'),
		svgmin 			 = require('gulp-svgmin'),
		del 				 = require('del'),
		run 				 = require('run-sequence'),
		plumber 		 = require('gulp-plumber'),
		cheerio = require('gulp-cheerio'),
		browserSync  = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
		// tunnel: 'sedona',
		notify: false
	});
});


gulp.task('styles', function() {
	return gulp.src('app/sass/style.sass')
	.pipe(plumber())
	.pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
	.pipe(postcss([
			autoprefixer({
				browsers: ['last 3 versions'],
				cascade: false
			}),
			mqpacker({
				sort: true
			})
		]))
	.pipe(gulp.dest('app/css'))
	.pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

gulp.task('sprite', function() {
	var spriteData = gulp.src('img/sprite/*.png')
		.pipe(spritesmith({
		/* this whole image path is used in css background declarations */
		imgName: '../img/sprite.png',
		cssName: 'sprite.sass'
		}));
	spriteData.img.pipe(gulp.dest('img'));
	spriteData.css.pipe(gulp.dest('sass'));
});


gulp.task('symbols', function() {
	return gulp.src('app/img/icon/*.svg')
		.pipe(svgmin())
		.pipe(svgstore({
			inlineSvg: true
		}))
		.pipe(cheerio({
			run: function($) {
				$('[fill]').removeAttr('fill');
				$('[style]').removeAttr('style');
				$('[class]').removeAttr('class');
				$('title').remove();
				$('defs').remove();
				$('style').remove();
				$('svg').attr('style', 'display:none');
			}
		}))
		.pipe(rename('symbols.html'))
		.pipe(gulp.dest('app/img'));
});

gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.sass', ['styles']);
	gulp.watch('app/*.html').on("change", browserSync.reload);
	gulp.watch('app/js/common.js').on("change", browserSync.reload);
});


/* Project transfer to prodaction */
gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('images', function() {
	return gulp.src('app/img/**/*.{png,jpg,gif}')
		.pipe(imagemin([
			imagemin.optipng({optimizationLevel: 3}),
			imagemin.jpegtran({progressive: true})
		]))
		.pipe(gulp.dest('dist/img'))
});

gulp.task('svg', function() {
	return gulp.src('app/img/*.svg')
		.pipe(svgmin())
		.pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['clean', 'styles', 'images', 'svg'], function(){
	gulp.src(['app/css/style.min.css'])
		.pipe(gulp.dest('dist/css'));

	gulp.src(['app/fonts/**/*'])
		.pipe(gulp.dest('dist/fonts'));

	gulp.src(['app/js/**/*'])
		.pipe(gulp.dest('dist/js'));

	gulp.src(['app/*.html'])
		.pipe(gulp.dest('dist'));
});


gulp.task('default', ['styles', 'browser-sync', 'watch']);