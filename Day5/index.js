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

console.log(dict);