/* jshint strict:false */
module.exports = function(grunt) {

    var path = require('path');

    grunt.config('autoprefixer', {
        options: {
            browsers: [
                'last 2 version',
                'Firefox ESR',
                'BlackBerry 10',
                'Android 4',
                'Explorer 8',
                'Explorer 9',
                'Opera 12.1'
            ]
        },
        dist: {
            src: path.join(
                '<%= paths.css.dist %>',
                '*!(.min).css'
            )
        }
    });

};
