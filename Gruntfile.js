
module.exports = function(grunt) {
    'use strict';

    //
    // Initialize config
    //

    grunt.initConfig({

        // Make some path information available to tasks
        //
        // Consumers of asimov-build should set these for their application

        paths: {
            css: {
                src: 'src/scss',
                dist: 'dist/css'
            },
            js: {
                src: 'src/js',
                dist: 'dist/js'
            },
            assets: {
                dist: 'dist'
            }
        }

    });

    // Bootstrap asimov-build.
    //
    // Always load this after calling `grunt.initConfig`
    // or bad things _will_ happen!

    require('./index.js')(grunt);

};
