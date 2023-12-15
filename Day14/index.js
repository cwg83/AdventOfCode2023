var fs = require('fs');

var data = fs.readFileSync('input1.txt', 'utf8').toString();
var panel = data.split(/\n/);
panel = panel.map(line => {
   return line.split('');
})

for (var line of panel) {
   console.log(line.join(''));
}
// Part 1
for (var row = 1; row < panel.length; row++) {
   for (var col = 0; col < panel[row].length; col++) {
      var ele = panel[row][col];

      console.log(`row: ${row} | col: ${col} | ele: ${ele}`)
      if (ele == 'O') {
         var currentRow = row;
         while (currentRow > 0 && panel[currentRow - 1][col] == '.') {
            console.log(`rock at ${row} | ${col} can move to row ${currentRow - 1}`)
            currentRow--;
         }
         panel[currentRow][col] = 'O';
         panel[row][col] = '.';
      }
   }
}

for (var line of panel) {
   console.log(line.join(''));
}