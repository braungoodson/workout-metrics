-- workout-metrics database creation

create user 'wmcrud'@'localhost' identified by 'wmcrud';

create database if not exists workout_metrics;

connect workout_metrics;

create table if not exists workouts (
	wid int not null primary key auto_increment,
	wtype varchar(16) not null,
	wstart varchar(32) not null,
	wend varchar(32) not null
);

create table if not exists sets (
	sid int not null primary key auto_increment,
	sname varchar(32) not null,
	sweight smallint not null,
	sx smallint not null,
	wid int not null,
	index w_index (wid),
	foreign key (wid) references workouts(wid) on delete cascade
);