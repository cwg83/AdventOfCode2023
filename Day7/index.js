var fs = require('fs');

var data = fs.readFileSync('input1.txt', 'utf8').toString();
var splitInput = data.split(/\n/);

// Part 1

function compareSameRank(hand1, hand2) {

}

function getHandRank(hand) {
  var cardCounts = {};

  for (var card of hand) {
    cardCounts[card] = (cardCounts[card] || 0) +1;
  }

  return cardCounts;
}

console.log(getHandRank('KTJJT'));