INSERT INTO teams (teamName, poule) VALUES (
	"AJAX",
    NULL
);

SELECT * FROM teams;

DELETE FROM teams 
WHERE teamName = "Henkie";


INSERT INTO fixtures (homeTeam, awayTeam, round) VALUES(
	"PSV",
    "Ajax",
    1
);

DELETE FROM fixtures
WHERE fixtureID = 24;

SELECT * FROM fixtures; 

SELECT * FROM fixtures WHERE homeGoals IS NOT NULL;

UPDATE fixtures 
	SET homeGoals = 2, awayGoals = 0
    WHERE fixtureID = 33;


    
