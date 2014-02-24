/* jshint strict:false */
module.exports = function(grunt) {

    var path = require('path');

    // Create a array of paths to be passed to sass' --load-path
    function getSassLoadPaths(grunt) {
        return [
            '<%= paths.css.src %>',
            // The bower_components can be changed in .bowerrc so
            // lets ask bower where it's directory is
            '<%= asimov.bowerConfig.directory %>',
            // Allow @import "docs/assets/scss/docs" in docs themes
            '<%= asimov.bowerConfig.directory %>/asimov-core/src'
        ].concat(grunt.config.get('asimov.components'));
    }

    grunt.config('sass', {
        options: {
            style: 'expanded',
            lineNumbers: false,
            trace: true,
            loadPath: getSassLoadPaths(grunt),
            cacheLocation: '.build/.sass-cache',
            bundleExec: true
        },
        dist: {
            files: [{
                expand: true,
                cwd: '<%= paths.css.src %>',
                src: ['*.scss'],
                dest: '<%= paths.css.dist %>',
                ext: '.css'
            }]
        }
    });

};
