const express = require('express');
const optellert = require('./optellert')
const app = express();

var mysql = require('mysql2');

app.use(express.static('client'));

app.use(express.json());

app.listen(1234, () => console.log('Example app listening on port 1234!'));

app.post("/api/addTeam", function (request, response) {
    console.log("Api call received for /addTeam");

    var connection = mysql.createConnection({
        host: "localhost",
        user: "henk",
        password: "henk",
        database: "foebelpool"
    });
    
    connection.connect(function (err, result) {
        if (err) throw err;
        console.log("Connected!");
    });
    console.log(request.body);
    let sql = "INSERT IGNORE INTO teams SET teamName = '" + request.body["teamName"] + "';";
    
    connection.query(sql, function (err, result) {
        if (err) throw err;
        })

    connection.end();
    console.log("Disconnected!");
});

app.post("/api/addMatch", function (request, response) {
    console.log("Api call received for /addMatch");

    var connection = mysql.createConnection({
        host: "localhost",
        user: "henk",
        password: "henk",
        database: "foebelpool"
    });
    
    connection.connect(function (err, result) {
        if (err) throw err;
        console.log("Connected!");
    });
    console.log(request.body);
    let sql = "INSERT INTO fixtures SET homeTeam = '" + request.body["homeTeam"] + "', awayTeam = '" + request.body["awayTeam"] + "', round = '" + request.body["round"] + "', datum = '" + request.body["datum"] + "';";
    
    connection.query(sql, function (err, result) {
        if (err) throw err;
        })

    connection.end();
    console.log("Disconnected!");
});

app.post("/api/showMatch/", function (request, response) {
    console.log("Api call received for /showmatch");
    var connection = mysql.createConnection({
        host: "localhost",
        user: "henk",
        password: "henk",
        database: "foebelpool"
    });
    
    connection.connect(function (err, result) {
        if (err) throw err;
        console.log("Connected!");
    });
    let sql = "SELECT * FROM fixtures WHERE round = '" + request.body["round"] + "' AND homeGoals IS NULL;";
    
    connection.query(sql, function (err, result) {
        let matches = [];
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            matches.push(
                {
                    homeTeam: result[i]["homeTeam"],
                    awayTeam: result[i]["awayTeam"],
                    round: result[i]["round"]
                    
                })
            }
            console.log(matches);
            response.json(matches);
        }) 
    connection.end();
    console.log("Disconnected!");
    
});
   


app.get("/api/getPlayed/", function (request, response) {
    console.log("Api call received for /getPlayed");

    var connection = mysql.createConnection({
        host: "localhost",
        user: "henk",
        password: "henk",
        database: "foebelpool"
    });
    
    connection.connect(function (err, result) {
        if (err) throw err;
        console.log("Connected!");
    });
    let sql = "SELECT * FROM fixtures WHERE homeGoals IS NOT NULL AND datum BETWEEN date_sub(now(),INTERVAL 1 WEEK) AND now()";
    
    connection.query(sql, function (err, result) {
        let playedMatches = [];
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            playedMatches.push(
                {
                    homeTeam: result[i]["homeTeam"],
                    awayTeam: result[i]["awayTeam"],
                    homeGoals: result[i]["homeGoals"],
                    awayGoals: result[i]["awayGoals"],
                    datum: result[i]["datum"]
                })
            }
            response.json(playedMatches);
        })
    connection.end();
    console.log("Disconnected!");
});

app.post("/api/sendResults", function (request, response) {
    console.log("Api call received for /sendResult");

    var connection = mysql.createConnection({
        host: "localhost",
        user: "henk",
        password: "henk",
        database: "foebelpool"
    });
    
    connection.connect(function (err, result) {
        if (err) throw err;
        console.log("Connected!");
    });
    console.log(request.body);
    let sql = "UPDATE fixtures SET homeGoals = '" + request.body["homeGoals"] + "', awayGoals = '" + request.body["awayGoals"] + "' WHERE homeTeam = '" + request.body["homeTeam"] + "' AND awayTeam = '" + request.body["awayTeam"] + "' AND  round = '" + request.body["round"] + "';";
    
    connection.query(sql, function (err, result) {
        if (err) throw err;
        })

    connection.end();
    console.log("Disconnected!");
});

app.post("/api/registerUser", function (request, response) {
    console.log("Api call received for /registerUser");

    var connection = mysql.createConnection({
        host: "localhost",
        user: "henk",
        password: "henk",
        database: "foebelpool"
    });
    
    connection.connect(function (err, result) {
        if (err) throw err;
        console.log("Connected!");
    });
    console.log(request.body);
    let sql = "INSERT IGNORE INTO users SET userName = '" + request.body["userName"] + "', userPassword = '" + request.body["password"] + "', email = '" + request.body["email"] + "', score = 0;";
    
    connection.query(sql, function (err, result) {
        if (err) throw err;
        })

    connection.end();
    console.log("Disconnected!");
});

