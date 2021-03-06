const gulp = require('gulp');
const del = require('del');
const gulpNodemon = require('gulp-nodemon');
const gulpTypescript = require('gulp-typescript');
const mocha = require('gulp-mocha');

const DIST_FOLDER = './bin';
const tsProject = gulpTypescript.createProject('tsconfig.json');

const cleanProjectDist = () => {
    return del(`${DIST_FOLDER}/**/*`);
};

const copyData = () => {
    return gulp.src(['src/**/*.json'])
        .pipe(gulp.dest(`${DIST_FOLDER}`));
}

const buildProject = () => {
    return gulp.src(['typings/**/*.ts', 'src/**/*.ts'])
        .pipe(tsProject())
        .pipe(gulp.dest(`${DIST_FOLDER}`));
};

const startApp = (done) => {
    return gulpNodemon({
        exec: 'node --inspect=5858',
        ignore: '*',
        script: `${DIST_FOLDER}/index.js`,
        env: { 'NODE_ENV': 'development' },
        done: done
    });
};

const testApp = () => {
    return gulp
        .src([`${DIST_FOLDER}/**/test/**/*.js`], {read: false})
		.pipe(mocha({reporter: 'list', exit: true}))
		.on('error', console.error)
}

gulp.task('clean', cleanProjectDist);
gulp.task('copy-data', copyData);
gulp.task('build', gulp.series(['clean', 'copy-data'], buildProject));
gulp.task('start', gulp.series(['build', 'copy-data'], startApp));
gulp.task('test', gulp.series(['build', 'copy-data'], testApp));
