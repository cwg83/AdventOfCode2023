var fs = require('fs');

var data = fs.readFileSync('input2.txt', 'utf8').toString();
var splitInput = data.split(/\n/);

// Part 1
console.log(splitInput);

var times = splitInput[0].split(': ')[1].trim().split(/\s+/);
var distances = splitInput[1].split(': ')[1].trim().split(/\s+/);

var waysToWin = [];
for (var i = 0; i < times.length; i++) {
   var time = parseInt(times[i]);
   var distance = parseInt(distances[i]);
   var distanceTraveled = 0;
   var winCount = 0;
   
   // For each number of ms to hold down button
   for (var heldms = 0; heldms < time; heldms++) {
      // Time left in the race is time minus the held button time
      var timeLeft = time - heldms;
      var distanceTraveled = timeLeft * heldms;
      console.log(`speed: ${heldms} | timeLeft: ${timeLeft} | distanceTraveled: ${distanceTraveled}`)
      if (distanceTraveled > distance) {
         winCount++;
      }
   }
   waysToWin.push(winCount);
}

var multiplied = 1;
console.log(waysToWin);
for (ways of waysToWin) {
   multiplied *= ways;
}

console.log(`answer: ${multiplied}`)
