/* jshint strict:false */
module.exports = function(grunt) {

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
};
