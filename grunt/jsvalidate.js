/* jshint strict:false */
module.exports = function(grunt) {

    //
    // If jsvalidate is already in use we shouldn't need to change anything
    //

    if (!grunt.config('jsvalidate')) {
        grunt.config('jsvalidate', {
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
