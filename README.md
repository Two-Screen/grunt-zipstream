# This module no longer works in Node 0.10. Please use [grunt-contrib-compress] instead.

 [grunt-contrib-compress]: https://github.com/gruntjs/grunt-contrib-compress
 
---

# grunt-zipstream

Create ZIP files with [zipstream].

 [zipstream]: https://github.com/wellawaretech/node-zipstream

## Getting Started

This plugin requires Grunt `0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out
the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains
how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as
install and use Grunt plugins. Once you're familiar with that process, you may
install this plugin with this command:

```shell
npm install grunt-zipstream --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with
this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-zipstream');
```

## The "zip" task

### Overview
In your project's Gruntfile, add a section named `zip` to the data object
passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  zip: {
    your_target: {
      src: [
        'static/images/**/*',
        'static/index.html',
        'README.md'
      ],
      dest: 'package.zip',

      /* optional */
      options: {
        base: 'some/path/',
        subdir: 'mypackage/',
        zlib: {
          level: 1
        }
      }
    }
  }
});
```

### Options

#### options.base
Type: `String`

A base path that will be stripped off the start of filenames in the zip file.
If you're stripping directories off a path, you usually want to have this end
with a slash. Because this is a simple string operation, you would otherwise
end up with absolute paths in the zip file.

#### options.subdir
Type: `String`

A base path that will be added to the start of filenames in the zip file.
Usually, this will be the name of the directory you want the zip file to unpack
to. Note that trailing slashes are important here too, as with `options.base`.

#### options.zlib
Type: `Object`

Any additional options for the Node.js `zlib` module. See
[the `zlib` documentation] for specifics, but the most useful will be the
`level` option controlling compression level.

 [the `zlib` documentation]: http://nodejs.org/api/zlib.html#zlib_options

## License

    Copyright (c) 2013 Stéphan Kochen
    Licensed under the MIT license.
