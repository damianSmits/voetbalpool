ALTER TABLE users 
ADD email varchar(50) UNIQUE NOT NULL;

INSERT INTO users 
SET userName = "admin",
	userPassword = "admin",
    email = "jealo",
    score = 0;
    
SELECT * FROM users;

UPDATE users
 SET score = 14
 WHERE userName = "admin";

DELETE FROM users
WHERE userName = "Karel";