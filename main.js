const express = require('express');
const optellert = require('./optellert')
const linksQueries = require('./linksQueries')
const adminQueries = require('./adminQueries')
const predictQueries = require('./predictQueries')
const app = express();

var mysql = require('mysql2/promise');

app.use(express.static('client'));

app.use(express.json());

app.listen(1234, () => console.log('Example app listening on port 1234!'));

var connection;

async function makeNewConnection(){
        connection = await mysql.createConnection({
        host: "localhost",
        user: "henk",
        password: "henk",
        database: "foebelpool"
    });    

    connection.connect(function (err, result) {
        if (err) throw err;
        console.log("Connected!");
    });
}

app.post("/api/addTeam", async function (request, response) {
    console.log("Api call received for /addTeam");
    await makeNewConnection();
    adminQueries.addTeam(connection, request);
    await connection.end();
});

app.post("/api/addMatch", async function (request, response) {
    console.log("Api call received for /addMatch");
    await makeNewConnection();
    adminQueries.addMatch(connection, request);
    await connection.end();
});

app.post("/api/showMatch/", async function (request, response) {
    console.log("Api call received for /showmatch");
    await makeNewConnection()
    response.json(await adminQueries.getMatchesToGiveResult(connection, request));
    await connection.end();
});

app.get("/api/getPlayed/", async function (request, response) {
    console.log("Api call received for /getPlayed");
    await makeNewConnection()
    response.json(await linksQueries.getPlayedMatches(connection))
    await connection.end();
    console.log("Disconnected!");
});

app.post("/api/sendResults", async function (request, response) {
    console.log("Api call received for /sendResult");
    await makeNewConnection()
    await adminQueries.setResult(connection, request)
    await connection.end();
});

app.post("/api/registerUser", async function (request, response) {
    console.log("api call received for /registerUser")
    await makeNewConnection();
    await linksQueries.registerUser(connection, request)
    await connection.end();
});

app.post("/api/userLogin", async function (request, response) {
    console.log("Api call received for /userLogin");
    await makeNewConnection()
    response.json(await linksQueries.userLogin(connection, request))
    await connection.end();
});

app.post("/api/getMatchesToPredict/", async function (request, response) {
    console.log("Api call received for /getMatchesToPredict");
    await makeNewConnection()
    response.json(await predictQueries.getMatchesToPredict(connection, request))
    await connection.end();
});   

app.post("/api/getTournamentMatchesToPredict/", async function (request, response) {
    console.log("Api call received for /getTournamentMatchesToPredict");
    await makeNewConnection();
    response.json(await predictQueries.getTournamentMatchesToPredict(connection, request))
    await connection.end();
});   

app.post("/api/sendMatchPrediction", async function (request, response) {
    console.log("Api call received for /userLogin");
    await makeNewConnection()
    predictQueries.sendPrediction(connection, request);
    await connection.end();
})

app.post("/api/getMyPredictions/", async function (request, response) {
    console.log("Api call received for /getMyPredictions");
    await makeNewConnection()
    response.json(await predictQueries.getMyPredictions(connection, request));
    await connection.end();
    console.log("Disconnected!"); 
});

app.post("/api/scorePredictions", async function (request, response) {
    console.log("Api call received for /scorePredictions");
    await makeNewConnection()
    console.log("1")
    await adminQueries.scorePredictions(connection, request)
    console.log("5")
    await connection.end();
})

app.get("/api/getLeaderboard", async function (request, response) {
    console.log("Api call received for /getLeaderboard");
    await makeNewConnection()
    response.json(await linksQueries.getLeaderboard(connection))
    await connection.end();
})

app.get("/api/getEveryTeam", async function (request, response) {
    console.log("Api call received for /getEveryTeam");
    await makeNewConnection()
    response.json(await linksQueries.getEveryTeam(connection));
    await connection.end();
    console.log("Disconnected!");
});


app.get("/api/getEveryRound", async function (request, response) {
    console.log("Api call received for /getEveryRound");
    await makeNewConnection()
    response.json(await linksQueries.getEveryRound(connection));
    await connection.end();
});


app.post("/api/sendTournamentData", async function (request, response) {
    console.log("Api call received for /sendTournamentData");
    console.log(request.body)
    await makeNewConnection()
    await adminQueries.sendTournamentData(connection, request);
    await connection.end();
});