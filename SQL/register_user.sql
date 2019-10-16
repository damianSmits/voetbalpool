ALTER TABLE users 
ADD email varchar(50) UNIQUE NOT NULL;

INSERT INTO users 
SET userName = "admin",
	userPassword = "admin",
    email = "jealo",
    score = 0;
    
SELECT * FROM users;

DELETE FROM users
WHERE userName = "henk";