const fs = require('fs');
const path = require('path');
const generateShortDescription = require('./generateSummary');

async function generateHTML(products) {
  let htmlContent = `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Produkty z Kontri.pl</title>
  <link rel="stylesheet" href="../styles/styles.css">
</head>
<body>
  <h1>Produkty z Kontri.pl</h1>`;

  for (const product of products) {
    const shortDescription = await generateShortDescription(product.description);
    htmlContent += `
    <div class="product">
      <div class="product-link">
        <a href="${product.url}" target="_blank">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
        </a>
      </div>
      <div class="product-description">
        <div class="original-description">
          ${product.description}
        </div>
      </div>
      <div class="product-summary">
        <p><strong>Streszczenie:</strong></p>
        <p>${shortDescription}</p>
      </div>
    </div>`;
  }

  htmlContent += `
</body>
</html>`;

  const outputPath = path.join(__dirname, '../outputs/produkty.html');
  fs.writeFileSync(outputPath, htmlContent);
  console.log(`✅ Plik HTML z produktami został wygenerowany: ${outputPath}`);
}

module.exports = generateHTML;