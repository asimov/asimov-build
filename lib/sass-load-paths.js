
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

        '<%= asimov.bowerConfig.directory %>'
    ];
};
