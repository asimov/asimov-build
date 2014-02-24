/* jshint strict:false */
module.exports = function(grunt) {

    grunt.config('uglify', {
        dist: {
            expand: true,
            cwd: '<%= paths.js.dist %>',
            src: ['**/*.js', '!*.min.js'],
            dest: '<%= paths.js.dist %>',
            ext: '.min.js'
        }
    });

};
