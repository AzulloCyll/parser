const axios = require('axios');
const htmlparser2 = require('htmlparser2');
const fs = require('fs');

// Funkcja do parsowania HTML i wyciągania produktów
async function scrapeKontri(page = 1) {
  const url = `https://www.kontri.pl/pl/menu/biustonosze-100.html?counter=${page}`;
  const domain = 'https://www.kontri.pl';  // Pełna domena
  const products = [];

  try {
    // Pobieramy stronę HTML
    const { data: html } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36',
      }
    });

    // Parsowanie HTML za pomocą htmlparser2
    const parser = new htmlparser2.Parser({
      onopentag(name, attribs) {
        // Szukamy tagu <a> z klasą "product-name" i wyciągamy nazwę produktu oraz URL
        if (name === 'a' && attribs.class === 'product-name') {
          const productName = attribs['title']; // Nazwa produktu jest w atrybucie 'title'
          let productUrl = attribs['href']; // Link do strony produktu

          // Sprawdzamy, czy link jest względny i dopisujemy pełną domenę
          if (!productUrl.startsWith('http')) {
            productUrl = domain + productUrl;
          }

          products.push({ name: productName, image: '', url: productUrl }); // Dodajemy nazwę i URL do tablicy
        }

        // Szukamy tagu <img> w kontenerze o klasie "product_wrapper" i wyciągamy dane o zdjęciu
        if (name === 'img' && attribs['data-src']) {
          const imgSrc = attribs['data-src']; // Źródło zdjęcia w atrybucie 'data-src'
          const fullImgUrl = domain + imgSrc; // Łączenie domeny z URL zdjęcia
          
          // Przypisujemy zdjęcie do ostatnio dodanego produktu
          if (products.length > 0) {
            products[products.length - 1].image = fullImgUrl;
          }
        }
      }
    });

    parser.write(html);
    parser.end();

    // Generowanie HTML z danymi produktów
    generateHTML(products);

  } catch (err) {
    console.error('❌ Błąd podczas pobierania:', err.message);
  }
}

// Funkcja do generowania pliku HTML
function generateHTML(products) {
  let htmlContent = `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Produkty z Kontri.pl</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      justify-content: center;
    }
    .product {
      border: 1px solid #ddd;
      padding: 10px;
      text-align: center;
      width: 200px;
    }
    .product img {
      width: 100%;
      height: auto;
    }
    .product h3 {
      font-size: 16px;
      margin-top: 10px;
    }
    .product a {
      text-decoration: none;
      color: #000;
    }
  </style>
</head>
<body>
  <h1>Produkty z Kontri.pl</h1>`;

  // Tworzymy HTML dla każdego produktu
  products.forEach(product => {
    htmlContent += `
    <div class="product">
      <a href="${product.url}" target="_blank">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
      </a>
    </div>`;
  });

  htmlContent += `
</body>
</html>`;

  // Zapisujemy HTML do pliku
  fs.writeFileSync('produkty.html', htmlContent);
  console.log('✅ Plik HTML z produktami został wygenerowany: produkty.html');
}

// Uruchom scraper
scrapeKontri(1);
