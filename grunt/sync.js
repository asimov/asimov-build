/* jshint strict:false */
module.exports = function(grunt) {

    var path = require('path'),
        _ = require('lodash');

    grunt.config('sync', {
        dist: {
            files: _.map(grunt.config.get('asimov.components'), function(item) {
                return {
                    expand: true,
                    cwd: item.replace(/\/[^\/]+\/?$/, ''),
                    src: ['**', '!**/scss/**', '!**/js/**', '!**/docs/**'],
                    dest: 'dist',
                    filter: function(src) {
                        return grunt.file.isFile(src);
                    },
                    rename: function(dest, src) {
                        return [dest, src.replace(/asimov-[^/]+\/src\//, '')]
                            .join(path.sep);
                    }
                };
            })
        }
    });

};
