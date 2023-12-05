var fs = require('fs');

var data = fs.readFileSync('input1.txt', 'utf8').toString();
var splitInput = data.split(/\r?\n|\r|\n/g);

// Part 1
console.log(splitInput);

