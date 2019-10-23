async function getPlayedMatches(connection){

    let sql = "SELECT * FROM fixtures WHERE homeGoals IS NOT NULL AND datum BETWEEN date_sub(now(),INTERVAL 1 WEEK) AND now()";
    console.log("3")


    let result = await connection.query(sql)
        let playedMatches = [];
        for (let i = 0; i < result[0].length; i++) {
            playedMatches.push(
            {
                homeTeam: result[0][i]["homeTeam"],
                awayTeam: result[0][i]["awayTeam"],
                homeGoals: result[0][i]["homeGoals"],
                awayGoals: result[0][i]["awayGoals"],
                datum: result[0][i]["datum"]
            })
        }
    return playedMatches;
}

async function registerUser(connection, request){
    let sql = "INSERT INTO users SET userName = '" + request.body["userName"] + "', userPassword = '" + request.body["password"] + "', email = '" + request.body["email"] + "', score = 0;";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        })
    }

async function userLogin(connection, request){
    let sql = "SELECT * FROM users WHERE userName = '" + request.body["userName"] + "' AND userPassword = '" + request.body["password"] + "';";
    
    let result = await connection.query(sql) 
        if (result[0].length != 0){
            let userLoggingIn = result[0][0]["userName"];
            console.log(result[0][0]["userName"])
            return userLoggingIn;
        }
        else {
            let userLoggingIn = "NEE"
            return userLoggingIn;
        } 
}

async function getLeaderboard(connection){
    let sql = "SELECT * FROM users WHERE userName <>'damian' ORDER BY score DESC;";
    let result = await connection.query(sql)
    let users = [];
    for (let i=0; i<result[0].length; i++){
        users.push(
            {
            userName: result[0][i]["userName"],
            score: result[0][i]["score"]
        })
    }
    return users;
}


async function getEveryTeam(connection){
    let sql = "SELECT * FROM teams";
    let result = await connection.query(sql)
    let teams = [];
    for (let i=0; i<result[0].length; i++){
        teams.push(
            {
            teamName: result[0][i]["teamName"],
        })
    }
    return teams; 
}

async function getEveryRound(connection){

    let sql = "SELECT DISTINCT(round) AS round FROM fixtures ORDER BY round ASC;";

    let result = await connection.query(sql)
        let rounds = [];
        for (let i=0; i<result[0].length; i++){
            rounds.push(
                {
                roundName: result[0][i]["round"],
            })
        }
        return rounds
}

module.exports = {
    getPlayedMatches, registerUser, userLogin, getLeaderboard, getEveryTeam, getEveryRound
}
