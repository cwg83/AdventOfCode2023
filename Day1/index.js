const { isNumeric } = require('../utils.js');
const { Trie } = require('../utils.js');

var fs = require('fs');

var data = fs.readFileSync('input4.txt', 'utf8').toString();
var splitInput = data.split(/\r?\n|\r|\n/g);

var result = 0;

var numberStrings = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

var trie = new Trie();

var numberWords = Object.keys(numberStrings);

for (var word of numberWords) {
  trie.insert(word);
}

for (let str of splitInput) {
  var num1;
  var num2;
  for (var i = 0; i < str.length; i++) {
    var char = str[i];
    if (isNumeric(char)) {
      if (!num1) {
        num1 = char;
      }
      num2 = char;
    } else {
      j = i + 1;
      var go = true;
      while (go && j <= str.length) {
        var subStr = str.slice(i, j);
        if (trie.contains(subStr)) {
          if (!num1) {
            num1 = numberStrings[subStr];
          }
          num2 = numberStrings[subStr];
          break;
        }
        if (trie.find(subStr).length == 0) {
          break;
        }

        if (isNumeric(str[j])) {
          break;
        }

        j++;
      }
    }
  }

  result += parseInt(num1 + num2);
  num1 = null;
}

console.log(result);
