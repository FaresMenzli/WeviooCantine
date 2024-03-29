const fs = require('fs');
const path = require('path');

const scriptToCopy = 'gitInfo.js';
const buildDir = path.resolve(__dirname, '../../build');

const source = path.resolve(__dirname, scriptToCopy);
const destination = path.resolve(buildDir, scriptToCopy);

// Create build directory if it doesn't exist
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}
console.log(source)
console.log("----------"+buildDir)

// Copy script into build directory
fs.copyFileSync(source, destination);
console.log(`Copied ${scriptToCopy} to build folder.`);