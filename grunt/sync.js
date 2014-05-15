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
                cwd: item,
                src: ['*/**', '!**/*.scss', '!**/*.js', '!**/docs/**'],
                dest: grunt.config('paths.assets.dist'),
                filter: function(src) {
                    return grunt.file.isFile(src);
                }
            };
        })
    });

    if (grunt.config('asimov.sync.js') === true) {
        grunt.config('sync.asimov-js', {
            files: _.map(grunt.config('asimov.components'), function(item) {
                return {
                    expand: true,
                    cwd: item,
                    src: ['**/*.js'],
                    dest: grunt.config('paths.assets.dist'),
                    filter: function(src) {
                        return grunt.file.isFile(src);
                    }
                };
            })
        });
    }

};
