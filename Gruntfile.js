module.exports = function (grunt) {
  grunt.initConfig({
    jade: {
      compile: {
        options: {
          compileDebug: true,
          client: true,
          processName: function (filename) {
            return filename.split('/').pop().replace('.jade', '');
          }
        },
        files: {
          './public/js/temp/templates.js': ['./public/templates/**/*.jade']
        }
      }
    },

    concat: {
      dist: {
        src: [
          './public/js/temp/**/*.js',
          './public/js/backbone/**/*.js'
        ],
        dest: './public/js/build/app.js'
      }
    },

    watch: {
      jade: {
        files: ['./public/templates/**/*.jade'],
        tasks: ['jade']
      },
      concat: {
        files: '<%= concat.dist.src %>',
        tasks: ['concat']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', [
    'jade',
    'concat',
    // 'uglify',
    'watch'
  ]);
};