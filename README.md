asimov-build
============

> [Grunt](http://gruntjs.com) tasks to compile an [Asimov](http://asimov.io) project.

## Getting started

Install asimov-build via npm

```bash
npm install asimov-build --save-dev
```

Require asimov-build in your Gruntfile:

```js
var build = require('asimov-build')(grunt);
```

Add the following following config keys fo your `Gruntfile.js` with the corresponding source and destination file locations for your applications scss and js files.

```js
paths: {
    css: {
        src: 'src/scss',
        dist: 'dist/css'
    },
    js: {
        src: 'src/js',
        dist: 'dist/js'
    }
}
```

Some Asimov components will have their own assets like fonts or images. You can configure where they're copied with the `paths.assets.dist` key.

```
paths: {
    assets: {
        dist: 'dist'
    }
}
```

## Building Asimov

From here you can let asimov-build bootstrap Grunt with the necessary config and tasks for compiling Asimov.

Alternative if you're not using Grunt, or simply don't want any magic in your asset pipeline you can query the specific config you'll need to integrate Asimov if your application.

### API

The core things you'll need to get Asimov compiling are correctly configured Sass load paths, and RequireJS compilation targets.

#### getSassLoadPaths

Returns an array of path that need to be part of Sass' load_path config.

#### getRequireJSComponents

Returns an object of RequireJS configs. This can be passes directly to [grunt-contrib-requirejs](https://github.com/gruntjs/grunt-contrib-requirejs) or you can iterate over each key and pass it's to `requirejs.config()`.

This method optionally takes an object of r.js options which is use to normalise some configs like `paths`.

#### bootstrap

This is the simpliest way to get up with Asimov. It will load and configure a handful of grunt plugins with sane defaults.

If you Gruntfile already configures task asimov-build wants to bootstrap it will simply add any additionally required config.

**note** only ever call the bootstrap function after calling `grunt.initConfig`.

### Config flags

#### use_bundler

Type: bool
Default: true

Whether to use [bundler](http://bundler.io/) when running tasks that use ruby i.e. sass

### Example

An example setup might look like this

```js
module.exports = function(grunt) {
    'use strict';

    //
    // Initialize config
    //

    grunt.initConfig({

        // Your grunt config here


        // Make some path information available to tasks
        //
        // Consumers of asimov-build should set these for their application

        paths: {
            css: {
                src: 'src/scss',
                dist: 'dist/css'
            },
            js: {
                src: 'src/js',
                dist: 'dist/js'
            },
            assets: {
                dist: 'dist'
            }
        },

        //
        // Asimov build config
        //

        asimov_build: {
            use_bundler: false
        }

    });

    // Bootstrap asimov-build.
    //
    // Always run this after calling `grunt.initConfig`
    // or bad things _will_ happen!

    var build = require('asimov-build')(grunt);
    build.bootstrap();

};
```
