/* jshint strict:false */
module.exports = function(grunt) {

    grunt.config('cssmin', {
        dist: {
            expand: true,
            cwd: '<%= paths.css.dist %>',
            src: ['**/*.css', '!*.min.css'],
            dest: '<%= paths.css.dist %>',
            ext: '.min.css'
        }
    });

};
