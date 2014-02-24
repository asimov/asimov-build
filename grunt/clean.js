/* jshint strict:false */
module.exports = function(grunt) {

    grunt.config('clean', {
        dist: [
            '<%= paths.css.dist %>',
            '<%= paths.js.dist %>'
        ],
        docs: ['docs/*'],
        build: ['.build/*']
    });

};
