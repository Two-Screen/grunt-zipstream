/*
 * grunt-zipstream
 * https://github.com/Two-Screen/grunt-zipstream
 *
 * Copyright (c) 2013 Stéphan Kochen
 * Licensed under the MIT license.
 */
module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'tasks/**/*.js', 'test/**/*.js']
        },
        watch: {
            files: '<config:jshint.files>',
            tasks: 'default'
        }
    });

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint']);
};
