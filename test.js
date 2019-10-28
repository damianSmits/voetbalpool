import test from 'ava';
const optellert = require('./optellert')
const schemaMakert = require('./schemaMakert')

test('winner should be the hometeam when they score more goals than the awayteam (1, according to TOTO scheme)', async t => {
    t.is(await optellert.determineWinner(1,3), 2)
    t.is(await optellert.determineWinner(3,3), 3)
    t.is(await optellert.determineWinner(4,3), 1)
})

test('actual winner and predicted winner should be the same when actual result is 3-1 and predicted result is 2-0', async t =>{
    t.is(await optellert.determineWinner(3,0), await optellert.determineWinner(2,1))
    t.is(await optellert.determineWinner(3,3), await optellert.determineWinner(2,2))
    t.is(await optellert.determineWinner(0,3), await optellert.determineWinner(2,4))
})

test('Players should get 1 point per goal amount, 3 points for correct winner', async t=> {
    t.is(await optellert.determinePredictionScore(3,0,0,1, false), 0)
    t.is(await optellert.determinePredictionScore(3,0,0,0, false), 1)
    t.is(await optellert.determinePredictionScore(3,0,2,1, true), 3)
    t.is(await optellert.determinePredictionScore(3,0,3,1, true), 4)
    t.is(await optellert.determinePredictionScore(3,0,3,0, true), 5)
})

test('Overall function', async t=>{
    t.is(await optellert.getScore(3,0,2,0), 4)
})


test('There should be 6 matches in a poule of 4 teams', async t => {
    let poule = ["Henk", "Harry", "Karel", "Piet"]
    let matches = schemaMakert.makeFixtures(poule)
    t.is(matches.length, 12)
})

test('Fourth match should be Harry v Piet in a poule with Henk, Harry, Karel and Piet (single RR)', async t => {
    let poule = ["Henk", "Harry", "Karel", "Piet"];
    let matches = schemaMakert.makeFixtures(poule);
    t.is(matches[6], "Harry"); t.is(matches[7], "Piet");
})

test('Groups of other sizes arent a thing yet', async t =>{
    let poule = ["Harry", "Karel", "Henk", "Piet", "Kees", "Gerrit", "Gerard", "ADO Den Haag"];
    let matches = schemaMakert.makeFixtures(poule);
    t.is(matches.length, 0);
})

test('Heerenveen should be on top in this group', async t =>{
    let groupResults = []
    groupResults.push(
        {
            homeTeam: 'RKC Waalwijk',
            predictedHomeGoals: 0,
            predictedawayGoals: 1,
            awayTeam: 'sc Heerenveen',
            poule: '4'
          },
          {
            homeTeam: 'Vitesse',
            predictedHomeGoals: 3,
            predictedawayGoals: 4,
            awayTeam: 'Willem II',
            poule: '4'
          },
          {
            homeTeam: 'RKC Waalwijk',
            predictedHomeGoals: 0,
            predictedawayGoals: 1,
            awayTeam: 'Vitesse',
            poule: '4'
          },
          {
            homeTeam: 'sc Heerenveen',
            predictedHomeGoals: 1,
            predictedawayGoals: 0,
            awayTeam: 'Willem II',
            poule: '4'
          },
          {
            homeTeam: 'Willem II',
            predictedHomeGoals: 1,
            predictedawayGoals: 0,
            awayTeam: 'RKC Waalwijk',
            poule: '4'
          },
          {
            homeTeam: 'Vitesse',
            predictedHomeGoals: 0,
            predictedawayGoals: 2,
            awayTeam: 'sc Heerenveen',
            poule: '4'
          }
    )
    t.is(schemaMakert.determineGroupWinner(groupResults), B)
})
