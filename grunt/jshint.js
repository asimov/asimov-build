/* jshint strict:false */
module.exports = function(grunt) {

    //
    // If jshint is already in use we shouldn't need to change anything
    //

    if (!grunt.config('jshint')) {
        grunt.config('jshint', {
            options: '<%= jshintrc %>',
            all: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.js.src %>',
                    src: ['**/*.js', '!**/vendor/**']
                }]
            }
        });
    }
};
