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
          './public/js/build/templates.js': ['./public/templates/**/*.jade']
        }
      }
    },

    watch: {
      jade: {
        files: ['./public/templates/**/*.jade'],
        tasks: ['jade']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jade', 'watch']);
};