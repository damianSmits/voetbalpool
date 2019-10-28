SELECT	* FROM tournaments;

INSERT INTO tournaments 
SET tournamentName = 'Harry', 
	amountOfTeams = '16', 
    teamsPerPoule = '4';
    
DELETE FROM fixtures WHERE tournamentID = 48;

UPDATE fixtures 
	SET round = -1 
    WHERE tournamentID = 49;
    
INSERT INTO tournamentTeams 
	SET tournamentID = (SELECT tournamentID FROM tournaments WHERE tournamentName = 'Harry'), 
	teamName = 'ADO Den Haag';
    
DELETE FROM tournaments
	WHERE tournamentID < 11;

SELECT * FROM tournamentTeams;
    
DELETE FROM tournamentTeams
	WHERE tournamentID = 10;

TRUNCATE TABLE tournamentTeams;

SELECT * FROM fixtures;

INSERT INTO tournamentTeams 
	SET tournamentID = (SELECT tournamentID FROM tournaments WHERE tournamentName = 'PieterdePiet'),
		teamName = 'Willem II', 
        poule = 1 + 4%4;
        