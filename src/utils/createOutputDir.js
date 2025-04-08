const fs = require('fs');
const path = require('path');

function createOutputDir() {
  const outputDir = path.join(__dirname, '../../outputs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
    console.log('📁 Folder "outputs" został utworzony.');
  }
}

module.exports = createOutputDir;