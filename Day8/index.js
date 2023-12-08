var fs = require('fs');
const { isNumeric } = require('../utils.js');

var data = fs.readFileSync('input1.txt', 'utf8').toString();
var instructions = data.split(/\n\n/)[0];
var map = data.split(/\n\n/)[1].split(/\n/);

// Part 1
console.log(instructions);
console.log(map);