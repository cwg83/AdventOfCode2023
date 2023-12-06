var fs = require('fs');

var data = fs.readFileSync('input3.txt', 'utf8').toString();
var splitInput = data.split(/\r?\n|\r|\n/g);

// Part 1
var totalScore = 0;
for (var card of splitInput) {
   var cardData = card.split(': ')[1];
   var winningNums = cardData.split('|')[0].trim().split(/\s+/);
   var yourNums = cardData.split('|')[1].trim().split(/\s+/);

   var score = 0;
   for (var num of yourNums) {
      if (winningNums.includes(num)) {
         if (score == 0) {
            score = 1;
         } else {
            score = score * 2;
         }
      }
   }
   totalScore += score;
}

console.log(`totalScore: ${totalScore}`);

// Part 2
var data = fs.readFileSync('input3.txt', 'utf8').toString();
var splitInput = data.split(/\r?\n|\r|\n/g);

var cardDict = {};
var cardCount = {};
for (var card of splitInput) {
  var cardData = card.split(': ')[1];
  var cardNum = parseInt(card.split(': ')[0].split(/\s+/)[1]);
  var winningNums = cardData.split('|')[0].trim().split(/\s+/);
  var yourNums = cardData.split('|')[1].trim().split(/\s+/);

  // console.log('cardNum', cardNum);
  // console.log('winningNums', winningNums);
  // console.log('yourNums', yourNums);

  cardDict[cardNum] = {
    numberOfWins: 0
  }

  cardCount[cardNum] = 1;

  for (var num of yourNums) {
    if (winningNums.includes(num)) {
      // Do stuff
      cardDict[cardNum]["numberOfWins"]++;
    }
  }
}

for (var cardNum of Object.keys(cardDict)) {
  cardNum = parseInt(cardNum);
  const wins = cardDict[cardNum]["numberOfWins"];
  const copies = cardCount[cardNum];
  // console.log(`${cardNum} has ${wins} wins and ${copies} copies.`);
  for (var i = 0; i < copies; i++) {
    for (var j = cardNum + 1; j < cardNum + 1 + wins && j <= Object.keys(cardCount).length; j++) {
      cardCount[j]++;
    }
  }
}


console.log(cardCount)

const sum = Object.values(cardCount).reduce(add, 0); // with initial value to avoid when the array is empty

function add(accumulator, a) {
  return accumulator + a;
}

console.log(sum); // 6

