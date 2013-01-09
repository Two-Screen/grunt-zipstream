# grunt-zipstream

Create ZIP files with zipstream.

## Getting Started

Install this grunt plugin next to your project's [grunt.js gruntfile]
with: `npm install grunt-zipstream`

Then add this line to your project's `grunt.js` gruntfile:

    grunt.loadNpmTasks('grunt-zipstream');

 [grunt.js gruntfile]: https://github.com/gruntjs/grunt/blob/0.3-stable/docs/getting_started.md

## Documentation

A simple multitask called `zip` is defined. Configure it like so:

    grunt.initConfig({
        zip: {
            foobar: {
                src: [
                    'static/images/**/*''
                    'static/index.html',
                    'README.md'
                ],
                dest: 'package.zip',

                /* optional */
                base: 'some/path',
                subdir: 'some/path',
                zlib: {
                    level: 1
                }
            }
        },
        /* optional */
        zlib: { /* ... */ }
    });

The `base` option can be set to a base path that will be stripped off the
filenames in the zip file. The `subdir` option allows you to add a custom
prefix to filenames in the zip file, (usually a single directory name.)

Per task, or globally, you can set `zlib` to options for the Node.js `zlib`
module. See [the `zlib` documentation] for specifics, but the most useful
will be the `level` option controlling compression level.

 [the `zlib` documentation]: http://nodejs.org/api/zlib.html#zlib_options

## License

    Copyright (c) 2013 Stéphan Kochen
    Licensed under the MIT license.
