ALTER TABLE predictions
ADD poule varchar(50);

INSERT INTO users 
SET userName = "admin",
	userPassword = "admin",
    email = "jealo",
    score = 0;
    
SELECT * FROM users;

DELETE FROM users 
	WHERE userID > 41;

UPDATE users
 SET score = 14
 WHERE userName = "admin";

DELETE FROM users
WHERE userID = "43";