Truncate table predictions;

SELECT userID from users
WHERE userName = "henk"; 

INSERT INTO predictions
	SET userID = (SELECT userID FROM users WHERE userName = "henk"),
		fixtureID = (SELECT fixtureID FROM fixtures WHERE homeTeam = "FC Twente" AND awayTeam = "Willem II"),
        predictedHomeGoals = 3,
        predictedAwayGoals = 0;
        
DELETE FROM predictions
    WHERE fixtureID = 35;

DELETE FROM fixtures
	WHERE homeTeam = "Henkie";

DELETE FROM teams
	WHERE teamName = "Henkie";

SELECT * FROM fixtures;    
SELECT * FROM users;
SELECT * FROM predictions;
SELECT * FROM teams;

SELECT * FROM predictions
	INNER JOIN fixtures on fixtures.fixtureID = predictions.fixtureID 
	WHERE userID = (SELECT userID from users WHERE userName = "henk");
	
