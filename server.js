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

maria
  .connect({
    host: 'localhost',
    user: 'wmcrud',
    password: 'wmcrud',
    db: 'workout_metrics'
  })
;

maria
  .on('connect', function() {
   console.log('connected to maria');
  }).on('error', function(e) {
   console.log('error: maria: ' + e);
  }).on('close', function(c) {
   console.log('warning: maria: closed: ' + c);
  })
;

console.log('server up on port '+port);

server.get('/workouts',function(q,r){
  resolveQueryAndRequest('select * from workouts',r);
});

server.get('/workouts/:wid',function(q,r){
  var wid = q.params.wid;
  resolveQueryAndRequest('select * from workouts where wid = '+wid,r);
});

server.get('/workouts/metrics/spline',function(q,r){
  resolveQueryAndRequest('select a.sid, a.sname, a.wid, max(a.sweight) as maxSetRep from sets a, workouts b where a.wid = b.wid and a.wid group by sname, wid order by sweight asc',r);
});

server.get('/sets',function(q,r){
  resolveQueryAndRequest('select * from sets',r);
});

server.get('/sets/metrics/linear',function(q,r){
	resolveQueryAndRequest('select a.wstart, b.* from workouts a, sets b where a.wid = b.wid',r);
});

server.get('/sets/:sid',function(q,r){
  var sid = q.params.sid;
  resolveQueryAndRequest('select * from sets where sid = '+sid,r);
});

server.post('/sets',function(q,r){

});

function resolveQueryAndRequest (q,r) {
  var results = [];
  maria
    .query(q)
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
	results.push(row);
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
	r.send(results);
  }
}
