// Gulp loader

const {
    src,
    dest,
    task,
    watch,
    series,
    parallel
} = require('gulp');

// --------------------------------------------
// Dependencies
// --------------------------------------------

// CSS / SASS plugins
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let minifycss = require('gulp-clean-css');

// JSS / plugins
let uglify = require('gulp-uglify');

// Utility plugins
let concat = require('gulp-concat');
let del = require('del');
let plumber = require('gulp-plumber');
let sourcemaps = require('gulp-sourcemaps');
let rename = require('gulp-rename');
let buffer = require('vinyl-buffer');
let source = require('vinyl-source-stream');

// Browser plugins
let browserSync = require('browser-sync').create();

// Images plugins
let images = require('gulp-imagemin');


// Project Variables

let styleSrc = 'source/sass/**/*.sass';
let styleDest = 'build/assets/css/';

let vendorSrc = 'source/js/vendors/';
let vendorDest = 'build/assets/js/';

let jsSRC = 'app.js';
let jsFolder = 'source/js/';
let jsFILES = [jsSRC];
let scriptSrc = 'source/js/**/*.js';
let scriptDest = 'build/assets/js/';

let htmlSrc = 'source/';
let htmlDest = 'build/';




// --------------------------------------------
// Stand Alone Tasks
// --------------------------------------------


// Compiles SASS files
function css(done) {
    src(styleSrc)
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass({
            errorLogToConsole: true,
            style: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(dest('build/assets/css'));
    done();
};


// Images
function img(done) {
    src('source/img/*')
        .pipe(images())
        .pipe(dest('build/assets/img'));
    done();
};

// Uglify js files
function js(done) {
    jsFILES.map(function (entry) {
        return browserify({
                entries: [jsFolder + entry]
            })
            .transform(babelify, {
                presets: ['@babel/preset-env']
            })
            .bundle()
            .pipe(source(entry))
            .pipe(rename({
                extname: '.min.js'
            }))
            .pipe(buffer())
            .pipe(sourcemaps.init({
                loadMaps: true
            }))
            .pipe(uglify())
            .pipe(plumber())
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(dest(scriptDest));
    })
    done();
};

//Concat and Compress Vendor .js files
function vendor(done) {
    src(
            [
                'source/js/vendors/jquery.min.js',
                'source/js/vendors/*.js'
            ])
        .pipe(plumber())
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(dest(scriptDest));
    done();
};

// Watch for changes
function watcher() {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./build"
        },
        notify: false
    });

    watch(styleSrc, series(css));
    watch(scriptSrc, series(js));
    watch(vendorSrc, series(vendor));
    watch(['build/*.html', 'build/assets/css/*.css', 'build/assets/js/*.js', 'build/assets/js/vendors/*.js']).on('change', browserSync.reload);

};


// use default task to launch Browsersync and watch JS files
let build = parallel(watcher);
task('default', build);
task('img', img);