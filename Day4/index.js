var fs = require('fs');

var data = fs.readFileSync('input2.txt', 'utf8').toString();

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
