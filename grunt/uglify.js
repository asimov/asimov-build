/* jshint strict:false */
module.exports = function(grunt) {

    //
    // If uglify is already in use we shouldn't need to change anything
    //

    if (!grunt.config('uglify')) {
        grunt.config('uglify', {
            dist: {
                expand: true,
                cwd: '<%= paths.js.dist %>',
                src: ['**/*.js', '!*.min.js'],
                dest: '<%= paths.js.dist %>',
                ext: '.min.js'
            }
        });
    }

};
