
// TODO(xzyfer):
// make this return requirejs config objects so it's not tied to grunt

//
// Create an object of grunt-contrib-requirejs compilation targets
//

module.exports = function(grunt, defaults) {
    'use strict';

    var path = require('path'),
        _ = require('lodash'),
        components = {};

    defaults = defaults || grunt.config('requirejs.options');

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

            paths = _.mapValues(
                pkg.asimov.requirejs.paths || {},
                function(item) {
                    return '../../' + item.replace(
                        /bower_components/,
                        grunt.config.get('asimov.bowerConfig.directory')
                    );
                }
            )
        ;

        //
        // Create the requirejs config for a compilation target
        //

        components[componentName] = {
            options: {
                // this line a work around for a bug in r.js
                // https://github.com/jrburke/r.js/issues/587
                // https://github.com/gruntjs/grunt-contrib-requirejs/issues/45
                _buildPathToModuleIndex: [],

                baseUrl: cwd,
                dir: '<%= paths.js.dist %>',

                // Set the component's requirejs shim and path configs
                //
                // These configs are stored as metadata in each component's
                // package.json. They may need to be merged with the project's
                // default paths because file locations may be different in the
                // call project.

                shim: pkg.asimov.requirejs.shim || {},
                paths: _.merge(paths, defaults.options ? defaults.options.paths || {} : {}),

                //
                // These are the files that are actually beign compiled
                //

                modules: grunt.file.expand({ cwd: cwd }, '*.js')
                    .map(function (file) {
                        return { name: file.replace(/\.js$/, '') };
                    })
            }
        };
    });

    return components;
};
