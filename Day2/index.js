// run `node index.js` in the terminal
var fs = require('fs');

var data = fs.readFileSync('input4.txt', 'utf8').toString();
var gamesArray = data.split(/\r?\n|\r|\n/g);

var gamesDict = {};
for (var i = 0; i < gamesArray.length; i++) {
   var game = gamesArray[i];

   // Split string by Game x: [gamedata]
   var splitGame = game.split(':');
   var gameNum = splitGame[0];
   var gameData = splitGame[1];

   gamesDict[gameNum] = {};
   // Split gamedata into rounds
   var rounds = gameData.split(';');
   for (var j = 0; j < rounds.length; j++) {
      var round = rounds[j];
      var roundData = {};
      var splitRounds = round.split(',');

      for (splitRound of splitRounds) {
         var trimmedRound = splitRound.trim();
         var splitRound = trimmedRound.split(' ');
         var colorString = splitRound[1];
         var colorCount = parseInt(splitRound[0]);
         roundData[colorString] = colorCount;
      }
      gamesDict[gameNum][j + 1] = roundData;
   }
}

var possibleGameIDs = [];

var maxNums = {
   red: 12,
   green: 13,
   blue: 14,
};

for (var gameID of Object.keys(gamesDict)) {
   gamePossible = true;
   for (var roundNum of Object.keys(gamesDict[gameID])) {
      roundColorCounts = {
         red: 0,
         green: 0,
         blue: 0,
      };
      var roundData = gamesDict[gameID][roundNum];
      for (var roundColor of Object.keys(roundData)) {
         roundColorCounts[roundColor] += roundData[roundColor];
      }
      for (var color of Object.keys(roundColorCounts)) {
         count = roundColorCounts[color];
         if (count > maxNums[color]) {
            gamePossible = false;
         }
      }
   }
   if (gamePossible) {
      possibleGameIDs.push(parseInt(gameID.split(' ')[1]));
   }
}

const sum = possibleGameIDs.reduce((partialSum, a) => partialSum + a, 0);
console.log(`sum: ${sum}`);

// Part 2
var allMaxCounts = [];
for (var gameID of Object.keys(gamesDict)) {
   roundMaxCounts = {
      red: 0,
      green: 0,
      blue: 0,
   };
   for (var roundNum of Object.keys(gamesDict[gameID])) {
      var roundData = gamesDict[gameID][roundNum];
      for (var roundColor of Object.keys(roundData)) {
         if (roundData[roundColor] > roundMaxCounts[roundColor]) {
            roundMaxCounts[roundColor] = roundData[roundColor];
         }
      }
   }
   allMaxCounts.push(roundMaxCounts);
}

var totalPowerSet = 0;
for (var i = 0; i < allMaxCounts.length; i++) {
   var powerSet =
      allMaxCounts[i].red * allMaxCounts[i].green * allMaxCounts[i].blue;
   totalPowerSet += powerSet;
}
console.log(`totalPowerSet: ${totalPowerSet}`);
