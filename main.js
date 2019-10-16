const express = require('express');
const app = express();

var mysql = require('mysql2');

app.use(express.static('client'));

app.use(express.json());

app.listen(8000, () => console.log('Example app listening on port 8000!'));

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
    let sql = "INSERT INTO fixtures SET homeTeam = '" + request.body["homeTeam"] + "', awayTeam = '" + request.body["awayTeam"] + "', round = '" + request.body["round"] + "';";
    
    connection.query(sql, function (err, result) {
        if (err) throw err;
        })

    connection.end();
    console.log("Disconnected!");
});

let matches = [];
let playedMatches = [];
let matchesToPredict = [];

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
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            matches.push(
                {
                    homeTeam: result[i]["homeTeam"],
                    awayTeam: result[i]["awayTeam"]
                    
                })
            }
            console.log(matches);
        }) 
    connection.end();
    console.log("Disconnected!");
    response.json(matches);
    matches = [];
    
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
    let sql = "SELECT * FROM fixtures WHERE homeGoals IS NOT NULL";
    
    connection.query(sql, function (err, result) {
        if (err) throw err;
        
        for (let i = 0; i < result.length; i++) {
            playedMatches.push(
                {
                    homeTeam: result[i]["homeTeam"],
                    awayTeam: result[i]["awayTeam"],
                    homeGoals: result[i]["homeGoals"],
                    awayGoals: result[i]["awayGoals"],
                })
            }
        })
        response.json(playedMatches);
    connection.end();
    playedMatches = [];
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
    let sql = "UPDATE fixtures SET homeGoals = '" + request.body["homeGoals"] + "', awayGoals = '" + request.body["awayGoals"] + "' WHERE homeTeam = '" + request.body["homeTeam"] + "' AND awayTeam = '" + request.body["awayTeam"] + "';";
    
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
    let sql = "INSERT INTO users SET userName = '" + request.body["userName"] + "', userPassword = '" + request.body["password"] + "', email = '" + request.body["email"] + "', score = 0;";
    
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
        if (err) throw err;
        
        for (let i = 0; i < result.length; i++) {
            matchesToPredict.push(
                {
                    homeTeam: result[i]["homeTeam"],
                    awayTeam: result[i]["awayTeam"],
                    round: result[i]["round"],
                })
            }
        })
        response.json(matchesToPredict);
    connection.end();
    matchesToPredict = [];
    console.log("Disconnected!");
});   