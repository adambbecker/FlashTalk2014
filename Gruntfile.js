module.exports = function(grunt) {

	// show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		sass: {
	    main: {
	      options: {
					style: 'expanded'
				},
	      files: {
					'assets/css/screen.css': 'assets/scss/screen.scss'
				}
	    }
	  },

	  autoprefixer: {
	    main: {
	      options: {
	        browsers: ['> 1%', 'last 2 versions', 'ie >= 9']
	      },
	      src: 'assets/css/screen.css',
	      dest: 'assets/css/screen.css'
	    }
	  },

	  cssmin: {
	    main: {
	      files: {
	        'assets/css/screen.css':'assets/css/screen.css'
	      }
	    }
	  },

	  watch: {
	    styles: {
	      files: ['assets/scss/**/*.*'],
	      tasks: ['sass', 'autoprefixer']
	    }
	  },

    uglify: {
      dist: {
        files: {
          'assets/js/lib.js': [
            'bower_components/angular/angular.js',
            'bower_components/angular-sanitize/angular-sanitize.js',
            'assets/js/lib/fittext.js'
          ]
        }
      }
    },

	  modernizr: {
      dist: {
  	    // [REQUIRED] Path to the build you're using for development.
  	    'devFile' : 'assets/js/lib/modernizr-dev.js',

  	    // [REQUIRED] Path to save out the built file.
  	    'outputFile' : 'assets/js/modernizr.js',

  	    // Based on default settings on http://modernizr.com/download/
  	    'extra' : {
  	      'shiv' : true,
  	      'printshiv' : false,
  	      'load' : false,
  	      'mq' : false,
  	      'cssclasses' : true
  	    },

  	    // Based on default settings on http://modernizr.com/download/
  	    'extensibility' : {
  	      'addtest' : false,
  	      'prefixed' : true,
  	      'teststyles' : false,
  	      'testprops' : true,
  	      'testallprops' : true,
  	      'hasevents' : true,
  	      'prefixes' : true,
  	      'domprefixes' : true
  	    },

  	    // By default, source is uglified before saving
  	    'uglify' : true,

  	    // Define any tests you want to implicitly include.
  	    'tests' : [
  	      'csstransforms',
  	      'touch'
  	    ],

  	    // By default, this task will crawl your project for references to Modernizr tests.
  	    // Set to false to disable.
  	    'parseFiles' : false,

  	    // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
  	    // You can override this by defining a 'files' array below.
  	    // 'files' : ['assets/css/screen.css'],

  	    // When parseFiles = true, matchCommunityTests = true will attempt to
  	    // match user-contributed tests.
  	    'matchCommunityTests' : false,

  	    // Have custom Modernizr tests? Add paths to their location here.
  	    'customTests' : []
      }
	  }

	});

	grunt.registerTask('dev', [ 'sass', 'autoprefixer' ]);
	grunt.registerTask('setup', [ 'modernizr', 'dev' ]);
	grunt.registerTask('prod', [ 'setup', 'cssmin' ]);
	grunt.registerTask('default', [ 'dev', 'watch' ]);

};
