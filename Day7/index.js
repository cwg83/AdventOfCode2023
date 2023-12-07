var fs = require('fs');
const { isNumeric } = require('./utils.js');

var data = fs.readFileSync('input2.txt', 'utf8').toString();
var splitInput = data.split(/\n/);

// Part 1
function compareSameRank(hand1, hand2) {

  let winner;

  var cardRanks = {
    'A': 1,
    'K': 2,
    'Q': 3,
    'J': 4,
    'T': 5,
    '9': 6,
    '8': 7,
    '7': 8,
    '6': 9,
    '5': 10,
    '4': 11,
    '3': 12,
    '2': 13
  }

  for (var i = 0; i < hand1.length; i++) {
    var card1Rank = cardRanks[hand1[i]];
    var card2Rank = cardRanks[hand2[i]];
    if (card1Rank < card2Rank) {
      winner = 1;
      break;
    } else if (card2Rank < card1Rank) {
      winner = 2;
      break;
    }
  }
  return winner;
}

function getHandRank(hand) {
  var cardCounts = {};

  for (var card of hand) {
    cardCounts[card] = (cardCounts[card] || 0) +1;
  }

  var rank = null;

  var pairs = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  }


  for (count of Object.values(cardCounts)) {
    pairs[count]++;
  }


  if (pairs['5'] == 1) {
    rank = 1;
  } else if (pairs['4'] == 1) {
    rank = 2;
  } else if (pairs['3'] == 1 && pairs[2] == 1) {
    rank = 3;
  } else if (pairs['3'] == 1) {
    rank = 4;
  } else if (pairs['2'] == 2) {
    rank = 5;
  } else if (pairs['2'] == 1) {
    rank = 6;
  } else {
    rank = 7;
  }

  return rank;
}

var handRanks = [];

for (var h = 0; h < splitInput.length; h++) {
  var hand = splitInput[h].split(' ')[0];
  var bid = splitInput[h].split(' ')[1];
  var handRank = getHandRank(hand);

  handRanks.push({'hand': hand, 'bid': parseInt(bid), 'rank': handRank})
}

var rankOrder = [];

for (var hand of handRanks) {
  if (rankOrder.length == 0) {
    rankOrder.push(hand);
  } else {
    for (var i = 0; i < rankOrder.length; i++) {
      if (!rankOrder.map(ele => ele.hand).includes(hand.hand)) {
        if (hand.hand == rankOrder[i].hand) {
          break;
        }
        if (hand.rank < rankOrder[i].rank) {
          if (rankOrder[i + 1]) {
            continue;
          }
          rankOrder.splice(i + 1, 0, hand);
        } else if (hand.rank > rankOrder[i].rank) {
          rankOrder.splice(i, 0, hand);
        } else {
          if (compareSameRank(hand.hand, rankOrder[i].hand) == 1) {
            if (rankOrder[i + 1]) {
              continue;
            }
            rankOrder.splice(i + 1, 0, hand);
          } else {
            rankOrder.splice(i, 0, hand);
          }
        }
      }
    }
  }
}

console.log(rankOrder)

var totalWinnings = 0;

for (var i = 0; i < rankOrder.length; i++) {
  var rank = i + 1;
  totalWinnings += rank * rankOrder[i].bid;
}

console.log(totalWinnings)