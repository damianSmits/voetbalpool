import test from 'ava';
const optellert = require('./optellert')

test('winner should be the hometeam when they score more goals than the awayteam (1, according to TOTO scheme)', t => {
    t.is(optellert.determineWinner(1,3), 2)
    t.is(optellert.determineWinner(3,3), 3)
    t.is(optellert.determineWinner(4,3), 1)
})

test('actual winner and predicted winner should be the same when actual result is 3-1 and predicted result is 2-0', t =>{
    t.is(optellert.determineWinner(3,0), optellert.determineWinner(2,1))
    t.is(optellert.determineWinner(3,3), optellert.determineWinner(2,2))
    t.is(optellert.determineWinner(0,3), optellert.determineWinner(2,4))
})

test('Players should get 1 point per goal amount, 3 points for correct winner', t=> {
    t.is(optellert.determinePredictionScore(3,0,0,1, false), 0)
    t.is(optellert.determinePredictionScore(3,0,0,0, false), 1)
    t.is(optellert.determinePredictionScore(3,0,2,1, true), 3)
    t.is(optellert.determinePredictionScore(3,0,3,1, true), 4)
    t.is(optellert.determinePredictionScore(3,0,3,0, true), 5)
})