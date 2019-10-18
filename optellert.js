function getScore(homeGoals, awayGoals, predictedHomeGoals, predictedAwayGoals){
    let winnerCorrect = (determineWinner(homeGoals, awayGoals) === determineWinner(predictedHomeGoals, predictedAwayGoals));
    let score = determinePredictionScore(homeGoals, awayGoals, predictedHomeGoals, predictedAwayGoals, winnerCorrect);
    return score;
}

function determineWinner(homeGoals, awayGoals){
    let result = 0;
    if(homeGoals > awayGoals){ 
        result = 1; 
    } else if (homeGoals == awayGoals) {
        result = 3;
    } else {
        result = 2;
    }
    return result;
}

function determinePredictionScore(homeGoals, awayGoals, predictedHomeGoals, predictedAwayGoals, winnerCorrect){
    let score = 0;
    if (winnerCorrect === false && awayGoals !== predictedAwayGoals && homeGoals !== predictedHomeGoals) {
        score = 0;
    } else if (winnerCorrect === false && (awayGoals === predictedAwayGoals ^ homeGoals === predictedHomeGoals)){
        score = 1
    } else if (winnerCorrect === true && awayGoals !== predictedAwayGoals && homeGoals !== predictedHomeGoals){
        score = 3
    } else if (winnerCorrect === true && (awayGoals === predictedAwayGoals ^ homeGoals === predictedHomeGoals)){
        score = 4
    } else if (winnerCorrect === true && awayGoals === predictedAwayGoals && homeGoals === predictedHomeGoals){
        score = 5
    } 
    return score;
}

module.exports = {
    getScore, determineWinner, determinePredictionScore
}