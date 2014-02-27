/* jshint strict:false */
module.exports = function(grunt) {

    var path = require('path'),
        _ = require('lodash');

    //
    // It's really important that this happens so it's not optional atm
    //

    grunt.config('sync.asimov', {
        files: _.map(grunt.config('asimov.components'), function(item) {
            return {
                expand: true,
                cwd: item.replace(/\/[^\/]+\/?$/, ''),
                src: ['**', '!**/scss/**', '!**/js/**', '!**/docs/**'],
                dest: grunt.config('paths.assets.dist'),
                filter: function(src) {
                    return grunt.file.isFile(src);
                }
            };
        })
    });

};
