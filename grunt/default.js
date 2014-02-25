/* jshint strict:false */
module.exports = function(grunt) {

    grunt.registerTask('default', 'The default task', [
        // Reset environment

        'clean',

        // CSS compilation

        'sass',
        'autoprefixer',
        'cssmin',

        // Javscript QA

        'jsvalidate',
        'jshint',

        // Javscript compilation

        'requirejs',
        'uglify',

        // Copy component assets to the dist directory

        'sync'
    ]);

};
