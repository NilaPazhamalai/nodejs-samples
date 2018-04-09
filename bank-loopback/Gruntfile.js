module.exports = function(grunt){
    grunt.initConfig({
        mocha_istanbul: {
            coverage: {
                src: 'common/test', // a folder works nicely 
                options: {
                    mask: '*.spec.js'
                }
            },
            coverageSpecial: {
                src: ['testSpecial/*/*.js', 'testUnique/*/*.js'], // specifying file patterns works as well 
                options: {
                    coverageFolder: 'coverageSpecial',
                    mask: '*.spec.js',
                    mochaOptions: ['--harmony','--async-only'], // any extra options 
                    istanbulOptions: ['--harmony','--handle-sigint']
                }
            },
            coveralls: {
                src: ['common/test','common/test/unitTest'], // multiple folders also works 
                options: {
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
        }
 
    });
 
    grunt.event.on('coverage', function(lcovFileContents, done){
        // Check below on the section "The coverage event" 
        done();
    });
 
    grunt.loadNpmTasks('grunt-mocha-istanbul');
 
    grunt.registerTask('coveralls', ['mocha_istanbul:coveralls']);
    grunt.registerTask('coverage', ['mocha_istanbul:coverage']);
};