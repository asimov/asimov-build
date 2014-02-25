/* jshint strict:false */
module.exports = function(grunt) {

    //
    // If cssmin is already in use we shouldn't need to change anything
    //

    if (!grunt.config('cssmin')) {
        grunt.config('cssmin', {
            dist: {
                expand: true,
                cwd: '<%= paths.css.dist %>',
                src: ['**/*.css', '!*.min.css'],
                dest: '<%= paths.css.dist %>',
                ext: '.min.css'
            }
        });
    }

};
