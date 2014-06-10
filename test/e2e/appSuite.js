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

});