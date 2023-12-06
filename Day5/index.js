var fs = require('fs');

var data = fs.readFileSync('input1.txt', 'utf8').toString();
var splitInput = data.split(/\n\n/);

// Part 1
console.log(splitInput);

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

var seeds = dict.seeds.map(seed => parseInt(seed));
for (var mapKey of Object.keys(dict.maps)) {
   var mapArrays = dict.maps[mapKey];
   console.log(`${mapKey}:`)
   for (var mapArray of mapArrays) {
      var sourceRangeStart = parseInt(mapArray[1]);
      var rangeLength = parseInt(mapArray[2]);
      var sourceRangeStop = sourceRangeStart + rangeLength;
      console.log(mapArray);
      for (var i = 0; i < seeds.length; i++) {
         var seed = seeds[i];
         if (seed >= sourceRangeStart && seed <= sourceRangeStop) {

            var difference = seed - sourceRangeStart;
            var result = parseInt(mapArray[0]) + difference;
            console.log(`${seed} is between ${sourceRangeStart} and ${sourceRangeStop} | difference: ${difference} | result: ${result}`);
            seeds[i] = parseInt(result);
            break;
         }
      }
      console.log(mapKey.split('-')[2], seeds);
   }
}

console.log(seeds);