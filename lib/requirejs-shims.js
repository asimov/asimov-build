
// TODO(xzyfer):
// make this return requirejs config objects so it's not tied to grunt

//
// Create an object of shims for requirejs
//

module.exports = function(grunt, defaults) {
    'use strict';

    var path = require('path'),
        _ = require('lodash'),
        shims = {};

    // Find all the root level javascript files in each component
    //
    // These are the files we'll actually compile. They should be resolving
    // their dependencies locally given the paths and metadata at correct.

    grunt.file.expand(
        { cwd: grunt.config.get('asimov.bowerConfig.directory') },
        'asimov-*/src/js/*.js'
    )
    .forEach(function(file) {
        var componentName = file.split('/')[0],

            // Figure out this component's directory
            //
            // It will become the `baseUrl` for the requirejs module

            cwd = path.join(
                grunt.config.get('asimov.bowerConfig.directory'),
                componentName,
                '/src/js'
            ),

            // Load this component's package.json
            //
            // We currently store asimov metadata for requirejs in there

            pkg = _.merge(
                grunt.file.readJSON(path.join(cwd, '../../package.json')),
                { asimov: { requirejs: {} } }
            )
        ;

        // Get the component's requirejs `shim` config
        //
        // This config is stored as metadata in a component's
        // package.json.

        shims = _.merge(shims, pkg.asimov.requirejs.shim || {});
    });

    return shims;
};
