// Commands:
  // grunt test
    // build app.js
    // mocha
    // jshint
  // grunt build
    // react: components/*.jsx turns into components/*.js
    // concat: dist/app.js turns into dist/foodhyped.js
    // uglify: dist/foodhyped.js turns into dist/foodhyped.min.js
    // cssmin: styles/styles.css turns into dist/style.min.css
  // grunt server-dev
    // nodemon 
    // watch
      // .jsx file changed: react >> concat >> uglify as per grunt build
      // .css file changed: cssmin

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Building

    react: {
      files: {
        expand: true,
        cwd: 'client/components',
        src: ['**/*.jsx'],
        dest: 'client/components/',
        ext: '.js'
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['./client/components/*.js', './client/scripts/*.js'],
        dest: './client/dist/<%= pkg.name %>.js'
      }
    },

    uglify: {
      dist: {
        files: {
          './client/dist/<%= pkg.name %>.min.js' : ['<%= concat.dist.dest %>']
        }
      }
    },

    cssmin: {
      target: {
        files: {
          './client/dist/style.min.css' : ['./client/styles/style.css']
        }
      }
    },

    // Testing

    jshint: {
      files: ['client/scripts/*.js', 'client/components/*.js'],
      options: {
        force: 'true',
        jshintrc: 'test/.jshintrc',
        ignores: [
          'client/bower_components/**/*.js'
        ]
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    // Watching

    watch: {
      scripts: {
        files: [
          'client/components/*.jsx',
          'client/scripts/*.js'
        ],
        tasks: [
          'react',
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'client/styles/*.css',
        tasks: ['cssmin']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    // Deploying

    shell: {
      prodServer: {
        command: 'git push origin master',
        options: {
            stdout: true,
            stderr: true
        }
      },

      herokuDeploy: {
        command: 'git push heroku master',
        options: {
            stdout: true,
            stderr: true
        }
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-react');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'build' ]);
    
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  // Just a shortcut for server-dev
  grunt.registerTask('s', function(target){
    grunt.task.run(['server-dev']);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'react', 'mochaTest','jshint'
  ]);

  grunt.registerTask('build', [
    'react', 'concat','uglify','cssmin'
  ]);

  grunt.registerTask('upload', [
    'shell:prodServer'
  ]);

  grunt.registerTask('deploy', [
    'shell:herokuDeploy'
  ]);
};
