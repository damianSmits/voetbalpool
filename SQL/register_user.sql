ALTER TABLE users 
ADD email varchar(50) UNIQUE NOT NULL;

INSERT INTO users 
SET userName = "admin",
	userPassword = "admin",
    email = "jealo",
    score = 0;
    
SELECT * FROM users;

UPDATE users
 SET userPassword = "piet"
 WHERE userID = 3;

DELETE FROM users
WHERE userName = "Karel";