// Generated on 2014-10-26 using generator-chrome-extension 0.2.9
"use strict";

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require("load-grunt-tasks")(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require("time-grunt")(grunt);

    // Configurable paths
    var config = {
        extension: "extension",
        dist: "dist"
    };

    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ["bower.json"],
                tasks: ["bowerInstall"]
            },
            js: {
                files: ["<%= config.extension %>/scripts/{,*/}*.js"],
                tasks: ["jshint"],
                options: {
                    livereload: true
                }
            },
            gruntfile: {
                files: ["Gruntfile.js"]
            },
            styles: {
                files: ["<%= config.extension %>/styles/{,*/}*.css"],
                tasks: [],
                options: {
                    livereload: true
                }
            },
            livereload: {
                options: {
                    livereload: "<%= connect.options.livereload %>"
                },
                files: [
                    "<%= config.extension %>/pages/*.html",
                    "<%= config.extension %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}",
                    "<%= config.extension %>/manifest.json",
                    "<%= config.extension %>/_locales/{,*/}*.json"
                ]
            }
        },

        // Grunt server and debug server setting
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to "0.0.0.0" to access the server from outside
                hostname: "localhost"
            },
            chrome: {
                options: {
                    open: false,
                    base: [
                        "<%= config.extension %>"
                    ]
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            chrome: {
            },
            dist: {
                files: [{
                    dot: true,
                    src: [
                        "<%= config.dist %>/*",
                        "!<%= config.dist %>/.git*"
                    ]
                }]
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: ".jshintrc",
                reporter: require("jshint-stylish")
            },
            all: [
                "Gruntfile.js",
                "<%= config.extension %>/scripts/{,*/}*.js",
                "!<%= config.extension %>/scripts/vendor/*"
            ]
        },

        // Automatically inject Bower components into the HTML file
        bowerInstall: {
            extension: {
                src: [
                    "<%= config.extension %>/pages/*.html"
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        
        // overwrite default flow because of Opera rules
        // https://dev.opera.com/extensions/tut_publishing_guidelines.html#acceptance-criteria
        // "We must be able to review the code in a reasonable manner. Therefor, the code shouldn't be obfuscated."
        useminPrepare: {
            options: {
                dest: "<%= config.dist %>/pages",
                flow: {
                    html: {
                        steps: {
                            js: [
                                "concat"
                            ],
                            css: [
                                "concat",
                                "cssmin"
                            ]
                        },
                        post: {
                        }
                    }
                }
            },
            html: [
                "<%= config.extension %>/pages/{,*/}*.html"
            ]
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ["<%= config.dist %>", "<%= config.dist %>/images", "<%= config.dist %>/css"]
            },
            html: ["<%= config.dist %>/pages/{,*/}*.html"],
            css: ["<%= config.dist %>/styles/{,*/}*.css"]
        },

        // The following *-min tasks produce minifies files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: "<%= config.extension %>/images",
                    src: "{,*/}*.{gif,jpeg,jpg,png}",
                    dest: "<%= config.dist %>/images"
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: "<%= config.extension %>/images",
                    src: "{,*/}*.svg",
                    dest: "<%= config.dist %>/images"
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    // removeCommentsFromCDATA: true,
                    // collapseWhitespace: true,
                    // collapseBooleanAttributes: true,
                    // removeAttributeQuotes: true,
                    // removeRedundantAttributes: true,
                    // useShortDoctype: true,
                    // removeEmptyAttributes: true,
                    // removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: "<%= config.extension %>",
                    src: "*.html",
                    dest: "<%= config.dist %>"
                }]
            }
        },

        // By default, your `index.html`"s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //     dist: {
        //         files: {
        //             "<%= config.dist %>/styles/main.css": [
        //                 "<%= config.extension %>/styles/{,*/}*.css"
        //             ]
        //         }
        //     }
        // },
        // uglify: {
        //     dist: {
        //         files: {
        //             "<%= config.dist %>/scripts/scripts.js": [
        //                 "<%= config.dist %>/scripts/scripts.js"
        //             ]
        //         }
        //     }
        // },
        // concat: {
        //     dist: {}
        // },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: "<%= config.extension %>",
                    dest: "<%= config.dist %>",
                    src: [
                        "*.{ico,png,txt}",
                        "images/{,*/}*.{webp,gif}",
                        "pages/{,*/}*.html",
                        "styles/{,*/}*.css",
                        "styles/fonts/{,*/}*.*",
                        "_locales/{,*/}*.json",
                    ]
                }]
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            chrome: [
            ],
            dist: [
                "imagemin",
                "svgmin"
            ]
        },

        // Auto buildnumber, exclude debug files. smart builds that event pages
        chromeManifest: {
            dist: {
                options: {
                    buildnumber: true,
                    background: {
                        target: "scripts/background.js",
                        exclude: [
                            "scripts/chromereload.js"
                        ]
                    }
                },
                src: "<%= config.extension %>",
                dest: "<%= config.dist %>"
            }
        },

        // Compres dist files to package
        compress: {
            dist: {
                options: {
                    archive: function() {
                        var manifest = grunt.file.readJSON("extension/manifest.json");
                        return "package/update-notification-" + manifest.version + ".zip";
                    }
                },
                files: [{
                    expand: true,
                    cwd: "dist/",
                    src: ["**"],
                    dest: ""
                }]
            }
        }
    });

    grunt.registerTask("updateVersion", function () {
        var manifest = grunt.file.readJSON("extension/manifest.json");
        grunt.file.expand(config.extension + "/_locales/*/messages.json").forEach(function(filename)
        {
            var messages = grunt.file.readJSON(filename);
            messages.extensionVersion.message = manifest.version;
            grunt.file.write(filename, JSON.stringify(messages, null, 2));
        });
    });

    grunt.registerTask("debug", function () {
        grunt.task.run([
            "jshint",
            "concurrent:chrome",
            "connect:chrome",
            "watch"
        ]);
    });

    grunt.registerTask("build", [
        "clean:dist",
        "chromeManifest:dist",
        "updateVersion",
        "useminPrepare",
        "concurrent:dist",
        "cssmin",
        "concat",

        // do not uglify because of Opera rules
        // https://dev.opera.com/extensions/tut_publishing_guidelines.html#acceptance-criteria
        // "We must be able to review the code in a reasonable manner. Therefor, the code shouldn't be obfuscated."
        //"uglify",
        "copy",
        "usemin",
        "compress"
    ]);

    grunt.registerTask("default", [
        "jshint",
        "build"
    ]);
};
