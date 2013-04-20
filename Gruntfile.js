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

    watch: {
      jade: {
        files: ['./public/templates/**/*.jade'],
        tasks: ['jade']
      }
    },

    htmlmin: {
      dist: {
        files: [{
          expand: true,
          cwd: './views',
          src: '*.html',
          dest: './public'
        }]
      }
    },

    useminPrepare: {
      html: './public/index.html',
      options: {
        dest: './dist'
      }
    },

    usemin: {
      html: ['./dist/*.html'],
      css: ['./dist/css/*.css'],
      options: {
        dirs: ['./dist']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('default', [
    'jade',
    'watch'
  ]);

  grunt.registerTask('build', [
    'useminPrepare',
    'concat',
    'uglify',
    'htmlmin',
    'usemin'
  ]);
};
