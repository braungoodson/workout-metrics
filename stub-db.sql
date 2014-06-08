-- workout-metrics database hydration


connect workout_metrics;


insert into workouts (wid,wtype,wstart,wend) values (1,'Anaerbolic','2014/05/13 10:00:00','2014/05/13 11:00:00');

insert into workouts (wid,wtype,wstart,wend) values (2,'Anaerbolic','2014/05/15 10:00:00','2014/05/13 11:00:00');

insert into workouts (wid,wtype,wstart,wend) values (3,'Anaerbolic','2014/05/17 10:00:00','2014/05/13 11:00:00');

insert into workouts (wid,wtype,wstart,wend) values (4,'Anaerbolic','2014/05/19 10:00:00','2014/05/13 11:00:00');


insert into sets (sname,sweight,sx,wid) values ('Flat Bench Press',225,12,1);
insert into sets (sname,sweight,sx,wid) values ('Flat Bench Press',245,10,1);
insert into sets (sname,sweight,sx,wid) values ('Flat Bench Press',265,8,1);
insert into sets (sname,sweight,sx,wid) values ('Flat Bench Press',275,6,1);
insert into sets (sname,sweight,sx,wid) values ('Flat Bench Press',285,4,1);

insert into sets (sname,sweight,sx,wid) values ('Lateral Pulldowns',200,12,1);
insert into sets (sname,sweight,sx,wid) values ('Lateral Pulldowns',220,10,1);
insert into sets (sname,sweight,sx,wid) values ('Lateral Pulldowns',240,8,1);
insert into sets (sname,sweight,sx,wid) values ('Lateral Pulldowns',250,6,1);
insert into sets (sname,sweight,sx,wid) values ('Lateral Pulldowns',260,4,1);

insert into sets (sname,sweight,sx,wid) values ('Squats',315,12,2);
insert into sets (sname,sweight,sx,wid) values ('Squats',325,10,2);
insert into sets (sname,sweight,sx,wid) values ('Squats',345,8,2);
insert into sets (sname,sweight,sx,wid) values ('Squats',255,6,2);
insert into sets (sname,sweight,sx,wid) values ('Squats',265,4,2);

insert into sets (sname,sweight,sx,wid) values ('Military Press',185,12,2);
insert into sets (sname,sweight,sx,wid) values ('Military Press',205,10,2);
insert into sets (sname,sweight,sx,wid) values ('Military Press',205,10,2);
insert into sets (sname,sweight,sx,wid) values ('Military Press',205,10,2);
insert into sets (sname,sweight,sx,wid) values ('Military Press',210,6,2);


insert into sets (sname,sweight,sx,wid) values ('Flat Bench Press',235,12,3);
insert into sets (sname,sweight,sx,wid) values ('Flat Bench Press',255,10,3);
insert into sets (sname,sweight,sx,wid) values ('Flat Bench Press',275,8,3);
insert into sets (sname,sweight,sx,wid) values ('Flat Bench Press',285,6,3);
insert into sets (sname,sweight,sx,wid) values ('Flat Bench Press',295,4,3);

insert into sets (sname,sweight,sx,wid) values ('Lateral Pulldowns',205,12,3);
insert into sets (sname,sweight,sx,wid) values ('Lateral Pulldowns',225,10,3);
insert into sets (sname,sweight,sx,wid) values ('Lateral Pulldowns',245,8,3);
insert into sets (sname,sweight,sx,wid) values ('Lateral Pulldowns',255,6,3);
insert into sets (sname,sweight,sx,wid) values ('Lateral Pulldowns',265,4,3);

insert into sets (sname,sweight,sx,wid) values ('Squats',310,12,4);
insert into sets (sname,sweight,sx,wid) values ('Squats',320,10,4);
insert into sets (sname,sweight,sx,wid) values ('Squats',340,8,4);
insert into sets (sname,sweight,sx,wid) values ('Squats',250,6,4);
insert into sets (sname,sweight,sx,wid) values ('Squats',260,4,4);

insert into sets (sname,sweight,sx,wid) values ('Military Press',195,12,4);
insert into sets (sname,sweight,sx,wid) values ('Military Press',215,10,4);
insert into sets (sname,sweight,sx,wid) values ('Military Press',205,4,4);
insert into sets (sname,sweight,sx,wid) values ('Military Press',205,4,4);
insert into sets (sname,sweight,sx,wid) values ('Military Press',210,4,4);