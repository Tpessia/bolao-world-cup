module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
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

        // Files only (no directory)
        // sass: {
        //     dist: {
        //         files: {
        //             'main.css': 'main.scss',
        //             'widgets.css': 'widgets.scss'
        //         }
        //     }
        // },

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

        // Files only
        // cssmin: {
        //     options: {
        //         mergeIntoShorthands: false,
        //         roundingPrecision: -1
        //     },
        //     target: {
        //         files: {
        //             'output.css': ['foo.css', 'bar.css']
        //         }
        //     }
        // },

        // uglify: {
        //     my_target: {
        //     files: [{
        //         expand: true,
        //         cwd: 'scripts',
        //         src: '*.js',
        //         dest: 'script/min'
        //     }]
        //     }
        // },

        // uglify: {
        //     my_target: {
        //         files: {
        //             'scripts/min/fotos.min.js': ['scripts/fotos.js'], //aceita unir varios arquivos em um
        //             'scripts/min/index.min.js': ['scripts/index.js'],
        //             'scripts/min/nav-header.min.js': ['scripts/nav-header.js']
        //         }
        //     }
        // },

        watch: {
            sass: {
                files: 'assets/styles/*.scss',
                tasks: ['sass', 'cssmin']
            },

            // scripts: {
            //     files: 'scripts/*.js',
            //     tasks: ['uglify'],
            // },

            // shell: {
            //     files: 'teste/*',
            //     tasks: ['shell']
            // }
        },

        shell: {
            multiple: {
                command: [
                    'cd "C:\\Thiago\\Mega\\Programming\\site\\teste"',
                    'mogrify -format jpg -quality 80 -background white -alpha remove \*.png',
                    'del *.png'
                ].join('&&')
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');

    // Default task(s).
    grunt.registerTask('default', ['encapsulator']);

    grunt.registerTask('encapsulator', ['sass', 'cssmin', 'watch'])

};