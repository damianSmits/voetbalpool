function makeFixtures(teamsFromGroup){
    let matches = [];
    if (teamsFromGroup.length==4){
        matches.push(
            teamsFromGroup[0], teamsFromGroup[1],
            teamsFromGroup[2], teamsFromGroup[3],
            teamsFromGroup[0], teamsFromGroup[2],
            teamsFromGroup[1], teamsFromGroup[3],
            teamsFromGroup[3], teamsFromGroup[0],
            teamsFromGroup[2], teamsFromGroup[1],
        )
    }
    return matches;
}









module.exports = {
    makeFixtures
}