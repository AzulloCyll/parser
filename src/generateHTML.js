const fs = require('fs');
const path = require('path');

/**
 * Function to generate an HTML file with product data.
 * @param {Array} products - List of products with their details.
 */
async function generateHTML(products) {
  const outputPath = path.join(__dirname, '../outputs/produkty.html');

  const htmlContent = `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Produkty z Kontri.pl</title>
  <link rel="stylesheet" href="../styles/styles.css">
</head>
<body>
  <h1>Produkty z Kontri.pl</h1>
  ${products
    .map(
      (product) => `
    <div class="product">
      <div class="product-link">
        <a href="${product.url}" target="_blank">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
        </a>
      </div>
      <div class="product-description">
        <div class="original-description">
          <p>${product.description || 'Brak opisu produktu.'}</p>
        </div>
      </div>
      <div class="product-summary">
        <p><strong>Streszczenie:</strong></p>
        <p>${product.summary || 'Brak streszczenia.'}</p>
      </div>
    </div>
  `
    )
    .join('')}
</body>
</html>
`;

  // Write the HTML content to the output file
  fs.writeFileSync(outputPath, htmlContent, 'utf-8');
  console.log(`✅ Plik HTML został wygenerowany: ${outputPath}`);
}

module.exports = generateHTML;