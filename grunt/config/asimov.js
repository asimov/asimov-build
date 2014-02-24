/* global process */
module.exports = function(grunt) {
    'use strict';

    var _ = require('lodash'),
        glob = require('glob'),
        path = require('path'),
        base = process.cwd(),

        //
        // Load the authority bower config for future reference
        //

        bowerConfig = require('bower-config').read(),

        //
        // Load the local bower.json file for future reference
        //

        meta = grunt.file.readJSON('./bower.json'),

        //
        // Load the local package.json file for future reference
        //

        pkg = grunt.file.readJSON('./package.json'),

        //
        // Where can I find asimov-core?
        //

        asimovCorePath = path.resolve(meta.name === 'asimov-core' ?
            '.' :
            bowerConfig.directory + '/asimov-core'),

        //
        // Where can I find asimov-build?
        //

        asimovBuildPath = path.resolve(pkg.name === 'asimov-build' ?
            '.' :
            'node_modules/asimov-build'),

        // Create an array of installed asimov components
        //
        // Since bower installs dep flat rather than nested (like npm) we can
        // use simple globbing. Alternatively we could use bower.commands.list

        componentDirs = glob.sync(path.join(bowerConfig.directory, 'asimov-*'))
            .map(function (depPath) {
                return path.join(depPath, 'src', 'scss');
            })
    ;


    //
    // Return our config
    //

    return {
        asimov: {

            //
            // Make the local package.json available to tasks
            //

            pkg: _.merge(
                pkg,

                //
                // The RequireJS task expects this object to exists so we're
                // polyfilling it here rather than checking for existance later
                //

                { asimov: { requirejs: {} } }
            ),

            //
            // Make the local bower config available to tasks
            //

            bowerConfig: bowerConfig,

            //
            // Make the local bower.json available to tasks
            //

            bower: meta,

            // Load setting from .jshintrc
            //
            // If no local .jshintrc it exists, fallback to the
            // default one in asimov-build

            jshintrc: grunt.file.exists('.jshintrc') ?
                grunt.file.readJSON('.jshintrc') :
                grunt.file.readJSON(asimovBuildPath + '/.jshintrc'),

            //
            // Make some asimov specific config available to tasks
            //

            isCore: meta.name === 'asimov-core',
            core: asimovCorePath,
            build: asimovBuildPath,
            components: componentDirs,
            src: '<%= asimov.core %>/src'
        }
    };

};
