const { exec } = require('child_process'); // Importujemy exec do otwierania pliku
const axios = require('axios');
const htmlparser2 = require('htmlparser2');
const createOutputDir = require('./utils/createOutputDir');
const fetchProductDescription = require('./fetchDescription');
const generateHTML = require('./generateHTML');
const generateShortDescription = require('./generateSummary');
const createProgressBar = require('./utils/progressBars'); // Importujemy generator paska postępu

async function scrapeKontri(page = 0) {
  const url = `https://www.kontri.pl/pl/menu/biustonosze-100.html?counter=${page}`;
  const domain = 'https://www.kontri.pl';
  const products = [];

  try {
    const { data: html } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36',
      },
    });

    const parser = new htmlparser2.Parser({
      onopentag(name, attribs) {
        if (name === 'a' && (attribs.class === 'product-name' || attribs.class === 'first-product-name')) {
          const productName = attribs['title'];
          let productUrl = attribs['href'];
          if (!productUrl.startsWith('http')) {
            productUrl = domain + productUrl;
          }
          products.push({ name: productName, image: '', url: productUrl, description: '' });
        }

        if (name === 'img' && attribs['data-src']) {
          const imgSrc = attribs['data-src'];
          const fullImgUrl = domain + imgSrc;
          if (products.length > 0) {
            products[products.length - 1].image = fullImgUrl;
          }
        }
      },
    });

    parser.write(html);
    parser.end();

    const limitedProducts = products.slice(0, 3);

    // Pasek postępu dla pobierania opisów
    const fetchProgressBar = createProgressBar('Pobieranie opisów', limitedProducts.length);

    for (const [index, product] of limitedProducts.entries()) {
      product.description = await fetchProductDescription(product.url);
      fetchProgressBar.update(index + 1); // Aktualizujemy pasek postępu
    }

    fetchProgressBar.stop(); // Zatrzymujemy pasek postępu po zakończeniu

    // Pasek postępu dla generowania streszczeń
    const summaryProgressBar = createProgressBar('Generowanie streszczeń', limitedProducts.length);

    for (const [index, product] of limitedProducts.entries()) {
      if (!product.description || product.description.trim() === '') {
        console.error(`Brak opisu dla produktu: ${product.name}`);
        product.summary = 'Brak opisu produktu do podsumowania.';
        continue;
      }
      product.summary = await generateShortDescription(product.description);
      summaryProgressBar.update(index + 1); // Aktualizujemy pasek postępu
    }

    summaryProgressBar.stop(); // Zatrzymujemy pasek postępu po zakończeniu

    await generateHTML(limitedProducts);

    // Otwieramy plik z wynikami
    exec('start outputs/produkty.html', (err) => {
      if (err) {
        console.error('❌ Nie udało się otworzyć pliku z wynikami:', err.message);
      }
    });
  } catch (err) {
    console.error('❌ Błąd podczas pobierania:', err.message);
  }
}

createOutputDir();
scrapeKontri(0);