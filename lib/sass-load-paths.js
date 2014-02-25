
//
// Create a array of paths to be passed to sass' --load-path
//

module.exports = function(grunt) {
    'use strict';

    return [
        // Add the bower_components directory to the load path
        //
        // This directory can be changed in .bowerrc so lets ask bower
        // where its directory is

        '<%= asimov.bowerConfig.directory %>',
        //
        // Add asimov-core to the load path
        //

        '<%= asimov.bowerConfig.directory %>/asimov-core/src'
    ]

    //
    // Add the installed Asimov components to the load path
    //

    .concat(grunt.config.get('asimov.components'));
};
