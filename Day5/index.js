var fs = require('fs');

var data = fs.readFileSync('input2.txt', 'utf8').toString();
var splitInput = data.split(/\n\n/);

// Part 1
// console.log(splitInput);

var dict = {
   'seeds': null,
   'maps': {}
};


for (var line of splitInput) {
   if (line.split(': ')[0] == 'seeds') {
      dict['seeds'] = line.split(': ')[1].split(' ');
   } else {
      var lines = line.split(/\n/);
      var key = lines[0].split(' ')[0];
      var values = lines.slice(1);
      dict['maps'][key] = values.map(line => {
         return line.split(' ');
      });
   }
}

// console.log(JSON.stringify(dict, undefined, 4))

var seeds = dict.seeds.map(seed => parseInt(seed));
var newSeeds = [];

// for (var i = 0; i < seeds.length; i+=2) {
//    var seedStart = parseInt(seeds[i]);
//    var seedRange = parseInt(seeds[i + 1]);
//    var seedEnd = seedStart - 1 + seedRange;
//    // console.log(`seedRange: ${seedStart} to ${seedStart - 1 + seedRange}`)
//    for (var seedNum = seedStart; seedNum <= seedEnd; seedNum++) {
//       newSeeds.push(seedNum);
//    }
// }

// seeds = newSeeds;
var lowestLocation = Infinity;
for (var i = 0; i < seeds.length; i+=2) {
   var seedStart = parseInt(seeds[i]);
   var seedRange = parseInt(seeds[i + 1]);
   var seedEnd = seedStart - 1 + seedRange;
   for (var mapKey of Object.keys(dict.maps)) {
      var mapArrays = dict.maps[mapKey];
      for (var mapArray of mapArrays) {
         var sourceRangeStart = parseInt(mapArray[1]);
         var rangeLength = parseInt(mapArray[2]);
         var sourceRangeEnd = sourceRangeStart + rangeLength - 1;
         // Check if any seeds in the range are within the source range
         if (seedStart >= sourceRangeStart && seedStart <= sourceRangeEnd && seedStart <= seedEnd) {
            var resultStart = null;
            var resultEnd = null;
            for (var seed = seedStart; seed <= sourceRangeEnd; seed++) {
               // console.log(`seed: ${seeds[i]} | mapKey: ${mapKey} | mapArray: ${mapArray}`);
               // console.log(`seed: ${seeds[i]} | sourceRangeStart: ${sourceRangeStart} sourceRangeEnd: ${sourceRangeEnd}`);
               var difference = seed - sourceRangeStart - 1;
               var result = parseInt(mapArray[0]) + difference;
               // console.log(`${seeds[i]} is in range ${sourceRangeStart} - ${sourceRangeEnd} | difference: ${difference} | result: ${result}`);
               if (!resultStart) {
                  resultStart = result;
               }
               resultEnd = result;
               if (mapKey = 'humidity-to-location') {
                  if (result < lowestLocation) {
                     lowestLocation = result;
                  } else {
                     break;
                  }
               }
            }
            seeds[i] = resultStart;
            seeds[i + 1] = resultEnd
         }
      }
   }
}

seeds.sort(function(a, b) {
   return a - b;
});
// console.log(seeds);

console.log(lowestLocation)