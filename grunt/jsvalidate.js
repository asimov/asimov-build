/* jshint strict:false */
module.exports = function(grunt) {

    grunt.config('jsvalidate', {
        all: {
            files: [{
                expand: true,
                cwd: '<%= paths.js.src %>',
                src: ['**/*.js', '!**/vendor/**']
            }]
        }
    });

};
