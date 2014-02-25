/* jshint strict:false */
module.exports = function(grunt) {

    var _ = require('lodash'),
        sassLoadPaths = require('../lib/sass-load-paths')(grunt);

    // Has sass config already been set?
    //
    // Then we just need to monkey patching Asimov's load paths

    if (grunt.config('sass')) {
        grunt.config('sass.options.loadPath', _.merge(
            sassLoadPaths, grunt.config('sass.options.loadPath')
        ));
    }

    //
    // Otherwise lets create a sass task that does what we want
    //

    else {
        //
        // Application src directory should be last
        //
        sassLoadPaths = sassLoadPaths.concat('<%= paths.css.src %>');

        grunt.config('sass', {
            options: {
                style: 'expanded',
                loadPath: sassLoadPaths,
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
    }

};
