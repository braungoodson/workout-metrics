module.exports = function (grunt) {

	var npmTasks = [
		'grunt-karma',
		'grunt-protractor-runner'
	];

	var gruntTasks = [
		['default',['karma']],
		['unit',['karma']],
		['e2e',['protractor']]
	];

	var config = {
		pkg: grunt.file.readJSON('package.json'),
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},
		protractor: {
			e2e: {
				configFile: 'protractor.conf.js'
			}
		}
	};

	grunt.initConfig(config);

	for (var t in gruntTasks) {
		grunt.registerTask(gruntTasks[t][0],gruntTasks[t][1]);
	}

	for (var t in npmTasks) {
		grunt.loadNpmTasks(npmTasks[t]);
	}

}