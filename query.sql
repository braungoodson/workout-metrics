select a.sid, a.sname, a.wid, max(a.sweight) as maxSetRep 
from sets a, workouts b 
where a.wid = b.wid and a.wid < 2
group by sname, wid 
order by sweight asc
