INSERT INTO teams (teamName, poule) VALUES (
	"AJAX",
    NULL
);

SELECT * FROM teams;

DELETE FROM teams 
WHERE teamName = "hfks";


INSERT INTO fixtures (homeTeam, awayTeam, round) VALUES(
	"PSV",
    "Ajax",
    1
);


SELECT * FROM fixtures
WHERE round = 9 AND homeGoals IS NULL;

DELETE FROM fixtures
WHERE homeTeam = "psv";

UPDATE fixtures 
	SET homeGoals = 9, awayGoals = 0
    WHERE fixtureID = 1;
    
