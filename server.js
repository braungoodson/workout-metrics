var express = require('express'),
	mariasql = require('mariasql'),
	bodyParser = require('body-parser'),
	atob = require('atob'),
  server = express(),
  maria = new mariasql(),
  port = process.env.PORT || 3000,
  staticRoot = __dirname;


server.use(bodyParser());
server.use('/', express.static(staticRoot));
server.listen(port);

console.log('connecting to maria');

maria.connect({
  host: 'localhost',
  user: 'wmcrud',
  password: 'wmcrud',
  db: 'workout_metrics'
});

maria.on('connect', function() {
 console.log('connected to maria');
}).on('error', function(e) {
 console.log('error: maria: ' + e);
}).on('close', function(c) {
 console.log('warning: maria: closed: ' + c);
});

console.log('server up on port '+port);

server.get('/workouts',function(q,r){
  var workouts = [];
  maria
    .query('select * from workouts')
    .on('result',onResultHandler)
    .on('end',onEndHandler)
  ;
  function onResultHandler (result) {
    result
      .on('row',onRowHandler)
      .on('error',onErrorHandler)
      .on('end',onEndHandler)
    ;
    function onRowHandler (row) {
    	console.log(row);
	workouts.push(row);
    }
    function onErrorHandler (error) {
    	console.log(error);
    }
    function onEndHandler (end) {
    	console.log(end);
    }
  }
  function onEndHandler (end) {
  	console.log(end);
	r.send(workouts);
  }
});

server.get('/workouts/:wid',function(q,r){

});

server.post('/workouts',function(q,r){

});

server.get('/workouts/:wid/sets',function(q,r){

});

server.get('/workouts/:wid/sets/names',function(q,r){

});

server.get('/sets',function(q,r){

});

server.get('/sets/:wid',function(q,r){

});

server.post('/sets',function(q,r){

});

server.get('/sets/:wid',function(q,r){

});

server.get('/sets/names/:name',function(q,r){

});
