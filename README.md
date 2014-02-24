asimov-build
============

> [Grunt](http://gruntjs.com) tasks to compile an [Asimov](http://asimov.io) project.

### Getting started

Install asimov-build via npm

```bash
npm install asimov-build --save-dev
```

Add the following following config keys fo your `Gruntfile.js` with the corresponding locations for your application.

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

Then require asimov-build to bootstrap the process. Make sure you do this **after** calling `grunt.initConfig`.

```js
require('asimov-build')(grunt);
```

### Example

An example setup might look like this

```js
module.exports = function(grunt) {
    'use strict';

    //
    // Initialize config
    //

    grunt.initConfig({

        // Your sass config here
        ....

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
            }
        }

    });

    // Bootstrap asimov-build.
    //
    // Always load this after calling `grunt.initConfig`
    // or bad things _will_ happen!

    require('asimov-build')(grunt);

};
```
