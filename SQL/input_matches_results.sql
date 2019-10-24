INSERT INTO teams (teamName, poule) VALUES (
	"AJAX",
    NULL
);

SELECT * FROM teams;

DELETE FROM teams 
WHERE teamName = "yy";



INSERT INTO fixtures (homeTeam, awayTeam, round) VALUES(
	"PSV",
    "Ajax",
    1
);

DELETE FROM fixtures
WHERE fixtureID > 66;

SELECT * FROM fixtures;

SELECT * FROM fixtures 
	WHERE homeGoals IS NOT NULL 
	AND datum BETWEEN date_sub(now(),INTERVAL 1 WEEK) AND now();

UPDATE fixtures 
	SET datum = 20191026
    WHERE fixtureID = 49;

ALTER TABLE fixtures 
	ADD COLUMN datum DATE NOT NULL DEFAULT 20190101;
    