app.post("/api/userLogin", async function (request, response) {
    
    console.log("Api call received for /userLogin");
    
    var connection = mysql.createConnection({
        host: "localhost",
        user: "henk",
        password: "henk",
        database: "foebelpool"
    });
    
    connection.connect(function (err, result) {
        if (err) throw err;
        console.log("Connected!");
    });
    
    let sql = "SELECT * FROM users WHERE userName = '" + request.body["userName"] + "' AND userPassword = '" + request.body["password"] + "';";
    await connection.query(sql, function (err, result) {
        if (err) throw err;
        if (result.length != 0){
            let userLoggingIn = result[0]["userName"];
            console.log(userLoggingIn);
            console.log(result);
            response.json(userLoggingIn);
        }
        else {
            let userLoggingIn = "NEE"
            response.json(userLoggingIn)
        }
    }) 
    connection.end();
    console.log("Disconnected!");

});

 
app.get("/api/getMatchesToPredict/", function (request, response) {
    console.log("Api call received for /getMatchesToPredict");

    var connection = mysql.createConnection({
        host: "localhost",
        user: "henk",
        password: "henk",
        database: "foebelpool"
    });
    
    connection.connect(function (err, result) {
        if (err) throw err;
        console.log("Connected!");
    });
    let sql = "SELECT * FROM fixtures WHERE homeGoals IS NULL";
    
    connection.query(sql, function (err, result) {
        let matchesToPredict = [];
        if (err) throw err;
        
        for (let i = 0; i < result.length; i++) {
            matchesToPredict.push(
                {
                    homeTeam: result[i]["homeTeam"],
                    awayTeam: result[i]["awayTeam"],
                    round: result[i]["round"],
                })
            }response.json(matchesToPredict);
        }) 
    connection.end();
    console.log("Disconnected!");
});   

app.post("/api/sendMatchPrediction", async function (request, response) {
    console.log("Api call received for /userLogin");
    
    var connection = mysql.createConnection({
        host: "localhost",
        user: "henk",
        password: "henk",
        database: "foebelpool"
    });
    
    connection.connect(function (err, result) {
        if (err) throw err;
        console.log("Connected!");
    });
    
    let sql = "INSERT INTO predictions SET userID = (SELECT userID FROM users WHERE userName = '" 
    + request.body["userName"] + "'), fixtureID = (SELECT fixtureID FROM fixtures WHERE homeTeam = '" 
    + request.body["homeTeam"] + "' AND awayTeam = '" + request.body["awayTeam"] + "'), predictedHomeGoals = '"
    + request.body["homeGoals"] + "', predictedAwayGoals = '" + request.body["awayGoals"] + "';";

    connection.query(sql, async function (err, result) {
        if (err) throw err;
    }) 
    connection.end();
    console.log("Disconnected!");
})



app.post("/api/getMyPredictions/", function (request, response) {
    console.log("Api call received for /getMyPredictions");
    console.log(request.body["homeTeam"])
    
    var connection = mysql.createConnection({
        host: "localhost",
        user: "henk",
        password: "henk",
        database: "foebelpool"
    });
    
    connection.connect(function (err, result) {
        if (err) throw err;
        console.log("Connected!");
    });
    let sql = "SELECT * FROM predictions INNER JOIN fixtures on fixtures.fixtureID = predictions.fixtureID WHERE checked = FALSE AND userID = (SELECT userID from users WHERE userName = '" + request.body["userName"] + "');";
    
    connection.query(sql, function (err, result) {
        let myPredictedMatches = [];
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            myPredictedMatches.push(
                {
                    homeTeam: result[i]["homeTeam"],
                    awayTeam: result[i]["awayTeam"],
                    predictedAwayGoals: result[i]["predictedAwayGoals"],
                    predictedHomeGoals: result[i]["predictedHomeGoals"],
                    round: result[i]["round"]
                })
            }
            response.json(myPredictedMatches);
            
            console.log(myPredictedMatches);
        }) 
    connection.end();
    console.log("Disconnected!"); 
});

app.post("/api/scorePredictions", async function (request, response) {
    console.log("Api call received for /scorePredictions");
    
    var connection = mysql.createConnection({
        host: "localhost",
        user: "henk",
        password: "henk",
        database: "foebelpool"
    });
    
    connection.connect(function (err, result) {
        if (err) throw err;
        console.log("Connected!");
    });
    
    let sql = "SELECT * FROM predictions INNER JOIN fixtures on fixtures.fixtureID = predictions.fixtureID INNER JOIN users on users.userID = predictions.userID WHERE checked = false AND fixtures.homeGoals IS NOT NULL";

    connection.query(sql, async function (err, result) {
        if (err) throw err;
        for (let i=0; i<result.length; i++){
            
            let sqlUpdate = "update users SET score = score + '"+ optellert.getScore(result[i]["homeGoals"], result[i]["awayGoals"], result[i]["predictedHomeGoals"], result[i]["predictedAwayGoals"], result[i]["userID"]) +"' WHERE userID = '" + result[i]["userID"] +"';";

            connection.query(sqlUpdate, async function (err, result) {
            if (err) throw err;
            }) 

            let sqlCheck = "UPDATE predictions SET checked = TRUE WHERE fixtureID = '" + result[i]["fixtureID"] + "' AND userID = '" + result[i]["userID"] + "';";
            connection.query(sqlCheck, async function (err, result) {
            if (err) throw err;
            
            }) 
        }
    }) 
})

app.get("/api/getLeaderboard", async function (request, response) {
    console.log("Api call received for /getLeaderboard");
    
    var connection = mysql.createConnection({
        host: "localhost",
        user: "henk",
        password: "henk",
        database: "foebelpool"
    });
    
    connection.connect(function (err, result) {
        if (err) throw err;
        console.log("Connected!");
    });
    
    let sql = "SELECT * FROM users WHERE userName <>'damian' ORDER BY score DESC;";

    connection.query(sql, async function (err, result) {
        let users = [];
        if (err) throw err;
        for (let i=0; i<result.length; i++){
            users.push(
                {
                userName: result[i]["userName"],
                score: result[i]["score"]
            })
        }response.json(users);
    }) 
    connection.end();
    console.log("Disconnected!");
})