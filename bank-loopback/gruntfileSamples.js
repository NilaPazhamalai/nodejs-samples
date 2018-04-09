
/* v 0.0.1 */
module.exports = function (grunt) {





    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ['coverage'],

        mocha_istanbul: {
            coveralls: {
                src: ['common/tests'], // multiple folders also works 
                options: {
                    coverage: true, // this will make the grunt.event.on('coverage') event listener to be triggered 
                    check: {
                        lines: 75,
                        statements: 75
                    },
                    //mask: '*.js',
                    root: 'common/models', // define where the cover task should consider the root of libraries that are covered by tests 
                    reportFormats: ['html']
                }
            }
        },
        istanbul_check_coverage: {
            default: {
                options: {
                    coverageFolder: 'coverage*', // will check both coverage folders and merge the coverage results 
                    check: {
                        lines: 80,
                        statements: 80
                    }
                }
            }
        }

    });

    grunt.event.on('coverage', function (lcovFileContents, done) {
        // Check below on the section "The coverage event" 
        console.log(lcov);
        console.log('hello');
        done();
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.registerTask('default', ['clean', 'mocha_istanbul']);

    grunt.registerTask('coveralls', ['mocha_istanbul:coveralls']);
};



/* v 0.0.0 */

module.exports = function (grunt) {

    grunt.registerTask('default', ['mochaTest']);

    // Add the grunt-mocha-test tasks.
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-mocha-istanbul')
    // Load grunt mocha task
    grunt.loadNpmTasks('grunt-mocha');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Mocha
        mocha: {
            all: {
                src: ['testrunner.html'],
            },
            options: {
                run: true,
                growlOnSuccess: false
            }
        },

        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'results.txt', // Optionally capture the reporter output to a file
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
                    clearCacheFilter: (key) => true, // Optionally defines which files should keep in cache
                    noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
                },
                src: ['common/tests/loginTest.js']
            }
        },

        mocha_istanbul: {
            
            /* coverage: {
                src: 'common/tests/loginTest.js', // a folder works nicely 
                //options: {
                //    mask: '*.js'
               // }
            },
            coverageSpecial: {
                src: [''], // specifying file patterns works as well 
                options: {
                    coverageFolder: 'coverageSpecial',
                    mask: '*.spec.js',
                    mochaOptions: ['--harmony', '--async-only'], // any extra options 
                    istanbulOptions: ['--harmony', '--handle-sigint']
                }
            }, */
            coveralls: {
                src: ['common/tests'], // multiple folders also works 
                options: {
                    coverageFolder: 'coverage',
                    coverage: true, // this will make the grunt.event.on('coverage') event listener to be triggered 
                    check: {
                        lines: 75,
                        statements: 75
                    },
                    mask: '*.js',
                    root: './common/models', // define where the cover task should consider the root of libraries that are covered by tests 
                    reportFormats: ['cobertura', 'lcovonly']
                }
            }
        },
        istanbul_check_coverage: {
            default: {
                options: {
                    coverageFolder: 'coverage*', // will check both coverage folders and merge the coverage results 
                    check: {
                        lines: 80,
                        statements: 80
                    }
                }
            }
        }

    });

    grunt.event.on('coverage', function (lcovFileContents, done) {
        // Check below on the section "The coverage event" 
        console.log('hello');
        done();
    });

    grunt.loadNpmTasks('grunt-mocha-istanbul');

    grunt.registerTask('coveralls', ['mocha_istanbul:coveralls']);
    grunt.registerTask('coverage', ['mocha_istanbul:coverage']);
};

