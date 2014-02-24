/* jshint strict:false */
module.exports = function(grunt) {

    // RequireJS task settings
    //
    // If we're compiling asimov-core then we only need to compile the one file
    // If we're compiling themes or components we need to walk directories to
    // find what modules we need to build
    var path = require('path'),
        _ = require('lodash'),
        fs = require('fs'),
        pkg = grunt.config.get('asimov.pkg'),
        bower = grunt.config.get('asimov.bower'),
        isTheme = bower.name.indexOf('-theme-') !== -1,
        options = {
            options: {
                logLevel: 3,
                optimize: 'none',
                keepBuildDir: true,
                removeCombined: true,
                shim: pkg.asimov.requirejs.shim || {},
                paths: _.merge({
                    jquery: 'empty:',
                    asimov: '<%= asimov.src %>/js/asimov'
                }, pkg.asimov.requirejs.paths)
            }
        }
    ;

    // Are we're compiling a asimov-core?
    //
    // Then we only need to compile core.js

    if (bower.name === 'asimov-core') {
        options = { all: _.merge({
            options: {
                baseUrl: 'src/js',
                name: 'asimov/core',
                out: 'dist/js/asimov/core.js'
            }
        }, options) };
    }

    // Are we're compiling a theme?
    //
    // Then we create requirejs modules for file to be compiled.
    // To do this we need to check all the installed components
    // to see if they have any javascript to compile.

    else if (isTheme) {

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

            options[componentName] = _.merge({
                options: {
                    // this line a work around for a bug in r.js
                    // https://github.com/jrburke/r.js/issues/587
                    // https://github.com/gruntjs/grunt-contrib-requirejs/issues/45
                    _buildPathToModuleIndex: [],

                    baseUrl: cwd,
                    dir: '<%= paths.js.dist %>',

                    // Set the component's shim and path configs
                    //
                    // These configs are stored as metadata in each
                    // component's package.json

                    shim: pkg.asimov.requirejs.shim || {},
                    paths: _.mapValues(
                        pkg.asimov.requirejs.paths || {},

                        // Adjust the path
                        //
                        // Component's expect to be compiled from their root
                        // directory. This isn't true when compiled from a theme

                        function(item) {
                            return '../../' + item;
                        }
                    ),

                    //
                    // These are the files that are actually beign compiled
                    //

                    modules: grunt.file.expand({ cwd: cwd }, '*.js')
                        .map(function (file) {
                            return { name: file.replace(/\.js$/, '') };
                        })
                }
            }, options);
        });
    }

    // Are we're compiling a component?
    //
    // We compile all the root level javascript files as modules.
    // This is what themes do, but they do it for all components.

    // I'm not sure this works since this refactor, and since no components
    // currently expect this behaviour I've disabled it for now.

    // else {
    //     options = { all: _.merge({
    //         options: {
    //             baseUrl: '<%= paths.js.src %>',
    //             dir: '<%= paths.js.dist %>',
    //             paths: pkg.asimov.requirejs.paths,
    //             modules: grunt.file.expand({ cwd: 'src/js' }, '*.js')
    //                 .map(function (file) {
    //                     return { name: file.replace(/\.js$/, '') };
    //                 })
    //         }
    //     }, options) };
    // }

    grunt.config('requirejs', options);

};
