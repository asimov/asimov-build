/* jshint strict:false */
module.exports = function(grunt) {

    //
    // If clean is already in use we shouldn't need to change anything
    //

    if (!grunt.config('clean')) {
        grunt.config('clean', {
            dist: [
                '<%= paths.css.dist %>',
                '<%= paths.js.dist %>'
            ],
            docs: ['docs/*'],
            build: ['.build/*']
        });
    }

};
