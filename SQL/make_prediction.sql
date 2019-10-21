Truncate table predictions;

SELECT userID from users
WHERE userName = "j"; 

INSERT INTO predictions
	SET userID = (SELECT userID FROM users WHERE userName = "henk"),
		fixtureID = (SELECT fixtureID FROM fixtures WHERE homeTeam = "FC Twente" AND awayTeam = "Willem II"),
        predictedHomeGoals = 3,
        predictedAwayGoals = 0;
        
DELETE FROM users
    WHERE userName = "";

DELETE FROM fixtures
	WHERE fixtureID = 56;

DELETE FROM teams
	WHERE teamName = "Henkie";

SELECT * FROM fixtures;    
SELECT * FROM users;
SELECT * FROM predictions;
SELECT * FROM teams;

SELECT * FROM predictions
	INNER JOIN fixtures on fixtures.fixtureID = predictions.fixtureID 
    INNER JOIN users on users.userID = predictions.userID
    WHERE fixtures.homeGoals IS NOT NULL;

SELECT * FROM users
	ORDER BY score DESC;

DELETE FROM users 
	WHERE userID = 32;

UPDATE users
	SET userPassword = "admin"
	WHERE userID = 4;
