var fs = require('fs');
const { isNumeric } = require('./utils.js');

var data = fs.readFileSync('input3.txt', 'utf8').toString();
var splitInput = data.split(/\r?\n|\r|\n/g);

var partNumsSum = 0;
var adjacentGearsDict = {

}
for (var row = 0; row < splitInput.length; row++) {
  for (var col = 0; col < splitInput[row].length; col++) {
      var colIndex = col;
      var numString = '';
      var isPartNum = false;
      var adjacentGears = [];
      while (isNumeric(splitInput[row][colIndex]) && colIndex < splitInput[row].length) {

        numString = splitInput[row].slice(col, colIndex + 1);

        // Check top
        if (row > 0) {
          var rowCheck = row - 1;
          var colCheck = colIndex;
          if (splitInput[rowCheck][colCheck] !== '.' && !isNumeric(splitInput[rowCheck][colCheck])) {
            if (splitInput[rowCheck][colCheck] === '*') {
              if (!adjacentGears.includes(`${rowCheck},${colCheck}`)){
                adjacentGears.push(`${rowCheck},${colCheck}`);
              }
            }
            isPartNum = true;
          }
        }
        // Check top right diag
        if (row > 0 && colIndex < splitInput[row].length - 1) {
          var rowCheck = row - 1;
          var colCheck = colIndex + 1;
          if (splitInput[rowCheck][colCheck] !== '.' && !isNumeric(splitInput[rowCheck][colCheck])) {
            if (splitInput[rowCheck][colCheck] === '*') {
              if (!adjacentGears.includes(`${rowCheck},${colCheck}`)) {
                adjacentGears.push(`${rowCheck},${colCheck}`);
              }
            }
            isPartNum = true;
          }
        }
        // Check right
        if (colIndex < splitInput[row].length - 1) {
          var rowCheck = row;
          var colCheck = colIndex + 1;
          if (splitInput[rowCheck][colCheck] !== '.' && !isNumeric(splitInput[rowCheck][colCheck])) {
            if (splitInput[rowCheck][colCheck] === '*') {
              if (!adjacentGears.includes(`${rowCheck},${colCheck}`)){
                adjacentGears.push(`${rowCheck},${colCheck}`);
              }
            }
            isPartNum = true;
          }
        }
        // Check right bottom diag
        if (row < splitInput.length - 1 && colIndex < splitInput[row].length - 1) {
          var rowCheck = row + 1;
          var colCheck = colIndex + 1;
          if (splitInput[rowCheck][colCheck] !== '.' && !isNumeric(splitInput[rowCheck][colCheck])) {
            if (splitInput[rowCheck][colCheck] === '*') {
              if (!adjacentGears.includes(`${rowCheck},${colCheck}`)){
                adjacentGears.push(`${rowCheck},${colCheck}`);
              }
            }
            isPartNum = true;
          }
        }
        // Check down
        if (row < splitInput.length - 1) {
          var rowCheck = row + 1;
          var colCheck = colIndex;
          if (splitInput[rowCheck][colCheck] !== '.' && !isNumeric(splitInput[rowCheck][colCheck])) {
            if (splitInput[rowCheck][colCheck] === '*') {
              if (!adjacentGears.includes(`${rowCheck},${colCheck}`)){
                adjacentGears.push(`${rowCheck},${colCheck}`);
              }
            }
            isPartNum = true;
          }
        }
        // Check down left diag
        if (row < splitInput.length - 1 && col > 0) {
          var rowCheck = row + 1;
          var colCheck = colIndex - 1;
          if (splitInput[rowCheck][colCheck] !== '.' && !isNumeric(splitInput[rowCheck][colCheck])) {
            if (splitInput[rowCheck][colCheck] === '*') {
              if (!adjacentGears.includes(`${rowCheck},${colCheck}`)){
                adjacentGears.push(`${rowCheck},${colCheck}`);
              }
            }
            isPartNum = true;
          }
        }
        // Check left
        if (col > 0) {
          var rowCheck = row;
          var colCheck = colIndex - 1;
          if (splitInput[rowCheck][colCheck] !== '.' && !isNumeric(splitInput[rowCheck][colCheck])) {
            if (splitInput[rowCheck][colCheck] === '*') {
              if (!adjacentGears.includes(`${rowCheck},${colCheck}`)){
                adjacentGears.push(`${rowCheck},${colCheck}`);
              }
            }
            isPartNum = true;
          }
        }
        // Check top left diag
        if (row > 0 && col > 0) {
          var rowCheck = row - 1;
          var colCheck = colIndex - 1;
          if (splitInput[rowCheck][colCheck] !== '.' && !isNumeric(splitInput[rowCheck][colCheck])) {
            if (splitInput[rowCheck][colCheck] === '*') {
              if (!adjacentGears.includes(`${rowCheck},${colCheck}`)){
                adjacentGears.push(`${rowCheck},${colCheck}`);
              }
            }
            isPartNum = true;
          }
        }

        colIndex++;

      }
      if (numString) {
        if (isPartNum) {
          console.log('adjacentGears: ', adjacentGears)
          if (adjacentGears.length > 0) {
            if (!adjacentGearsDict[adjacentGears]) {
              adjacentGearsDict[adjacentGears] = [];
            }
            adjacentGearsDict[adjacentGears].push(parseInt(numString))
          }
          partNumsSum += parseInt(numString);
        }
      }

      col = colIndex;
  }
}

console.log(`sum: ${partNumsSum}`)

// for (var i = 0; i < splitInput.length; i++) {
//   console.log(splitInput[i])
// }

var gearRatioSum = 0;

for (var key of Object.keys(adjacentGearsDict)) {
  if (adjacentGearsDict[key].length === 2) {
    var part1 = adjacentGearsDict[key][0];
    var part2 = adjacentGearsDict[key][1];
    var ratio = part1 * part2;
    gearRatioSum += ratio;
  }

}

console.log(`gearRatioSum: ${gearRatioSum}`)
