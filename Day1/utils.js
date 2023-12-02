const isNumeric = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const TrieNode = function (key) {
  this.key = key;
  this.parent = null;
  this.children = {};
  this.end = false;

  this.getWord = () => {
    let output = [];
    let node = this;

    // Iterate backwards over each parent to get the word leading up to this TrieNode
    while (node !== null) {
      output.unshift(node.key);
      node = node.parent;
    }
    return output.join('');
  };
};

const Trie = function () {
  this.root = new TrieNode(null);

  // Inserts a word into the Trie
  this.insert = (word) => {
    let node = this.root;

    // Loop through characters in word
    for (let i = 0; i < word.length; i++) {
      if (!node.children[word[i]]) {
        // If character is not a key of the current node

        // Add it as a key
        node.children[word[i]] = new TrieNode(word[i]);

        // Assign parent to the child node
        node.children[word[i]].parent = node;
      }

      // move to next trie depth
      node = node.children[word[i]];

      if (i == word.length - 1) {
        node.end = true;
      }
    }
  };

  this.contains = (word) => {
    let node = this.root;

    // Loop over characters in word
    for (let i = 0; i < word.length; i++) {
      // Check if character node exists in children
      if (node.children[word[i]]) {
        // If it exists, move to next trie depth
        node = node.children[word[i]];
      } else {
        return false;
      }
    }
    // Returns boolean if character is the end of a word
    return node.end;
  };

  // returns every word with given prefix
  this.find = function (prefix) {
    let node = this.root;
    let output = [];

    // for every character in the prefix
    for (let i = 0; i < prefix.length; i++) {
      // make sure prefix actually has words
      if (node.children[prefix[i]]) {
        node = node.children[prefix[i]];
      } else {
        // there's none. just return it.
        return output;
      }
    }

    // recursively find all words in the node
    findAllWords(node, output);

    return output;
  };

  // recursive function to find all words in the given node.
  const findAllWords = (node, arr) => {
    // base case, if node is at a word, push to output
    if (node.end) {
      arr.unshift(node.getWord());
    }

    // iterate through each children, call recursive findAllWords
    for (let child in node.children) {
      findAllWords(node.children[child], arr);
    }
  };
};

module.exports = { isNumeric, Trie };
