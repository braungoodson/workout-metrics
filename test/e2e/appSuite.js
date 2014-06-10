describe('Workout Metrics',function(){

	it('should have more than zero workouts',function(){
		browser
			.get('http://workout-metrics.com:3000/#/workouts/read')
		;
		element
			.all(by.repeater('w in workouts'))
			.then(function(workouts){
				expect(workouts.length > 0).toBe(true);
			})
		;
	});

	it('should have more than zero workoutsmetrics',function(){
		browser
			.get('http://workout-metrics.com:3000/#/workouts/metrics')
		;
		element
			.all(by.repeater('w in workouts'))
			.then(function(workouts){
				expect(workouts.length > 0).toBe(true);
			})
		;
	});

	it('should have more than zero sets',function(){
		browser
			.get('http://workout-metrics.com:3000/#/sets/read')
		;
		element
			.all(by.repeater('s in sets'))
			.then(function(sets){
				expect(sets.length > 0).toBe(true);
			})
		;
	});

	it('should have more than zero setsmatrics',function(){
		browser
			.get('http://workout-metrics.com:3000/#/sets/metrics')
		;
		element
			.all(by.repeater('s in sets'))
			.then(function(sets){
				expect(sets.length > 0).toBe(true);
			})
		;
	});

});