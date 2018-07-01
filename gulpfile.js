'use strict';
const templater = require('./build/templater.js');
const fs = require('fs');
const gulp = require('gulp');
const gutil = require('gulp-util');
const gulpStylus = require('gulp-stylus');

const STYLUS = 'styles/*.styl';
const TEMPLATES = '**/*.hbs';
const MAIN_TEMPLATE = 'index.hbs';
const DATA = 'data/*.yml';

const OUTPUT_HTML = 'index.html';
const OUTPUT_STYLES = 'styles/';

gulp.task('template', () => {
    try {
        templater(MAIN_TEMPLATE, OUTPUT_HTML)
    } catch (e) {
        // Delete the index.html file to make it clear that the templating failed
        deleteIfExists(OUTPUT_HTML);

        gutil.log(gutil.colors.red(`Deleting ${OUTPUT_HTML} since templating failed`));
        throw e;
    }
});

gulp.task('stylus', () =>
    gulp.src(STYLUS)
        .pipe(gulpStylus())
        .pipe(gulp.dest(OUTPUT_STYLES))
);

gulp.task('build', ['template', 'stylus']);

gulp.task('watch', ['template', 'stylus'], () => {
    gulp.watch([TEMPLATES, DATA], ['template']);
    gulp.watch(STYLUS, ['stylus'])
});

function deleteIfExists(filename) {
    try {
        fs.unlinkSync(filename);
    } catch (e) {
        if (e.code !== 'ENOENT') {
            throw e;
        }
    }
}
