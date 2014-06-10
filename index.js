var app = angular.module('app',['ngRoute']);

app.config(['$routeProvider',Router]);
app.service('WorkoutsService',['$q','$http',WorkoutsService]);
app.service('SetsService',['$q','$http',SetsService]);
app.controller('WorkoutsCreateController',['$scope','$http','$location',WorkoutsCreateController]);
app.controller('WorkoutsReadController',['$scope','$http','WorkoutsService',WorkoutsReadController]);
app.controller('WorkoutsMetricsController',['$scope','$http','WorkoutsService',WorkoutsMetricsController]);
app.controller('SetsCreateController',['$scope','$location','$http',SetsCreateController]);
app.controller('SetsReadController',['$scope','$http','SetsService',SetsReadController]);
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
	$scope.workouts = [];
	$scope.sets = [];
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
		$scope.workouts = resolution;
	}
}

function WorkoutsReadController ($scope,$http,WorkoutsService) {
	$scope.workouts = [];
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
		$scope.workouts = resolution;
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

function SetsReadController ($scope,$http,SetsService) {
	$scope.sets = [];
	SetsService
		.getSets()
		.then(onResolve,onReject,onNotify)
	;
	function onNotify (notification) {
		console.log('n',notification);
	}
	function onReject (rejection) {
		throw new Error(rejection);
	}
	function onResolve (resolution) {
		$scope.sets = resolution;
	}
}

function SetsMetricsController ($scope,$http,SetsService) {
		$scope.sets = [];
	SetsService
		.getSets()
		.then(onResolve,onReject,onNotify)
	;
	function onNotify (notification) {
		console.log('n',notification);
	}
	function onReject (rejection) {
		throw new Error(rejection);
	}
	function onResolve (resolution) {
		$scope.sets = resolution;
	}
}
