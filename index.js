/* global process */
module.exports = function(grunt) {
    'use strict';

    var matchdep = require('matchdep'),
        _ = require('lodash'),
        path = require('path'),
        base = process.cwd(),

        //
        // Where can I find asimov-build?
        //

        asimovBuildPath = path.resolve(
            grunt.file.readJSON('./package.json').name === 'asimov-build' ?
            '.' :
            'node_modules/asimov-build'
        ),

        //
        // Load asimov-build's grunt config from whereever it's installed
        //

        buildConfig = require(asimovBuildPath + '/grunt/config/asimov')(grunt)
    ;

    return {
        bootstrap: function() {
            //
            // Set asimov-build's grunt config under the `asimov` namespace
            //

            grunt.config.set('asimov', buildConfig.asimov);

            //
            // Load asimov-build's grunt tasks from whereever it's installed
            //

            grunt.loadTasks(asimovBuildPath + '/grunt');

            //
            // Load asimov-build's npm tasks
            //

            matchdep.filterDev('grunt-!(cli)', asimovBuildPath + '/package.json')
                .forEach(function (task) {
                    // need to temporarily change base for grunt.loadNpmTasks to work
                    grunt.file.setBase(asimovBuildPath);
                    grunt.loadNpmTasks(task);
                    grunt.file.setBase(base);
                });
        },

        getSassLoadPaths: function() {
            return require('./lib/sass-load-paths')(grunt);
        },

        getRequireJSComponents: function(defaults) {
            return require('../lib/requirejs-components')(grunt, defaults);
        }
    };

};
