INSERT INTO teams (teamName, poule) VALUES (
	"AJAX",
    NULL
);

SELECT * FROM teams;

DELETE FROM teams 
WHERE teamName = "Karel";



INSERT INTO fixtures (homeTeam, awayTeam, round) VALUES(
	"PSV",
    "Ajax",
    1
);

DELETE FROM fixtures
WHERE homeTeam = "Fred";

SELECT * FROM fixtures; 

SELECT * FROM fixtures 
	WHERE homeGoals IS NOT NULL 
	AND datum BETWEEN date_sub(now(),INTERVAL 1 WEEK) AND now();

UPDATE fixtures 
	SET datum = 20191006
    WHERE fixtureID = 21;

ALTER TABLE fixtures 
	ADD COLUMN datum DATE NOT NULL DEFAULT 20190101;
    
