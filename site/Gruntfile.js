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
          './temp/scripts/templates.js': ['./public/templates/**/*.jade']
        }
      }
    },

    compass: {
      options: {
        sassDir: './public/styles',
        specify: 'public/styles/main.scss',
        imagesDir: './public/images',
        javascriptsDir: './public/scripts',
        fontsDir: './public/styles/fonts',
        relativeAssets: true
      },
      dev: {
        options: {
          cssDir: './temp/styles',
          debugInfo: true
        }
      },
      dist: {
        options: {
          cssDir: './build/styles',
          outputStyle: 'compressed'
        }
      }
    },

    watch: {
      jade: {
        files: ['./public/templates/**/*.jade'],
        tasks: ['jade']
      },
      compass: {
        files: ['./public/styles/**/*.scss'],
        tasks: ['compass:dev']
      }
    },

    useminPrepare: {
      html: './public/index.html',
      options: {
        dest: './build'
      }
    },

    copy: {
      html: {
        src: ['./public/index.html'],
        dest: './build/index.html'
      }
    },

    usemin: {
      html: ['./build/*.html'],
      css: ['./build/css/*.css'],
      options: {
        dirs: ['./build']
      }
    }
  });

  grunt.loadTasks('../node_modules/grunt-contrib-jade/tasks');
  grunt.loadTasks('../node_modules/grunt-contrib-watch/tasks');
  grunt.loadTasks('../node_modules/grunt-usemin/tasks');
  grunt.loadTasks('../node_modules/grunt-contrib-concat/tasks');
  grunt.loadTasks('../node_modules/grunt-contrib-uglify/tasks');
  grunt.loadTasks('../node_modules/grunt-contrib-compass/tasks');
  grunt.loadTasks('../node_modules/grunt-contrib-copy/tasks');

  grunt.registerTask('default', [
    'jade',
    'compass:dev',
    'watch'
  ]);

  grunt.registerTask('build', [
    'useminPrepare',
    'concat',
    'uglify',
    'copy',
    'usemin'
  ]);
};
