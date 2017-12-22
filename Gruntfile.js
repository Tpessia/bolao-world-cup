module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        connect: {
            preview: {
                options: {
                    port: 9000,
                    hostname: '*',
                    base: './'
                }
            }
        },

        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/styles',
                    src: ['*.scss'],
                    dest: 'assets/styles/css',
                    ext: '.css'
                }]
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'assets/styles/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'assets/styles/css/min',
                    ext: '.min.css'
                }]
            }
        },

        watch: {
            sass: {
                files: 'assets/styles/*.scss',
                tasks: ['sass', 'cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task(s).
    grunt.registerTask('default', ['encapsulator']);

    grunt.registerTask('encapsulator', ['sass', 'cssmin', 'connect', 'watch'])

};