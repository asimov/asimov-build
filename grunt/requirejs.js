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

    // Are we're compiling something theme-like?
    //
    // Then we create requirejs modules for file to be compiled.
    // To do this we need to check all the installed components
    // to see if they have any javascript to compile.

    else {

        // Find all the root level javascript files in each component
        //
        // These are the files we'll actually compile. They should be resolving
        // their dependencies locally given the paths and metadata at correct.

        options = _.merge(
            options, require('../lib/requirejs-components')(grunt, options)
        );
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
