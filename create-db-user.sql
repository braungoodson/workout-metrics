create user 'wmcrud'@'localhost' identified by 'wmcrud';
grant all privileges on workout_metrics.* to 'wmcrud'@'localhost';
flush privileges;
