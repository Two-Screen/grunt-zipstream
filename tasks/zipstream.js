/*
 * grunt-zipstream
 * https://github.com/Two-Screen/grunt-zipstream
 *
 * Copyright (c) 2013 Stéphan Kochen
 * Licensed under the MIT license.
 */
"use strict";

var fs = require('fs');
var path = require('path');
var zipstream = require('zipstream');

module.exports = function(grunt) {

    grunt.registerMultiTask('zip', 'Create a ZIP file.', function() {
        var dest = this.data.file.dest;
        var files = grunt.file.expand({filter: "isFile"}, this.data.file.src);
        var options = this.data;

        var done = this.async();
        grunt.makeZipstream(dest, files, options, function(err, written) {
            if (!err) {
                written = String(written);
                grunt.log.writeln("File " + dest.cyan + " created.");
                grunt.log.writeln('Total size: ' + written.green + ' bytes.');
            }
            done();
        });
    });

    grunt.makeZipstream = function(dest, files, options, callback) {
        var nowrite = grunt.option('no-write');
        if (typeof(options) === 'function') {
            callback = options;
            options = null;
        }
        if (!options) {
            options = {};
        }

        var base = new RegExp('^' + (options.base || ''));
        var subdir = options.subdir || '';

        // Helper to call back only once.
        function callbackOnce(err, arg) {
            var cb = callback;
            callback = null;
            if (cb) { cb(err, arg); }
        }

        // Helper to create a stream error handler function.
        function createErrorHandler(verb) {
            return function(err) {
                if (!callback) { return; }
                grunt.verbose.error();
                grunt.fail.warn("Failed to " + verb + ": " + err.message);
                callbackOnce(err);
            };
        }

        grunt.verbose.write((nowrite ? 'Not actually opening ' : 'Opening ') + dest.cyan + '...');
        // Create path, if necessary.
        grunt.file.mkdir(path.dirname(dest));
        // Create the zip stream.
        var zip = zipstream.createZip(options.zlib || grunt.config('zlib'));
        zip.on('error', createErrorHandler('zip'));
        // Create the destination file stream.
        if (!nowrite) {
            var destStream = fs.createWriteStream(dest);
            destStream.on('error', createErrorHandler('write'));
            zip.pipe(destStream);
        }
        grunt.verbose.ok();

        grunt.util.async.waterfall([
            function(cb) {
                grunt.util.async.forEachSeries(files, function(file, cb) {
                    grunt.verbose.write('Zipping ' +  file.cyan + '...');
                    // Create the source write stream.
                    var srcStream = fs.createReadStream(file);
                    srcStream.on('error', createErrorHandler('read'));
                    // Transform path.
                    file = file.replace(base, subdir);
                    // Zip up.
                    var obj = { name: file };
                    zip.addFile(srcStream, obj, function() {
                        grunt.verbose.ok();
                        var uncompressed = String(obj.uncompressed);
                        var compressed = String(obj.compressed);
                        grunt.verbose.writeln("Compressed " + uncompressed.green + " bytes down to " + compressed.green + " bytes.");
                        cb();
                    });
                }, cb);
            },
            function(cb) {
                grunt.verbose.write('Finalizing zip...');
                // This waits for writing to finish.
                zip.finalize(function(written) {
                    grunt.verbose.ok();
                    cb(null, written);
                });
            }
        ], callbackOnce);
    };

};
