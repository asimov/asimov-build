
// TODO(xzyfer):
// make this return requirejs config objects so it's not tied to grunt

//
// Create an object of paths for requirejs
//

module.exports = function(grunt) {
    'use strict';

    var path = require('path'),
        _ = require('lodash'),
        paths = {};

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
            ),

            // Adjust the paths
            //
            // Component's expect to be compiled from their root
            // directory. This isn't true when compiled from a theme
            //
            // We also can't assume the bower components directory will be
            // `bower_components` so lets substitute it with the bower
            // components directory bower says is correct

            componentPaths = _.mapValues(
                pkg.asimov.requirejs.paths || {},
                function(item) {
                    return '../' + item.replace(
                        /bower_components/,
                        grunt.config.get('asimov.bowerConfig.directory')
                    );
                }
            )
        ;

        // Get the component's requirejs `paths` config
        //
        // This config is stored as metadata in a component's
        // package.json.

        paths = _.merge(paths, componentPaths);
    });

    return paths;
};
