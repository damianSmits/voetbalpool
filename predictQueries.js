 async function sendPrediction(connection, request){
     console.log(request.body)
 
 let sql = "INSERT INTO predictions SET userID = (SELECT userID FROM users WHERE userName = '" 
    + request.body["userName"] + "'), fixtureID = (SELECT fixtureID FROM fixtures WHERE homeTeam = '" 
    + request.body["homeTeam"] + "' AND awayTeam = '" + request.body["awayTeam"] + "' AND round = '" + request.body["round"] + "'), predictedHomeGoals = '"
    + request.body["homeGoals"] + "', predictedAwayGoals = '" + request.body["awayGoals"] + "';";

    connection.query(sql, async function (err, result) {
        if (err) throw err;
    }) 
 }


async function getMyPredictions(connection, request){
    let sql = "SELECT * FROM predictions INNER JOIN fixtures on fixtures.fixtureID = predictions.fixtureID WHERE checked = FALSE AND userID = (SELECT userID from users WHERE userName = '" + request.body["userName"] + "');";
    let result = await connection.query(sql) 
    let myPredictedMatches = [];
    for (let i = 0; i < result[0].length; i++) {
        myPredictedMatches.push(
            {
                homeTeam: result[0][i]["homeTeam"],
                awayTeam: result[0][i]["awayTeam"],
                predictedAwayGoals: result[0][i]["predictedAwayGoals"],
                predictedHomeGoals: result[0][i]["predictedHomeGoals"],
                round: result[0][i]["round"]
            })
        }
    console.log(myPredictedMatches); 
    return myPredictedMatches;
 }

async function getMatchesToPredict(connection, request){
    let sql = "SELECT * FROM fixtures " +
	    "WHERE fixtureID NOT IN (SELECT fixtureID FROM predictions WHERE userID = (SELECT userID FROM users WHERE userName = '" + request.body["userName"] + "')) " +
        "AND homeGoals IS NULL AND round >0;";
    
    let result = await connection.query(sql)
    let matchesToPredict = [];
        
    for (let i = 0; i < result[0].length; i++) {
        matchesToPredict.push(
            {
                homeTeam: result[0][i]["homeTeam"],
                awayTeam: result[0][i]["awayTeam"],
                round: result[0][i]["round"],
            })
        }
    return matchesToPredict;     
}


async function getTournamentMatchesToPredict(connection, request){
    let sql = "SELECT * FROM fixtures " +
	    "WHERE fixtureID NOT IN (SELECT fixtureID FROM predictions WHERE userID = (SELECT userID FROM users WHERE userName = '" + request.body["userName"] + "')) " +
        "AND homeGoals IS NULL AND tournamentID IS NOT NULL;";
    
    let result = await connection.query(sql)
    let matchesToPredict = [];
        
    for (let i = 0; i < result[0].length; i++) {
        matchesToPredict.push(
            {
                homeTeam: result[0][i]["homeTeam"],
                awayTeam: result[0][i]["awayTeam"],
                poule: result[0][i]["poule"],
            })
        }
    return matchesToPredict;     
}


module.exports = {
    sendPrediction, getMyPredictions, getMatchesToPredict, getTournamentMatchesToPredict
 }