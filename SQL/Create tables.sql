DROP TABLE teams;


CREATE TABLE teams (
    teamName varchar (50) UNIQUE NOT NULL,
    poule char,
    PRIMARY KEY (teamName)
    );

CREATE TABLE fixtures (
    fixtureID INT AUTO_INCREMENT,
    homeTeam varchar(50) NOT NULL,
    awayTeam varchar(50) NOT NULL,
    round VARCHAR(3) NOT NULL,
    homeGoals INT,
    awayGoals INT,
    PRIMARY KEY (fixtureID),
	FOREIGN KEY (homeTeam) REFERENCES teams(teamName),
    FOREIGN KEY (awayTeam) REFERENCES teams(teamName)
);

CREATE TABLE predictions (
	fixtureID int NOT NULL,
    userID int NOT NULL,
    predictedHomeGoals int NOT NULL,
    predictedAwayGoals int NOT NULL,
	PRIMARY KEY (fixtureID, userID),
    FOREIGN KEY (fixtureID) REFERENCES fixtures(fixtureID),
    FOREIGN KEY (userID) REFERENCES users(userID)
);

CREATE TABLE users (
	userID int AUTO_INCREMENT,
    userName varchar(50) NOT NULL,
    userPassword varchar (50) NOT NULL,
    score int NOT NULL,
    PRIMARY KEY(userID)
);

CREATE TABLE tournaments (
	tournamentID int AUTO_INCREMENT,
    doubleRoundRobin boolean NOT NULL,
    amountOfTeams int NOT NULL,
    teamsPerPoule int NOT NULL,
    PRIMARY KEY(tournamentID)
);

CREATE TABLE tournamentTeams (
	tournamentID int NOT NULL,
    teamName varchar(50) NOT NULL,
    FOREIGN KEY (tournamentID) REFERENCES tournaments (tournamentID),
    FOREIGN KEY (teamName) REFERENCES teams (teamName)
);