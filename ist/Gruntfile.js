module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                mangle: false,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            my_target: {
                files: {
                  'dest/output.min.js': ['src/*.js']
                }
              }
        },
        clean: {
            folder: ['build/']
        },
        mocha_istanbul: {
            coveralls: {
                src: ['test'], // multiple folders also works 
                options: {
                    coverage: true, // this will make the grunt.event.on('coverage') event listener to be triggered 
                    check: {
                        lines: 100,
                        statements: 100
                    },
                    root: './src/', // define where the cover task should consider the root of libraries that are covered by tests 
                    reportFormats: ['html', 'lcovonly']
                }
            }
        },
        istanbul_check_coverage: {
            default: {
                options: {
                    coverageFolder: 'coverage*', // will check both coverage folders and merge the coverage results 
                    check: {
                        lines: 100,
                        statements: 100
                    }
                }
            }
        }

    });

    grunt.event.on('coverage', function (lcovFileContents, done) {
        // Check below on the section "The coverage event" 
        done();
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');

    grunt.registerTask('coveralls', ['mocha_istanbul:coveralls']);
    grunt.registerTask('testCoverBuild', ['coveralls', 'clean', 'uglify']);
};