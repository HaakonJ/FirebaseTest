//The "wrapper" function
module.exports = function(grunt) {
  
	//Project and task configuration
	"use strict";
	/*var mozjpeg = require('imagemin-mozjpeg');*/ /*variable for imagemin function*/
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		/**
		* Grunt Sass
		* Compile Sass to CSS using node-sass
		* https://www.npmjs.com/package/grunt-sass
		*/
		sass: {

			options: {
				sourceMap: false
			},
			dist: {
				files: {
					'css/styles.css' : 'assets/scss/styles.scss'
				}
			}
		},
			/*Grunt contrib uglify 
		minumizes javaScript packages
		URL: https://www.npmjs.com/package/grunt-contrib-uglify
		*/
		uglify:{
			options:{
				compress:true
			},
			my_target:{
				files:{
					'js/scripts.min.js':['assets/js/scripts.js'],
					'js/jqscripts.min.js':['assets/js/jquery/jqscripts.js']
				}
			}
		},
		
		/*grunt-contrib-jshint
		validates javaScript packages
		URL: https://www.npmjs.com/package/grunt-contrib-jshint
		*/
		jshint:{
			all:['Gruntfile.js','assets/js/scripts.js']
			   },
		
		/*Grunt-contrib-imagemin
		minumizes images
		URL: https://www.npmjs.com/package/grunt-contrib-imagemin
		*/
		
		/*imagemin:{//Task
			static:{//Target
				options:{//Target-options
					optimizationLevel:3,
					svgoPlugins:[{removeViewBox:false}],
					use:[mozjpeg()]
				},
				files:{//Dictionary-of-files
					'Images/img.png':['assets/images/*.png'],//'destination':'source'
					'Images/img.jpg':['assets/images/*.jpg'],
					'Images/img.gif':['assets/images/*.gif']
				}
			},
			dynamic:{//Another-target
		files:[{
		  expand:true,//Enable-dynamic-expansioe
		  cwd:'src/',//Src-matches-are-relative-to-this-path
		  src:['**/ /*.{png,jpg,gif}'],//Actual-patterns-to-match
		  dest:'dist/'//Destination-path-prefix
	  }]
	}
		},*/
		
		/**
		* Grunt Contrib Watch
		* Monitor files and excute tasks
		* https://www.npmjs.com/package/grunt-contrib-watch
		* more taskes have been added.
		*/
		
		watch: {
			sass: {
				files: [
					'assets/scss/*.scss',
					'assets/partials/_*.scss'
				],
				tasks: [
					'sass'
				]
			},
			uglify: {
				files: [
					'assets/js/*.js',
					'assets/js/jquery/*.js'
				],
				tasks: [
					'uglify'
				],
				all:[
					'Gruntfile.js','lib/**/*.js','test/**/*.js'
				],
			}
		}

	});

	//Loading Grunt plugins and tasks
	require('load-grunt-tasks')(grunt);

	//Custom tasks
	grunt.registerTask('default', ['watch']);
	/*grunt.loadNpmTasks('grunt-contrib-uglify');*/
/*grunt.loadNpmTasks('grunt-contrib-jshint');*/
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	
};
