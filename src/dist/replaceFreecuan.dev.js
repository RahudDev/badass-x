"use strict";

var fs = require('fs');

var path = require('path');

var DIRECTORY = './locales'; // <- update this if your folder is different

function replaceInFile(filePath) {
  var content = fs.readFileSync(filePath, 'utf-8'); // Case-sensitive replacements

  content = content.replace(/optimisticash/g, 'OptimistiCash');
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log("\u2705 Updated: ".concat(filePath));
}

function processDirectory(dir) {
  var items = fs.readdirSync(dir);
  items.forEach(function (item) {
    var fullPath = path.join(dir, item);
    var stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath); // Recursive
    } else if (fullPath.endsWith('.json')) {
      replaceInFile(fullPath);
    }
  });
} // Run the script


processDirectory(DIRECTORY);