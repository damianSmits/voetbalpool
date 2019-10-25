const schemaMakert = require('./schemaMakert')

async function addTeam(connection, request){
let sql = "INSERT IGNORE INTO teams SET teamName = '" + request.body["teamName"] + "';";
    connection.query(sql, function (err, result) {
        if (err) throw err;
    })
}

async function addMatch(connection, request){
    console.log(request.body);
    let sql = "INSERT INTO fixtures SET homeTeam = '" + request.body["homeTeam"] + "', awayTeam = '" + request.body["awayTeam"] + "', round = '" + request.body["round"] + "', datum = '" + request.body["datum"] + "';";  
    connection.query(sql, function (err, result) {
        if (err) throw err;
    })
}

async function showMatchesForResult(connection, request){
    let sql = "SELECT * FROM fixtures WHERE round = '" + request.body["round"] + "' AND homeGoals IS NULL;";
    connection.query(sql, function (err, result) {
        let matches = [];
            for (let i = 0; i < result.length; i++) {
                matches.push(
                {
                    homeTeam: result[i]["homeTeam"],
                    awayTeam: result[i]["awayTeam"],
                    round: result[i]["round"]
                })
            }
            return matches;
    })
}

async function setResult(connection, request){
    let sql = "UPDATE fixtures SET homeGoals = '" + request.body["homeGoals"] + "', awayGoals = '" + request.body["awayGoals"] + "' WHERE homeTeam = '" + request.body["homeTeam"] + "' AND awayTeam = '" + request.body["awayTeam"] + "' AND  round = '" + request.body["round"] + "';";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        })
}

async function getMatchesToGiveResult(connection, request){
    let sql = "SELECT * FROM fixtures WHERE round = '" + request.body["round"] + "' AND homeGoals IS NULL;";
    let result = await connection.query(sql)
    let matches = [];
        for (let i = 0; i < result[0].length; i++) {
            matches.push(
               {
                homeTeam: result[0][i]["homeTeam"],
                awayTeam: result[0][i]["awayTeam"],
                round: result[0][i]["round"]
                })
            }
    console.log(matches);
    return matches;
}  

async function scorePredictions(connection, request){

let sql = "SELECT * FROM predictions INNER JOIN fixtures on fixtures.fixtureID = predictions.fixtureID INNER JOIN users on users.userID = predictions.userID WHERE checked = false AND fixtures.homeGoals IS NOT NULL";

    connection.query(sql, async function (err, result) {
        
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
}

async function sendTournamentData(connection, request){
    let sql = "INSERT INTO tournaments SET tournamentName = '" + request.body["tournamentNamer"] + "', amountOfTeams = '" + request.body["amountOfTeams"] + "', teamsPerPoule = '" + request.body["amountOfTeamsInGroup"] + "';";
    connection.query(sql, async function (err, result) {
    })

    for (let i = 0; i<request.body["teams"].length; i++){
        let sqlapp = "INSERT INTO tournamentTeams SET tournamentID = (SELECT tournamentID FROM tournaments WHERE tournamentName = '" + request.body["tournamentNamer"] + "'), teamName = '" + request.body["teams"][i] + "', poule = 1 + " + i + "%" + request.body["amountOfTeamsInGroup"] + ";";
        connection.query(sqlapp, async function (err, result) {
        })
    }
    for (let i = 0; i<request.body["amountOfTeamsInGroup"];i++){
        let result = [];
        let teamsForGroup = [];
        let sqlGet = "SELECT teamName FROM tournamentTeams WHERE tournamentID = (SELECT tournamentID FROM tournaments WHERE tournamentName = '" + request.body["tournamentNamer"] + "') AND poule = '" + (i + 1) + "';";
        result = await connection.query(sqlGet);
        for(let j = 0; j<request.body["amountOfTeamsInGroup"]; j++){
            teamsForGroup.push(result[0][j]["teamName"])
        }
        console.log("Jeuu")
        let groupMatches = schemaMakert.makeFixtures(teamsForGroup);
        //console.log(groupMatches)
        for (let k = 0; k<groupMatches.length; k+=2){
            console.log(groupMatches[k] + " vs. " + groupMatches[k+1])
            let sqlInsertFixtures = "INSERT INTO fixtures SET homeTeam = '" + groupMatches[k] + "', awayTeam = '" + groupMatches[k + 1] + "', "
                                   +"tournamentID =  (SELECT tournamentID FROM tournaments WHERE tournamentName = '" + request.body["tournamentNamer"] + "'), "
                                   +" poule = '" + (1 + i) + "', round = '" + -1 + "';";
             connection.query(sqlInsertFixtures, async function (err, result) {
             if (err) throw err;
             }) 
         }
    }  
}


module.exports = {
   addTeam, addMatch, showMatchesForResult, setResult, scorePredictions, sendTournamentData, getMatchesToGiveResult
}
