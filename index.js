var app = angular.module('app',['ngRoute']);

app.config(['$routeProvider',Router]);
app.service('WorkoutsService',['$q','$http',WorkoutsService]);
app.service('SetsService',['$q','$http',SetsService]);
app.controller('WorkoutsCreateController',['$scope','$http','$location',WorkoutsCreateController]);
app.controller('WorkoutsReadController',['$scope','$http','WorkoutsService',WorkoutsReadController]);
app.controller('WorkoutsMetricsController',['$scope','$http','WorkoutsService',WorkoutsMetricsController]);
app.controller('SetsCreateController',['$scope','$location','$http',SetsCreateController]);
app.controller('SetsReadController',['$scope','$http',SetsReadController]);
app.controller('SetsMetricsController',['$scope','$http','SetsService',SetsMetricsController]);

function Router ($routeProvider) {
	$routeProvider.when('/',{templateUrl:'views/index.html'});
	$routeProvider.when('/workouts/create',{templateUrl:'views/workouts/create.html'});
	$routeProvider.when('/workouts/read',{templateUrl:'views/workouts/read.html'});
	$routeProvider.when('/workouts/metrics',{templateUrl:'views/workouts/metrics.html'});
	$routeProvider.when('/sets/create',{templateUrl:'views/sets/create.html'});
	$routeProvider.when('/sets/read',{templateUrl:'views/sets/read.html'});
	$routeProvider.when('/sets/metrics',{templateUrl:'views/sets/metrics.html'});
	$routeProvider.otherwise({redirectTo:'/'});
}

function WorkoutsService ($q,$http) {
	var s = {};
	s.getWorkouts = function () {
		var deferred = $q.defer();
		deferred.notify('GET /workouts');
		$http.get('/workouts').success(function(data){
			deferred.resolve(data);
		}).error(function(e){
			deferred.reject(e);
		});
		return deferred.promise;
	}
	return s;
}

function WorkoutsMetricsController ($scope,$http,WorkoutsService) {
	$scope.busy = false;
	$scope.workouts = [];
	$scope.sets = [];
	var workoutsPromise = WorkoutsService.getWorkouts();
	workoutsPromise.then(onResolve,onReject,onNotify);
	function onNotify (notification) {
		console.log('n',notification);
	}
	function onReject (rejection) {
		throw new Error(rejection);
	}
	function onResolve (resolution) {
		$scope.workouts = resolution.workouts;
		var w = $scope.workouts;
		for (var i in w) {
		}
	}
	console.log('end');
}

function WorkoutsReadController ($scope,$http,WorkoutsService) {
	$scope.busy = false;
	$scope.workouts = [];
	$scope.busy = true;
	WorkoutsService
		.getWorkouts()
		.then(onResolve,onReject,onNotify)
	;
	function onNotify (notification) {
		console.log('n',notification);
	}
	function onReject (rejection) {
		throw new Error(rejection);
	}
	function onResolve (resolution) {
		$scope.workouts = resolution.workouts;
	}
}

function WorkoutsCreateController ($scope,$http,$location) {
	$scope.busy = false;
	$scope.workout = {};
	$scope.getNow = function (position) {
		if (position == "start") {
			$scope.workout.start = new Date();
		} else {
			$scope.workout.end = new Date();
		}
	}
	$scope.onSubmit = function () {
		$scope.busy = true;
		$http.post('/workouts',$scope.workout).success(function(data){
			$scope.busy = false;
			$location.path('/sets/create');
			$location.hash(JSON.stringify(data));
		}).error(function(){
			throw new Error(arguments);
		});
	}
}

function SetsService ($q,$http) {
	var s = {};
	s.getSets = function () {
		var deferred = $q.defer();
		deferred.notify('GET /sets');
		$http.get('/sets').success(function(data){
			deferred.resolve(data);
		}).error(function(e){
			deferred.reject(e);
		});
		return deferred.promise;
	}
	return s;
}

function SetsCreateController ($scope,$location,$http) {
	$scope.busy = false;
	$scope.workout = {};
	$scope.hydrateWorkout = false;
	$scope.sets = [];
	$scope.hydrateSets = false;
	if ($location.hash()) {
		$scope.hydrateWorkout = true;
		$scope.workout = JSON.parse($location.hash());
		$scope.workout.digest = function () {
			var d = "";
			d += " For Workout ";
			d += new Date($scope.workout.start).getMonth() + '/';
			d += new Date($scope.workout.start).getDate() + '/';
			d += new Date($scope.workout.start).getFullYear() + ' @ ';
			d += new Date($scope.workout.start).getHours() > 12 ? new Date($scope.workout.start).getHours() - 12 : new Date($scope.workout.start).getHours();
			d += new Date($scope.workout.start).getHours() > 12 ? 'PM-' : 'AM-';
			d += new Date($scope.workout.end).getHours() > 12 ? new Date($scope.workout.end).getHours() - 12 : new Date($scope.workout.end).getHours();
			d += new Date($scope.workout.end).getHours() > 12 ? 'PM' : 'AM';
			return d;
		}
	}
	$scope.onSubmit = function (queue) {
		$scope.busy = false;
		$scope.busy = true;
		$scope.set.wid = $scope.workout._id;
		$http.post('/sets',$scope.set).success(function(data){
			if (!$scope.hydrateSets) {
				$scope.hydrateSets = true;
			}
			$scope.sets.push(data);
			$scope.busy = false;
		}).error(function(){
			throw new Error(arguments);
		});
	}
}

function SetsReadController ($scope,$http) {
	$scope.busy = false;
	$scope.sets = [];
	$scope.busy = true;
	$http.get('/sets').success(function(data){
		$scope.sets = data.sets;
		$scope.busy = false;
	}).error(function(){
		throw new Error(arguments);
	});
}

function SetsMetricsController ($scope,$http,SetsService) {
	$scope.busy = false;
	$scope.sets = [];
	$scope.busy = true;
	var setsPromise = SetsService.getSets();
	setsPromise.then(onResolve,onReject,onNotify);
	function onNotify (notification) {
		console.log('n',notification);
	}
	function onReject (rejection) {
		throw new Error(rejection);
	}
	function onResolve (resolution) {
		var data1 = [], labels = [];
		$scope.sets = resolution.sets;
		var s = $scope.sets;
		for (var i in s) { console.log('for i in s')
			if (labelIsUnique(s[i].name)) { console.log('l is unique')
				labels.push(s[i].name); console.log('push l')
			}
		}
		function labelIsUnique (l) { console.log('l unique ?')
			for (var i in labels) { console.log('for i in lbs')
				if (labels[i] == l) { console.log('l !unique')
					return false;
				}
			}
			return true;
		}
		var xx = [];
		for (var i in labels) {
			for (var j in s) {
				if (labels[i] == s[i].name) {
					if (labelExists(labels[i])) {
						
					}
				}
			}
		}
		data1 = [65,59,90,81];
		var data = {
			labels : labels,
			datasets : [
				{
					fillColor : "rgba(220,220,220,0.5)",
					strokeColor : "rgba(220,220,220,1)",
					pointColor : "rgba(220,220,220,1)",
					pointStrokeColor : "#fff",
					data : data1
				},{
					fillColor : "rgba(151,187,205,0.5)",
					strokeColor : "rgba(151,187,205,1)",
					pointColor : "rgba(151,187,205,1)",
					pointStrokeColor : "#fff",
					data : [28,48,40,19]
				}
			]
		};
		var ctx = document.getElementById("sets-metrics-spline").getContext("2d");
		new Chart(ctx).Radar(data,{scaleSteps:4});
	}
	console.log('end');
}