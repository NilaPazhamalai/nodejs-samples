module.exports = function(grunt){
    grunt.initConfig({
        mocha_istanbul: {
            coverhttp: {
                coverageFolder: 'coverageHttp',
                src: ['common/test'], // multiple folders also works 
                options: {
                    mask: '*.spec.js',
                    coverage:true, // this will make the grunt.event.on('coverage') event listener to be triggered 
                    check: {
                        lines: 20,
                        statements: 20
                    },
                    root: './common/models/', // define where the cover task should consider the root of libraries that are covered by tests 
                    reportFormats: ['html','lcovonly']
                }
            },
            coveralls: {
                src: ['common/test/unitTest'], // multiple folders also works 
                options: {
                    coverageFolder: 'coverageUnit',
                    mask: '*.spec.js',
                    timeout:10000,
                    coverage:true, // this will make the grunt.event.on('coverage') event listener to be triggered 
                    check: {
                        lines: 20,
                        statements: 20
                    },
                    root: './common/models/', // define where the cover task should consider the root of libraries that are covered by tests 
                    reportFormats: ['html','lcovonly']
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
        },

        //our JSHint options
        jshint: {
            all: ['common/models/*.js'] //files to lint
        },

        //our concat options
        concat: {
            options: {
                separator: ';' //separates scripts
            },
            dist: {
                src: ['common/models/*.js'], //Using mini match for your scripts to concatenate
                dest: 'js/script.js' //where to output the script
            }
        },

        //our uglify options
        uglify: {
            js: {
                files: {
                    'js/script.js': ['js/script.js'] //save over the newly created script
                }
            }
        }



 
    });
 
    grunt.event.on('coverage', function(lcovFileContents, done){
        // Check below on the section "The coverage event" 
        done();
    });
 
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('coverhttp', ['mocha_istanbul:coverhttp']);
    grunt.registerTask('coveralls', ['mocha_istanbul:coveralls']);
    grunt.registerTask('default', ['coveralls']);


    grunt.registerTask('dev', ['coveralls','istanbul_check_coverage','jshint']);
    grunt.registerTask('pro', ['coveralls','istanbul_check_coverage','jshint', 'concat', 'uglify']);
};