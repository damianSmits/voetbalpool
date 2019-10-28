Truncate table predictions;

SELECT userID from users
WHERE userName = "j"; 

INSERT INTO predictions
	SET userID = (SELECT userID FROM users WHERE userName = "henk"),
		fixtureID = (SELECT fixtureID FROM fixtures WHERE homeTeam = "FC Twente" AND awayTeam = "Willem II"),
        predictedHomeGoals = 3,
        predictedAwayGoals = 0;
        
DELETE FROM predictions
	WHERE userID = 41;

DELETE FROM fixtures
	WHERE round = 103;

DELETE FROM teams
	WHERE teamName = "psst je hebt dit nog";

SELECT * FROM fixtures;    
SELECT * FROM users;
SELECT * FROM predictions;
SELECT * FROM teams;



SELECT * FROM fixtures WHERE homeGoals IS NULL AND fixtureID NOT IN (SELECT fixtureID FROM predictions) 
	AND '12' NOT IN (SELECT userID FROM predictions);
   
SELECT * FROM fixtures 
	WHERE fixtureID NOT IN (SELECT fixtureID FROM predictions WHERE userID = '12')
    AND homeGoals IS NULL;

Select * from fixtures;

SELECT * FROM predictions
	INNER JOIN fixtures on fixtures.fixtureID = predictions.fixtureID 
    INNER JOIN users on users.userID = predictions.userID;

SELECT * FROM users
	ORDER BY score DESC;

DELETE FROM users 
	WHERE userID = 32;

DELETE FROM predictions
	WHERE userID = 40;

UPDATE predictions
	SET checked = FALSE
	WHERE fixtureID > 44;
