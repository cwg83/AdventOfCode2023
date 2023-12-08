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

// console.log(JSON.stringify(dict, undefined, 4))

var seeds = dict.seeds.map(seed => parseInt(seed));
for (var i = 0; i < seeds.length; i++) {
   for (var mapKey of Object.keys(dict.maps)) {
      var mapArrays = dict.maps[mapKey];
      for (var mapArray of mapArrays) {
   
         var sourceRangeStart = parseInt(mapArray[1]);
         var rangeLength = parseInt(mapArray[2]);
         var sourceRangeStop = sourceRangeStart + rangeLength - 1;
   
         if (seeds[i] >= sourceRangeStart && seeds[i] <= sourceRangeStop) {
            console.log(`seed: ${seeds[i]} | mapKey: ${mapKey} | mapArray: ${mapArray}`);
            console.log(`seed: ${seeds[i]} | sourceRangeStart: ${sourceRangeStart} sourceRangeStop: ${sourceRangeStop}`);
            var difference = seeds[i] - sourceRangeStart;
            var result = parseInt(mapArray[0]) + difference;
            console.log(`${seeds[i]} is in range ${sourceRangeStart} - ${sourceRangeStop} | difference: ${difference} | result: ${result}`);
            seeds[i] = result;
            break;
         }

      }
   }
}


console.log(seeds.sort());